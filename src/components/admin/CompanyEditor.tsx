"use client";

import { useState, useEffect } from "react";
import { IconPicker } from "./IconPicker";

/* ── tiny helpers ── */
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10, padding: "10px 14px",
  fontSize: 14, color: "#e2e8f0", outline: "none",
};
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: 90, resize: "vertical" };
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: "#94a3b8", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" };
const sectionStyle: React.CSSProperties = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 16, padding: "24px 28px", marginBottom: 24 };
const sectionTitle: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: "0 0 20px", paddingBottom: 12, borderBottom: "1px solid rgba(4, 188, 235, 0.12)" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} style={{
      padding: "12px 28px", borderRadius: 10, border: "none",
      background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)",
      color: "#fff", fontWeight: 700, fontSize: 14,
      cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1,
      boxShadow: "0 4px 20px rgba(4, 188, 235, 0.3)",
    }}>
      {saving ? "Saving…" : "Save Changes"}
    </button>
  );
}

export default function CompanyEditor() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/admin/company").then(r => r.json()).then(setData);
  }, []);

  function set(path: string, value: unknown) {
    setData(prev => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cur: any = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setArr(path: string, arr: any[]) { set(path, arr); }

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setToast("✅ Saved successfully!");
        setTimeout(() => setToast(""), 3000);
      } else {
        setToast("❌ Save failed. Please try again.");
        setTimeout(() => setToast(""), 4000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!data) return <div style={{ color: "#64748b", padding: 40, textAlign: "center" }}>Loading company data…</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = data as any;

  return (
    <div>
      {/* Header */}
      <div className="admin-header-row" style={{ marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f0f9ff", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Company Information</h1>
          <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>Edit all public-facing company details, contact info, and page copy.</p>
        </div>
        <SaveBtn saving={saving} onClick={save} />
      </div>

      {toast && (
        <div style={{ padding: "12px 18px", borderRadius: 10, background: toast.startsWith("✅") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${toast.startsWith("✅") ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, color: toast.startsWith("✅") ? "#34d399" : "#f87171", marginBottom: 20, fontSize: 14 }}>
          {toast}
        </div>
      )}

      {/* ── Identity ── */}
      <div style={sectionStyle}>
        <p style={sectionTitle}>Brand Identity</p>
        <div className="admin-responsive-grid-2">
          <Field label="Legal Name"><input style={inputStyle} value={d.legalName ?? ""} onChange={e => set("legalName", e.target.value)} /></Field>
          <Field label="Short Name"><input style={inputStyle} value={d.shortName ?? ""} onChange={e => set("shortName", e.target.value)} /></Field>
          <Field label="Tagline"><input style={inputStyle} value={d.tagline ?? ""} onChange={e => set("tagline", e.target.value)} /></Field>
          <Field label="Hero Label"><input style={inputStyle} value={d.heroLabel ?? ""} onChange={e => set("heroLabel", e.target.value)} /></Field>
          <Field label="Trust Statement"><input style={inputStyle} value={d.trustStatement ?? ""} onChange={e => set("trustStatement", e.target.value)} /></Field>
          <Field label="Registration"><input style={inputStyle} value={d.registration ?? ""} onChange={e => set("registration", e.target.value)} /></Field>
        </div>
        <Field label="Mission Statement">
          <textarea style={textareaStyle} value={d.missionStatement ?? ""} onChange={e => set("missionStatement", e.target.value)} />
        </Field>
        <Field label="Logo URL (optional — paste image URL or /uploads/... path)">
          <input style={inputStyle} value={d.logoUrl ?? ""} onChange={e => set("logoUrl", e.target.value)} placeholder="e.g. /logo.png or https://..." />
          {d.logoUrl && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.logoUrl} alt="Logo preview" style={{ height: 48, maxWidth: 160, objectFit: "contain", borderRadius: 6, background: "rgba(255,255,255,0.04)", padding: 4, border: "1px solid rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: 11, color: "#475569" }}>Preview</span>
            </div>
          )}
        </Field>
      </div>

      {/* ── Contact ── */}
      <div style={sectionStyle}>
        <p style={sectionTitle}>Contact Information</p>
        <div className="admin-responsive-grid-2">
          <Field label="Official Email"><input style={inputStyle} value={d.contactConfig?.officialEmail ?? ""} onChange={e => set("contactConfig.officialEmail", e.target.value)} /></Field>
          <Field label="Phone"><input style={inputStyle} value={d.contactConfig?.phone ?? ""} onChange={e => set("contactConfig.phone", e.target.value)} /></Field>
          <Field label="Email Link"><input style={inputStyle} value={d.contactConfig?.emailLink ?? ""} onChange={e => set("contactConfig.emailLink", e.target.value)} /></Field>
          <Field label="Phone Link"><input style={inputStyle} value={d.contactConfig?.phoneLink ?? ""} onChange={e => set("contactConfig.phoneLink", e.target.value)} /></Field>
          <Field label="Office Location"><input style={inputStyle} value={d.contactConfig?.officeLocation ?? ""} onChange={e => set("contactConfig.officeLocation", e.target.value)} /></Field>
        </div>
        <p style={{ ...sectionTitle, fontSize: 13, marginTop: 8 }}>Social Links</p>
        <div className="admin-responsive-grid-2">
          {["linkedin", "github", "twitter", "facebook"].map(platform => (
            <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
              <input style={inputStyle} value={d.contactConfig?.socialLinks?.[platform] ?? ""} onChange={e => set(`contactConfig.socialLinks.${platform}`, e.target.value)} />
            </Field>
          ))}
        </div>
      </div>

      {/* ── Principles ── */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <p style={{ ...sectionTitle, margin: 0, border: "none", paddingBottom: 0 }}>Core Principles</p>
          <button onClick={() => setArr("principles", [...(d.principles ?? []), { title: "", description: "", iconName: "" }])} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(4,188,235,0.35)", background: "rgba(4,188,235,0.05)", color: "#04BCEB", cursor: "pointer", fontWeight: 500 }}>+ Add</button>
        </div>
        {(d.principles ?? []).map((p: Record<string, string>, i: number) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 16, marginBottom: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Principle {i + 1}</span>
              <button onClick={() => setArr("principles", d.principles.filter((_: unknown, j: number) => j !== i))} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 7, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer" }}>Remove</button>
            </div>
            <div className="admin-responsive-grid-2" style={{ marginBottom: 10 }}>
              <Field label={`Title ${i + 1}`}><input style={inputStyle} value={p.title ?? ""} onChange={e => { const arr = [...d.principles]; arr[i] = { ...arr[i], title: e.target.value }; setArr("principles", arr); }} /></Field>
              <Field label="Description"><input style={inputStyle} value={p.description ?? ""} onChange={e => { const arr = [...d.principles]; arr[i] = { ...arr[i], description: e.target.value }; setArr("principles", arr); }} /></Field>
            </div>
            <Field label="Icon">
              <IconPicker value={p.iconName ?? ""} onChange={v => { const arr = [...d.principles]; arr[i] = { ...arr[i], iconName: v }; setArr("principles", arr); }} />
            </Field>
            <Field label="Image URL (optional)">
              <input style={inputStyle} value={p.imageUrl ?? ""} onChange={e => { const arr = [...d.principles]; arr[i] = { ...arr[i], imageUrl: e.target.value }; setArr("principles", arr); }} placeholder="/uploads/... or https://..." />
            </Field>
          </div>
        ))}
      </div>

      {/* ── Why Choose Us ── */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <p style={{ ...sectionTitle, margin: 0, border: "none", paddingBottom: 0 }}>Why Choose Us</p>
          <button onClick={() => setArr("whyChooseUs", [...(d.whyChooseUs ?? []), { title: "", description: "", iconName: "" }])} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(4,188,235,0.35)", background: "rgba(4,188,235,0.05)", color: "#04BCEB", cursor: "pointer", fontWeight: 500 }}>+ Add</button>
        </div>
        {(d.whyChooseUs ?? []).map((item: Record<string, string>, i: number) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 16, marginBottom: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Item {i + 1}</span>
              <button onClick={() => setArr("whyChooseUs", d.whyChooseUs.filter((_: unknown, j: number) => j !== i))} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 7, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer" }}>Remove</button>
            </div>
            <div className="admin-responsive-grid-2" style={{ marginBottom: 10 }}>
              <Field label={`Title ${i + 1}`}><input style={inputStyle} value={item.title ?? ""} onChange={e => { const arr = [...d.whyChooseUs]; arr[i] = { ...arr[i], title: e.target.value }; setArr("whyChooseUs", arr); }} /></Field>
              <Field label="Description"><input style={inputStyle} value={item.description ?? ""} onChange={e => { const arr = [...d.whyChooseUs]; arr[i] = { ...arr[i], description: e.target.value }; setArr("whyChooseUs", arr); }} /></Field>
            </div>
            <Field label="Icon">
              <IconPicker value={item.iconName ?? ""} onChange={v => { const arr = [...d.whyChooseUs]; arr[i] = { ...arr[i], iconName: v }; setArr("whyChooseUs", arr); }} />
            </Field>
            <Field label="Image URL (optional)">
              <input style={inputStyle} value={item.imageUrl ?? ""} onChange={e => { const arr = [...d.whyChooseUs]; arr[i] = { ...arr[i], imageUrl: e.target.value }; setArr("whyChooseUs", arr); }} placeholder="/uploads/... or https://..." />
            </Field>
          </div>
        ))}
      </div>

      {/* ── Approach Steps ── */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <p style={{ ...sectionTitle, margin: 0, border: "none", paddingBottom: 0 }}>Approach Steps (Process)</p>
          <button onClick={() => setArr("approachSteps", [...(d.approachSteps ?? []), { step: "", title: "", tagline: "", description: "", iconName: "" }])} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(4,188,235,0.35)", background: "rgba(4,188,235,0.05)", color: "#04BCEB", cursor: "pointer", fontWeight: 500 }}>+ Add</button>
        </div>
        {(d.approachSteps ?? []).map((step: Record<string, string>, i: number) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: "16px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Step {i + 1}</span>
              <button onClick={() => setArr("approachSteps", d.approachSteps.filter((_: unknown, j: number) => j !== i))} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 7, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer" }}>Remove</button>
            </div>
            <div className="admin-responsive-grid-3" style={{ marginBottom: 10 }}>
              <Field label="Step No."><input style={inputStyle} value={step.step ?? ""} onChange={e => { const arr = [...d.approachSteps]; arr[i] = { ...arr[i], step: e.target.value }; setArr("approachSteps", arr); }} /></Field>
              <Field label="Title"><input style={inputStyle} value={step.title ?? ""} onChange={e => { const arr = [...d.approachSteps]; arr[i] = { ...arr[i], title: e.target.value }; setArr("approachSteps", arr); }} /></Field>
              <Field label="Tagline"><input style={inputStyle} value={step.tagline ?? ""} onChange={e => { const arr = [...d.approachSteps]; arr[i] = { ...arr[i], tagline: e.target.value }; setArr("approachSteps", arr); }} /></Field>
            </div>
            <Field label="Icon">
              <IconPicker value={step.iconName ?? ""} onChange={v => { const arr = [...d.approachSteps]; arr[i] = { ...arr[i], iconName: v }; setArr("approachSteps", arr); }} />
            </Field>
            <Field label="Image URL (optional)">
              <input style={inputStyle} value={step.imageUrl ?? ""} onChange={e => { const arr = [...d.approachSteps]; arr[i] = { ...arr[i], imageUrl: e.target.value }; setArr("approachSteps", arr); }} placeholder="/uploads/... or https://..." />
            </Field>
            <Field label="Description"><textarea style={textareaStyle} value={step.description ?? ""} onChange={e => { const arr = [...d.approachSteps]; arr[i] = { ...arr[i], description: e.target.value }; setArr("approachSteps", arr); }} /></Field>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}
