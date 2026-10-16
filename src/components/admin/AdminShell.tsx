"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "◈" },
  { href: "/admin/company", label: "Company Info", icon: "🏢" },
  { href: "/admin/services", label: "Services", icon: "⚙️" },
  { href: "/admin/solutions", label: "Solutions", icon: "💡" },
  { href: "/admin/projects", label: "Projects", icon: "🗂️" },
  { href: "/admin/invoices", label: "Invoices", icon: "🧾" },
  { href: "/admin/users", label: "Admin Users", icon: "👤" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close sidebar on mobile route change
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [pathname, isMobile]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const sidebarW = isMobile ? 0 : (sidebarOpen ? 240 : 68);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#061329", color: "#e2e8f0", fontFamily: "'Inter', sans-serif", position: "relative" }}>
      {/* Mobile Backdrop Overlay */}
      {mounted && isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 10, 24, 0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 150,
            transition: "opacity 0.25s ease",
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: isMobile ? 260 : (sidebarOpen ? 240 : 68),
        height: "100vh",
        background: "linear-gradient(180deg, #043279 0%, #061329 100%)",
        borderRight: "1px solid rgba(4, 188, 235, 0.15)",
        display: "flex",
        flexDirection: "column",
        transition: isMobile ? "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)" : "width 0.25s ease",
        transform: isMobile ? (sidebarOpen ? "translateX(0)" : "translateX(-100%)") : "none",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: isMobile ? 200 : 100,
        boxShadow: isMobile && sidebarOpen ? "8px 0 36px rgba(0,0,0,0.8)" : "4px 0 24px rgba(0,0,0,0.3)",
      }}>
        {/* Brand */}
        <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(4, 188, 235, 0.15)", minHeight: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(6, 19, 41, 0.8)", padding: 3, border: "1px solid rgba(4,188,235,0.4)" }}>
              <Image src="/logo.png" alt="PhocieXpert Logo" width={30} height={30} style={{ objectFit: "contain", width: 30, height: 30 }} />
            </div>
            {(sidebarOpen || isMobile) && (
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#ffffff", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                  Phocie<span style={{ color: "#04BCEB" }}>Xpert</span>
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Admin Panel</div>
              </div>
            )}
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: 18, cursor: "pointer", padding: "4px 8px" }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { if (isMobile) setSidebarOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  borderRadius: 10,
                  textDecoration: "none",
                  background: active ? "linear-gradient(135deg, rgba(4, 188, 235, 0.15), rgba(11, 90, 170, 0.25))" : "transparent",
                  border: active ? "1px solid rgba(4, 188, 235, 0.35)" : "1px solid transparent",
                  color: active ? "#04BCEB" : "#94a3b8",
                  fontSize: 13.5,
                  fontWeight: active ? 600 : 400,
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                {(sidebarOpen || isMobile) && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(4, 188, 235, 0.12)", display: "flex", flexDirection: "column", gap: 4 }}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: "9px 12px", borderRadius: 10,
              textDecoration: "none",
              color: "#04BCEB", fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden",
            }}
          >
            <span style={{ fontSize: 15, flexShrink: 0 }}>🌐</span>
            {(sidebarOpen || isMobile) && <span>View Website ↗</span>}
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: "10px 12px", borderRadius: 10,
              border: "1px solid transparent", background: "transparent",
              color: "#ef4444", fontSize: 13, cursor: "pointer",
              transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden",
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>🚪</span>
            {(sidebarOpen || isMobile) && <span>{loggingOut ? "Signing out…" : "Sign Out"}</span>}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div style={{
        marginLeft: sidebarW,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        transition: isMobile ? "none" : "margin-left 0.25s ease",
        minWidth: 0,
        width: "100%",
      }}>
        {/* Topbar */}
        <header style={{
          height: 60,
          background: "rgba(6, 19, 41, 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(4, 188, 235, 0.15)",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "0 14px" : "0 28px",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: "rgba(4, 188, 235, 0.08)",
              border: "1px solid rgba(4, 188, 235, 0.25)",
              borderRadius: 8,
              color: "#04BCEB",
              cursor: "pointer",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {isMobile ? "☰" : (sidebarOpen ? "◀" : "▶")}
          </button>

          {isMobile ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
              <Image src="/logo.png" alt="PhocieXpert Logo" width={22} height={22} style={{ objectFit: "contain" }} />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                Phocie<span style={{ color: "#04BCEB" }}>Xpert</span>
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: "#64748b" }}>
              Management Console
            </div>
          )}

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: isMobile ? "none" : "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                background: "rgba(4, 188, 235, 0.06)",
                border: "1px solid rgba(4, 188, 235, 0.2)",
                color: "#04BCEB",
                fontSize: 12,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <span>Live Site</span>
              <span style={{ fontSize: 11 }}>↗</span>
            </Link>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)",
              boxShadow: "0 2px 10px rgba(4, 188, 235, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}>
              A
            </div>
            {!isMobile && <span style={{ fontSize: 13, color: "#94a3b8" }}>Admin</span>}
          </div>
        </header>

        {/* Page content */}
        <main style={{
          flex: 1,
          padding: isMobile ? "18px 12px" : "28px 32px",
          maxWidth: 1400,
          width: "100%",
          boxSizing: "border-box",
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
