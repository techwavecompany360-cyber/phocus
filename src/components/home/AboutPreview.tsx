"use client";

import React from "react";
import Link from "next/link";
import {
  Lightbulb,
  Shield,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers
} from "lucide-react";
import { companyData } from "@/data/company";

export default function AboutPreview({
  missionStatement,
  principles
}: {
  missionStatement?: string;
  principles?: Array<{ title: string; description: string; iconName?: string }>;
} = {}) {
  const activeMission = missionStatement || companyData.missionStatement;
  const activePrinciples = (principles && principles.length > 0) ? principles : companyData.principles;

  const principleIcons = [
    <Lightbulb key="0" className="w-6 h-6 text-cyan-500" />,
    <Shield key="1" className="w-6 h-6 text-blue-600" />,
    <Handshake key="2" className="w-6 h-6 text-cyan-600" />
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7FAFF] relative overflow-hidden tech-grid-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-white border border-blue-900/10 shadow-xl shadow-blue-950/5 overflow-hidden">
              {/* Decorative Accent Glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#04BCEB]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#0B5AAA]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#043279]">
                    Engineering Principles
                  </span>
                  <span className="text-xs font-mono text-[#0B5AAA] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Mainland Tanzania
                  </span>
                </div>

                {/* Tech capability tags */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-cyan-300 transition-all shadow-xs">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#043279] flex items-center justify-center shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#10213D]">Custom Software Architecture</p>
                      <p className="text-xs text-[#61718B]">Full-stack web, mobile, and APIs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-cyan-300 transition-all shadow-xs">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100/70 text-[#0B5AAA] flex items-center justify-center shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#10213D]">Intelligent Systems & IoT</p>
                      <p className="text-xs text-[#61718B]">Sensors, telemetry & predictive ML</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-cyan-300 transition-all shadow-xs">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100/70 text-[#043279] flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#10213D]">Infrastructure & Security</p>
                      <p className="text-xs text-[#61718B]">Resilient cloud & network hardening</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#061329] text-white space-y-2">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Our Commitment
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Delivering verifiable engineering quality, clear project communication, and transparent milestone handovers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Copy & Principles */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
                About PhocieXpert
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10213D] tracking-tight leading-tight">
                Technology That Moves{" "}
                <span className="text-gradient-brand">Business Forward.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#61718B] leading-relaxed">
              {activeMission}
            </p>

            {/* The 3 Core Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {activePrinciples.map((principle, index) => (
                <div
                  key={principle.title}
                  className="p-5 rounded-2xl bg-white border border-blue-900/10 shadow-xs hover:border-cyan-400 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-cyan-50 flex items-center justify-center mb-3.5 transition-colors">
                    {principleIcons[index]}
                  </div>
                  <h3 className="text-base font-bold text-[#10213D] mb-1.5 flex items-center gap-1.5">
                    <span>{principle.title}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  </h3>
                  <p className="text-xs text-[#61718B] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-[#0B5AAA] hover:text-[#043279] group text-sm sm:text-base"
              >
                <span>Read more about our company background and values</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
