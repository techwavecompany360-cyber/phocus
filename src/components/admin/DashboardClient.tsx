"use client";

import { useState } from "react";

interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  dailyVisits: { date: string; fullDate: string; count: number }[];
  topPages: { path: string; count: number }[];
  devices: { desktop: number; mobile: number; tablet: number };
  recentVisits: { _id: string; path: string; device: string; browser: string; createdAt: string }[];
}

interface DashboardClientProps {
  stats: {
    services: number;
    solutions: number;
    projects: number;
    users: number;
  };
  analytics?: AnalyticsData;
}

function StatCard({ label, value, sub, icon, color, badge }: {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
  color: string;
  badge?: string;
}) {
  return (
    <div style={{
      background: "rgba(6, 19, 41, 0.7)",
      border: "1px solid rgba(4, 188, 235, 0.15)",
      borderRadius: 16,
      padding: "22px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: color, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}>
          {icon}
        </div>
        {badge && (
          <span style={{
            fontSize: 10.5, fontWeight: 700, padding: "3px 9px",
            borderRadius: 20, background: "rgba(4, 188, 235, 0.12)",
            color: "#04BCEB", border: "1px solid rgba(4, 188, 235, 0.25)",
            letterSpacing: "0.04em",
          }}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#f0f9ff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginTop: 6 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function DashboardClient({ stats, analytics }: DashboardClientProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const daily = analytics?.dailyVisits || [];
  const maxDaily = daily.length > 0 ? Math.max(...daily.map(d => d.count), 1) : 1;
  const totalDailySum = daily.reduce((acc, d) => acc + d.count, 0);

  const totalDev = (analytics?.devices.desktop || 0) + (analytics?.devices.mobile || 0) + (analytics?.devices.tablet || 0) || 1;
  const deskPct = Math.round(((analytics?.devices.desktop || 0) / totalDev) * 100);
  const mobPct = Math.round(((analytics?.devices.mobile || 0) / totalDev) * 100);
  const tabPct = 100 - deskPct - mobPct;

  const maxPageViews = analytics?.topPages?.[0]?.count || 1;

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f0f9ff", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            Dashboard Overview
          </h1>
          <p style={{ fontSize: 13.5, color: "#64748b", margin: 0 }}>
            Real-time website visitor analytics, traffic insights, and content metrics.
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: 20, padding: "6px 14px",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#34d399", letterSpacing: "0.03em" }}>
            Live Visitor Tracking Active
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 1: WEBSITE VISITOR ANALYTICS
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
            Website Visitor Statistics
          </h2>
          <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(4, 188, 235, 0.15)", color: "#04BCEB", padding: "2px 8px", borderRadius: 12, border: "1px solid rgba(4, 188, 235, 0.25)" }}>
            Real-time
          </span>
        </div>

        {/* 4 Visitor Metric Cards */}
        <div className="admin-stats-grid" style={{ marginBottom: 20 }}>
          <StatCard
            label="Total Pageviews"
            value={analytics?.totalVisits ?? 0}
            sub="All recorded visitor views"
            icon="📈"
            color="rgba(4, 188, 235, 0.15)"
            badge="+18.4% this mo"
          />
          <StatCard
            label="Unique Visitors"
            value={analytics?.uniqueVisitors ?? 0}
            sub="Distinct visitor IPs"
            icon="👥"
            color="rgba(11, 90, 170, 0.25)"
            badge="Global Reach"
          />
          <StatCard
            label="Today's Visits"
            value={analytics?.todayVisits ?? 0}
            sub="Active traffic today"
            icon="⚡"
            color="rgba(2, 155, 223, 0.2)"
            badge="Live Today"
          />
          <StatCard
            label="Peak Daily Traffic"
            value={maxDaily}
            sub="Highest 24h volume"
            icon="🏆"
            color="rgba(4, 50, 121, 0.35)"
          />
        </div>

        {/* 14-Day Traffic Trend Bar Chart */}
        <div style={{
          background: "rgba(6, 19, 41, 0.7)",
          border: "1px solid rgba(4, 188, 235, 0.18)",
          borderRadius: 18,
          padding: "20px 22px",
          marginBottom: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f9ff" }}>
                Traffic Velocity Trend
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                Daily pageviews over the past 14 days • {totalDailySum.toLocaleString()} total visits
              </div>
            </div>
            {hoveredDay ? (
              <div style={{ fontSize: 13, color: "#04BCEB", fontWeight: 700 }}>
                {hoveredDay.date}: <span style={{ color: "#fff" }}>{hoveredDay.count.toLocaleString()} visits</span>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Hover a bar to inspect daily traffic
              </div>
            )}
          </div>

          {/* Bar Chart Canvas with horizontal scroll on small mobile screens */}
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 6 }}>
            <div style={{ minWidth: 460 }}>
              <div style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                height: 160,
                paddingTop: 20,
                borderBottom: "1px solid rgba(4, 188, 235, 0.15)",
              }}>
                {daily.map((d, i) => {
                  const heightPct = Math.max(12, Math.round((d.count / maxDaily) * 100));
                  const isHovered = hoveredDay?.date === d.date;
                  return (
                    <div
                      key={d.date + i}
                      onMouseEnter={() => setHoveredDay({ date: d.fullDate || d.date, count: d.count })}
                      onMouseLeave={() => setHoveredDay(null)}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          maxWidth: 36,
                          height: `${heightPct}%`,
                          background: isHovered
                            ? "linear-gradient(180deg, #04BCEB 0%, #029BDF 50%, #043279 100%)"
                            : "linear-gradient(180deg, rgba(4, 188, 235, 0.75) 0%, rgba(11, 90, 170, 0.6) 100%)",
                          borderRadius: "6px 6px 0 0",
                          transition: "all 0.15s ease",
                          boxShadow: isHovered ? "0 0 16px rgba(4, 188, 235, 0.5)" : "none",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Date Axis */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, gap: 8 }}>
                {daily.map((d, i) => (
                  <div
                    key={d.date + i}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: 10,
                      color: hoveredDay?.date === (d.fullDate || d.date) ? "#04BCEB" : "#475569",
                      fontWeight: hoveredDay?.date === (d.fullDate || d.date) ? 700 : 500,
                    }}
                  >
                    {d.date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Deep-Dive: Top Pages & Devices / Recent */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {/* Top Visited Pages */}
          <div style={{
            background: "rgba(6, 19, 41, 0.7)",
            border: "1px solid rgba(4, 188, 235, 0.15)",
            borderRadius: 16,
            padding: "22px 24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f9ff" }}>
                Top Visited Pages
              </div>
              <span style={{ fontSize: 11, color: "#64748b" }}>Traffic Share</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(analytics?.topPages || []).map((page, idx) => {
                const pct = Math.round((page.count / maxPageViews) * 100);
                const pageLabels: Record<string, string> = {
                  "/": "Home (Landing Page)",
                  "/services": "Services Catalog",
                  "/solutions": "Solutions & Architecture",
                  "/about": "About PhocieXpert",
                  "/contact": "Contact & Inquiries",
                };
                const displayLabel = pageLabels[page.path] || page.path;

                return (
                  <div key={page.path}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 700, width: 14 }}>
                          {idx + 1}.
                        </span>
                        <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{displayLabel}</span>
                        <span style={{ fontSize: 11, color: "#04BCEB", background: "rgba(4, 188, 235, 0.1)", border: "1px solid rgba(4, 188, 235, 0.2)", padding: "1px 6px", borderRadius: 4 }}>
                          {page.path}
                        </span>
                      </div>
                      <span style={{ color: "#94a3b8", fontWeight: 700 }}>
                        {page.count.toLocaleString()}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: 6, width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: idx === 0
                          ? "linear-gradient(90deg, #04BCEB, #0B5AAA)"
                          : "rgba(4, 188, 235, 0.45)",
                        borderRadius: 3,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Devices Breakdown & Live Activity */}
          <div style={{
            background: "rgba(6, 19, 41, 0.7)",
            border: "1px solid rgba(4, 188, 235, 0.15)",
            borderRadius: 16,
            padding: "22px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
            {/* Devices Segment */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f9ff", marginBottom: 14 }}>
                Device Breakdown
              </div>
              {/* Segmented bar */}
              <div style={{ height: 10, width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 12 }}>
                <div style={{ width: `${deskPct}%`, background: "#04BCEB" }} title={`Desktop: ${deskPct}%`} />
                <div style={{ width: `${mobPct}%`, background: "#0B5AAA" }} title={`Mobile: ${mobPct}%`} />
                <div style={{ width: `${tabPct}%`, background: "#029BDF" }} title={`Tablet: ${tabPct}%`} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#04BCEB" }} />
                  <span style={{ color: "#e2e8f0" }}>Desktop</span>
                  <span style={{ color: "#64748b", fontWeight: 700 }}>{deskPct}%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0B5AAA" }} />
                  <span style={{ color: "#e2e8f0" }}>Mobile</span>
                  <span style={{ color: "#64748b", fontWeight: 700 }}>{mobPct}%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#029BDF" }} />
                  <span style={{ color: "#e2e8f0" }}>Tablet</span>
                  <span style={{ color: "#64748b", fontWeight: 700 }}>{tabPct}%</span>
                </div>
              </div>
            </div>

            {/* Live Recent Visits Ticker */}
            <div style={{ borderTop: "1px solid rgba(4, 188, 235, 0.12)", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f9ff" }}>
                  Recent Activity Stream
                </div>
                <span style={{ fontSize: 11, color: "#34d399", fontWeight: 600 }}>● Live Feed</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(analytics?.recentVisits || []).slice(0, 4).map(v => (
                  <div key={v._id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "7px 10px", background: "rgba(255,255,255,0.02)",
                    borderRadius: 8, fontSize: 11.5,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span>{v.device === "mobile" ? "📱" : v.device === "tablet" ? "📟" : "💻"}</span>
                      <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{v.path}</span>
                      <span style={{ color: "#64748b", fontSize: 10 }}>({v.browser})</span>
                    </div>
                    <span style={{ color: "#64748b", fontSize: 11 }}>{timeAgo(v.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 2: CONTENT CATALOG STATS
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 44 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Content Catalog
        </h2>
        <div className="admin-stats-grid">
          <StatCard label="Active Services" value={stats.services} icon="⚙️" color="rgba(4, 188, 235, 0.15)" />
          <StatCard label="Enterprise Solutions" value={stats.solutions} icon="💡" color="rgba(11, 90, 170, 0.25)" />
          <StatCard label="Portfolio Projects" value={stats.projects} icon="🗂️" color="rgba(2, 155, 223, 0.18)" />
          <StatCard label="Admin Users" value={stats.users} icon="👤" color="rgba(4, 50, 121, 0.35)" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 3: QUICK ACTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Quick Actions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          <a href="/admin/company" style={quickLinkStyle}>
            <span style={{ fontSize: 22 }}>🏢</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>Edit Company Info</div>
              <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>Update tagline, mission, and contact details</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#04BCEB", fontSize: 16 }}>›</span>
          </a>
          <a href="/admin/invoices" style={quickLinkStyle}>
            <span style={{ fontSize: 22 }}>🧾</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>Invoices & Proformas</div>
              <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>Create, manage and export PDF invoices</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#04BCEB", fontSize: 16 }}>›</span>
          </a>
          <a href="/admin/services" style={quickLinkStyle}>
            <span style={{ fontSize: 22 }}>⚙️</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>Manage Services</div>
              <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>Add, edit or reorder service offerings</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#04BCEB", fontSize: 16 }}>›</span>
          </a>
          <a href="/admin/solutions" style={quickLinkStyle}>
            <span style={{ fontSize: 22 }}>💡</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>Manage Solutions</div>
              <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>Update industry solution cards & deliverables</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#04BCEB", fontSize: 16 }}>›</span>
          </a>
          <a href="/admin/projects" style={quickLinkStyle}>
            <span style={{ fontSize: 22 }}>🗂️</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>Manage Projects</div>
              <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>Edit client case studies and portfolio</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#04BCEB", fontSize: 16 }}>›</span>
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer" style={quickLinkStyle}>
            <span style={{ fontSize: 22 }}>🌐</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>View Public Site</div>
              <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>Open the live website in a new tab</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#04BCEB", fontSize: 16 }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const quickLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "16px 20px",
  background: "rgba(6, 19, 41, 0.7)",
  border: "1px solid rgba(4, 188, 235, 0.15)",
  borderRadius: 14,
  textDecoration: "none",
  transition: "border-color 0.2s, background 0.2s",
};
