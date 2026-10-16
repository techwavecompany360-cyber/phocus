"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Background glow orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={styles.card} className="admin-login-card">
        {/* Logo area */}
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>
            <Image src="/logo.png" alt="PhocieXpert Logo" width={48} height={48} style={{ objectFit: "contain", width: 48, height: 48 }} />
          </div>
          <div>
            <h1 style={styles.logoTitle}>Phocie<span style={{ color: "#04BCEB" }}>Xpert</span></h1>
            <p style={styles.logoSub}>Admin Portal</p>
          </div>
        </div>

        <h2 style={styles.heading}>Welcome back</h2>
        <p style={styles.subheading}>Sign in to manage your website content</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="admin-email">Email address</label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="info@phociexperttechnologies.co.tz"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={styles.footer}>
          PhocieXpert Technologies Company Limited &copy; 2026
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #061329 0%, #043279 60%, #061329 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  orb1: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(4,188,235,0.12) 0%, transparent 70%)",
    top: -150,
    left: -100,
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(11,90,170,0.15) 0%, transparent 70%)",
    bottom: -100,
    right: -80,
    pointerEvents: "none",
  },
  card: {
    background: "rgba(6, 19, 41, 0.75)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(4, 188, 235, 0.22)",
    borderRadius: 20,
    padding: "48px 44px",
    width: "100%",
    maxWidth: 440,
    position: "relative",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(4,188,235,0.1)",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 14,
    background: "rgba(6, 19, 41, 0.8)",
    border: "1px solid rgba(4, 188, 235, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: 6,
  },
  logoTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#f0f9ff",
    letterSpacing: "-0.02em",
  },
  logoSub: {
    margin: 0,
    fontSize: 12,
    color: "#64748b",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0 0 6px",
    fontSize: 26,
    fontWeight: 700,
    color: "#f0f9ff",
    letterSpacing: "-0.02em",
  },
  subheading: {
    margin: "0 0 32px",
    fontSize: 14,
    color: "#64748b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#94a3b8",
    letterSpacing: "0.01em",
  },
  input: {
    background: "rgba(6, 19, 41, 0.6)",
    border: "1px solid rgba(4, 188, 235, 0.2)",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 14,
    color: "#f0f9ff",
    outline: "none",
    transition: "border-color 0.2s",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    background: "rgba(248,113,113,0.08)",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: 10,
    fontSize: 13,
    color: "#f87171",
  },
  btn: {
    padding: "14px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    boxShadow: "0 4px 20px rgba(4, 188, 235, 0.35)",
    transition: "opacity 0.2s, transform 0.1s",
    marginTop: 4,
  },
  footer: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 12,
    color: "#64748b",
  },
};
