"use client";

import { useState, useRef, useEffect } from "react";

/* ── Curated set of Lucide icon names with rendered SVG paths ── */
export const ICON_CATALOG: { name: string; label: string; paths: string[] }[] = [
  // Tech & Dev
  { name: "Code", label: "Code", paths: ["M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"] },
  { name: "Code2", label: "Code 2", paths: ["M18 16l4-4-4-4M6 8l-4 4 4 4m5.5-12l-3 16"] },
  { name: "Terminal", label: "Terminal", paths: ["M4 17l6-6-6-6M12 19h8"] },
  { name: "Cpu", label: "CPU", paths: ["M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18", "M3 9h18"] },
  { name: "Database", label: "Database", paths: ["M12 2a8 3 0 0 1 8 3 8 3 0 0 1-8 3 8 3 0 0 1-8-3 8 3 0 0 1 8-3zM4 5v6a8 3 0 0 0 16 0V5M4 11v6a8 3 0 0 0 16 0v-6"] },
  { name: "Server", label: "Server", paths: ["M5 2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM5 14h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z", "M8 6h.01M8 18h.01"] },
  { name: "Cloud", label: "Cloud", paths: ["M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"] },
  { name: "CloudLightning", label: "Cloud Lightning", paths: ["M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 1 0 0-11.62 9", "M13 11l-4 6h6l-4 6"] },
  { name: "Wifi", label: "WiFi", paths: ["M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"] },
  { name: "Globe", label: "Globe", paths: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0c-2.76 0-5 4.48-5 10s2.24 10 5 10 5-4.48 5-10S14.76 2 12 2zM2 12h20"] },
  { name: "Smartphone", label: "Mobile App", paths: ["M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01"] },
  { name: "Monitor", label: "Monitor", paths: ["M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 21h8M12 17v4"] },
  { name: "Layout", label: "Dashboard", paths: ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"] },
  { name: "BarChart2", label: "Analytics", paths: ["M18 20V10M12 20V4M6 20v-6"] },
  { name: "PieChart", label: "Pie Chart", paths: ["M21.21 15.89A10 10 0 1 1 8 2.83", "M22 12A10 10 0 0 0 12 2v10z"] },
  { name: "TrendingUp", label: "Growth", paths: ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"] },
  { name: "Activity", label: "Activity", paths: ["M22 12h-4l-3 9L9 3l-3 9H2"] },
  // Business & Services
  { name: "Briefcase", label: "Business", paths: ["M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"] },
  { name: "Building", label: "Office Building", paths: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"] },
  { name: "Users", label: "Team Users", paths: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75", "M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"] },
  { name: "Award", label: "Award Quality", paths: ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z", "M8.21 13.89L7 23l5-3 5 3-1.21-9.12"] },
  { name: "Star", label: "Featured", paths: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"] },
  { name: "Target", label: "Goals Target", paths: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"] },
  { name: "Lightbulb", label: "Innovation Idea", paths: ["M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"] },
  { name: "Zap", label: "Speed Power", paths: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"] },
  { name: "Shield", label: "Security", paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"] },
  { name: "Lock", label: "Secure Private", paths: ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"] },
  { name: "Key", label: "Access Key", paths: ["M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"] },
  { name: "Settings", label: "Settings", paths: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"] },
  { name: "Wrench", label: "Wrench Repair", paths: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"] },
  // Data & AI
  { name: "Layers", label: "Layers Stack", paths: ["M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"] },
  { name: "GitBranch", label: "Version Control", paths: ["M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 9a9 9 0 0 1-9 9"] },
  // Support & Communication
  { name: "MessageSquare", label: "Chat Support", paths: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"] },
  { name: "Mail", label: "Email", paths: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"] },
  { name: "Phone", label: "Phone", paths: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"] },
  { name: "Headphones", label: "Support Help", paths: ["M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"] },
  // Process & Workflow
  { name: "CheckCircle", label: "Done Success", paths: ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4L12 14.01l-3-3"] },
  { name: "Repeat", label: "Automation Loop", paths: ["M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"] },
  { name: "RefreshCw", label: "Refresh Update", paths: ["M23 4v6h-6M1 20v-6h6", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"] },
  // Design & Creative
  { name: "Image", label: "Image Media", paths: ["M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z", "M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z", "M21 15l-5-5L5 21"] },
  // Finance & Commerce
  { name: "Package", label: "Product Package", paths: ["M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", "M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"] },
  // Misc
  { name: "Rocket", label: "Launch Startup", paths: ["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"] },
  { name: "Search", label: "Search Find", paths: ["M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z", "M16 16l4.5 4.5"] },
  { name: "Eye", label: "View Monitor", paths: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"] },
  { name: "BookOpen", label: "Knowledge Docs", paths: ["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"] },
  { name: "FileText", label: "Document Report", paths: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6M16 13H8M16 17H8M10 9H8"] },
  { name: "Link", label: "Link Connect", paths: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"] },
  { name: "Heart", label: "Care Values", paths: ["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"] },
  { name: "Compass", label: "Direction Strategy", paths: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"] },
  { name: "Sun", label: "Vision Bright", paths: ["M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42", "M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z"] },
  { name: "Clock", label: "Time Schedule", paths: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M12 6v6l4 2"] },
  { name: "Calendar", label: "Planning Events", paths: ["M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z", "M16 2v4M8 2v4M3 10h18"] },
  { name: "Map", label: "Map Location", paths: ["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"] },
  { name: "MapPin", label: "Location Pin", paths: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"] },
  { name: "DollarSign", label: "Finance Cost", paths: ["M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"] },
  { name: "Share2", label: "Share", paths: ["M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"] },
];

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10, padding: "10px 14px",
  fontSize: 14, color: "#e2e8f0", outline: "none",
};

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = ICON_CATALOG.find(ic => ic.name === value);
  const filtered = search
    ? ICON_CATALOG.filter(ic => ic.label.toLowerCase().includes(search.toLowerCase()) || ic.name.toLowerCase().includes(search.toLowerCase()))
    : ICON_CATALOG;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          ...inputStyle,
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          textAlign: "left",
          border: open ? "1px solid rgba(4,188,235,0.45)" : "1px solid rgba(4,188,235,0.2)",
        }}
      >
        {selected ? (
          <>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#04BCEB" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              {selected.paths.map((d, i) => <path key={i} d={d} />)}
            </svg>
            <span style={{ color: "#e2e8f0", fontSize: 13 }}>{selected.label}</span>
            <span style={{ marginLeft: "auto", color: "#475569", fontSize: 11 }}>{selected.name}</span>
          </>
        ) : (
          <span style={{ color: "#475569", fontSize: 13 }}>— Click to choose an icon —</span>
        )}
        <span style={{ marginLeft: selected ? 0 : "auto", color: "#475569", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 999,
          background: "#061329", border: "1px solid rgba(4,188,235,0.25)", borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.7)", overflow: "hidden",
        }}>
          <div style={{ padding: "12px 12px 8px" }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search icons…"
              style={{ ...inputStyle, fontSize: 13, padding: "8px 12px" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 4, padding: "4px 12px 12px", maxHeight: 300, overflowY: "auto" }}>
            {filtered.map(ic => {
              const isActive = ic.name === value;
              return (
                <button
                  key={ic.name}
                  type="button"
                  onClick={() => { onChange(ic.name); setOpen(false); setSearch(""); }}
                  title={ic.label}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                    padding: "10px 6px", borderRadius: 10, cursor: "pointer",
                    background: isActive ? "rgba(4,188,235,0.15)" : "transparent",
                    border: isActive ? "1px solid rgba(4,188,235,0.4)" : "1px solid transparent",
                    color: isActive ? "#04BCEB" : "#64748b",
                    transition: "all 0.12s",
                  }}
                >
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    {ic.paths.map((d, i) => <path key={i} d={d} />)}
                  </svg>
                  <span style={{ fontSize: 9, textAlign: "center", lineHeight: 1.3, maxWidth: 68, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ic.label}</span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#475569", fontSize: 13, padding: "24px 0" }}>No icons found</div>
            )}
          </div>
          {value && (
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 12px" }}>
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 12 }}
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
