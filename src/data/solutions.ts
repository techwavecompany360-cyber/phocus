export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  challengesAddressed: string[];
  capabilitiesIncluded: string[];
  typicalOutcomes: string[];
}

export const solutionsData: SolutionItem[] = [
  {
    id: "business-automation",
    title: "Business Automation & Management Systems",
    tagline: "Streamlining operational overhead through intelligent workflow orchestration",
    description: "Replace repetitive manual paperwork, fragmented spreadsheets, and disparate workflows with unified digital management systems customized for your operational requirements.",
    iconName: "Workflow",
    challengesAddressed: [
      "Manual data entry errors & administrative delays",
      "Siloed departmental communications and duplicate work",
      "Lack of centralized operational visibility"
    ],
    capabilitiesIncluded: [
      "Custom ERP & CRM workflow automation",
      "Digital approvals & document management",
      "Automated notification and task dispatching"
    ],
    typicalOutcomes: [
      "Up to 60% reduction in processing cycle times",
      "Elimination of manual entry discrepancies",
      "Real-time operational auditability"
    ]
  },
  {
    id: "digital-commerce",
    title: "E-Commerce & Digital Commerce Platforms",
    tagline: "Secure, high-performance transactional experiences",
    description: "Build robust transactional storefronts, customer portals, and B2B ordering systems designed for smooth checkout flows, localized payment gateway integrations, and reliable inventory synchronization.",
    iconName: "ShoppingCart",
    challengesAddressed: [
      "Cart abandonment caused by slow checkout flows",
      "Disconnection between online orders and inventory stock",
      "Difficulties integrating localized payment methods"
    ],
    capabilitiesIncluded: [
      "Omnichannel catalog & inventory synchronization",
      "Multi-currency & mobile money payment integrations",
      "Customer account portals & loyalty mechanics"
    ],
    typicalOutcomes: [
      "Seamless checkout experience across mobile and desktop",
      "Automated stock adjustments and order notifications",
      "PCI-compliant and secure customer transactions"
    ]
  },
  {
    id: "cloud-platforms",
    title: "Cloud-Based Business Platforms",
    tagline: "Elastic, accessible infrastructure for modern organizations",
    description: "Transition workloads into resilient cloud architectures that allow teams to collaborate securely from anywhere while maintaining high availability, automated backups, and flexible capacity.",
    iconName: "CloudCog",
    challengesAddressed: [
      "Physical server outages and costly on-premise hardware upkeep",
      "Slow scalability during peak business demand",
      "Inadequate offsite data backup mechanisms"
    ],
    capabilitiesIncluded: [
      "Managed multi-cloud architecture and container orchestration",
      "Automated daily snapshotting and disaster recovery",
      "Role-based access control with single sign-on (SSO)"
    ],
    typicalOutcomes: [
      "99.9% application uptime SLAs",
      "Instant resource scaling with pay-as-you-grow efficiency",
      "Rapid disaster recovery with minimal business disruption"
    ]
  },
  {
    id: "smart-monitoring",
    title: "Connected Devices & Smart Monitoring",
    tagline: "Telemetry data and remote environmental tracking",
    description: "Deploy connected IoT sensor networks and telemetry instrumentation to continuously monitor physical equipment, cold chain conditions, facility power, or environmental variables in real time.",
    iconName: "Radio",
    challengesAddressed: [
      "Unplanned hardware breakdowns in remote sites",
      "Manual logging of temperatures, humidity, or power metrics",
      "Delayed response times to critical environmental thresholds"
    ],
    capabilitiesIncluded: [
      "Industrial sensor interfacing and telemetry transmission",
      "Real-time edge alerting via SMS, email, and webhooks",
      "Centralized device health and status consoles"
    ],
    typicalOutcomes: [
      "Immediate automated alerts for out-of-spec incidents",
      "Historical condition logging for regulatory compliance",
      "Preventative maintenance before catastrophic equipment failure"
    ]
  },
  {
    id: "analytics-dashboards",
    title: "Data Analytics & Reporting Dashboards",
    tagline: "Turning raw operational data into strategic clarity",
    description: "Consolidate scattered data sources into interactive, intuitive business intelligence dashboards that empower managers and executives to make informed, data-backed decisions.",
    iconName: "BarChart3",
    challengesAddressed: [
      "Data locked in isolated databases and spreadsheets",
      "Time-consuming month-end manual reporting compilations",
      "Lack of timely visibility into business performance"
    ],
    capabilitiesIncluded: [
      "Automated data extraction, cleaning, and aggregation",
      "Interactive filtering, drill-downs, and visual charts",
      "Scheduled automated email digest generation"
    ],
    typicalOutcomes: [
      "Instant visibility into key performance indicators (KPIs)",
      "Reduction in report compilation time from days to seconds",
      "Actionable insights into customer patterns and operational bottlenecks"
    ]
  },
  {
    id: "enterprise-applications",
    title: "Custom Enterprise Applications",
    tagline: "Tailored software built around your exact business rules",
    description: "When off-the-shelf software falls short, we engineer tailored enterprise software aligned precisely with your organizational hierarchy, proprietary processes, and compliance mandates.",
    iconName: "Layers",
    challengesAddressed: [
      "Rigid off-the-shelf software forcing awkward workarounds",
      "High ongoing license fees for unused feature bloat",
      "Lack of integration with legacy enterprise systems"
    ],
    capabilitiesIncluded: [
      "Custom domain-driven data models and business logic",
      "Granular role-based permissions and complete audit trails",
      "Dedicated API layers for third-party system interop"
    ],
    typicalOutcomes: [
      "Total software alignment with organizational workflows",
      "Complete ownership of intellectual property and code",
      "Future-proof scalability without per-seat licensing penalties"
    ]
  },
  {
    id: "customer-experience",
    title: "Digital Customer Experiences",
    tagline: "Engaging portals, self-service tools, and mobile apps",
    description: "Elevate how clients interact with your brand through sleek self-service portals, transparent ticketing systems, and fast, accessible mobile interfaces that foster loyalty.",
    iconName: "Users",
    challengesAddressed: [
      "Customer frustration with long phone hold times and slow emails",
      "Lack of self-service options for status checking or account updates",
      "Fragmented digital brand presence across devices"
    ],
    capabilitiesIncluded: [
      "Customer self-service portals & booking engines",
      "Real-time notification feeds and account status tracking",
      "Accessible, responsive mobile-first UI design"
    ],
    typicalOutcomes: [
      "Enhanced customer satisfaction and self-resolution rates",
      "Decreased inbound support volume for routine status checks",
      "Cohesive, professional brand impression across every device"
    ]
  },
  {
    id: "infrastructure-hardware",
    title: "Hardware & Network Infrastructure",
    tagline: "Physical foundations built for reliability and speed",
    description: "Ensure your physical facilities boast high-speed structured cabling, enterprise Wi-Fi coverage, secure network firewalls, and reliable server hardware.",
    iconName: "HardDrive",
    challengesAddressed: [
      "Frequent Wi-Fi dead zones and sluggish local transfers",
      "Unorganized server racks and unlabelled cabling",
      "Vulnerability to physical power surges and network breaches"
    ],
    capabilitiesIncluded: [
      "Structured CAT6/Fiber optic cabling and clean patch panels",
      "Unified gateway, firewall, and VLAN segmentation setups",
      "Uninterruptible power supplies (UPS) and surge mitigation"
    ],
    typicalOutcomes: [
      "Reliable gigabit connectivity across all workstations",
      "Streamlined diagnostics and straightforward hardware upgrades",
      "Robust defense perimeter against unauthorized local access"
    ]
  }
];
