"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Shield,
  Globe
} from "lucide-react";
import { usePathname } from "next/navigation";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";

export default function Footer() {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#061329] text-slate-300 border-t border-cyan-500/20 relative overflow-hidden tech-grid-dark">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0B5AAA]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#04BCEB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Registration (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            >
              <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white/10 p-1 border border-cyan-400/30 group-hover:border-cyan-400 transition-colors shadow-sm">
                <Image
                  src="/logo.png"
                  alt="PhocieXpert Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                  Phocie<span className="text-[#04BCEB]">Xpert</span>
                </span>
                <span className="text-xs tracking-wider text-slate-300 uppercase font-medium">
                  Technologies Company Limited
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Delivering innovative software engineering, intelligent systems, cybersecurity, and digital infrastructure that empower organizations to operate smarter and embrace the digital future.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-xs font-medium text-cyan-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>{companyData.registration}</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={companyData.contactConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-900/30 hover:border-cyan-400/40 transition-colors"
                aria-label="PhocieXpert on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>
              <a
                href={companyData.contactConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-900/30 hover:border-cyan-400/40 transition-colors"
                aria-label="PhocieXpert on GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
              <a
                href={companyData.contactConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-900/30 hover:border-cyan-400/40 transition-colors"
                aria-label="PhocieXpert on X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={companyData.contactConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-900/30 hover:border-cyan-400/40 transition-colors"
                aria-label="PhocieXpert on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-sm">
              {companyData.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-cyan-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-cyan-300 transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Technology Capabilities */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Capabilities
            </p>
            <ul className="space-y-2.5 text-sm">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-cyan-300 transition-colors truncate block text-slate-400 hover:text-slate-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 pt-1"
                >
                  <span>View All 13 Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Contact & Location
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{companyData.contactConfig.officeLocation}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${companyData.contactConfig.officialEmail}`}
                  className="hover:text-cyan-300 transition-colors"
                >
                  {companyData.contactConfig.officialEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href={`tel:${companyData.contactConfig.phone}`}
                  className="hover:text-cyan-300 transition-colors font-medium tracking-wide"
                >
                  {companyData.contactConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {companyData.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">&bull;</span>
            <Link href="/terms" className="hover:text-cyan-300 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/20">&bull;</span>
            <span className="text-slate-400">{companyData.trustStatement}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
