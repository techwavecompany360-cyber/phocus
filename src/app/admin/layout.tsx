import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — PhocieXpert Technologies",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "#061329",
        color: "#f1f5f9",
      }}
    >
      {children}
    </div>
  );
}
