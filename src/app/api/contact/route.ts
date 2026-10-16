import { NextResponse } from "next/server";
import { saveInquiry, updateInquiryEmailStatus } from "@/lib/db";
import { sendContactEmail, isMailerConfigured, getMissingMailerConfig } from "@/lib/mailer";

// In-memory rate limiting map: ip -> array of request timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

    if (ip !== "unknown-ip" && isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many inquiries sent in a short period. Please wait a few minutes before submitting again."
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      fullName,
      company,
      email,
      phone,
      service,
      budget,
      subject,
      message,
      details,
      privacyConsent,
      website_hp // Honeypot spam trap
    } = body;

    // Honeypot spam trap: automated bots fill this hidden field
    if (website_hp) {
      return NextResponse.json({
        success: true,
        reference: "PX-SPAM-GUARDED",
        message: "Thank you for contacting PhocieXpert Technologies Company Limited. Your inquiry has been submitted successfully. Our team will review your message and get back to you."
      });
    }

    // Server-side field validation & length checks
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (minimum 2 characters).";
    } else if (fullName.trim().length > 120) {
      errors.fullName = "Full name cannot exceed 120 characters.";
    }

    if (company && (typeof company !== "string" || company.trim().length > 150)) {
      errors.company = "Company name cannot exceed 150 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please provide a valid business email address.";
    } else if (email.trim().length > 150) {
      errors.email = "Email address cannot exceed 150 characters.";
    }

    if (phone && (typeof phone !== "string" || phone.trim().length > 40)) {
      errors.phone = "Phone number cannot exceed 40 characters.";
    }

    if (!service || typeof service !== "string" || service.trim().length < 2) {
      errors.service = "Please select a required service category.";
    }

    if (budget && (typeof budget !== "string" || budget.trim().length > 100)) {
      errors.budget = "Budget selection cannot exceed 100 characters.";
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      errors.subject = "Please enter an inquiry subject (minimum 3 characters).";
    } else if (subject.trim().length > 200) {
      errors.subject = "Subject cannot exceed 200 characters.";
    }

    const projectMessage = message || details;
    if (!projectMessage || typeof projectMessage !== "string" || projectMessage.trim().length < 10) {
      errors.message = "Please share a brief description of your project or requirements (at least 10 characters).";
    } else if (projectMessage.trim().length > 5000) {
      errors.message = "Project message cannot exceed 5,000 characters.";
    }

    if (!privacyConsent) {
      errors.privacyConsent = "You must agree to the Privacy Policy to submit your project inquiry.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Please correct the highlighted errors before submitting."
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Dar_es_Salaam",
      dateStyle: "full",
      timeStyle: "medium"
    });

    // Check SMTP configuration status
    const isConfigured = isMailerConfigured();

    if (!isConfigured) {
      // Save locally to preserve inquiry data so it is never lost
      const saved = saveInquiry({
        fullName,
        company,
        email,
        phone,
        service,
        budget,
        subject,
        details: projectMessage,
        emailStatus: "pending_smtp_configuration"
      });

      const missing = getMissingMailerConfig();

      // Rule: Never falsely tell the visitor that an inquiry was sent when delivery has not been attempted successfully.
      return NextResponse.json(
        {
          success: false,
          code: "SMTP_UNCONFIGURED",
          reference: `PX-${String(saved.id).padStart(5, "0")}`,
          missingConfig: missing,
          message:
            "Email delivery system is pending SMTP configuration. Please configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, and CONTACT_FROM_EMAIL in your server environment to enable live email delivery to info@phociexperttechnologies.co.tz."
        },
        { status: 503 }
      );
    }

    // SMTP is configured -> proceed to dispatch live email
    try {
      // First persist the record
      const saved = saveInquiry({
        fullName,
        company,
        email,
        phone,
        service,
        budget,
        subject,
        details: projectMessage,
        emailStatus: "sending"
      });

      // Send email via nodemailer
      await sendContactEmail({
        fullName,
        company,
        email,
        phone,
        service,
        budget,
        subject,
        message: projectMessage,
        submittedAt
      });

      // Mark inquiry email as delivered
      updateInquiryEmailStatus(saved.id, "delivered");

      const referenceId = `PX-${String(saved.id).padStart(5, "0")}`;

      return NextResponse.json({
        success: true,
        reference: referenceId,
        message:
          "Thank you for contacting PhocieXpert Technologies Company Limited. Your inquiry has been submitted successfully. Our team will review your message and get back to you."
      });
    } catch (sendErr: any) {
      console.error("Nodemailer delivery error:", sendErr?.message || sendErr);

      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_DELIVERY_FAILED",
          message:
            "A temporary delivery error occurred while attempting to transmit the inquiry to the mail server. Please try again or email us directly at info@phociexperttechnologies.co.tz."
        },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("Error in /api/contact handler:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again or reach out directly to info@phociexperttechnologies.co.tz."
      },
      { status: 500 }
    );
  }
}
