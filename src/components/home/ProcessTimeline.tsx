"use client";

import React from "react";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import { companyData } from "@/data/company";

export default function ProcessTimeline({
  approachSteps: initialSteps
}: {
  approachSteps?: Array<{ step: string; title: string; tagline: string; description: string; iconName: string }>;
} = {}) {
  const steps = (initialSteps && initialSteps.length > 0) ? initialSteps : companyData.approachSteps;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-5 h-5 text-cyan-400" />;
      case "PenTool":
        return <PenTool className="w-5 h-5 text-cyan-400" />;
      case "Code":
        return <Code className="w-5 h-5 text-cyan-400" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-cyan-400" />;
      default:
        return <Code className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#061329] text-white relative tech-grid-dark overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-[#04BCEB]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Structured Execution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Our Engineering <span className="text-gradient-cyan">Approach</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            A disciplined, transparent delivery framework that transforms strategic goals into robust, high-performance technology systems.
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Continuous connecting bar on desktop */}
          <div className="hidden lg:block absolute top-1/4 left-12 right-12 h-[2px] bg-gradient-to-r from-blue-900 via-cyan-500/40 to-blue-900 pointer-events-none" />

          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative rounded-2xl glass-card-dark p-6 sm:p-7 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header step pill and icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-300 transition-all shadow-md relative z-10">
                    {getIcon(step.iconName)}
                  </div>
                  <span className="text-2xl font-black font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/90 tracking-wide uppercase">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress step badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Phase {idx + 1} of 4</span>
                <span className="text-cyan-400/80">PhocieXpert Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
