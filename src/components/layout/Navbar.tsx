"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";
import { companyData } from "@/data/company";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav-scrolled py-3 shadow-lg"
          : "glass-nav py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="PhocieXpert Technologies Company Limited - Homepage"
          >
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-white/10 p-1 border border-cyan-400/30 group-hover:border-cyan-400 transition-colors shadow-sm">
              <Image
                src="/logo.png"
                alt="PhocieXpert Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Phocie<span className="text-[#04BCEB]">Xpert</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 uppercase font-medium">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            {companyData.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#04BCEB] bg-white/10 shadow-sm border border-cyan-400/20"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-brand hover:brightness-110 active:scale-95 transition-all shadow-md shadow-blue-900/30 border border-cyan-400/30 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-300" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] z-40 md:hidden bg-[#061329]/95 backdrop-blur-xl border-t border-cyan-500/20 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2 px-3">
              Navigation
            </p>
            {companyData.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/40 border border-cyan-500/30"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex flex-col gap-2.5 text-xs text-slate-300">
              <a
                href={companyData.contactConfig.emailLink}
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{companyData.contactConfig.officialEmail}</span>
              </a>
              <a
                href={companyData.contactConfig.phoneLink}
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-white transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{companyData.contactConfig.phone}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{companyData.registration}</span>
            </div>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-white bg-gradient-brand shadow-lg shadow-blue-900/50 hover:brightness-110 active:scale-98 transition-all"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
