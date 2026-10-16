"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Database
} from "lucide-react";

export default function Hero({
  heroLabel,
  tagline,
  missionStatement,
}: {
  heroLabel?: string;
  tagline?: string;
  missionStatement?: string;
} = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes
    const nodeCount = 38;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      pulseSpeed: number;
      pulseAngle: number;
      color: string;
    }> = [];

    const colors = ["#04BCEB", "#029BDF", "#0B5AAA", "#FFFFFF"];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = Math.random() * 2.5 + 1.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: baseRadius,
        baseRadius,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        pulseAngle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Central glowing orbital ring
      const centerX = width * 0.52;
      const centerY = height * 0.48;
      const ringRadius = Math.min(width, height) * 0.32;

      // Draw subtle orbital rings
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(4, 188, 235, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(11, 90, 170, 0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(4, 188, 235, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & render nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 10) {
          node.x = 10;
          node.vx *= -1;
        } else if (node.x > width - 10) {
          node.x = width - 10;
          node.vx *= -1;
        }

        if (node.y < 10) {
          node.y = 10;
          node.vy *= -1;
        } else if (node.y > height - 10) {
          node.y = height - 10;
          node.vy *= -1;
        }

        node.pulseAngle += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulseAngle) * 0.8;

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.5, node.radius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#061329] text-white overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 tech-grid-dark">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#043279]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#04BCEB]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Introductory Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-xs sm:text-sm font-semibold tracking-wide text-cyan-300 shadow-sm shadow-cyan-950">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{heroLabel || "ENGINEERING THE DIGITAL FUTURE"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.12]">
              {tagline || (
                <>
                  Solving Tomorrow{" "}
                  <span className="text-gradient-cyan">Tech&apos;s Challenges</span>{" "}
                  Today.
                </>
              )}
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              {missionStatement ||
                "PhocieXpert Technologies Company Limited delivers innovative software, intelligent systems, and digital solutions that help businesses operate smarter, grow faster, and embrace the future."}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-blue-900/40 border border-cyan-400/40 text-base group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/15 hover:border-cyan-400/30 transition-all text-base"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

            {/* Subtle Trust Statement */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Software Engineering &bull; AI &bull; Digital Innovation</span>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-2xl glass-card-dark p-4 overflow-hidden border border-cyan-500/25 tech-glow-blue flex flex-col justify-between">
              {/* HTML5 Canvas Particle Orbit Network */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />

              {/* Top HUD Bar */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2 text-cyan-300 font-mono">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>PX-SYSTEM // ACTIVE</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYNCHRONIZED</span>
                </div>
              </div>

              {/* Floating Architecture HUD Elements */}
              <div className="relative z-10 grid grid-cols-2 gap-3 my-auto">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md shadow-md">
                  <div className="flex items-center justify-between text-cyan-400 mb-1.5">
                    <Cpu className="w-4 h-4" />
                    <span className="text-[10px] font-mono text-slate-400">CORE</span>
                  </div>
                  <p className="text-xs font-semibold text-white">Edge AI & Telemetry</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Low-latency pipelines</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/20 backdrop-blur-md shadow-md">
                  <div className="flex items-center justify-between text-blue-400 mb-1.5">
                    <Database className="w-4 h-4" />
                    <span className="text-[10px] font-mono text-slate-400">UPTIME</span>
                  </div>
                  <p className="text-xs font-semibold text-white">Cloud Architecture</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">99.9% High Availability</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-teal-500/20 backdrop-blur-md shadow-md">
                  <div className="flex items-center justify-between text-teal-400 mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-mono text-slate-400">DEFENSE</span>
                  </div>
                  <p className="text-xs font-semibold text-white">Cybersecurity</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Zero-Trust Protocol</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-md shadow-md">
                  <div className="flex items-center justify-between text-indigo-400 mb-1.5">
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] font-mono text-slate-400">PLATFORM</span>
                  </div>
                  <p className="text-xs font-semibold text-white">Custom Engineering</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Web, Mobile & IoT</p>
                </div>
              </div>

              {/* Bottom Real-time Telemetry Bar */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Telemetry: Nominal</span>
                </div>
                <span className="text-[11px] text-cyan-300">PhocieXpert v2.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
