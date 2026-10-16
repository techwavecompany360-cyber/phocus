"use client";

import React, { useState } from "react";
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
  ChevronRight
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

export default function FeaturedServices({ services: initialServices }: { services?: ServiceItem[] } = {}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const servicesList = initialServices || servicesData;

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "Engineering", label: "Software & Cloud" },
    { id: "Intelligent Systems", label: "AI & IoT" },
    { id: "Security & Defense", label: "Security & Network" },
    { id: "Hardware & Systems", label: "Hardware & Systems" }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-6 h-6 text-cyan-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case "Cloud":
        return <Cloud className="w-6 h-6 text-cyan-400" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-cyan-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "Glasses":
        return <Glasses className="w-6 h-6 text-cyan-400" />;
      case "Blocks":
        return <Blocks className="w-6 h-6 text-cyan-400" />;
      case "Network":
        return <Network className="w-6 h-6 text-cyan-400" />;
      case "Server":
        return <Server className="w-6 h-6 text-cyan-400" />;
      case "Gamepad2":
        return <Gamepad2 className="w-6 h-6 text-cyan-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-cyan-400" />;
      default:
        return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredServices = servicesList.filter((service) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "Engineering") {
      return (
        service.category === "Engineering" ||
        service.category === "Cloud & DevOps" ||
        service.category === "Strategy & Advisory"
      );
    }
    if (activeFilter === "Intelligent Systems") {
      return (
        service.category === "Intelligent Systems" ||
        service.category === "Connected Systems" ||
        service.category === "Immersive Tech"
      );
    }
    if (activeFilter === "Security & Defense") {
      return (
        service.category === "Security & Defense" ||
        service.category === "Infrastructure" ||
        service.category === "Decentralized Systems"
      );
    }
    if (activeFilter === "Hardware & Systems") {
      return (
        service.category === "Hardware & Systems" ||
        service.category === "Digital Media" ||
        service.category === "Education & Capacity" ||
        service.category === "Growth & Visibility"
      );
    }
    return true;
  });

  return (
    <section className="py-24 bg-[#061329] text-white relative tech-grid-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#04BCEB]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#0B5AAA]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Comprehensive Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Our Technology <span className="text-gradient-cyan">Capabilities</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            From initial concept to deployment and ongoing support, we provide technology services designed to help organizations innovate, integrate, and scale.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === cat.id
                    ? "bg-gradient-brand text-white shadow-md shadow-blue-900/40 border border-cyan-400/50"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid: 3-4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group rounded-2xl glass-card-dark p-6 sm:p-7 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top edge glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-cyan-300/80 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                {/* Key Capabilities Preview */}
                <div className="space-y-1.5 border-t border-white/10 pt-4 mb-6">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-400"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/services#${service.id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:text-cyan-200 transition-colors pt-2"
              >
                <span>View Full Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA to All Services */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-cyan-400/30 hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/50"
          >
            <span>Explore All 13 Technology Services</span>
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
