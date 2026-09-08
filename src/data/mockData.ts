import { 
  Demand, 
  ValidationItem, 
  ApprovalItem, 
  Resource, 
  ReportItem, 
  AuditLog, 
  NotificationItem 
} from "../types";

export const initialDemands: Demand[] = [
  {
    id: "DEM-2024-001",
    customer: "JPMorgan Chase",
    project: "Global Payment Modernization",
    revenue: 4200000,
    cost: 2520000,
    margin: 40.0,
    practice: "Cloud & DevOps",
    geography: "North America",
    deliveryUnit: "DU-East-01",
    startDate: "2026-08-15",
    endDate: "2027-08-14",
    requestedFTE: 18,
    assignedFTE: 14,
    status: "Staffing",
    approvalStage: "Approved",
    priority: "Critical",
    slaHoursLeft: 36,
    slaStatus: "On Track",
    description: "End-to-end migration of legacy payment settlement architecture to cloud-native microservices with multi-region failover.",
    owner: "Sarah Jenkins (DD)",
    createdAt: "2026-07-01",
    updatedAt: "2026-07-20",
    attachments: [
      { id: "att-1", name: "JPMC_Payment_SOW_v2.pdf", size: "4.2 MB", type: "PDF", uploadDate: "2026-07-02" },
      { id: "att-2", name: "Resource_Estimation_Sheet.xlsx", size: "1.8 MB", type: "Excel", uploadDate: "2026-07-03" }
    ],
    assignedResourceIds: ["RES-101", "RES-102", "RES-105"],
    validationErrorCount: 0
  },
  {
    id: "DEM-2024-002",
    customer: "Novartis AG",
    project: "AI Clinical Trial Analytics",
    revenue: 2850000,
    cost: 1824000,
    margin: 36.0,
    practice: "AI & Data",
    geography: "EMEA",
    deliveryUnit: "DU-Europe-Central",
    startDate: "2026-09-01",
    endDate: "2027-03-31",
    requestedFTE: 12,
    assignedFTE: 4,
    status: "Validation",
    approvalStage: "Pending DD Review",
    priority: "High",
    slaHoursLeft: 8,
    slaStatus: "Warning",
    description: "Developing GenAI-driven clinical document summarization and FDA regulatory compliance verification pipeline.",
    owner: "Marc Vance (DD)",
    createdAt: "2026-07-10",
    updatedAt: "2026-07-21",
    attachments: [
      { id: "att-3", name: "Novartis_GenAI_Scope.pdf", size: "3.1 MB", type: "PDF", uploadDate: "2026-07-10" }
    ],
    assignedResourceIds: ["RES-104"],
    validationErrorCount: 2
  },
  {
    id: "DEM-2024-003",
    customer: "Walmart Commerce",
    project: "Omnichannel Supply Chain Core",
    revenue: 6500000,
    cost: 3965000,
    margin: 39.0,
    practice: "Enterprise Apps",
    geography: "North America",
    deliveryUnit: "DU-Central-02",
    startDate: "2026-08-01",
    endDate: "2028-01-31",
    requestedFTE: 25,
    assignedFTE: 25,
    status: "Active",
    approvalStage: "Approved",
    priority: "Critical",
    slaHoursLeft: 120,
    slaStatus: "On Track",
    description: "SAP S/4HANA core transformation integrated with real-time inventory tracking for 4,000+ stores.",
    owner: "David Ross (DD)",
    createdAt: "2026-05-15",
    updatedAt: "2026-07-18",
    attachments: [
      { id: "att-4", name: "Walmart_MSA_Final.pdf", size: "8.5 MB", type: "PDF", uploadDate: "2026-05-16" }
    ],
    assignedResourceIds: ["RES-103", "RES-106", "RES-107", "RES-108"],
    validationErrorCount: 0
  },
  {
    id: "DEM-2024-004",
    customer: "HSBC Global",
    project: "Zero Trust Cyber Resilience",
    revenue: 1950000,
    cost: 1287000,
    margin: 34.0,
    practice: "Cybersecurity",
    geography: "APAC",
    deliveryUnit: "DU-Asia-East",
    startDate: "2026-10-01",
    endDate: "2027-09-30",
    requestedFTE: 8,
    assignedFTE: 0,
    status: "Submitted",
    approvalStage: "Finance Review",
    priority: "Medium",
    slaHoursLeft: 4,
    slaStatus: "Warning",
    description: "Enterprise IAM integration, SOC automation, and Kubernetes cluster security hardening across APAC offices.",
    owner: "Elena Rostova (DD)",
    createdAt: "2026-07-18",
    updatedAt: "2026-07-21",
    attachments: [
      { id: "att-5", name: "HSBC_Security_Audit_RFP.pdf", size: "2.4 MB", type: "PDF", uploadDate: "2026-07-18" }
    ],
    assignedResourceIds: [],
    validationErrorCount: 1
  },
  {
    id: "DEM-2024-005",
    customer: "Toyota Motor Corp",
    project: "Connected Vehicle IoT Telemetry",
    revenue: 5100000,
    cost: 3213000,
    margin: 37.0,
    practice: "Digital Engineering",
    geography: "APAC",
    deliveryUnit: "DU-Asia-Japan",
    startDate: "2026-08-20",
    endDate: "2027-11-20",
    requestedFTE: 20,
    assignedFTE: 16,
    status: "Staffing",
    approvalStage: "Approved",
    priority: "High",
    slaHoursLeft: 48,
    slaStatus: "On Track",
    description: "Ingesting 50k events/sec from vehicle sensors into AWS Kinesis and Snowflake for predictive maintenance analytics.",
    owner: "Kenji Sato (DD)",
    createdAt: "2026-06-28",
    updatedAt: "2026-07-19",
    attachments: [
      { id: "att-6", name: "Toyota_Telemetry_Arch.pdf", size: "6.1 MB", type: "PDF", uploadDate: "2026-06-29" }
    ],
    assignedResourceIds: ["RES-109", "RES-110"],
    validationErrorCount: 0
  },
  {
    id: "DEM-2024-006",
    customer: "E.ON Energy",
    project: "Smart Grid Grid Analytics",
    revenue: 1600000,
    cost: 1152000,
    margin: 28.0, // Low margin flag
    practice: "AI & Data",
    geography: "EMEA",
    deliveryUnit: "DU-Europe-North",
    startDate: "2026-09-15",
    endDate: "2027-03-15",
    requestedFTE: 6,
    assignedFTE: 0,
    status: "Validation",
    approvalStage: "Pending DD Review",
    priority: "High",
    slaHoursLeft: -2, // Breached
    slaStatus: "Breached",
    description: "Grid sensor data pipeline setup for green energy balancing.",
    owner: "Marc Vance (DD)",
    createdAt: "2026-07-12",
    updatedAt: "2026-07-22",
    attachments: [],
    assignedResourceIds: [],
    validationErrorCount: 3
  }
];

export const initialValidations: ValidationItem[] = [
  {
    id: "VAL-101",
    demandId: "DEM-2024-002",
    customer: "Novartis AG",
    project: "AI Clinical Trial Analytics",
    validationType: "Resource Allocation Conflict",
    severity: "High",
    owner: "Marc Vance (DD)",
    slaTimer: "8h remaining",
    status: "Failed",
    description: "Lead Data Scientist RES-104 is already 100% allocated on Project Titan until Oct 15, overlapping demand start date.",
    recommendedFix: "Swap RES-104 with RES-112 (Data Scientist on Bench with 98% skill match) or adjust start date to Oct 16.",
    fieldDiff: [
      { field: "Lead Data Scientist", currentValue: "RES-104 (100% Allocated)", expectedValue: "RES-112 (Bench Available)" }
    ]
  },
  {
    id: "VAL-102",
    demandId: "DEM-2024-002",
    customer: "Novartis AG",
    project: "AI Clinical Trial Analytics",
    validationType: "Missing Mandatory Fields",
    severity: "Medium",
    owner: "Marc Vance (DD)",
    slaTimer: "8h remaining",
    status: "Failed",
    description: "Missing mandatory SOW Purchase Order Number and Delivery Unit Head Sign-off attachment.",
    recommendedFix: "Upload signed SOW PO document or input PO # in Project Financials tab.",
    fieldDiff: [
      { field: "PO Number", currentValue: "UNASSIGNED", expectedValue: "PO-XXXXX" }
    ]
  },
  {
    id: "VAL-103",
    demandId: "DEM-2024-006",
    customer: "E.ON Energy",
    project: "Smart Grid Grid Analytics",
    validationType: "Negative Margin Warning",
    severity: "Critical",
    owner: "Marc Vance (DD)",
    slaTimer: "EXPIRED (SLA Breached)",
    status: "Failed",
    description: "Target gross margin is 28.0%, which is below the organizational threshold minimum of 35.0% for EMEA AI & Data Practice.",
    recommendedFix: "Increase blended bill rate by $12/hr or replace Onsite Senior Engineers with Offshore Senior Engineers to reduce cost.",
    fieldDiff: [
      { field: "Target Gross Margin", currentValue: "28.0%", expectedValue: ">= 35.0%" }
    ]
  },
  {
    id: "VAL-104",
    demandId: "DEM-2024-004",
    customer: "HSBC Global",
    project: "Zero Trust Cyber Resilience",
    validationType: "Duplicate Demand",
    severity: "Medium",
    owner: "Elena Rostova (DD)",
    slaTimer: "4h remaining",
    status: "In Review",
    description: "Potential duplicate demand identified matching DEM-2024-098 (HSBC IAM Phase 1).",
    recommendedFix: "Merge with existing active demand DEM-2024-098 or mark as distinct Change Request.",
    fieldDiff: [
      { field: "Demand Name", currentValue: "Zero Trust Cyber Resilience", expectedValue: "Merge with DEM-2024-098" }
    ]
  }
];

export const initialApprovals: ApprovalItem[] = [
  {
    id: "APP-301",
    demandId: "DEM-2024-002",
    customer: "Novartis AG",
    project: "AI Clinical Trial Analytics",
    revenue: 2850000,
    margin: 36.0,
    requestedFTE: 12,
    stage: "Pending DD Review",
    slaTimer: "8h 15m",
    submittedBy: "Dr. Aris Thorne (Sales VP)",
    submittedDate: "2026-07-20 14:30",
    comments: [
      { id: "c1", author: "Dr. Aris Thorne", role: "Sales VP", date: "2026-07-20 14:30", text: "Customer agreed to 36% margin. High priority for EMEA strategic expansion.", action: "Comment" }
    ]
  },
  {
    id: "APP-302",
    demandId: "DEM-2024-004",
    customer: "HSBC Global",
    project: "Zero Trust Cyber Resilience",
    revenue: 1950000,
    margin: 34.0,
    requestedFTE: 8,
    stage: "Finance Review",
    slaTimer: "4h 05m",
    submittedBy: "Elena Rostova (DD)",
    submittedDate: "2026-07-21 09:15",
    comments: [
      { id: "c2", author: "Elena Rostova", role: "Delivery Director", date: "2026-07-21 09:15", text: "Reviewed scope and FTE breakdown. Passed DD check, forwarding to Finance.", action: "Approve" }
    ]
  },
  {
    id: "APP-303",
    demandId: "DEM-2024-006",
    customer: "E.ON Energy",
    project: "Smart Grid Grid Analytics",
    revenue: 1600000,
    margin: 28.0,
    requestedFTE: 6,
    stage: "Pending DD Review",
    slaTimer: "OVERDUE",
    submittedBy: "Lukas Weber (Account Exec)",
    submittedDate: "2026-07-19 11:00",
    comments: [
      { id: "c3", author: "Lukas Weber", role: "Account Exec", date: "2026-07-19 11:00", text: "Competitive bid requires lower pricing. Requesting margin threshold waiver.", action: "Comment" }
    ]
  }
];

export const initialResources: Resource[] = [
  {
    id: "RES-101",
    name: "Alex Rivera",
    role: "Lead Cloud Architect",
    primarySkill: "AWS & Terraform",
    secondarySkills: ["Kubernetes", "Docker", "Python", "Go"],
    experienceYears: 12,
    location: "New York, USA",
    practice: "Cloud & DevOps",
    costRate: 85,
    billRate: 160,
    utilizationPercent: 100,
    allocationStatus: "Allocated",
    availableFrom: "2027-08-15",
    currentProject: "DEM-2024-001",
    email: "arivera@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "RES-102",
    name: "Priya Sharma",
    role: "Senior DevOps Engineer",
    primarySkill: "CI/CD & Azure DevOps",
    secondarySkills: ["GitHub Actions", "Ansible", "Helm"],
    experienceYears: 8,
    location: "Toronto, Canada",
    practice: "Cloud & DevOps",
    costRate: 65,
    billRate: 125,
    utilizationPercent: 100,
    allocationStatus: "Allocated",
    availableFrom: "2027-08-15",
    currentProject: "DEM-2024-001",
    email: "psharma@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "RES-103",
    name: "Michael Chang",
    role: "SAP S/4HANA Solution Lead",
    primarySkill: "SAP S4/HANA",
    secondarySkills: ["ABAP", "Supply Chain", "FI/CO"],
    experienceYears: 15,
    location: "Chicago, USA",
    practice: "Enterprise Apps",
    costRate: 110,
    billRate: 210,
    utilizationPercent: 100,
    allocationStatus: "Allocated",
    availableFrom: "2028-02-01",
    currentProject: "DEM-2024-003",
    email: "mchang@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "RES-104",
    name: "Dr. Clara Dupont",
    role: "Principal GenAI Scientist",
    primarySkill: "LLMs & PyTorch",
    secondarySkills: ["LangChain", "Vector DBs", "RAG Systems"],
    experienceYears: 10,
    location: "Zurich, Switzerland",
    practice: "AI & Data",
    costRate: 120,
    billRate: 240,
    utilizationPercent: 100,
    allocationStatus: "Allocated",
    availableFrom: "2026-10-15",
    currentProject: "Project Titan",
    email: "cdupont@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "RES-112",
    name: "Siddharth Mehta",
    role: "Senior Data Scientist",
    primarySkill: "GenAI & NLP",
    secondarySkills: ["Python", "FastAPI", "MLflow", "Bedrock"],
    experienceYears: 7,
    location: "London, UK",
    practice: "AI & Data",
    costRate: 75,
    billRate: 150,
    utilizationPercent: 0,
    allocationStatus: "Bench",
    availableFrom: "Immediate",
    email: "smehta@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "RES-113",
    name: "Hannah Lindqvist",
    role: "Senior Cyber Security Specialist",
    primarySkill: "IAM & OAuth",
    secondarySkills: ["Okta", "Vault", "Kubernetes Security"],
    experienceYears: 9,
    location: "Stockholm, Sweden",
    practice: "Cybersecurity",
    costRate: 80,
    billRate: 155,
    utilizationPercent: 0,
    allocationStatus: "Bench",
    availableFrom: "Immediate",
    email: "hlindqvist@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "RES-114",
    name: "Vikram Malhotra",
    role: "Cloud DevOps Specialist",
    primarySkill: "AWS & Kubernetes",
    secondarySkills: ["Terraform", "Prometheus", "Grafana"],
    experienceYears: 6,
    location: "Bangalore, India",
    practice: "Cloud & DevOps",
    costRate: 45,
    billRate: 95,
    utilizationPercent: 0,
    allocationStatus: "Bench",
    availableFrom: "Immediate",
    email: "vmalhotra@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
  }
];

export const initialReports: ReportItem[] = [
  {
    id: "REP-01",
    title: "Demand Pipeline & Aging Analysis",
    category: "Demand Aging",
    description: "Cycle time breakdown from Draft creation to Active status across geographies and practices.",
    lastGenerated: "2026-07-21 18:00",
    schedule: "Weekly",
    format: "Interactive"
  },
  {
    id: "REP-02",
    title: "DD Approval SLA Compliance",
    category: "Approval SLA",
    description: "SLA compliance rates, average response time, and bottleneck stages by approver role.",
    lastGenerated: "2026-07-21 08:30",
    schedule: "Daily",
    format: "PDF"
  },
  {
    id: "REP-03",
    title: "Quarterly Revenue & Gross Margin Realization",
    category: "Revenue & Margin",
    description: "Financial breakdown comparing planned target margins vs actual assigned staffing margins.",
    lastGenerated: "2026-07-15 12:00",
    schedule: "Monthly",
    format: "Excel"
  },
  {
    id: "REP-04",
    title: "Bench Resource Utilization & Skills Heatmap",
    category: "Resource Utilization",
    description: "Bench cost leakage tracking, unallocated FTEs by location, and high-demand skill gaps.",
    lastGenerated: "2026-07-21 07:00",
    schedule: "Daily",
    format: "Interactive"
  },
  {
    id: "REP-05",
    title: "Staffing Gap & Open Position Fulfillment",
    category: "Staffing Gaps",
    description: "Unfulfilled demand FTEs, critical role vacancies, and upcoming roll-off forecasts.",
    lastGenerated: "2026-07-20 17:45",
    schedule: "Weekly",
    format: "PDF"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "AUD-9001",
    timestamp: "2026-07-22 02:45:12",
    user: "Sarah Jenkins",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    userRole: "Delivery Director",
    action: "Approved Demand",
    module: "Approval Center",
    demandId: "DEM-2024-001",
    previousValue: "Stage: Pending DD Review",
    newValue: "Stage: Approved (Assigned to Staffing)",
    device: "MacBook Pro (Chrome 126)",
    ipAddress: "192.168.1.104"
  },
  {
    id: "AUD-9002",
    timestamp: "2026-07-21 16:30:00",
    user: "Marc Vance",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    userRole: "Delivery Director",
    action: "Flagged Validation Issue",
    module: "Validation Center",
    demandId: "DEM-2024-002",
    previousValue: "Validation: Passed",
    newValue: "Validation: Failed (Resource Conflict RES-104)",
    device: "Windows PC (Edge 125)",
    ipAddress: "10.0.4.22"
  },
  {
    id: "AUD-9003",
    timestamp: "2026-07-21 11:15:40",
    user: "Elena Rostova",
    userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    userRole: "Delivery Director",
    action: "Created Demand",
    module: "Demand Management",
    demandId: "DEM-2024-004",
    previousValue: "N/A",
    newValue: "Created Demand DEM-2024-004 ($1.95M / HSBC)",
    device: "MacBook Air (Safari 17)",
    ipAddress: "172.16.8.99"
  },
  {
    id: "AUD-9004",
    timestamp: "2026-07-20 09:12:05",
    user: "David Ross",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    userRole: "Delivery Director",
    action: "Allocated Resources",
    module: "Resource Management",
    demandId: "DEM-2024-003",
    previousValue: "Assigned FTE: 18",
    newValue: "Assigned FTE: 25 (Fully Staffed)",
    device: "Linux Workstation (Firefox 127)",
    ipAddress: "192.168.2.15"
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "NOT-001",
    title: "Validation Failure Alert",
    message: "Demand DEM-2024-006 (E.ON Energy) failed gross margin validation (28.0% < 35.0% target).",
    timestamp: "10 minutes ago",
    category: "Validation",
    priority: "Critical",
    read: false,
    actionLink: "DEM-2024-006"
  },
  {
    id: "NOT-002",
    title: "Pending DD Approval",
    message: "Demand DEM-2024-002 (Novartis AG) requires your approval. SLA timer has 8 hours remaining.",
    timestamp: "1 hour ago",
    category: "Approval",
    priority: "High",
    read: false,
    actionLink: "DEM-2024-002"
  },
  {
    id: "NOT-003",
    title: "Staffing Milestone Met",
    message: "Walmart Supply Chain Core (DEM-2024-003) reached 100% FTE allocation (25/25 FTEs).",
    timestamp: "3 hours ago",
    category: "Staffing",
    priority: "Medium",
    read: true,
    actionLink: "DEM-2024-003"
  },
  {
    id: "NOT-004",
    title: "Financial Margin Target Exceeded",
    message: "JPMorgan Chase Payment Modernization achieved a 40.0% gross margin target.",
    timestamp: "1 day ago",
    category: "Financial",
    priority: "Low",
    read: true,
    actionLink: "DEM-2024-001"
  }
];

// Analytical Trends Data for Charts
export const demandTrendData = [
  { month: "Jan", created: 12, approved: 10, active: 8 },
  { month: "Feb", created: 15, approved: 12, active: 11 },
  { month: "Mar", created: 18, approved: 16, active: 14 },
  { month: "Apr", created: 14, approved: 13, active: 12 },
  { month: "May", created: 22, approved: 19, active: 16 },
  { month: "Jun", created: 28, approved: 24, active: 20 },
  { month: "Jul", created: 24, approved: 21, active: 19 },
];

export const revenueTrendData = [
  { month: "Q1 2025", revenue: 14.2, cost: 8.8, marginPct: 38.0 },
  { month: "Q2 2025", revenue: 16.8, cost: 10.2, marginPct: 39.2 },
  { month: "Q3 2025", revenue: 18.5, cost: 11.1, marginPct: 40.0 },
  { month: "Q4 2025", revenue: 21.0, cost: 12.8, marginPct: 39.0 },
  { month: "Q1 2026", revenue: 22.3, cost: 13.6, marginPct: 39.0 },
  { month: "Q2 2026", revenue: 24.5, cost: 14.8, marginPct: 39.5 },
];

export const regionDistributionData = [
  { name: "North America", value: 45, color: "#024AD8" },
  { name: "EMEA", value: 30, color: "#447180" },
  { name: "APAC", value: 18, color: "#00A88F" },
  { name: "LATAM", value: 7, color: "#F59E0B" },
];

export const practiceRevenueData = [
  { practice: "Cloud & DevOps", revenue: 8.5, target: 7.5 },
  { practice: "AI & Data", revenue: 6.2, target: 5.0 },
  { practice: "Enterprise Apps", revenue: 5.8, target: 6.0 },
  { practice: "Cybersecurity", revenue: 3.4, target: 3.0 },
  { practice: "Digital Engineering", revenue: 4.1, target: 4.0 },
];

export const resourceUtilizationData = [
  { role: "Architects", allocated: 92, bench: 8 },
  { role: "DevOps Eng", allocated: 88, bench: 12 },
  { role: "Data Scientists", allocated: 78, bench: 22 },
  { role: "SAP Leads", allocated: 96, bench: 4 },
  { role: "Security Spec", allocated: 82, bench: 18 },
];

export const hiringFunnelData = [
  { stage: "Sourced", candidates: 180, fill: "#024AD8" },
  { stage: "Screened", candidates: 112, fill: "#3B82F6" },
  { stage: "Interviewed", candidates: 64, fill: "#00A88F" },
  { stage: "Offered", candidates: 28, fill: "#F59E0B" },
  { stage: "Fulfilled", candidates: 22, fill: "#10B981" },
];

export const demandByBuData = [
  { name: "Banking & Financials", value: 12.5, color: "#024AD8" },
  { name: "Healthcare & Life Sci", value: 8.2, color: "#447180" },
  { name: "Retail & Consumer", value: 9.8, color: "#00A88F" },
  { name: "Energy & Manufacturing", value: 5.4, color: "#F59E0B" },
];

export const slaPerformanceData = [
  { month: "Jan", onTime: 96, atRisk: 3, breached: 1 },
  { month: "Feb", onTime: 94, atRisk: 4, breached: 2 },
  { month: "Mar", onTime: 97, atRisk: 2, breached: 1 },
  { month: "Apr", onTime: 92, atRisk: 6, breached: 2 },
  { month: "May", onTime: 98, atRisk: 2, breached: 0 },
  { month: "Jun", onTime: 95, atRisk: 4, breached: 1 },
  { month: "Jul", onTime: 98.4, atRisk: 1.2, breached: 0.4 },
];

export const monthlyFulfillmentData = [
  { month: "Jan", target: 20, fulfilled: 18 },
  { month: "Feb", target: 22, fulfilled: 22 },
  { month: "Mar", target: 25, fulfilled: 26 },
  { month: "Apr", target: 22, fulfilled: 20 },
  { month: "May", target: 30, fulfilled: 31 },
  { month: "Jun", target: 32, fulfilled: 35 },
  { month: "Jul", target: 28, fulfilled: 28 },
];

export const upcomingInterviewsData = [
  {
    id: "INT-101",
    candidate: "Dr. Aris Vance",
    role: "Lead GenAI Engineer",
    demandId: "DEM-2024-002",
    time: "Today, 2:30 PM",
    interviewer: "Sarah Jenkins (DD)",
    status: "Confirmed"
  },
  {
    id: "INT-102",
    candidate: "Elena Rostova",
    role: "Senior Cloud Architect",
    demandId: "DEM-2024-001",
    time: "Tomorrow, 10:00 AM",
    interviewer: "Marcus Vance (Practice Head)",
    status: "Confirmed"
  },
  {
    id: "INT-103",
    candidate: "Michael Chen",
    role: "SAP S/4HANA Lead",
    demandId: "DEM-2024-003",
    time: "Tomorrow, 4:00 PM",
    interviewer: "David Ross (DD)",
    status: "Scheduled"
  }
];

export const aiRecommendationsData = [
  {
    id: "REC-01",
    title: "Reallocate 2 Bench Engineers to JPMC",
    impact: "+$180k Revenue",
    description: "RES-104 & RES-109 match JPMC Cloud specs with 94% skill overlap. Reduces SLA aging by 4 days.",
    type: "Staffing Optimization"
  },
  {
    id: "REC-02",
    title: "Approve Novartis SLA Extension",
    impact: "Avoid $50k SLA Penalty",
    description: "Validation warning on rate card alignment resolved by PM. Ready for final DD signature.",
    type: "Governance"
  }
];
