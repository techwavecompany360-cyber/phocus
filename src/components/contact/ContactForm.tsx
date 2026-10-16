"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  User,
  Mail,
  Phone,
  HelpCircle,
  FileText,
  RotateCcw
} from "lucide-react";
import { servicesData } from "@/data/services";
import { companyData } from "@/data/company";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneCountryCode: "+255",
    phoneNumber: "",
    service: "",
    budget: "",
    subject: "",
    message: "",
    privacyConsent: false,
    website_hp: "" // Honeypot field for bot trapping
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<null | {
    reference: string;
    message: string;
  }>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const countryCodes = [
    { code: "+255", label: "Tanzania (+255)" },
    { code: "+254", label: "Kenya (+254)" },
    { code: "+256", label: "Uganda (+256)" },
    { code: "+250", label: "Rwanda (+250)" },
    { code: "+27", label: "South Africa (+27)" },
    { code: "+971", label: "UAE (+971)" },
    { code: "+44", label: "United Kingdom (+44)" },
    { code: "+1", label: "USA / Canada (+1)" },
    { code: "+91", label: "India (+91)" },
    { code: "+49", label: "Germany (+49)" }
  ];

  const budgetOptions = [
    "Under $3,000 / TZS 8M",
    "$3,000 – $10,000 / TZS 8M – 26M",
    "$10,000 – $25,000 / TZS 26M – 65M",
    "$25,000+ / TZS 65M+",
    "Flexible / Scoped per Milestone"
  ];

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Please provide an email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please provide a valid email address.";
    }

    if (!formData.service) {
      errs.service = "Please choose the required service category.";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Please enter an inquiry subject.";
    } else if (formData.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim()) {
      errs.message = "Please share a brief description of your project or requirements.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Project description must be at least 10 characters.";
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = "Please agree to the Privacy Policy to proceed.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setErrorCode(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhone = formData.phoneNumber.trim()
        ? `${formData.phoneCountryCode} ${formData.phoneNumber.trim()}`
        : "";

      const payload = {
        fullName: formData.fullName.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        service: formData.service,
        budget: formData.budget,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        privacyConsent: formData.privacyConsent,
        website_hp: formData.website_hp
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess({
          reference: data.reference,
          message: data.message
        });
        // Clear errors and reset on confirmed success
        setErrors({});
      } else {
        setErrorCode(data.code || null);
        setSubmitError(
          data.message || "Failed to submit inquiry. Please verify your details and try again."
        );
      }
    } catch {
      setSubmitError(
        "A network error occurred while sending your request. Please check your internet connection or email info@phociexperttechnologies.co.tz directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNew = () => {
    setSubmitSuccess(null);
    setSubmitError(null);
    setErrorCode(null);
    setFormData({
      fullName: "",
      company: "",
      email: "",
      phoneCountryCode: "+255",
      phoneNumber: "",
      service: "",
      budget: "",
      subject: "",
      message: "",
      privacyConsent: false,
      website_hp: ""
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-900/10 shadow-xl shadow-blue-950/5 relative overflow-hidden">
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-brand" />

      {submitSuccess ? (
        <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <h3 className="text-2xl font-extrabold text-[#10213D]">
              Inquiry Submitted Successfully
            </h3>
            {submitSuccess.reference && (
              <p className="text-xs font-mono text-[#0B5AAA] bg-blue-50 py-1 px-3.5 rounded-full inline-block border border-blue-100">
                Reference ID: {submitSuccess.reference}
              </p>
            )}
            <p className="text-sm text-slate-700 leading-relaxed pt-2 font-medium">
              {submitSuccess.message}
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleResetForNew}
              className="px-6 py-3 rounded-xl text-xs font-bold text-[#043279] bg-slate-100 hover:bg-slate-200 transition-colors shadow-2xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-[#10213D] tracking-tight">
              Project Consultation & Inquiry
            </h3>
            <p className="text-xs text-slate-500">
              Inquiries are delivered directly to{" "}
              <a
                href={companyData.contactConfig.emailLink}
                className="text-[#0B5AAA] font-semibold hover:underline"
              >
                {companyData.contactConfig.officialEmail}
              </a>
              .
            </p>
          </div>

          {/* Submission Error Banner with Retry */}
          {submitError && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="font-semibold text-amber-950">
                    {errorCode === "SMTP_UNCONFIGURED"
                      ? "SMTP Configuration Notice"
                      : "Submission Notice"}
                  </p>
                  <p className="leading-relaxed text-slate-700">{submitError}</p>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Your entered information has been preserved. You can edit any details and retry, or reach us directly at{" "}
                    <a
                      href={companyData.contactConfig.emailLink}
                      className="font-bold text-[#043279] underline"
                    >
                      {companyData.contactConfig.officialEmail}
                    </a>{" "}
                    or{" "}
                    <a
                      href={companyData.contactConfig.phoneLink}
                      className="font-bold text-[#043279] underline"
                    >
                      {companyData.contactConfig.phone}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Honeypot field (hidden from real users, traps bots) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Leave this field blank</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={(e) =>
                setFormData({ ...formData, website_hp: e.target.value })
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Row 1: Full Name (required) & Company (optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) {
                      setErrors({ ...errors, fullName: "" });
                    }
                  }}
                  placeholder="e.g. Sarah Mwangi"
                  className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border transition-all ${
                    errors.fullName
                      ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100"
                  }`}
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="company"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="e.g. Horizon Enterprises"
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100 transition-all"
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          {/* Row 2: Email Address (required & validated) & Phone Number (optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  placeholder="name@company.com"
                  className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border transition-all ${
                    errors.email
                      ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                      : "border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100"
                  }`}
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="phoneNumber"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="flex gap-2">
                <select
                  aria-label="Country Code"
                  value={formData.phoneCountryCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneCountryCode: e.target.value
                    })
                  }
                  className="w-32 px-2.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.label.split(" ")[0]})
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="712 345 678"
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100 transition-all"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Service Required (required dropdown) & Project Budget (optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="service"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Service Required <span className="text-rose-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={(e) => {
                  setFormData({ ...formData, service: e.target.value });
                  if (errors.service) {
                    setErrors({ ...errors, service: "" });
                  }
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white transition-all ${
                  errors.service
                    ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100"
                }`}
                required
              >
                <option value="">-- Choose Technology Service --</option>
                {servicesData.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.service}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="budget"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Project Budget <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100 transition-all"
              >
                <option value="">-- Select Budget Range --</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Subject (required) */}
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Subject <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) {
                    setErrors({ ...errors, subject: "" });
                  }
                }}
                placeholder="e.g. Cloud Migration Consultation & Architecture Planning"
                className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border transition-all ${
                  errors.subject
                    ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100"
                }`}
                required
              />
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.subject && (
              <p className="text-[11px] text-rose-600 font-medium">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Row 5: Project Description / Message (required) */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Project Description / Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) {
                  setErrors({ ...errors, message: "" });
                }
              }}
              placeholder="Please describe your requirements, key technical goals, existing infrastructure, or proposed timeline..."
              className={`w-full p-3.5 rounded-xl text-sm border transition-all ${
                errors.message
                  ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                  : "border-slate-200 focus:border-[#04BCEB] focus:ring-2 focus:ring-cyan-100"
              }`}
              required
            />
            {errors.message && (
              <p className="text-[11px] text-rose-600 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Row 6: Privacy Consent Checkbox (required) */}
          <div className="space-y-1 pt-1">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                id="privacyConsent"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    privacyConsent: e.target.checked
                  });
                  if (errors.privacyConsent) {
                    setErrors({ ...errors, privacyConsent: "" });
                  }
                }}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0B5AAA] focus:ring-[#04BCEB] cursor-pointer"
                required
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I agree to the processing of my contact and project details in accordance with the{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="font-bold text-[#0B5AAA] hover:text-[#04BCEB] underline"
                >
                  Privacy Policy
                </Link>
                . <span className="text-rose-500">*</span>
              </span>
            </label>
            {errors.privacyConsent && (
              <p className="text-[11px] text-rose-600 font-medium pl-7">
                {errors.privacyConsent}
              </p>
            )}
          </div>

          {/* Submit Action: Send Inquiry */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-blue-900/30 border border-cyan-400/40 text-base disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-cyan-200 group-hover:translate-x-1 transition-transform" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>

            {submitError && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#043279] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0B5AAA]" />
                <span>Retry Submission</span>
              </button>
            )}

            <p className="text-center text-[11px] text-slate-400">
              Inquiries are securely received by PhocieXpert Technologies Company Limited in Mainland Tanzania.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
