"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Workflow,
  ShoppingCart,
  CloudCog,
  Radio,
  BarChart3,
  Layers,
  Users,
  HardDrive,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { solutionsData, SolutionItem } from "@/data/solutions";

export default function SolutionsSection({ solutions: initialSolutions }: { solutions?: SolutionItem[] } = {}) {
  const solutionsList = (initialSolutions && initialSolutions.length > 0) ? initialSolutions : solutionsData;
  const [selectedSolutionId, setSelectedSolutionId] = useState(solutionsList[0]?.id || "workflow-auto");

  const activeSolution =
    solutionsList.find((s) => s.id === selectedSolutionId) || solutionsList[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Workflow":
        return <Workflow className="w-5 h-5" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-5 h-5" />;
      case "CloudCog":
        return <CloudCog className="w-5 h-5" />;
      case "Radio":
        return <Radio className="w-5 h-5" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Users":
        return <Users className="w-5 h-5" />;
      case "HardDrive":
        return <HardDrive className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 bg-[#F7FAFF] relative overflow-hidden tech-grid-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
            Tailored Applications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10213D] tracking-tight">
            From Complex Challenges to{" "}
            <span className="text-gradient-brand">Practical Solutions.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#61718B] leading-relaxed">
            Every business challenge is unique. Rather than forcing rigid off-the-shelf packages, we scope and engineer solutions tailored to your operational environment, team workflows, and long-term objectives.
          </p>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Solution Selector Tabs (Left 4 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {solutionsList.map((solution) => {
              const isSelected = solution.id === activeSolution.id;
              return (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() => setSelectedSolutionId(solution.id)}
                  className={`text-left p-4 rounded-xl transition-all flex items-center justify-between border ${
                    isSelected
                      ? "bg-white border-[#04BCEB] shadow-md text-[#043279]"
                      : "bg-white/60 border-slate-200/80 hover:bg-white text-slate-700 hover:text-[#10213D]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#043279] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {getIcon(solution.iconName)}
                    </div>
                    <span className="text-sm font-bold truncate max-w-[220px] sm:max-w-xs">
                      {solution.title}
                    </span>
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-[#04BCEB] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Solution Deep-Dive Card (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-900/10 shadow-xl shadow-blue-950/5 relative overflow-hidden space-y-8 animate-in fade-in duration-200">
              {/* Subtle accent border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-brand" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0B5AAA] bg-blue-50 px-3 py-1 rounded-full w-fit border border-blue-100">
                  <span>Custom Scoped Architecture</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10213D]">
                  {activeSolution.title}
                </h3>
                <p className="text-sm font-semibold text-[#0B5AAA]">
                  {activeSolution.tagline}
                </p>
                <p className="text-sm text-[#61718B] leading-relaxed pt-1">
                  {activeSolution.description}
                </p>
              </div>

              {/* Challenges Addressed & Typical Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Challenges Solved</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {activeSolution.challengesAddressed.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Practical Value</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {activeSolution.typicalOutcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Capabilities included */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#043279]">
                  Engineered Capabilities Included:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeSolution.capabilitiesIncluded.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 active:scale-98 transition-all shadow-md shadow-blue-900/30 text-sm"
                >
                  <span>Scope This Solution</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200" />
                </Link>

                <Link
                  href="/solutions"
                  className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-[#0B5AAA] hover:text-[#043279] transition-colors"
                >
                  <span>View All 8 Solution Frameworks &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
