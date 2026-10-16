export interface ProjectItem {
  id: string;
  title: string;
  category: "Web Applications" | "Mobile Solutions" | "AI & Data" | "IoT & Embedded Systems" | "Cloud & Infrastructure" | "Interactive Experiences";
  badge: string;
  isConceptual: boolean;
  shortDescription: string;
  technologies: string[];
  scope: string;
  architectureHighlight: string;
  gradient: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "nexus-logistics-portal",
    title: "OmniLogistics Platform",
    category: "Web Applications",
    badge: "Conceptual Engineering Project",
    isConceptual: true,
    shortDescription: "A modern multi-tenant enterprise portal designed for fleet dispatching, consignment tracking, and warehouse inventory management.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "WebSockets"],
    scope: "Real-time dispatch dashboard, GPS vehicle telemetry mapping, dynamic consignment dispatch slips, and role-based driver/manager access tiers.",
    architectureHighlight: "Event-driven WebSocket architecture for sub-second location updates and live asset telemetry streaming.",
    gradient: "from-blue-900 to-cyan-900"
  },
  {
    id: "agro-telemetry-iot",
    title: "AgriSense Telemetry Grid",
    category: "IoT & Embedded Systems",
    badge: "Conceptual Engineering Project",
    isConceptual: true,
    shortDescription: "Smart sensor telemetry node architecture collecting ambient soil moisture, ambient temperature, and automated solar irrigation data.",
    technologies: ["C++ Firmware", "LoRaWAN", "MQTT", "ESP32", "TimescaleDB", "Grafana"],
    scope: "Ultra-low-power edge nodes with solar battery harvesting, LoRaWAN gateways with cellular backhaul, and automated irrigation threshold valves.",
    architectureHighlight: "Duty-cycled low-power sleep state consuming under 15 microamps, enabling multi-year unattended field operation.",
    gradient: "from-teal-900 to-blue-950"
  },
  {
    id: "fintech-customer-app",
    title: "PayPulse Mobile Wallet",
    category: "Mobile Solutions",
    badge: "Conceptual Engineering Project",
    isConceptual: true,
    shortDescription: "A high-security cross-platform mobile wallet supporting QR retail payments, peer-to-peer transfers, and biometric authentication.",
    technologies: ["React Native", "TypeScript", "FastAPI", "Redis", "Hardware Keystore"],
    scope: "Biometric login, dynamic secure QR code rendering, instant SMS transaction confirmation, and localized mobile money interoperability.",
    architectureHighlight: "Hardware-backed asymmetric key encryption protecting every transaction payload with tamper-evident request signing.",
    gradient: "from-indigo-950 to-blue-900"
  },
  {
    id: "predictive-maintenance-ai",
    title: "InspecAI Industrial Diagnostic",
    category: "AI & Data",
    badge: "Conceptual Engineering Project",
    isConceptual: true,
    shortDescription: "Vibration and acoustic anomaly detection system predicting mechanical wear in factory motors before mechanical breakdown occurs.",
    technologies: ["Python", "PyTorch", "FastAPI", "Docker", "Edge AI Accelerators"],
    scope: "Continuous high-frequency acoustic sampling, FFT spectral analysis, autoencoder anomaly scoring, and instant alerting webhooks.",
    architectureHighlight: "Quantized lightweight neural network running locally on edge hardware with zero internet dependency for real-time trip wire protection.",
    gradient: "from-slate-900 to-cyan-950"
  },
  {
    id: "cloud-dr-failover",
    title: "Multi-Region Cloud Mesh",
    category: "Cloud & Infrastructure",
    badge: "Conceptual Engineering Project",
    isConceptual: true,
    shortDescription: "Automated multi-region failover and disaster recovery architecture ensuring zero data loss and under 60-second recovery times.",
    technologies: ["Terraform", "Kubernetes", "AWS / GCP", "Envoy Proxy", "Prometheus"],
    scope: "Geo-replicated database clusters, automated health check rerouting via Anycast DNS, and declarative Infrastructure as Code deployment.",
    architectureHighlight: "Active-passive hot-standby configuration capable of absorbing total regional outages with automatic DNS cutover.",
    gradient: "from-blue-950 to-slate-900"
  },
  {
    id: "spatial-safety-training",
    title: "VirtualShield Safety Simulation",
    category: "Interactive Experiences",
    badge: "Conceptual Engineering Project",
    isConceptual: true,
    shortDescription: "Immersive VR hazardous environment training simulation preparing industrial technicians for emergency response scenarios.",
    technologies: ["WebXR", "Three.js", "Blender 3D", "Spatial Audio", "TypeScript"],
    scope: "Interactive 3D equipment interaction, emergency evacuation procedures, chemical spill handling protocols, and automated scorecards.",
    architectureHighlight: "Browser-accessible WebXR pipeline running directly on standard headsets and modern desktop browsers without bulky installs.",
    gradient: "from-sky-950 to-blue-950"
  }
];
