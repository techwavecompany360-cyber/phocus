import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms and Conditions | PhocieXpert Technologies Company Limited",
  description:
    "Terms and Conditions governing the use of the PhocieXpert Technologies Company Limited website and technology consulting engagements in Mainland Tanzania."
};

export default function TermsPage() {
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
            Terms & Conditions
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or browsing this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of Mainland Tanzania. If you disagree with any part of these terms, you should discontinue browsing.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                2. Intellectual Property Rights
              </h2>
              <p>
                All brand marks, logos, visual layouts, text copy, graphic elements, diagrams, and software code presented on this website are the proprietary intellectual property of <strong>{companyData.legalName}</strong> unless otherwise noted.
              </p>
              <p>
                You may not reproduce, duplicate, copy, sell, or exploit any portion of the site without express written authorization from PhocieXpert Technologies Company Limited.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                3. Technical Services & Scoping
              </h2>
              <p>
                Information and descriptions provided on this website are for informational and conceptual purposes. Formal engineering engagements, system deliverables, service level agreements (SLAs), and payment terms are defined within mutually signed commercial contracts and Statements of Work (SOW).
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                4. Governing Law & Jurisdiction
              </h2>
              <p>
                These terms are governed by and construed in accordance with the laws of Mainland Tanzania. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the competent courts of Mainland Tanzania.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#10213D]">
                5. Inquiries & Official Notices
              </h2>
              <p>
                Official legal communications or contract inquiries should be submitted via email to:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-[#043279]">
                <p>Email: {companyData.contactConfig.officialEmail}</p>
                <p>Entity: {companyData.legalName}</p>
                <p>Location: Mainland Tanzania</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
