"use client";

import React from "react";
import {
  Layers,
  Target,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Headphones
} from "lucide-react";
import { companyData } from "@/data/company";

export default function WhyChooseUs({
  whyChooseUs: initialItems
}: {
  whyChooseUs?: Array<{ title: string; description: string; iconName: string }>;
} = {}) {
  const items = (initialItems && initialItems.length > 0) ? initialItems : companyData.whyChooseUs;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return <Layers className="w-6 h-6 text-cyan-400" />;
      case "Target":
        return <Target className="w-6 h-6 text-cyan-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-cyan-400" />;
      case "Headphones":
        return <Headphones className="w-6 h-6 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#061329] text-white relative tech-grid-dark overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#043279]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#04BCEB]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Why Partner With PhocieXpert
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            One Technology Partner.{" "}
            <span className="text-gradient-cyan">Multiple Possibilities.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            We provide the complete technical spectrum under one roof — helping organizations build, secure, and scale high-value systems without the friction of juggling multiple disjointed vendors.
          </p>
        </div>

        {/* 6 Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl glass-card-dark p-7 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-md">
                  {getIcon(item.iconName)}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-cyan-400/80">0{idx + 1}.</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Value Principle</span>
                <span className="text-cyan-400">&bull;&bull;&bull;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
