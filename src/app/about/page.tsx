import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lightbulb,
  Handshake,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Cpu,
  Layers,
  Code2,
  Lock
} from "lucide-react";
import { getCompanySettings } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "About Us | PhocieXpert Technologies Company Limited",
  description:
    "Learn about PhocieXpert Technologies Company Limited, a technology engineering partner registered in Mainland Tanzania delivering software development, AI, cybersecurity, IoT, and cloud systems."
};

export default async function AboutPage() {
  const companyData = await getCompanySettings();
  return (
    <div className="pt-24 pb-20">
      {/* Hero Header */}
      <section className="bg-[#061329] text-white py-16 sm:py-20 tech-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/30 text-xs font-semibold text-cyan-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>{companyData.registration}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              About <span className="text-gradient-cyan">PhocieXpert Technologies</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              We combine software engineering, emerging technologies, and practical problem-solving to help organizations navigate an increasingly digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Legal Identity */}
      <section className="py-16 sm:py-20 bg-[#F7FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 cols: Company Profile */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
                  Company Overview
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10213D] tracking-tight">
                  Solving Tomorrow Tech&apos;s Challenges Today.
                </h2>
              </div>

              <div className="space-y-4 text-base text-[#61718B] leading-relaxed">
                <p>
                  <strong>{companyData.legalName}</strong> is a specialized technology company registered and based in Mainland Tanzania. We exist to provide forward-thinking organizations with dependable, high-caliber technical engineering across the entire modern digital stack.
                </p>
                <p>
                  Our work ranges from core custom software engineering and enterprise platforms to machine learning consultations, defense-in-depth cybersecurity, IoT telemetry, resilient cloud architectures, and commercial electronics integration.
                </p>
                <p>
                  We believe that technology should deliver measurable operational value, not unwarranted complexity. Every system we design is built for maintainability, security, and scalable longevity.
                </p>
              </div>

              {/* Registration & Integrity Box */}
              <div className="p-5 rounded-2xl bg-white border border-blue-900/10 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#043279] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#04BCEB]" />
                  <span>Official Registration</span>
                </div>
                <p className="text-sm text-slate-700">
                  {companyData.legalName} operates as a legally registered corporate entity in Mainland Tanzania, adhering to high standards of corporate governance, engineering integrity, and data confidentiality.
                </p>
              </div>
            </div>

            {/* Right 5 cols: Brand Asset Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-8 border border-blue-900/10 shadow-xl shadow-blue-950/5 space-y-6 text-center">
                <div className="relative w-44 h-44 mx-auto rounded-2xl overflow-hidden bg-white p-3 border border-slate-100 shadow-inner">
                  <Image
                    src="/logo.png"
                    alt="PhocieXpert Technologies Official Brand Asset"
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#10213D]">
                    PhocieXpert Technologies
                  </h3>
                  <p className="text-xs font-mono text-[#0B5AAA]">
                    Company Limited
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Official brand mark representing the convergence of software engineering, artificial intelligence, and digital innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Principles Detailed */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
              Foundational Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10213D] tracking-tight">
              Three Principles That Guide Our Engineering
            </h2>
            <p className="text-sm sm:text-base text-[#61718B]">
              Every client engagement and architecture decision is measured against these three core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-400 hover:shadow-lg transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-[#043279] flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-[#04BCEB]" />
              </div>
              <h3 className="text-xl font-bold text-[#10213D] flex items-center gap-2">
                <span>Innovation</span>
                <CheckCircle2 className="w-4 h-4 text-[#04BCEB]" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Applying modern, tested technologies to solve meaningful problems. We evaluate emerging AI models, edge compute architectures, and distributed systems to craft real-world advantages.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-400 hover:shadow-lg transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#043279] flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#0B5AAA]" />
              </div>
              <h3 className="text-xl font-bold text-[#10213D] flex items-center gap-2">
                <span>Reliability</span>
                <CheckCircle2 className="w-4 h-4 text-[#0B5AAA]" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Building dependable systems with maintainability and defensive security at the core. We test rigorously, write clean documentation, and architect for high uptime.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-400 hover:shadow-lg transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-[#043279] flex items-center justify-center">
                <Handshake className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-[#10213D] flex items-center gap-2">
                <span>Partnership</span>
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Working closely with client leadership and engineering teams to understand their unique goals, organizational constraints, and deliver ongoing technical guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Competencies */}
      <section className="py-16 sm:py-20 bg-[#061329] text-white tech-grid-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Technical Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Unified Engineering Spectrum
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Our multidisciplinary breadth allows us to integrate physical hardware with modern cloud backends seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass-card-dark space-y-3">
              <Code2 className="w-6 h-6 text-cyan-400" />
              <h4 className="text-base font-bold text-white">Full-Stack Software</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Web applications, native mobile apps, custom APIs, microservices, and databases.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-dark space-y-3">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h4 className="text-base font-bold text-white">AI & Embedded Systems</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Machine learning workflows, edge IoT sensors, telemetry, and smart automation.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-dark space-y-3">
              <Lock className="w-6 h-6 text-cyan-400" />
              <h4 className="text-base font-bold text-white">Security & Defense</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vulnerability assessments, zero-trust access control, and incident readiness.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-dark space-y-3">
              <Layers className="w-6 h-6 text-cyan-400" />
              <h4 className="text-base font-bold text-white">Cloud & Hardware</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-cloud architectures, enterprise networking, and commercial IT equipment supply.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-brand hover:brightness-110 shadow-lg transition-all"
            >
              <span>Connect With Our Team</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
