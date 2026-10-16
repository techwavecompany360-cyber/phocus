export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  capabilities: string[];
  features: string[];
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "software-dev",
    slug: "software-development",
    title: "Software Development",
    category: "Engineering",
    shortDescription: "End-to-end custom software engineering, web applications, mobile platforms, and robust enterprise systems.",
    fullDescription: "From initial concept to deployment and lifecycle maintenance, we engineer custom software solutions built for performance, security, and scalability. Our software engineering practices prioritize modular architectures, clean codebases, and seamless integrations.",
    iconName: "Code2",
    capabilities: [
      "Website design and development",
      "Web applications and business platforms",
      "Mobile application development (iOS & Android)",
      "Desktop application development",
      "Custom software engineering",
      "Software publishing and deployment",
      "API development and third-party integrations",
      "Software maintenance and technical support"
    ],
    features: [
      "Modern full-stack web applications",
      "Native & cross-platform mobile apps",
      "Scalable RESTful & GraphQL microservices",
      "Automated CI/CD pipelines & QA testing"
    ],
    deliverables: [
      "Production-ready application",
      "Comprehensive API documentation",
      "Source repository & deployment scripts",
      "Post-launch technical support SLA"
    ]
  },
  {
    id: "ai-analytics",
    slug: "artificial-intelligence-data-analytics",
    title: "Artificial Intelligence & Data Analytics",
    category: "Intelligent Systems",
    shortDescription: "Machine learning consultation, predictive analytics, intelligent automation, and data-driven decision support.",
    fullDescription: "Transform organizational data into actionable strategic intelligence. We consult on and build machine learning workflows, automated analytics pipelines, and interactive visual reporting systems tailored to operational requirements.",
    iconName: "BrainCircuit",
    capabilities: [
      "Machine learning consultation",
      "AI-powered business solutions",
      "Predictive analytics and data insights",
      "Data visualization and reporting dashboards",
      "Intelligent workflow automation",
      "Data-driven decision support systems"
    ],
    features: [
      "Operational business intelligence models",
      "Automated anomaly detection & trend forecasting",
      "Natural Language & document understanding pipelines",
      "Interactive executive dashboards"
    ],
    deliverables: [
      "Custom analytics pipelines",
      "Validated predictive models",
      "Real-time visual dashboards",
      "Technical training & operational documentation"
    ]
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    category: "Security & Defense",
    shortDescription: "Defensive security assessments, risk analysis, infrastructure protection, and incident preparedness.",
    fullDescription: "Protect critical digital assets, networks, and confidential customer information with authorized defensive security solutions. We deliver comprehensive vulnerability assessments, rigorous access-control engineering, and proactive incident response planning.",
    iconName: "ShieldCheck",
    capabilities: [
      "Security assessments and risk analysis",
      "Application and infrastructure security audits",
      "Security best-practice implementation",
      "Data protection and access-control solutions",
      "Security monitoring and incident preparedness",
      "Security awareness and staff training"
    ],
    features: [
      "Zero-trust access architecture",
      "End-to-end data encryption protocols",
      "Compliance alignment & gap analysis",
      "Defensive hardening for servers & APIs"
    ],
    deliverables: [
      "Risk assessment & audit report",
      "Actionable remediation roadmap",
      "Security policy & protocol playbook",
      "Team security training modules"
    ]
  },
  {
    id: "cloud-infrastructure",
    slug: "cloud-computing-infrastructure",
    title: "Cloud Computing & Infrastructure",
    category: "Cloud & DevOps",
    shortDescription: "Resilient cloud architecture, automated deployment, workload migration, and disaster recovery planning.",
    fullDescription: "Modernize legacy systems and scale efficiently with enterprise-grade cloud computing architecture. We design, deploy, and optimize high-availability cloud environments that ensure maximum uptime, elasticity, and cost efficiency.",
    iconName: "Cloud",
    capabilities: [
      "Cloud architecture and implementation",
      "Cloud application deployment",
      "Cloud migration and modernization",
      "Infrastructure configuration and optimization",
      "Backup and disaster-recovery planning",
      "Scalable cloud hosting solutions"
    ],
    features: [
      "Multi-region high availability architectures",
      "Infrastructure as Code (Terraform / CloudFormation)",
      "Automated backup snapshots and failovers",
      "Performance and cost optimization auditing"
    ],
    deliverables: [
      "Cloud infrastructure topology blueprint",
      "Automated deployment scripts & pipelines",
      "Disaster recovery & recovery time objective (RTO) plan",
      "24/7 monitoring configuration"
    ]
  },
  {
    id: "digital-transformation",
    slug: "digital-transformation-it-consulting",
    title: "Digital Transformation & IT Consulting",
    category: "Strategy & Advisory",
    shortDescription: "Strategic IT consulting, business process digitization, systems integration, and technical advisory.",
    fullDescription: "Guide your organization through structured technological evolution. We assist leadership teams in assessing digital maturity, eliminating operational bottlenecks through digitization, and implementing modern technical architectures.",
    iconName: "Compass",
    capabilities: [
      "Digital transformation strategies",
      "Business process digitization",
      "IT infrastructure consulting",
      "Technology planning and implementation",
      "Systems integration and interoperability",
      "Technical advisory services"
    ],
    features: [
      "Digital roadmap & technology stack selection",
      "Paper-to-digital process transformation",
      "Enterprise systems integration (ERP/CRM)",
      "Vendor evaluation & technology governance"
    ],
    deliverables: [
      "Digital transformation roadmap",
      "Process optimization workflow specifications",
      "Systems integration architecture",
      "Executive advisory reports"
    ]
  },
  {
    id: "iot-systems",
    slug: "internet-of-things",
    title: "Internet of Things (IoT)",
    category: "Connected Systems",
    shortDescription: "Connected device development, sensor integration, telemetry monitoring platforms, and smart automation.",
    fullDescription: "Bridge physical environments with digital intelligence. We engineer end-to-end IoT solutions spanning sensor data acquisition, embedded firmware integration, secure telemetry transmission, and centralized cloud monitoring.",
    iconName: "Cpu",
    capabilities: [
      "Connected device development",
      "Sensor and embedded-system integration",
      "IoT monitoring platforms",
      "Device communication and data collection",
      "Smart automation systems",
      "IoT installation, maintenance, and support"
    ],
    features: [
      "Low-power wireless telemetry (MQTT, LoRaWAN, Cellular)",
      "Real-time sensor telemetry dashboards",
      "Automated alert thresholds and notifications",
      "Secure over-the-air (OTA) device management"
    ],
    deliverables: [
      "Hardware-software communication firmware",
      "Centralized device management dashboard",
      "API data aggregation platform",
      "Installation and hardware maintenance manual"
    ]
  },
  {
    id: "immersive-tech",
    slug: "virtual-augmented-reality",
    title: "Virtual Reality & Augmented Reality",
    category: "Immersive Tech",
    shortDescription: "Interactive VR experiences, AR applications, 3D simulations, and immersive spatial training environments.",
    fullDescription: "Deliver engaging spatial experiences for training, product visualization, and interactive education. We build immersive VR simulations and lightweight mobile AR solutions that provide realistic interaction and intuitive user experiences.",
    iconName: "Glasses",
    capabilities: [
      "Interactive VR experiences",
      "AR applications and digital overlays",
      "Immersive training environments",
      "3D visualization and interactive simulations",
      "Virtual demonstrations and digital experiences",
      "AR/VR application development"
    ],
    features: [
      "Photorealistic 3D asset modeling & animation",
      "Spatial audio & haptic feedback integration",
      "Cross-platform WebXR & headset support",
      "Interactive step-by-step training modules"
    ],
    deliverables: [
      "Interactive VR/AR application build",
      "3D asset models and simulation scenes",
      "User guides for device deployment",
      "Ongoing simulation content updates"
    ]
  },
  {
    id: "blockchain",
    slug: "blockchain-technology",
    title: "Blockchain Technology",
    category: "Decentralized Systems",
    shortDescription: "Secure distributed applications, smart contract engineering, and enterprise blockchain consulting.",
    fullDescription: "Leverage cryptographic distributed systems for tamper-resistant data integrity, transparent verification, and auditable business operations. We design and integrate verified smart contracts and decentralized business records.",
    iconName: "Blocks",
    capabilities: [
      "Blockchain application development",
      "Distributed application integration",
      "Smart-contract development and integration",
      "Blockchain system implementation",
      "Blockchain technology consulting"
    ],
    features: [
      "Immutable audit trails for supply chain & records",
      "Automated smart contract logic verification",
      "Cryptographic token & digital asset protocols",
      "Integration with enterprise databases"
    ],
    deliverables: [
      "Tested and verified smart contract code",
      "Decentralized application interface",
      "Security audit & verification report",
      "Node connection & interaction documentation"
    ]
  },
  {
    id: "network-solutions",
    slug: "network-solutions",
    title: "Network Solutions",
    category: "Infrastructure",
    shortDescription: "Enterprise network design, structured cabling, routing optimization, troubleshooting, and network security.",
    fullDescription: "Establish robust, high-performance network backbones essential for enterprise communication and data exchange. We plan, install, and optimize secure enterprise LANs, WANs, and wireless infrastructures.",
    iconName: "Network",
    capabilities: [
      "Network planning and installation",
      "Network configuration and optimization",
      "Business connectivity solutions",
      "Infrastructure maintenance",
      "Network troubleshooting and diagnostics",
      "Network security implementation"
    ],
    features: [
      "Structured cabling and fiber optic deployment",
      "VLAN segmentation & QoS bandwidth management",
      "Enterprise Wi-Fi 6 coverage mapping",
      "Firewall & intrusion prevention configuration"
    ],
    deliverables: [
      "Network architecture topology diagram",
      "Hardware configuration specifications",
      "Bandwidth & performance benchmark report",
      "Maintenance & incident diagnostic runbook"
    ]
  },
  {
    id: "electronics-systems",
    slug: "electronics-electrical-systems",
    title: "Electronics & Electrical Systems",
    category: "Hardware & Systems",
    shortDescription: "Supply of commercial IT equipment, hardware integration, electronic appliances, and technical maintenance.",
    fullDescription: "Deliver dependable hardware foundations for modern workspaces and facilities. We supply, configure, and service commercial IT hardware, electronic appliances, power backup systems, and specialized hardware integrations.",
    iconName: "Server",
    capabilities: [
      "Supply of electronic devices and accessories",
      "Computer hardware and IT equipment",
      "Electrical and electronic appliances",
      "Electronic system installation",
      "Hardware integration and configuration",
      "Maintenance and technical support"
    ],
    features: [
      "Enterprise workstation & server procurement",
      "UPS and power management infrastructure",
      "Custom electronics assembly & diagnostics",
      "Preventative maintenance schedules"
    ],
    deliverables: [
      "Procured equipment inventory & warranty",
      "On-site installation and testing sign-off",
      "Hardware integration documentation",
      "Scheduled preventative maintenance agreements"
    ]
  },
  {
    id: "multimedia-gaming",
    slug: "multimedia-gaming-entertainment",
    title: "Multimedia, Gaming & Entertainment",
    category: "Digital Media",
    shortDescription: "Multimedia production solutions, interactive gaming software, audio-visual systems, and digital content.",
    fullDescription: "Combine technology and creative media to produce captivating interactive experiences. From interactive gaming engines to commercial audio-visual system integration, we build dynamic digital media solutions.",
    iconName: "Gamepad2",
    capabilities: [
      "Multimedia production solutions",
      "Interactive digital experiences",
      "Gaming software development",
      "Digital content and presentation systems",
      "Audio-visual technology integration",
      "Interactive entertainment solutions"
    ],
    features: [
      "Interactive 2D/3D game mechanics & logic",
      "Commercial digital signage & presentation feeds",
      "Multi-screen AV synchronization",
      "High-fidelity multimedia rendering"
    ],
    deliverables: [
      "Compiled interactive software builds",
      "Configured digital signage platforms",
      "Audio-visual equipment setup & tuning",
      "Media asset libraries & guidelines"
    ]
  },
  {
    id: "it-training",
    slug: "it-training-education",
    title: "IT Training & Education",
    category: "Education & Capacity",
    shortDescription: "Practical software development workshops, digital literacy, organizational tech training, and skill building.",
    fullDescription: "Empower teams and individuals with practical, industry-aligned technology capabilities. We conduct hands-on training workshops covering modern software development, cybersecurity hygiene, and digital workflows.",
    iconName: "GraduationCap",
    capabilities: [
      "Software development training",
      "Digital skills development",
      "Technology workshops and masterclasses",
      "IT awareness and organizational education",
      "Practical technology training",
      "Professional development programs"
    ],
    features: [
      "Hands-on project-based curricula",
      "Customized corporate training syllabi",
      "Practical coding and system administration labs",
      "Pre-and-post training competency assessments"
    ],
    deliverables: [
      "Structured curriculum & course material",
      "Interactive coding lab environments",
      "Attendance & skill assessment reports",
      "Post-workshop resource repositories"
    ]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Growth & Visibility",
    shortDescription: "Strategic SEO, online advertising, digital brand development, and data-driven performance analytics.",
    fullDescription: "Amplify your online presence and reach target audiences with measurable digital marketing strategies. We engineer search engine optimization (SEO), social media visibility, and analytics-driven campaigns.",
    iconName: "TrendingUp",
    capabilities: [
      "Digital marketing strategy",
      "Search engine optimization (SEO)",
      "Social media management",
      "Online advertising support",
      "Digital brand development",
      "Website analytics and performance reporting"
    ],
    features: [
      "Technical on-page & off-page SEO optimization",
      "Targeted digital advertising campaign setups",
      "Conversion tracking & funnel optimization",
      "Comprehensive performance analytics dashboards"
    ],
    deliverables: [
      "Digital marketing strategic plan",
      "Technical SEO audit and implementation",
      "Monthly campaign performance reports",
      "Brand style guidelines for digital channels"
    ]
  }
];
