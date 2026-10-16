import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VisitorTracker from "@/components/analytics/VisitorTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://phociexpert.com"),
  title: {
    default: "PhocieXpert Technologies Company Limited — Modern Corporate Technology",
    template: "%s | PhocieXpert Technologies Company Limited"
  },
  description:
    "PhocieXpert Technologies Company Limited delivers innovative software engineering, intelligent systems, AI, cybersecurity, cloud infrastructure, IoT, and digital solutions in Mainland Tanzania. Solving Tomorrow Tech's Challenges Today.",
  keywords: [
    "PhocieXpert",
    "PhocieXpert Technologies",
    "Software Development Tanzania",
    "Artificial Intelligence",
    "Cybersecurity Services",
    "Cloud Computing",
    "IoT Systems",
    "Network Solutions",
    "Electronics and Electrical Systems",
    "Mainland Tanzania"
  ],
  authors: [{ name: "PhocieXpert Technologies Company Limited" }],
  creator: "PhocieXpert Technologies Company Limited",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phociexpert.com",
    title: "PhocieXpert Technologies Company Limited — Solving Tomorrow Tech's Challenges Today",
    description:
      "Enterprise software engineering, artificial intelligence, cybersecurity, cloud computing, IoT, and electronic systems registered in Mainland Tanzania.",
    siteName: "PhocieXpert Technologies Company Limited",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "PhocieXpert Technologies Company Limited Official Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PhocieXpert Technologies Company Limited",
    description: "Solving Tomorrow Tech's Challenges Today.",
    images: ["/logo.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-[#F7FAFF] text-[#10213D] selection:bg-cyan-500 selection:text-white antialiased">
        <VisitorTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
