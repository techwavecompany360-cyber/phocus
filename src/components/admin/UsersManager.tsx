"use client";

import { useState, useEffect, useCallback } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10, padding: "10px 14px",
  fontSize: 14, color: "#e2e8f0", outline: "none",
};
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: "#94a3b8", marginBottom: 5, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" };

interface AdminUserItem { _id: string; email: string; name: string; role: string; createdAt: string; }

export default function UsersManager() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", password: "", role: "editor" });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => { fetch("/api/admin/users").then(r => r.json()).then(d => { if (Array.isArray(d)) setUsers(d); }); }, []);
  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3500); }

  async function createUser() {
    if (!form.email || !form.password || !form.name) { showToast("❌ All fields required."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { showToast("✅ User created!"); setShowForm(false); setForm({ email: "", name: "", password: "", role: "editor" }); load(); }
      else { const d = await res.json(); showToast(`❌ ${d.error ?? "Failed"}`); }
    } finally { setSaving(false); }
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this admin user?")) return;
    setDeleting(id);
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    load(); setDeleting(null);
  }

  return (
    <div>
      <div className="admin-header-row" style={{ marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f0f9ff", margin: "0 0 4px" }}>Admin Users</h1>
          <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>Manage who has access to this admin panel.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)" }}>+ New User</button>
      </div>

      {toast && <div style={{ padding: "10px 16px", borderRadius: 10, background: toast.startsWith("✅") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${toast.startsWith("✅") ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, color: toast.startsWith("✅") ? "#34d399" : "#f87171", marginBottom: 16, fontSize: 13 }}>{toast}</div>}

      {showForm && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(4, 188, 235, 0.25)", borderRadius: 16, padding: "20px 20px", marginBottom: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: "0 0 20px", paddingBottom: 12, borderBottom: "1px solid rgba(4, 188, 235, 0.12)" }}>Create New Admin User</p>
          <div className="admin-responsive-grid-2" style={{ gap: 16 }}>
            <div><label style={labelStyle}>Full Name</label><input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" /></div>
            <div><label style={labelStyle}>Email Address</label><input style={inputStyle} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="admin@example.com" /></div>
            <div><label style={labelStyle}>Password</label><input style={inputStyle} type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Set initial password" /></div>
            <div>
              <label style={labelStyle}>Role</label>
              <select style={{ ...inputStyle }} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                <option value="editor">Editor</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={createUser} disabled={saving} style={{ padding: "11px 24px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", color: "#fff", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Creating…" : "Create User"}</button>
            <button onClick={() => setShowForm(false)} style={{ padding: "11px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {users.map(user => (
          <div key={user._id} className="admin-list-card" style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 14, padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 16, flexShrink: 0 }}>
                {user.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", wordBreak: "break-word" }}>{user.name}</div>
                <div style={{ fontSize: 12, color: "#64748b", wordBreak: "break-all" }}>{user.email}</div>
              </div>
            </div>
            <div className="admin-card-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: user.role === "superadmin" ? "rgba(251,146,60,0.12)" : "rgba(4, 188, 235, 0.12)", color: user.role === "superadmin" ? "#fb923c" : "#04BCEB", border: `1px solid ${user.role === "superadmin" ? "rgba(251,146,60,0.3)" : "rgba(4, 188, 235, 0.25)"}`, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                {user.role}
              </span>
              <button onClick={() => deleteUser(user._id)} disabled={deleting === user._id} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 13, flex: "none" }}>
                {deleting === user._id ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
