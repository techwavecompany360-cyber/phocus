import React from "react";
import type { Metadata } from "next";
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
  AlertCircle,
  Sparkles
} from "lucide-react";
import { getSolutions } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Tailored Business Solutions | PhocieXpert Technologies",
  description:
    "Explore how PhocieXpert applies technical engineering to solve real business challenges: automation, e-commerce, cloud platforms, IoT monitoring, and enterprise architectures."
};

export default async function SolutionsPage() {
  const solutionsData = await getSolutions();
  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-cyan-400";
    switch (iconName) {
      case "Workflow":
        return <Workflow className={iconClass} />;
      case "ShoppingCart":
        return <ShoppingCart className={iconClass} />;
      case "CloudCog":
        return <CloudCog className={iconClass} />;
      case "Radio":
        return <Radio className={iconClass} />;
      case "BarChart3":
        return <BarChart3 className={iconClass} />;
      case "Layers":
        return <Layers className={iconClass} />;
      case "Users":
        return <Users className={iconClass} />;
      case "HardDrive":
        return <HardDrive className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-[#061329] text-white py-16 sm:py-20 tech-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>APPLIED TECHNOLOGY FRAMEWORKS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              From Complex Challenges to{" "}
              <span className="text-gradient-cyan">Practical Solutions.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Each solution is scoped according to the client&apos;s requirements, operating environment, and business objectives. We engineer systems that deliver tangible operational outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-[#F7FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {solutionsData.map((sol, index) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-900/10 shadow-lg shadow-blue-950/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-brand" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 5 cols: Title & Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#061329] flex items-center justify-center border border-cyan-500/30 shadow-md">
                      {getIcon(sol.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-[#0B5AAA] tracking-wider uppercase">
                        Framework 0{index + 1}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#10213D]">
                        {sol.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#0B5AAA]">
                    {sol.tagline}
                  </p>

                  <p className="text-sm text-[#61718B] leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 shadow-md text-xs sm:text-sm transition-all"
                    >
                      <span>Inquire About This Solution</span>
                      <ArrowRight className="w-4 h-4 text-cyan-200" />
                    </Link>
                  </div>
                </div>

                {/* Right 7 cols: Challenges & Outcomes */}
                <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>Friction Solved</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {sol.challengesAddressed.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Operational Impact</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {sol.typicalOutcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Integrated Capabilities
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sol.capabilitiesIncluded.map((cap, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-800"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
