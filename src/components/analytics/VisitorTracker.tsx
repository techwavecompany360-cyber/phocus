"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double-tracking the same path in rapid succession
    if (lastTracked.current === pathname) return;
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    lastTracked.current = pathname;

    try {
      const payload = JSON.stringify({
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      });

      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/track", blob);
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore background tracking errors
    }
  }, [pathname]);

  return null;
}
