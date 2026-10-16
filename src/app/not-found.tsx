import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 bg-[#061329] text-white tech-grid-dark px-4">
      <div className="max-w-lg w-full text-center space-y-6 glass-card-dark p-8 sm:p-12 rounded-3xl border border-cyan-500/25 tech-glow-blue">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-400 font-mono text-2xl font-bold">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            Error 404 // Target Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Page Does Not Exist
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed pt-1">
            The requested technical route or resource is not available on this server.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-brand hover:brightness-110 shadow-md text-sm"
          >
            <Home className="w-4 h-4 text-cyan-200" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/15 text-sm"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
