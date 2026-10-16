import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy | PhocieXpert Technologies Company Limited",
  description:
    "Privacy Policy for PhocieXpert Technologies Company Limited. Read how we collect, protect, and handle client information in accordance with privacy regulations in Mainland Tanzania."
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-[#061329] text-white py-14 tech-grid-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Last updated: October 2026 &bull; {companyData.legalName} &bull; Mainland Tanzania
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blue-900/10 shadow-lg space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                1. Commitment to Data Protection
              </h2>
              <p>
                <strong>{companyData.legalName}</strong> (&quot;PhocieXpert&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respect the confidentiality and privacy of our website visitors, clients, and partners. This Privacy Policy outlines the types of data we gather through our corporate website and how that information is handled and protected in compliance with applicable laws in Mainland Tanzania.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                2. Information We Collect
              </h2>
              <p>When you submit a consultation request or contact inquiry, we collect:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Full name and corporate organization details.</li>
                <li>Contact information including business email address and telephone number.</li>
                <li>Project requirements, estimated budgets, and technical scope notes.</li>
                <li>Preferred communication channels.</li>
              </ul>
              <p>
                We do not collect sensitive biometric data, banking credentials, or unrelated personal records through this website.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                3. Purpose of Information Processing
              </h2>
              <p>The information submitted is exclusively used to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Respond to inquiries, consultation requests, and tender notices.</li>
                <li>Scope software development, cloud infrastructure, or systems engineering proposals.</li>
                <li>Deliver ongoing customer support and client communication.</li>
                <li>Comply with legitimate corporate, accounting, and legal requirements.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                4. Data Confidentiality & Security
              </h2>
              <p>
                We enforce defensive technical and administrative safeguards to prevent unauthorized access, disclosure, or alteration of inquiry records. We never sell, lease, or monetize client contact information to third-party advertisers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                5. Contacting Our Data Officer
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request data updates or deletion, please contact us at:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-[#043279]">
                <p>Email: {companyData.contactConfig.officialEmail}</p>
                <p>Company: {companyData.legalName}</p>
                <p>Jurisdiction: Mainland Tanzania</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
