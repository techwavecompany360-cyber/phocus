import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  BrainCircuit,
  ShieldCheck,
  Cloud,
  Compass,
  Cpu,
  Glasses,
  Blocks,
  Network,
  Server,
  Gamepad2,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles
} from "lucide-react";
import { ServiceItem } from "@/data/services";
import { getServices } from "@/lib/publicData";

export const metadata: Metadata = {
  title: "Technology Capabilities & Services | PhocieXpert Technologies",
  description:
    "Explore PhocieXpert's comprehensive technology services: Custom Software Development, AI, Cybersecurity, Cloud Infrastructure, IoT, Blockchain, VR/AR, Electronics, and IT Consulting."
};

export default async function ServicesPage() {
  const servicesData = await getServices();
  const getIcon = (iconName: string) => {
    const iconClass = "w-7 h-7 text-cyan-400";
    switch (iconName) {
      case "Code2":
        return <Code2 className={iconClass} />;
      case "BrainCircuit":
        return <BrainCircuit className={iconClass} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
      case "Cloud":
        return <Cloud className={iconClass} />;
      case "Compass":
        return <Compass className={iconClass} />;
      case "Cpu":
        return <Cpu className={iconClass} />;
      case "Glasses":
        return <Glasses className={iconClass} />;
      case "Blocks":
        return <Blocks className={iconClass} />;
      case "Network":
        return <Network className={iconClass} />;
      case "Server":
        return <Server className={iconClass} />;
      case "Gamepad2":
        return <Gamepad2 className={iconClass} />;
      case "GraduationCap":
        return <GraduationCap className={iconClass} />;
      case "TrendingUp":
        return <TrendingUp className={iconClass} />;
      default:
        return <Code2 className={iconClass} />;
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
              <span>END-TO-END TECHNICAL CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Our Technology <span className="text-gradient-cyan">Capabilities</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              From initial concept to deployment and ongoing support, we provide technology services designed to help organizations innovate, integrate, and scale.
            </p>
          </div>
        </div>
      </section>

      {/* Services Directory Navigation Pills */}
      <section className="bg-white border-b border-slate-200 sticky top-[68px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
            <span className="text-xs font-bold uppercase text-slate-400 mr-2">
              Jump to:
            </span>
            {servicesData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-[#043279] hover:text-white transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Service Cards */}
      <section className="py-16 bg-[#F7FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {servicesData.map((service: ServiceItem, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 bg-white rounded-3xl p-6 sm:p-10 border border-blue-900/10 shadow-lg shadow-blue-950/5 relative overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-brand" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 5 cols: Service Identity & Overview */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#061329] border border-cyan-400/30 flex items-center justify-center shadow-md">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-[#0B5AAA] tracking-wider uppercase">
                        Capability 0{idx + 1} &bull; {service.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10213D] tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#61718B] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Features Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#043279]">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 shadow-md text-sm transition-all"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="w-4 h-4 text-cyan-200" />
                    </Link>
                  </div>
                </div>

                {/* Right 7 cols: Exhaustive Capabilities List & Deliverables */}
                <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#043279] mb-4 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#04BCEB]" />
                      <span>Scope of Capabilities Offered</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/60 shadow-2xs text-xs sm:text-sm text-slate-800"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#04BCEB] mt-1.5 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Typical Engineering Deliverables
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((d, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/60 text-xs font-medium text-[#043279]"
                        >
                          {d}
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

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-[#061329] text-white tech-grid-dark">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Need a Customized Technology Service?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Our engineering team in Mainland Tanzania works collaboratively to define, architect, and deliver the precise technology solution for your organization.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 shadow-lg text-base"
            >
              <span>Schedule a Technical Consultation</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
