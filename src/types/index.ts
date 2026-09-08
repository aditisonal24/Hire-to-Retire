export type DemandStatus = 
  | "Draft"
  | "Submitted"
  | "Validation"
  | "Approved"
  | "Staffing"
  | "Active"
  | "Closed"
  | "Rejected";

export type ApprovalStage = 
  | "Pending DD Review"
  | "Finance Review"
  | "PM Review"
  | "Regional Approval"
  | "Approved"
  | "Rejected";

export type PriorityLevel = "Critical" | "High" | "Medium" | "Low";

export type PracticeArea = 
  | "Cloud & DevOps"
  | "AI & Data"
  | "Enterprise Apps"
  | "Cybersecurity"
  | "Digital Engineering";

export type Geography = "North America" | "EMEA" | "APAC" | "LATAM";

export interface DemandAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  url?: string;
}

export interface Demand {
  id: string; // e.g., DEM-2024-001
  customer: string;
  project: string;
  revenue: number;
  cost: number;
  margin: number; // percentage e.g., 38.5
  practice: PracticeArea;
  geography: Geography;
  deliveryUnit: string;
  startDate: string;
  endDate: string;
  requestedFTE: number;
  assignedFTE: number;
  status: DemandStatus;
  approvalStage: ApprovalStage;
  priority: PriorityLevel;
  slaHoursLeft: number;
  slaStatus: "On Track" | "Warning" | "Breached";
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  attachments: DemandAttachment[];
  assignedResourceIds: string[];
  validationErrorCount: number;
}

export interface ValidationItem {
  id: string;
  demandId: string;
  customer: string;
  project: string;
  validationType: 
    | "Missing Mandatory Fields" 
    | "Duplicate Demand" 
    | "Resource Allocation Conflict" 
    | "Negative Margin Warning" 
    | "SLA Compliance Risk";
  severity: PriorityLevel;
  owner: string;
  slaTimer: string;
  status: "Failed" | "In Review" | "Resolved" | "Waived";
  description: string;
  recommendedFix: string;
  fieldDiff?: { field: string; currentValue: string; expectedValue: string }[];
}

export interface ApprovalComment {
  id: string;
  author: string;
  role: string;
  date: string;
  text: string;
  action: "Approve" | "Reject" | "Return for Rework" | "Comment";
}

export interface ApprovalItem {
  id: string;
  demandId: string;
  customer: string;
  project: string;
  revenue: number;
  margin: number;
  requestedFTE: number;
  stage: ApprovalStage;
  slaTimer: string;
  submittedBy: string;
  submittedDate: string;
  comments: ApprovalComment[];
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  primarySkill: string;
  secondarySkills: string[];
  experienceYears: number;
  location: string;
  practice: PracticeArea;
  costRate: number; // per hour
  billRate: number; // per hour
  utilizationPercent: number;
  allocationStatus: "Bench" | "Allocated" | "Partially Allocated" | "Reserved";
  availableFrom: string;
  currentProject?: string;
  email: string;
  avatar: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: "Demand Aging" | "Approval SLA" | "Revenue & Margin" | "Resource Utilization" | "Staffing Gaps";
  description: string;
  lastGenerated: string;
  schedule: "Daily" | "Weekly" | "Monthly" | "On Demand";
  format: "PDF" | "Excel" | "Interactive";
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userAvatar: string;
  userRole: string;
  action: string;
  module: "Demand Management" | "Validation Center" | "Approval Center" | "Resource Management" | "Financials" | "Settings";
  demandId?: string;
  previousValue: string;
  newValue: string;
  device: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: "Approval" | "Validation" | "Staffing" | "Financial" | "SLA" | "System";
  priority: PriorityLevel;
  read: boolean;
  actionLink?: string;
}

export interface Toast {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message?: string;
}

export type ViewScreen = 
  | "dashboard"
  | "demands"
  | "demand-detail"
  | "create-demand"
  | "validation"
  | "approvals"
  | "resources"
  | "financials"
  | "reports"
  | "notifications"
  | "audit-logs"
  | "settings";
