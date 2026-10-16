"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code,
  ArrowRight,
  ExternalLink,
  Layers,
  Cpu,
  Shield,
  Smartphone,
  Eye,
  X
} from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";

export default function ProjectShowcase({ projects: initialProjects }: { projects?: ProjectItem[] } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const projectsList = initialProjects || projectsData;

  const categories = [
    "All",
    "Web Applications",
    "Mobile Solutions",
    "AI & Data",
    "IoT & Embedded Systems",
    "Cloud & Infrastructure",
    "Interactive Experiences"
  ];

  const filteredProjects = projectsList.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web Applications":
        return <Code className="w-4 h-4 text-cyan-400" />;
      case "Mobile Solutions":
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case "AI & Data":
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case "IoT & Embedded Systems":
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case "Cloud & Infrastructure":
        return <Shield className="w-4 h-4 text-cyan-400" />;
      default:
        return <Code className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#F7FAFF] relative overflow-hidden tech-grid-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
              Demonstrated Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10213D] tracking-tight">
              Selected <span className="text-gradient-brand">Project Concepts.</span>
            </h2>
            <p className="text-base text-[#61718B]">
              Explore the caliber of systems and digital architectures engineered by PhocieXpert across diverse technical disciplines.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-bold text-sm text-[#0B5AAA] hover:text-[#043279] transition-colors shrink-0"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#043279] text-white shadow-md shadow-blue-900/20"
                  : "bg-white text-slate-600 hover:text-[#10213D] hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-blue-900/10 shadow-lg shadow-blue-950/5 overflow-hidden hover:shadow-xl hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Visual Header */}
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} p-6 relative flex flex-col justify-between overflow-hidden`}
              >
                {/* Circuit background overlay */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-xl pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-cyan-300 font-medium">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </div>

                  {project.isConceptual && (
                    <span className="text-[10px] font-mono tracking-wider uppercase text-amber-200/90 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                      Concept
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Tech Badges */}
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Technologies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5AAA] hover:text-[#043279] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Specifications</span>
                  </button>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-cyan-600 transition-colors"
                  >
                    <span>Request Similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for Project Deep-Dive */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 overflow-y-auto max-h-[90vh]">
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
                  {activeModalProject.category} &bull; Conceptual Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10213D]">
                  {activeModalProject.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeModalProject.shortDescription}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#043279]">
                  Architectural Scope & Deliverables
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeModalProject.scope}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0B5AAA]">
                  Engineering Highlight
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                  {activeModalProject.architectureHighlight}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-brand shadow-md hover:brightness-110"
                >
                  <span>Inquire About Similar Architecture</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
