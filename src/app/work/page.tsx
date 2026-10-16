import React from "react";
import type { Metadata } from "next";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import { Sparkles, ShieldCheck } from "lucide-react";
import { getProjects } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Our Work & Engineering Showcase | PhocieXpert Technologies",
  description:
    "Explore conceptual engineering projects and digital architectures developed by PhocieXpert across web, mobile, AI, IoT, cloud, and interactive domains."
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-[#061329] text-white py-16 sm:py-20 tech-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>SELECTED ARCHITECTURES & PROOFS OF CONCEPT</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Our <span className="text-gradient-cyan">Work & Capabilities</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              A curated look into the technical solutions, distributed systems, and modern applications engineered by PhocieXpert Technologies Company Limited.
            </p>
          </div>
        </div>
      </section>

      {/* Authenticity notice */}
      <section className="bg-blue-50/70 border-b border-blue-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 text-xs sm:text-sm text-[#043279]">
          <ShieldCheck className="w-4 h-4 text-[#0B5AAA] shrink-0" />
          <span>
            <strong>Authenticity Guarantee:</strong> To respect client confidentiality and privacy agreements, the examples shown represent architectural designs, verified proof-of-concept systems, and conceptual specifications.
          </span>
        </div>
      </section>

      {/* Interactive Project Showcase Component */}
      <ProjectShowcase projects={projects} />
    </div>
  );
}
