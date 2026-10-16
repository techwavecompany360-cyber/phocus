"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquareCode, Mail, Phone } from "lucide-react";
import { companyData } from "@/data/company";

export default function ContactCTA() {
  return (
    <section className="py-20 lg:py-24 bg-[#F7FAFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-brand p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30 border border-cyan-400/30 tech-glow-blue">
          {/* Subtle Circuit & Ambient Backdrops */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-cyan-200">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>CONSULTATION & PROJECT SCOPING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Have a Technology Challenge? <br className="hidden sm:inline" />
              <span className="text-cyan-200">Let&apos;s Solve It.</span>
            </h2>

            <p className="text-base sm:text-lg text-blue-50/90 leading-relaxed font-normal">
              Whether you&apos;re planning a new digital product, modernizing existing systems, integrating connected devices, or exploring emerging technologies, our team can help you define the next step.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[#043279] bg-white hover:bg-cyan-50 active:scale-98 transition-all shadow-lg text-base group"
              >
                <MessageSquareCode className="w-5 h-5 text-[#043279]" />
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 text-[#043279] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white bg-black/20 hover:bg-black/30 border border-white/30 hover:border-white transition-all text-base"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

            {/* Direct Official Contact Channels */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-8 text-sm">
              <a
                href={`mailto:${companyData.contactConfig.officialEmail}`}
                className="inline-flex items-center gap-2.5 text-cyan-100 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-[#043279] transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{companyData.contactConfig.officialEmail}</span>
              </a>

              <a
                href={`tel:${companyData.contactConfig.phone}`}
                className="inline-flex items-center gap-2.5 text-cyan-100 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-[#043279] transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium tracking-wide">{companyData.contactConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
