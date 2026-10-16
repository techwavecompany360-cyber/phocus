"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type jsPDFType from "jspdf";

/* ── Types ── */
interface LineItem { description: string; qty: number; unitPrice: number; }
interface InvoiceData {
  _id?: string;
  invoiceNumber: string;
  type: "invoice" | "proforma";
  status: "draft" | "sent" | "paid" | "cancelled";
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  lineItems: LineItem[];
  vatEnabled: boolean;
  vatRate: number;
  paymentDetails: string;
  termsAndConditions: string;
  notes: string;
}

/* ── Styles ── */
const inp: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(6, 19, 41, 0.6)", border: "1px solid rgba(4, 188, 235, 0.2)",
  borderRadius: 9, padding: "9px 13px", fontSize: 13, color: "#e2e8f0", outline: "none",
};
const ta: React.CSSProperties = { ...inp, minHeight: 80, resize: "vertical" };
const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 5, display: "block", textTransform: "uppercase", letterSpacing: "0.06em" };
const sec: React.CSSProperties = { background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.18)", borderRadius: 14, padding: "22px 24px", marginBottom: 20 };
const secH: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#94a3b8", margin: "0 0 18px", textTransform: "uppercase", letterSpacing: "0.07em", paddingBottom: 12, borderBottom: "1px solid rgba(4, 188, 235, 0.12)" };

function F({ label, children, span }: { label: string; children: React.ReactNode; span?: number }) {
  return <div style={{ gridColumn: span ? `span ${span}` : undefined, marginBottom: 14 }}><label style={lbl}>{label}</label>{children}</div>;
}

/* ── Helpers ── */
function calcTotals(items: LineItem[], vatEnabled: boolean, vatRate: number) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const vatAmount = vatEnabled ? subtotal * (vatRate / 100) : 0;
  const total = subtotal + vatAmount;
  return { subtotal, vatAmount, total };
}

function fmt(n: number) { return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function todayStr() { return new Date().toISOString().slice(0, 10); }
function nextMonthStr() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toISOString().slice(0, 10);
}

function emptyInvoice(): Omit<InvoiceData, "_id"> {
  return {
    invoiceNumber: "",
    type: "invoice",
    status: "draft",
    issueDate: todayStr(),
    dueDate: nextMonthStr(),
    customerName: "", customerEmail: "", customerPhone: "",
    customerAddress: "", customerCity: "", customerCountry: "",
    lineItems: [{ description: "", qty: 1, unitPrice: 0 }],
    vatEnabled: true,
    vatRate: 18,
    paymentDetails: "Bank: CRDB Bank Tanzania\nAccount Name: PhocieXpert Technologies Company Limited\nAccount Number: 0150XXXXXXXXX\nBranch: Dar es Salaam",
    termsAndConditions: "1. Payment is due within 30 days of the invoice date.\n2. Late payments may incur a 2% monthly interest charge.\n3. All prices are in Tanzania Shillings (TZS) unless otherwise stated.\n4. Goods/services remain the property of PhocieXpert Technologies until full payment is received.",
    notes: "",
  };
}

/* ═══════════════════════════════════════════════════════════════
   INVOICE PREVIEW (A4 printable area — 794×1123px)
═══════════════════════════════════════════════════════════════ */
function InvoicePreview({ inv }: { inv: InvoiceData }) {
  const { subtotal, vatAmount, total } = calcTotals(inv.lineItems, inv.vatEnabled, inv.vatRate);
  const isProforma = inv.type === "proforma";
  const accentColor = isProforma ? "#6366f1" : "#04BCEB";
  const accentDark  = isProforma ? "#4338ca" : "#0284c7";
  const brandNavy   = "#0a2558";

  const statusWatermark: Record<string, string> = { paid: "PAID", cancelled: "VOID", draft: "DRAFT", sent: "" };
  const watermark = statusWatermark[inv.status] ?? "";

  return (
    <div id="invoice-print-area" style={{
      background: "#ffffff", color: "#1e293b",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      width: 794, minHeight: 1123, boxSizing: "border-box",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
    }}>

      {/* ── Top brand gradient accent bar ── */}
      <div style={{
        height: 7, width: "100%",
        background: isProforma
          ? "linear-gradient(90deg, #6366f1 0%, #4f46e5 45%, #0a2558 100%)"
          : "linear-gradient(90deg, #04BCEB 0%, #0284c7 40%, #0a2558 100%)",
      }} />

      {/* ── Left subtle vertical accent stripe ── */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 5,
        background: isProforma
          ? "linear-gradient(180deg, #6366f1 0%, #4f46e5 50%, #0a2558 100%)"
          : "linear-gradient(180deg, #04BCEB 0%, #0284c7 50%, #0a2558 100%)",
        zIndex: 2,
      }} />

      {/* ── Watermark (PAID / DRAFT / VOID) ── */}
      {watermark && (
        <div style={{
          position: "absolute", top: "38%", left: "50%",
          transform: "translate(-50%, -50%) rotate(-35deg)",
          fontSize: 100, fontWeight: 900, letterSpacing: "0.15em",
          color: inv.status === "paid" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.07)",
          pointerEvents: "none", userSelect: "none", zIndex: 1, whiteSpace: "nowrap",
        }}>{watermark}</div>
      )}

      {/* ══════════ HEADER: CRISP EXECUTIVE LETTERHEAD ══════════ */}
      <div style={{ padding: "26px 46px 18px 52px", background: "#ffffff", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo — rendered seamlessly on clean white canvas */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="PhocieXpert Technologies Company Limited"
              style={{
                height: 74,
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Invoice Type Badge & Number */}
          <div style={{ textAlign: "right" }}>
            <div style={{
              display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 8,
              background: isProforma ? "rgba(99,102,241,0.1)" : "rgba(4,188,235,0.1)",
              border: `1.5px solid ${accentColor}`,
              fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase",
              color: accentDark,
            }}>
              {isProforma ? "Proforma Invoice" : "Invoice"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: brandNavy, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {inv.invoiceNumber || "DRAFT"}
            </div>
          </div>
        </div>

        {/* ── Metadata Strip (Issue Date, Due Date, Status, Currency) ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          background: "#f8fafc", border: "1px solid #e2e8f0", borderTop: `2px solid ${accentColor}`,
          borderRadius: 10, marginTop: 22, overflow: "hidden",
        }}>
          {[
            { label: "Issue Date", value: inv.issueDate || "—" },
            { label: "Due Date",   value: inv.dueDate   || "—" },
            { label: "Status",     value: inv.status.toUpperCase(), isStatus: true },
            { label: "Currency",   value: "TZS (Shillings)" },
          ].map(({ label, value, isStatus }, i) => (
            <div key={label} style={{
              padding: "10px 18px",
              borderRight: i < 3 ? "1px solid #e2e8f0" : "none",
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                {label}
              </div>
              <div style={{
                fontSize: 12.5, fontWeight: 800,
                color: isStatus
                  ? (inv.status === "paid" ? "#059669" : inv.status === "cancelled" ? "#dc2626" : accentDark)
                  : "#0f172a",
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ BILL TO / FROM CARDS ══════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, padding: "8px 46px 18px 52px", position: "relative", zIndex: 2 }}>
        {/* Billed To */}
        <div style={{
          background: "#f8fafc", border: "1px solid #e2e8f0",
          borderLeft: `3.5px solid ${accentColor}`, borderRadius: 10, padding: "16px 20px",
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: accentDark, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 14, height: 2, background: accentColor, borderRadius: 1 }} />
            Billed To
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: brandNavy, marginBottom: 5, lineHeight: 1.2 }}>{inv.customerName || "—"}</div>
          {inv.customerEmail    && <div style={{ fontSize: 11.5, color: "#475569", marginBottom: 2 }}>{inv.customerEmail}</div>}
          {inv.customerPhone    && <div style={{ fontSize: 11.5, color: "#475569", marginBottom: 2 }}>{inv.customerPhone}</div>}
          {inv.customerAddress  && <div style={{ fontSize: 11.5, color: "#64748b", marginBottom: 2 }}>{inv.customerAddress}</div>}
          {(inv.customerCity || inv.customerCountry) && (
            <div style={{ fontSize: 11.5, color: "#64748b" }}>{[inv.customerCity, inv.customerCountry].filter(Boolean).join(", ")}</div>
          )}
        </div>

        {/* Issued By */}
        <div style={{
          background: "#f8fafc", border: "1px solid #e2e8f0",
          borderLeft: `3.5px solid ${brandNavy}`, borderRadius: 10, padding: "16px 20px",
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: brandNavy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 14, height: 2, background: brandNavy, borderRadius: 1 }} />
            Issued By
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: brandNavy, marginBottom: 5, lineHeight: 1.2 }}>PhocieXpert Technologies Co. Ltd</div>
          <div style={{ fontSize: 11.5, color: "#475569", marginBottom: 2 }}>info@phociexperttechnologies.co.tz</div>
          <div style={{ fontSize: 11.5, color: "#475569", marginBottom: 2 }}>Dar es Salaam, Tanzania</div>
          <div style={{ fontSize: 11.5, color: "#475569" }}>phociexperttechnologies.co.tz</div>
        </div>
      </div>

      {/* ══════════ LINE ITEMS TABLE ══════════ */}
      <div style={{ padding: "0 46px 0 52px", position: "relative", zIndex: 2 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["NO.", "PRODUCT / SERVICE DESCRIPTION", "QTY", "UNIT PRICE", "TOTAL"].map((h, i) => (
                <th key={h} style={{
                  padding: i === 0 ? "12px 8px" : "12px 14px",
                  fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "#fff",
                  textAlign: i === 0 ? "center" : i >= 2 ? "right" : "left",
                  background: i === 0
                    ? `linear-gradient(135deg, ${accentColor}, #0284c7)`
                    : "linear-gradient(135deg, #0a2558 0%, #0d2f6e 100%)",
                  width: i === 0 ? 38 : i === 2 ? 50 : i >= 3 ? 110 : "auto",
                  borderRight: i === 0 ? `2px solid ${accentColor}` : "none",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inv.lineItems.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{
                  padding: "11px 8px", fontSize: 11, fontWeight: 800, color: accentDark, textAlign: "center",
                  background: `linear-gradient(135deg, ${accentColor}14, #0284c714)`,
                  borderRight: `2px solid ${accentColor}33`,
                }}>{idx + 1}</td>
                <td style={{ padding: "11px 14px", fontSize: 12.5, color: "#1e293b", background: idx % 2 === 0 ? "#fff" : "#f8fafc" }}>{item.description || "—"}</td>
                <td style={{ padding: "11px 14px", fontSize: 12.5, color: "#374151", textAlign: "right", background: idx % 2 === 0 ? "#fff" : "#f8fafc" }}>{item.qty}</td>
                <td style={{ padding: "11px 14px", fontSize: 12.5, color: "#374151", textAlign: "right", background: idx % 2 === 0 ? "#fff" : "#f8fafc" }}>{fmt(item.unitPrice)}</td>
                <td style={{ padding: "11px 14px", fontSize: 12.5, fontWeight: 800, color: brandNavy, textAlign: "right", background: idx % 2 === 0 ? "#fff" : "#f8fafc" }}>{fmt(item.qty * item.unitPrice)}</td>
              </tr>
            ))}
            {inv.lineItems.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "28px", textAlign: "center", color: "#94a3b8", fontSize: 12 }}>No items added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ══════════ TOTALS ══════════ */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 46px 0 52px", position: "relative", zIndex: 2 }}>
        <div style={{ width: 275, borderTop: `2.5px solid ${accentColor}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px 9px 0", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: 12, color: "#64748b" }}>Subtotal</span>
            <span style={{ fontSize: 12, color: "#1e293b", fontWeight: 600 }}>{fmt(subtotal)}</span>
          </div>
          {inv.vatEnabled && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px 9px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>VAT ({inv.vatRate}%)</span>
              <span style={{ fontSize: 12, color: "#1e293b", fontWeight: 600 }}>{fmt(vatAmount)}</span>
            </div>
          )}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "13px 16px", background: "linear-gradient(135deg, #0a2558 0%, #0d2f6e 100%)",
            borderRadius: "0 0 8px 8px", marginTop: 4,
          }}>
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Due</span>
            <span style={{ fontSize: 20, color: accentColor, fontWeight: 900, letterSpacing: "-0.02em" }}>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* ══════════ PAYMENT & TERMS ══════════ */}
      {(inv.paymentDetails || inv.termsAndConditions) && (
        <div style={{
          display: "grid",
          gridTemplateColumns: inv.paymentDetails && inv.termsAndConditions ? "1fr 1fr" : "1fr",
          gap: 18, padding: "20px 46px 0 52px", position: "relative", zIndex: 2,
        }}>
          {inv.paymentDetails && (
            <div style={{
              background: "#f0f9ff", border: "1px solid #bae6fd",
              borderLeft: `3.5px solid ${accentColor}`, borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: accentDark, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Payment Details</div>
              <div style={{ fontSize: 11, color: "#0369a1", lineHeight: 1.75, whiteSpace: "pre-line" }}>{inv.paymentDetails}</div>
            </div>
          )}
          {inv.termsAndConditions && (
            <div style={{
              background: "#f8fafc", border: "1px solid #e2e8f0",
              borderLeft: `3.5px solid ${brandNavy}`, borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: brandNavy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Terms & Conditions</div>
              <div style={{ fontSize: 10.5, color: "#475569", lineHeight: 1.75, whiteSpace: "pre-line" }}>{inv.termsAndConditions}</div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {inv.notes && (
        <div style={{
          margin: "16px 46px 0 52px", padding: "12px 16px",
          background: "#f8fafc", border: "1px solid #e2e8f0",
          borderLeft: `3.5px solid ${brandNavy}`, borderRadius: 10,
          position: "relative", zIndex: 2,
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: brandNavy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Notes</div>
          <div style={{ fontSize: 11, color: "#334155", whiteSpace: "pre-line", lineHeight: 1.65 }}>{inv.notes}</div>
        </div>
      )}

      {/* ══════════ SIGNATURE LINES ══════════ */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44,
        padding: "26px 46px 20px 52px", marginTop: 8, position: "relative", zIndex: 2,
      }}>
        {[{ label: "Authorised Signature", sub: "PhocieXpert Technologies Co. Ltd" }, { label: "Customer Signature", sub: inv.customerName || "" }].map(({ label, sub }) => (
          <div key={label}>
            <div style={{ borderTop: "1.5px solid #cbd5e1", paddingTop: 8 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#374151" }}>{label}</div>
              {sub && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{sub}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0a2558 0%, #0d2f6e 100%)",
        borderTop: `2px solid ${accentColor}`,
        padding: "13px 46px 13px 52px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: "auto", position: "relative", zIndex: 2,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: accentColor }}>
          Thank you for your business!
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9.5, color: "#f8fafc", fontWeight: 600 }}>phociexperttechnologies.co.tz</div>
          <div style={{ fontSize: 9, color: "rgba(226,232,240,0.8)", marginTop: 2 }}>info@phociexperttechnologies.co.tz</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INVOICE EDITOR
═══════════════════════════════════════════════════════════════ */
function InvoiceEditor({
  initial, isNew, onSaved, onBack,
}: {
  initial: InvoiceData;
  isNew: boolean;
  onSaved: () => void;
  onBack: () => void;
}) {
  const [inv, setInv] = useState<InvoiceData>(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  function upd(field: keyof InvoiceData, val: unknown) {
    setInv(p => ({ ...p, [field]: val }));
  }
  function updItem(i: number, field: keyof LineItem, val: string | number) {
    setInv(p => {
      const items = [...p.lineItems];
      items[i] = { ...items[i], [field]: val };
      return { ...p, lineItems: items };
    });
  }
  function addItem() { setInv(p => ({ ...p, lineItems: [...p.lineItems, { description: "", qty: 1, unitPrice: 0 }] })); }
  function removeItem(i: number) { setInv(p => ({ ...p, lineItems: p.lineItems.filter((_, j) => j !== i) })); }

  async function save() {
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/admin/invoices" : `/api/admin/invoices/${inv._id}`;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(inv) });
      if (res.ok) {
        const saved = await res.json();
        setInv(p => ({ ...p, ...saved, _id: saved._id }));
        setToast("✅ Invoice saved successfully!");
        setTimeout(() => { setToast(""); onSaved(); }, 1500);
      } else {
        setToast("❌ Save failed. Please try again.");
        setTimeout(() => setToast(""), 3500);
      }
    } finally { setSaving(false); }
  }

  const [exporting, setExporting] = useState(false);

  async function exportPDF() {
    setExporting(true);
    try {
      // Dynamic imports — avoids SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF }: { default: typeof jsPDFType } = await import("jspdf");

      // Grab the hidden full-size render node
      const el = previewRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        windowWidth: 794,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const imgH = pdfW * ratio;

      let heightLeft = imgH;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
      heightLeft -= pdfH;

      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
        heightLeft -= pdfH;
      }

      pdf.save(`${inv.invoiceNumber || "invoice"}.pdf`);
    } finally {
      setExporting(false);
    }
  }

  const { subtotal, vatAmount, total } = calcTotals(inv.lineItems, inv.vatEnabled, inv.vatRate);

  const BtnPrimary = ({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) => (
    <button onClick={onClick} disabled={disabled} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", boxShadow: "0 4px 18px rgba(4, 188, 235, 0.25)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1, display: "flex", alignItems: "center", gap: 7 }}>{children}</button>
  );

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid rgba(4, 188, 235, 0.2)", color: "#94a3b8", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f0f9ff", flex: 1 }}>
          {isNew ? "New Invoice" : `Edit ${inv.invoiceNumber || "Invoice"}`}
        </h2>
        <button onClick={() => setShowPreview(p => !p)} style={{ padding: "9px 18px", borderRadius: 9, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
          {showPreview ? "Hide Preview" : "👁 Preview"}
        </button>
        <button onClick={exportPDF} disabled={exporting} style={{ padding: "9px 18px", borderRadius: 9, border: "1px solid rgba(2, 155, 223, 0.4)", background: exporting ? "rgba(2, 155, 223, 0.15)" : "rgba(2, 155, 223, 0.08)", color: "#029BDF", fontSize: 13, cursor: exporting ? "not-allowed" : "pointer", fontWeight: 500, opacity: exporting ? 0.7 : 1 }}>
          {exporting ? "⏳ Generating…" : "⬇ Export PDF"}
        </button>
        <BtnPrimary onClick={save} disabled={saving}>{saving ? "Saving…" : "💾 Save Invoice"}</BtnPrimary>
      </div>

      {toast && (
        <div style={{ padding: "11px 16px", borderRadius: 10, marginBottom: 18, fontSize: 13, background: toast.startsWith("✅") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${toast.startsWith("✅") ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, color: toast.startsWith("✅") ? "#34d399" : "#f87171" }}>{toast}</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: showPreview ? "repeat(auto-fit, minmax(340px, 1fr))" : "1fr", gap: 24, alignItems: "start" }}>
        {/* ── Left: Form ── */}
        <div>
          {/* Invoice Meta */}
          <div style={sec}>
            <p style={secH}>Invoice Details</p>
            <div className="admin-responsive-grid-2">
              <F label="Invoice Type">
                <div style={{ display: "flex", gap: 8 }}>
                  {(["invoice", "proforma"] as const).map(t => (
                    <button key={t} onClick={() => upd("type", t)} style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, transition: "all 0.15s", background: inv.type === t ? (t === "proforma" ? "rgba(2, 155, 223, 0.2)" : "rgba(4,188,235,0.2)") : "rgba(255,255,255,0.05)", color: inv.type === t ? (t === "proforma" ? "#029BDF" : "#04BCEB") : "#64748b", outline: inv.type === t ? `1px solid ${t === "proforma" ? "rgba(2, 155, 223, 0.45)" : "rgba(4,188,235,0.4)"}` : "1px solid rgba(255,255,255,0.08)" }}>
                      {t === "proforma" ? "Proforma Invoice" : "Invoice"}
                    </button>
                  ))}
                </div>
              </F>
              <F label="Status">
                <select style={inp} value={inv.status} onChange={e => upd("status", e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </F>
              <F label="Invoice Number">
                <input style={inp} value={inv.invoiceNumber} onChange={e => upd("invoiceNumber", e.target.value)} placeholder="Auto-generated if blank" />
              </F>
              <F label="Issue Date">
                <input style={inp} type="date" value={inv.issueDate} onChange={e => upd("issueDate", e.target.value)} />
              </F>
              <F label="Due Date">
                <input style={inp} type="date" value={inv.dueDate} onChange={e => upd("dueDate", e.target.value)} />
              </F>
            </div>
          </div>

          {/* Customer Details */}
          <div style={sec}>
            <p style={secH}>Customer Details</p>
            <div className="admin-responsive-grid-2">
              <F label="Full Name / Company" span={2}>
                <input style={inp} value={inv.customerName} onChange={e => upd("customerName", e.target.value)} placeholder="Customer or company name" />
              </F>
              <F label="Email">
                <input style={inp} type="email" value={inv.customerEmail} onChange={e => upd("customerEmail", e.target.value)} />
              </F>
              <F label="Phone">
                <input style={inp} value={inv.customerPhone} onChange={e => upd("customerPhone", e.target.value)} />
              </F>
              <F label="Address" span={2}>
                <input style={inp} value={inv.customerAddress} onChange={e => upd("customerAddress", e.target.value)} />
              </F>
              <F label="City / District">
                <input style={inp} value={inv.customerCity} onChange={e => upd("customerCity", e.target.value)} />
              </F>
              <F label="Country">
                <input style={inp} value={inv.customerCountry} onChange={e => upd("customerCountry", e.target.value)} placeholder="e.g. Tanzania" />
              </F>
            </div>
          </div>

          {/* Line Items */}
          <div style={sec}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(4, 188, 235, 0.12)" }}>
              <p style={{ ...secH, margin: 0, border: "none", paddingBottom: 0 }}>Line Items</p>
              <button onClick={addItem} style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>+ Add Item</button>
            </div>

            {/* Scrollable container for mobile */}
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 6 }}>
              <div style={{ minWidth: 540 }}>
                {/* Table header */}
                <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 70px 110px 110px 36px", gap: 8, marginBottom: 8 }}>
                  {["No.", "Product Description", "Qty", "Unit Price", "Total", ""].map(h => (
                    <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h === "Total" || h === "Unit Price" ? "right" : "left" }}>{h}</div>
                  ))}
                </div>

                {inv.lineItems.map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr 70px 110px 110px 36px", gap: 8, marginBottom: 8, alignItems: "center" }}>
                    <div style={{ fontSize: 12, color: "#475569", fontWeight: 700, textAlign: "center" }}>{i + 1}</div>
                    <input style={inp} value={item.description} onChange={e => updItem(i, "description", e.target.value)} placeholder="Item description…" />
                    <input style={{ ...inp, textAlign: "center" }} type="number" min={1} value={item.qty} onChange={e => updItem(i, "qty", Math.max(1, Number(e.target.value)))} />
                    <input style={{ ...inp, textAlign: "right" }} type="number" min={0} step={0.01} value={item.unitPrice} onChange={e => updItem(i, "unitPrice", Number(e.target.value))} />
                    <div style={{ ...inp, textAlign: "right", color: "#04BCEB", fontWeight: 600, background: "rgba(4, 188, 235, 0.06)", border: "1px solid rgba(4, 188, 235, 0.18)" }}>
                      {fmt(item.qty * item.unitPrice)}
                    </div>
                    <button onClick={() => removeItem(i)} style={{ width: 32, height: 36, borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            {/* VAT & Totals */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(4, 188, 235, 0.12)" }}>
              {/* VAT toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <div
                    onClick={() => upd("vatEnabled", !inv.vatEnabled)}
                    style={{ width: 42, height: 24, borderRadius: 12, background: inv.vatEnabled ? "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)" : "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s", flexShrink: 0 }}
                  >
                    <div style={{ position: "absolute", top: 3, left: inv.vatEnabled ? 20 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
                  </div>
                  <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Include VAT</span>
                </label>
                {inv.vatEnabled && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input
                      style={{ ...inp, width: 70, padding: "6px 10px", textAlign: "center" }}
                      type="number" min={0} max={100} step={0.5}
                      value={inv.vatRate}
                      onChange={e => upd("vatRate", Number(e.target.value))}
                    />
                    <span style={{ fontSize: 13, color: "#64748b" }}>%</span>
                  </div>
                )}
              </div>

              {/* Totals summary */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{ display: "flex", gap: 48, fontSize: 13, color: "#64748b" }}>
                  <span>Subtotal</span><span style={{ color: "#e2e8f0", fontWeight: 500, minWidth: 100, textAlign: "right" }}>{fmt(subtotal)}</span>
                </div>
                {inv.vatEnabled && (
                  <div style={{ display: "flex", gap: 48, fontSize: 13, color: "#64748b" }}>
                    <span>VAT ({inv.vatRate}%)</span><span style={{ color: "#e2e8f0", fontWeight: 500, minWidth: 100, textAlign: "right" }}>{fmt(vatAmount)}</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: 48, fontSize: 16, fontWeight: 800, padding: "10px 16px", background: "linear-gradient(135deg, rgba(4,50,121,0.25), rgba(4,188,235,0.15))", borderRadius: 10, border: "1px solid rgba(4, 188, 235, 0.35)" }}>
                  <span style={{ color: "#94a3b8" }}>Total Due</span>
                  <span style={{ color: "#04BCEB", minWidth: 100, textAlign: "right" }}>{fmt(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div style={sec}>
            <p style={secH}>Payment Details</p>
            <textarea style={ta} value={inv.paymentDetails} onChange={e => upd("paymentDetails", e.target.value)} placeholder="Bank name, account number, branch…" />
          </div>

          {/* Terms & Conditions */}
          <div style={sec}>
            <p style={secH}>Terms & Conditions</p>
            <textarea style={{ ...ta, minHeight: 110 }} value={inv.termsAndConditions} onChange={e => upd("termsAndConditions", e.target.value)} placeholder="Payment terms, warranty, refund policy…" />
          </div>

          {/* Notes */}
          <div style={sec}>
            <p style={secH}>Additional Notes (optional)</p>
            <textarea style={ta} value={inv.notes} onChange={e => upd("notes", e.target.value)} placeholder="Any additional notes for the customer…" />
          </div>
        </div>

        {/* ── Right: Live Preview ── */}
        {showPreview && (
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Live Preview</div>
            <div style={{ transform: "scale(0.68)", transformOrigin: "top left", width: "147.1%", pointerEvents: "none" }}>
              <InvoicePreview inv={inv} />
            </div>
          </div>
        )}
      </div>

      {/* Hidden A4-sized node (794×1123px) used by html2canvas for pixel-perfect PDF export */}
      <div
        ref={previewRef}
        style={{
          position: "fixed", top: 0, left: "-9999px",
          width: 794, minHeight: 1123, zIndex: -1, pointerEvents: "none", opacity: 1,
          background: "#fff",
        }}
        aria-hidden="true"
      >
        <InvoicePreview inv={inv} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATUS BADGE
═══════════════════════════════════════════════════════════════ */
const STATUS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  draft:     { bg: "rgba(100,116,139,0.12)", color: "#94a3b8", border: "rgba(100,116,139,0.25)" },
  sent:      { bg: "rgba(4, 188, 235, 0.12)",  color: "#04BCEB",  border: "rgba(4, 188, 235, 0.3)"  },
  paid:      { bg: "rgba(16,185,129,0.12)",  color: "#34d399",  border: "rgba(16,185,129,0.3)"  },
  cancelled: { bg: "rgba(239,68,68,0.12)",   color: "#f87171",  border: "rgba(239,68,68,0.3)"   },
};

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? STATUS_COLORS.draft;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {status}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INVOICE LIST
═══════════════════════════════════════════════════════════════ */
export default function InvoicesManager() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [editing, setEditing] = useState<InvoiceData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const load = useCallback(() => {
    fetch("/api/admin/invoices").then(r => r.json()).then(setInvoices);
  }, []);
  useEffect(() => { load(); }, [load]);

  if (editing) {
    return <InvoiceEditor initial={editing} isNew={isNew} onSaved={() => { load(); setEditing(null); }} onBack={() => setEditing(null)} />;
  }

  async function deleteInv(id: string) {
    if (!confirm("Delete this invoice? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
    load(); setDeleting(null);
  }

  const filtered = filter === "all" ? invoices : invoices.filter(i => i.status === filter || i.type === filter);

  // Stats
  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === "paid").length,
    pending: invoices.filter(i => i.status === "sent").length,
    draft: invoices.filter(i => i.status === "draft").length,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f0f9ff", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Invoices</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Create, manage and export professional invoices & proformas</p>
        </div>
        <button onClick={() => { setEditing(emptyInvoice() as InvoiceData); setIsNew(true); }} style={{ padding: "12px 24px", borderRadius: 11, border: "none", background: "linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(4, 188, 235, 0.3)" }}>
          + New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
        {[
          { label: "Total", value: stats.total, color: "#04BCEB" },
          { label: "Paid", value: stats.paid, color: "#34d399" },
          { label: "Sent", value: stats.pending, color: "#029BDF" },
          { label: "Drafts", value: stats.draft, color: "#94a3b8" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color, marginBottom: 2 }}>{value}</div>
            <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "draft", "sent", "paid", "cancelled", "invoice", "proforma"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, textTransform: "capitalize", background: filter === f ? "rgba(4, 188, 235, 0.15)" : "rgba(255,255,255,0.04)", color: filter === f ? "#04BCEB" : "#64748b", outline: filter === f ? "1px solid rgba(4, 188, 235, 0.35)" : "1px solid transparent" }}>{f}</button>
        ))}
      </div>

      {/* Invoice list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧾</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#94a3b8", marginBottom: 4 }}>No invoices yet</div>
          <div style={{ fontSize: 13 }}>Click "+ New Invoice" to create your first one</div>
        </div>
      ) : (
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 10 }}>
          <div style={{ minWidth: 720, display: "flex", flexDirection: "column", gap: 10 }}>
            {/* List header */}
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px 120px 100px 100px 120px", gap: 12, padding: "8px 18px", borderRadius: 8 }}>
              {["Invoice #", "Customer", "Type", "Issue Date", "Due Date", "Status", ""].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
              ))}
            </div>
            {filtered.map(inv => {
              const { total } = calcTotals(inv.lineItems, inv.vatEnabled, inv.vatRate);
              return (
                <div key={inv._id} style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px 120px 100px 100px 120px", gap: 12, padding: "14px 18px", background: "rgba(6, 19, 41, 0.7)", border: "1px solid rgba(4, 188, 235, 0.15)", borderRadius: 12, alignItems: "center", transition: "border-color 0.15s" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#04BCEB" }}>{inv.invoiceNumber}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{fmt(total)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{inv.customerName || "—"}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{inv.customerEmail}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 5, background: inv.type === "proforma" ? "rgba(2, 155, 223, 0.15)" : "rgba(4, 188, 235, 0.12)", color: inv.type === "proforma" ? "#029BDF" : "#04BCEB", border: `1px solid ${inv.type === "proforma" ? "rgba(2, 155, 223, 0.35)" : "rgba(4, 188, 235, 0.25)"}` }}>
                      {inv.type === "proforma" ? "Proforma" : "Invoice"}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{inv.issueDate || "—"}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{inv.dueDate || "—"}</div>
                  <StatusBadge status={inv.status} />
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => { setEditing(inv); setIsNew(false); }} style={{ padding: "6px 14px", borderRadius: 7, border: "1px solid rgba(4, 188, 235, 0.35)", background: "rgba(4, 188, 235, 0.05)", color: "#04BCEB", cursor: "pointer", fontSize: 12, fontWeight: 500 }}>Edit</button>
                    <button onClick={() => deleteInv(inv._id!)} disabled={deleting === inv._id} style={{ padding: "6px 10px", borderRadius: 7, border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 12 }}>
                      {deleting === inv._id ? "…" : "✕"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
