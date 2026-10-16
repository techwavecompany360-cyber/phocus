import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { getCompanySettings } from "@/lib/publicData";
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Headphones,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Project Inquiry | PhocieXpert Technologies",
  description:
    "Request a project consultation, technical scoping session, or quotation with PhocieXpert Technologies Company Limited in Mainland Tanzania."
};

export default async function ContactPage() {
  const companyData = await getCompanySettings();
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-[#061329] text-white py-16 sm:py-20 tech-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>CONSULTATION & INQUIRIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Contact <span className="text-gradient-cyan">PhocieXpert.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              We partner with forward-thinking enterprises, government agencies, and growing companies to engineer transformative digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Information Section (Two-column layout on desktop) */}
      <section className="py-16 bg-[#F7FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column — Contact information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
                  Direct Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10213D] tracking-tight leading-tight">
                  Let&apos;s Build Something Great Together
                </h2>
                <p className="text-base text-[#61718B] leading-relaxed">
                  Have a project in mind or need a technology partner? Contact PhocieXpert Technologies Company Limited to discuss your requirements and explore the right solution.
                </p>
              </div>

              {/* Official Contact Details Cards */}
              <div className="space-y-4">
                {/* Official Email */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-blue-900/10 shadow-2xs hover:border-cyan-400/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#0B5AAA] flex items-center justify-center shrink-0 group-hover:bg-[#043279] group-hover:text-cyan-300 transition-colors">
                    <Mail className="w-6 h-6 text-[#04BCEB] group-hover:text-cyan-300" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Company Email
                    </p>
                    <a
                      href={companyData.contactConfig.emailLink}
                      className="text-base font-bold text-[#10213D] hover:text-[#04BCEB] transition-colors break-all block"
                    >
                      {companyData.contactConfig.officialEmail}
                    </a>
                    <p className="text-xs text-slate-500">
                      Send your RFP or project brief directly
                    </p>
                  </div>
                </div>

                {/* Official Phone Number */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-blue-900/10 shadow-2xs hover:border-cyan-400/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#043279] flex items-center justify-center shrink-0 group-hover:bg-[#043279] group-hover:text-cyan-300 transition-colors">
                    <Phone className="w-6 h-6 text-[#0B5AAA] group-hover:text-cyan-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Phone Number
                    </p>
                    <a
                      href={companyData.contactConfig.phoneLink}
                      className="text-base font-bold text-[#10213D] hover:text-[#04BCEB] transition-colors tracking-wide block"
                    >
                      {companyData.contactConfig.phone}
                    </a>
                    <p className="text-xs text-slate-500">
                      Direct consultation line
                    </p>
                  </div>
                </div>

                {/* Registered Location */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-blue-900/10 shadow-2xs">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#043279]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Registered Jurisdiction
                    </p>
                    <p className="text-sm font-semibold text-[#10213D]">
                      {companyData.registration}
                    </p>
                    <p className="text-xs text-slate-500">
                      East Africa &bull; International Standards
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Process Card */}
              <div className="p-6 rounded-3xl bg-[#061329] text-white space-y-4 shadow-lg tech-grid-dark border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Headphones className="w-4 h-4" />
                  <span>Consultation Process</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px] shrink-0 font-mono">
                      1
                    </span>
                    <span>Our engineering team analyzes your technical scope and objectives.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px] shrink-0 font-mono">
                      2
                    </span>
                    <span>We schedule an initial discovery call to clarify architectural details.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px] shrink-0 font-mono">
                      3
                    </span>
                    <span>You receive a structured technical roadmap and phased proposal.</span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Strict confidentiality and mutual NDA honored upon request.</span>
                </div>
              </div>
            </div>

            {/* Right Column — Contact form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
