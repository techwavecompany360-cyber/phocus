"use client";

import { useState, useEffect, useCallback } from "react";
import { IconPicker } from "./IconPicker";

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(6, 19, 41, 0.6)",
  border: "1px solid rgba(4, 188, 235, 0.2)",
  borderRadius: 10, padding: "10px 14px",
  fontSize: 14, color: "#e2e8f0", outline: "none",
};
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: 80, resize: "vertical" };
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: "#94a3b8", marginBottom: 5, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 14 }}><label style={labelStyle}>{label}</label>{children}</div>;
}

function TagList({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  function add() {
    const v = input.trim();
    if (v && !items.includes(v)) { onChange([...items, v]); setInput(""); }
  }
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        {items.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(4, 188, 235, 0.1)", border: "1px solid rgba(4, 188, 235, 0.25)", borderRadius: 6, padding: "3px 10px", fontSize: 12, color: "#04BCEB" }}>
            {t}
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input style={{ ...inputStyle, flex: 1 }} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())} placeholder={placeholder ?? "Type and press Enter or Add"} />
        <button onClick={add} style={{ padding: "0 14px", borderRadius: 9, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Add</button>
      </div>
    </div>
  );
}

/* ────────── SERVICES MANAGER ────────── */
interface ServiceItem { _id: string; id: string; slug: string; title: string; category: string; shortDescription: string; fullDescription: string; iconName: string; imageUrl?: string; capabilities: string[]; features: string[]; deliverables: string[]; }

function emptyService(): Omit<ServiceItem, "_id"> {
  return { id: "", slug: "", title: "", category: "", shortDescription: "", fullDescription: "", iconName: "", imageUrl: "", capabilities: [], features: [], deliverables: [] };
}

export function ServicesManager() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [editing, setEditing] = useState<(ServiceItem | Omit<ServiceItem, "_id">) | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/admin/services").then(r => r.json()).then(setItems);
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3500); }

  async function saveItem() {
    if (!editing) return;
    setSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = editing as any;
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/admin/services" : `/api/admin/services/${e._id}`;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      if (res.ok) { showToast("✅ Service saved!"); setEditing(null); load(); }
      else showToast("❌ Save failed.");
    } finally { setSaving(false); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this service?")) return;
    setDeleting(id);
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    load(); setDeleting(null);
  }

  if (editing) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = editing as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upd = (key: string, val: unknown) => setEditing(prev => (prev ? ({ ...prev, [key]: val } as any) : null));
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <button onClick={() => setEditing(null)} style={{ background: "none", border: "1px solid rgba(4,188,235,0.2)", color: "#94a3b8", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f0f9ff" }}>{isNew ? "New Service" : `Edit: ${e.title || "Untitled"}`}</h2>
          <button onClick={saveItem} disabled={saving} style={{ marginLeft: "auto", padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : "Save"}</button>
        </div>
        {toast && <div style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", marginBottom: 16, fontSize: 13 }}>{toast}</div>}
        <div style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.18)", borderRadius: 16, padding: "20px 22px" }}>
          <div className="admin-responsive-grid-2">
            <Field label="ID (slug-like)"><input style={inputStyle} value={e.id ?? ""} onChange={ev => upd("id", ev.target.value)} /></Field>
            <Field label="Slug"><input style={inputStyle} value={e.slug ?? ""} onChange={ev => upd("slug", ev.target.value)} /></Field>
            <Field label="Title"><input style={inputStyle} value={e.title ?? ""} onChange={ev => upd("title", ev.target.value)} /></Field>
            <Field label="Category"><input style={inputStyle} value={e.category ?? ""} onChange={ev => upd("category", ev.target.value)} /></Field>
          </div>
          <Field label="Icon">
            <IconPicker value={e.iconName ?? ""} onChange={v => upd("iconName", v)} />
          </Field>
          <Field label="Image URL (optional — shown as service cover image)">
            <input style={inputStyle} value={e.imageUrl ?? ""} onChange={ev => upd("imageUrl", ev.target.value)} placeholder="/uploads/... or https://..." />
            {e.imageUrl && (
              <div style={{ marginTop: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.imageUrl} alt="preview" style={{ height: 60, maxWidth: 200, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            )}
          </Field>
          <Field label="Short Description"><textarea style={textareaStyle} value={e.shortDescription ?? ""} onChange={ev => upd("shortDescription", ev.target.value)} /></Field>
          <Field label="Full Description"><textarea style={{ ...textareaStyle, minHeight: 120 }} value={e.fullDescription ?? ""} onChange={ev => upd("fullDescription", ev.target.value)} /></Field>
          <Field label="Capabilities"><TagList items={e.capabilities ?? []} onChange={v => upd("capabilities", v)} placeholder="Add capability…" /></Field>
          <Field label="Features"><TagList items={e.features ?? []} onChange={v => upd("features", v)} placeholder="Add feature…" /></Field>
          <Field label="Deliverables"><TagList items={e.deliverables ?? []} onChange={v => upd("deliverables", v)} placeholder="Add deliverable…" /></Field>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f0f9ff", margin: "0 0 4px" }}>Services</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{items.length} services listed</p>
        </div>
        <button onClick={() => { setEditing(emptyService()); setIsNew(true); }} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>+ New Service</button>
      </div>
      {toast && <div style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", marginBottom: 16, fontSize: 13 }}>{toast}</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {items.map(item => (
          <div key={item._id} className="admin-list-card" style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{item.category} · {item.slug}</div>
            </div>
            <div className="admin-card-actions" style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setEditing(item); setIsNew(false); }} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Edit</button>
              <button onClick={() => deleteItem(item._id)} disabled={deleting === item._id} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 13 }}>{deleting === item._id ? "…" : "Delete"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────── SOLUTIONS MANAGER ────────── */
interface SolutionItem { _id: string; id: string; title: string; tagline: string; description: string; iconName: string; imageUrl?: string; challengesAddressed: string[]; capabilitiesIncluded: string[]; typicalOutcomes: string[]; }

function emptySolution(): Omit<SolutionItem, "_id"> {
  return { id: "", title: "", tagline: "", description: "", iconName: "", imageUrl: "", challengesAddressed: [], capabilitiesIncluded: [], typicalOutcomes: [] };
}

export function SolutionsManager() {
  const [items, setItems] = useState<SolutionItem[]>([]);
  const [editing, setEditing] = useState<(SolutionItem | Omit<SolutionItem, "_id">) | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => { fetch("/api/admin/solutions").then(r => r.json()).then(setItems); }, []);
  useEffect(() => { load(); }, [load]);
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3500); }

  async function saveItem() {
    if (!editing) return;
    setSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = editing as any;
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/admin/solutions" : `/api/admin/solutions/${e._id}`;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      if (res.ok) { showToast("✅ Solution saved!"); setEditing(null); load(); }
      else showToast("❌ Save failed.");
    } finally { setSaving(false); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this solution?")) return;
    setDeleting(id);
    await fetch(`/api/admin/solutions/${id}`, { method: "DELETE" });
    load(); setDeleting(null);
  }

  if (editing) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = editing as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upd = (key: string, val: unknown) => setEditing(prev => (prev ? ({ ...prev, [key]: val } as any) : null));
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <button onClick={() => setEditing(null)} style={{ background: "none", border: "1px solid rgba(4,188,235,0.2)", color: "#94a3b8", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f0f9ff" }}>{isNew ? "New Solution" : `Edit: ${e.title || "Untitled"}`}</h2>
          <button onClick={saveItem} disabled={saving} style={{ marginLeft: "auto", padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : "Save"}</button>
        </div>
        <div style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.18)", borderRadius: 16, padding: "20px 22px" }}>
          <div className="admin-responsive-grid-2">
            <Field label="ID"><input style={inputStyle} value={e.id ?? ""} onChange={ev => upd("id", ev.target.value)} /></Field>
            <Field label="Title"><input style={inputStyle} value={e.title ?? ""} onChange={ev => upd("title", ev.target.value)} /></Field>
            <Field label="Tagline"><input style={inputStyle} value={e.tagline ?? ""} onChange={ev => upd("tagline", ev.target.value)} /></Field>
          </div>
          <Field label="Icon">
            <IconPicker value={e.iconName ?? ""} onChange={v => upd("iconName", v)} />
          </Field>
          <Field label="Image URL (optional — shown as solution cover image)">
            <input style={inputStyle} value={e.imageUrl ?? ""} onChange={ev => upd("imageUrl", ev.target.value)} placeholder="/uploads/... or https://..." />
            {e.imageUrl && (
              <div style={{ marginTop: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.imageUrl} alt="preview" style={{ height: 60, maxWidth: 200, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            )}
          </Field>
          <Field label="Description"><textarea style={{ ...textareaStyle, minHeight: 100 }} value={e.description ?? ""} onChange={ev => upd("description", ev.target.value)} /></Field>
          <Field label="Challenges Addressed"><TagList items={e.challengesAddressed ?? []} onChange={v => upd("challengesAddressed", v)} placeholder="Add challenge…" /></Field>
          <Field label="Capabilities Included"><TagList items={e.capabilitiesIncluded ?? []} onChange={v => upd("capabilitiesIncluded", v)} placeholder="Add capability…" /></Field>
          <Field label="Typical Outcomes"><TagList items={e.typicalOutcomes ?? []} onChange={v => upd("typicalOutcomes", v)} placeholder="Add outcome…" /></Field>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f0f9ff", margin: "0 0 4px" }}>Solutions</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{items.length} solutions listed</p>
        </div>
        <button onClick={() => { setEditing(emptySolution()); setIsNew(true); }} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>+ New Solution</button>
      </div>
      {toast && <div style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", marginBottom: 16, fontSize: 13 }}>{toast}</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {items.map(item => (
          <div key={item._id} className="admin-list-card" style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{item.tagline}</div>
            </div>
            <div className="admin-card-actions" style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setEditing(item); setIsNew(false); }} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Edit</button>
              <button onClick={() => deleteItem(item._id)} disabled={deleting === item._id} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 13 }}>{deleting === item._id ? "…" : "Delete"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────── PROJECTS MANAGER ────────── */
interface ProjectItem { _id: string; id: string; title: string; category: string; badge: string; isConceptual: boolean; shortDescription: string; technologies: string[]; scope: string; architectureHighlight: string; gradient: string; }

function emptyProject(): Omit<ProjectItem, "_id"> {
  return { id: "", title: "", category: "Web Applications", badge: "", isConceptual: true, shortDescription: "", technologies: [], scope: "", architectureHighlight: "", gradient: "from-blue-900 to-cyan-900" };
}

const CATEGORIES = ["Web Applications", "Mobile Solutions", "AI & Data", "IoT & Embedded Systems", "Cloud & Infrastructure", "Interactive Experiences"];

export function ProjectsManager() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [editing, setEditing] = useState<(ProjectItem | Omit<ProjectItem, "_id">) | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => { fetch("/api/admin/projects").then(r => r.json()).then(setItems); }, []);
  useEffect(() => { load(); }, [load]);
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3500); }

  async function saveItem() {
    if (!editing) return;
    setSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = editing as any;
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${e._id}`;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      if (res.ok) { showToast("✅ Project saved!"); setEditing(null); load(); }
      else showToast("❌ Save failed.");
    } finally { setSaving(false); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load(); setDeleting(null);
  }

  if (editing) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = editing as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upd = (key: string, val: unknown) => setEditing(prev => (prev ? ({ ...prev, [key]: val } as any) : null));
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <button onClick={() => setEditing(null)} style={{ background: "none", border: "1px solid rgba(4,188,235,0.2)", color: "#94a3b8", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f0f9ff" }}>{isNew ? "New Project" : `Edit: ${e.title || "Untitled"}`}</h2>
          <button onClick={saveItem} disabled={saving} style={{ marginLeft: "auto", padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : "Save"}</button>
        </div>
        <div style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.18)", borderRadius: 16, padding: "20px 22px" }}>
          <div className="admin-responsive-grid-2">
            <Field label="ID"><input style={inputStyle} value={e.id ?? ""} onChange={ev => upd("id", ev.target.value)} /></Field>
            <Field label="Title"><input style={inputStyle} value={e.title ?? ""} onChange={ev => upd("title", ev.target.value)} /></Field>
            <Field label="Category">
              <select style={{ ...inputStyle }} value={e.category ?? ""} onChange={ev => upd("category", ev.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Badge"><input style={inputStyle} value={e.badge ?? ""} onChange={ev => upd("badge", ev.target.value)} /></Field>
            <Field label="Gradient (CSS class suffix)"><input style={inputStyle} value={e.gradient ?? ""} onChange={ev => upd("gradient", ev.target.value)} placeholder="from-blue-900 to-cyan-900" /></Field>
            <Field label="Is Conceptual?">
              <select style={{ ...inputStyle }} value={e.isConceptual ? "true" : "false"} onChange={ev => upd("isConceptual", ev.target.value === "true")}>
                <option value="true">Yes – Conceptual Project</option>
                <option value="false">No – Live / Real Project</option>
              </select>
            </Field>
          </div>
          <Field label="Short Description"><textarea style={textareaStyle} value={e.shortDescription ?? ""} onChange={ev => upd("shortDescription", ev.target.value)} /></Field>
          <Field label="Scope"><textarea style={textareaStyle} value={e.scope ?? ""} onChange={ev => upd("scope", ev.target.value)} /></Field>
          <Field label="Architecture Highlight"><textarea style={textareaStyle} value={e.architectureHighlight ?? ""} onChange={ev => upd("architectureHighlight", ev.target.value)} /></Field>
          <Field label="Technologies"><TagList items={e.technologies ?? []} onChange={v => upd("technologies", v)} placeholder="Add technology…" /></Field>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f0f9ff", margin: "0 0 4px" }}>Projects</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{items.length} projects in portfolio</p>
        </div>
        <button onClick={() => { setEditing(emptyProject()); setIsNew(true); }} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>+ New Project</button>
      </div>
      {toast && <div style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", marginBottom: 16, fontSize: 13 }}>{toast}</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {items.map(item => (
          <div key={item._id} className="admin-list-card" style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{item.category} · {item.isConceptual ? "Conceptual" : "Live"}</div>
            </div>
            <div className="admin-card-actions" style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setEditing(item); setIsNew(false); }} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Edit</button>
              <button onClick={() => deleteItem(item._id)} disabled={deleting === item._id} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 13 }}>{deleting === item._id ? "…" : "Delete"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
