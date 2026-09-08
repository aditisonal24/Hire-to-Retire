import React, { useState } from "react";
import { StatusChip } from "./StatusChip";
import { 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Circle, 
  XCircle, 
  Briefcase, 
  Award, 
  Sparkles, 
  Send, 
  FileText, 
  GitCommit, 
  MessageSquare,
  Layers,
  ArrowRight,
  Filter,
  Check
} from "lucide-react";

export type RecruitmentWorkflowStage = 
  | "Profile Shared"
  | "L1 Scheduled"
  | "L1 Completed"
  | "L2 Scheduled"
  | "L2 Completed"
  | "Client Interview Pending"
  | "Client Interview Completed"
  | "Internal Approval Pending"
  | "Approved"
  | "Offer Initiated"
  | "Offer Released"
  | "Offer Accepted"
  | "Yet To Join"
  | "Joined"
  | "Rejected"
  | "Backup"
  | "Withdrawn";

export interface TimelineStage {
  stageName: string;
  status: "Completed" | "Active" | "Pending" | "Skipped" | "Rejected";
  date?: string;
  owner?: string;
  remarks?: string;
  ageingDays?: number;
}

export interface StageHistoryItem {
  stage: string;
  scheduledDate: string;
  completedDate: string;
  ageing: string;
  updatedBy: string;
}

export interface InterviewPanelItem {
  round: string;
  interviewer: string;
  status: "Completed" | "Scheduled" | "Pending" | "Skipped" | "Rejected";
}

export interface OfferProgressStage {
  name: "Offer Initiated" | "Offer Released" | "Offer Accepted" | "Yet To Join" | "Joined";
  date: string;
  status: "Completed" | "Active" | "Pending";
}

export interface CandidateActivityLog {
  id: string;
  timestamp: string;
  author: string;
  message: string;
  type?: "system" | "user" | "interview" | "offer";
}

export interface FullCandidateData {
  id: string;
  name: string;
  avatar: string;
  source: "Internal" | "External";
  role: string;
  experience: string;
  skills: string[];
  recruiter: string;
  requirementId: string;
  matchPercentage: number;
  
  // Current recruitment state
  currentStage: RecruitmentWorkflowStage;
  currentStatus: RecruitmentWorkflowStage;
  stageAgeingDays: number;
  profileSharedDate: string;
  expectedJoiningDate: string;
  
  // Configured workflow preset
  workflowType: "Standard (L1+L2+Client)" | "Fast-Track (Skipped L2)" | "Direct Client (Skipped L2/Client)";
  
  // Journey & History
  timeline: TimelineStage[];
  stageHistory: StageHistoryItem[];
  interviewPanels: InterviewPanelItem[];
  
  // Offer & Joining
  offerProgress: OfferProgressStage[];
  joiningInfo: {
    offerAcceptanceDate: string;
    expectedJoiningDate: string;
    actualJoiningDate: string;
    onboardingStatus: string;
  };
  
  // Activity
  activities: CandidateActivityLog[];
}

interface DemandDrillDownTableProps {
  demandId?: string;
  project?: string;
  role?: string;
  positions?: number | string;
  status?: string;
  currentStage?: string;
  progress?: number;
  agingDays?: number;
  lastUpdated?: string;
  initiallyExpanded?: boolean;
}

export const DemandDrillDownTable: React.FC<DemandDrillDownTableProps> = ({
  demandId = "REQ-2026-1042",
  project = "Retail Omni-Channel Redesign",
  role = "Senior Frontend Engineer",
  positions = 3,
  status = "Active Hiring",
  currentStage = "Candidate Interviews",
  progress = 65,
  agingDays = 14,
  lastUpdated = "Today • 2 hrs ago",
  initiallyExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initiallyExpanded);
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>("CAND-201");
  const [activeCandidateTab, setActiveCandidateTab] = useState<"timeline" | "history" | "panels" | "offer" | "activity">("timeline");

  // Sample multi-level enterprise candidates with complete drill-down profiles
  const [candidatesList, setCandidatesList] = useState<FullCandidateData[]>([
    {
      id: "CAND-201",
      name: "Divya Nair",
      avatar: "DN",
      source: "Internal",
      role: role || "Senior Frontend Engineer",
      experience: "7+ Years",
      skills: ["React 18", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Next.js"],
      recruiter: "Sarah Jenkins (Talent Mobility)",
      requirementId: demandId,
      matchPercentage: 94,
      currentStage: "Joined",
      currentStatus: "Joined",
      stageAgeingDays: 0,
      profileSharedDate: "12 Jul 2026",
      expectedJoiningDate: "26 Jul 2026",
      workflowType: "Standard (L1+L2+Client)",
      timeline: [
        { stageName: "Profile Shared", status: "Completed", date: "12 Jul 2026", owner: "Talent Mobility", remarks: "Internal mobility application approved by RM" },
        { stageName: "L1 Interview", status: "Completed", date: "15 Jul 2026", owner: "Rahul Sharma", remarks: "Strong JavaScript fundamentals & System Design" },
        { stageName: "L2 Interview", status: "Completed", date: "18 Jul 2026", owner: "Anita Rao", remarks: "Cleared architecture and state management assessment" },
        { stageName: "Client Interview", status: "Completed", date: "21 Jul 2026", owner: "ABC Retail Panel", remarks: "Client lead gave top rating (5/5)" },
        { stageName: "Internal Approval", status: "Completed", date: "22 Jul 2026", owner: "Delivery Director", remarks: "Approved for billing transfer" },
        { stageName: "Offer Initiated", status: "Completed", date: "22 Jul 2026", owner: "HR Operations", remarks: "Internal compensation transfer generated" },
        { stageName: "Offer Released", status: "Completed", date: "23 Jul 2026", owner: "HR Operations", remarks: "Release document dispatched" },
        { stageName: "Offer Accepted", status: "Completed", date: "24 Jul 2026", owner: "Divya Nair", remarks: "Offer accepted online" },
        { stageName: "Yet To Join", status: "Completed", date: "25 Jul 2026", owner: "HR Onboarding", remarks: "Pre-joining clearance completed" },
        { stageName: "Joined", status: "Completed", date: "26 Jul 2026", owner: "HR Onboarding", remarks: "Onboarded and workstation provisioned" }
      ],
      stageHistory: [
        { stage: "Profile Shared", scheduledDate: "12 Jul 2026", completedDate: "12 Jul 2026", ageing: "1 Day", updatedBy: "Sarah Jenkins" },
        { stage: "L1 Technical", scheduledDate: "14 Jul 2026", completedDate: "15 Jul 2026", ageing: "2 Days", updatedBy: "Rahul Sharma" },
        { stage: "L2 Architecture", scheduledDate: "17 Jul 2026", completedDate: "18 Jul 2026", ageing: "2 Days", updatedBy: "Anita Rao" },
        { stage: "Client Interview", scheduledDate: "20 Jul 2026", completedDate: "21 Jul 2026", ageing: "2 Days", updatedBy: "ABC Retail Panel" },
        { stage: "Internal Approval", scheduledDate: "22 Jul 2026", completedDate: "22 Jul 2026", ageing: "1 Day", updatedBy: "Delivery Director" },
        { stage: "Offer Released", scheduledDate: "23 Jul 2026", completedDate: "23 Jul 2026", ageing: "1 Day", updatedBy: "HR Ops" },
        { stage: "Joined", scheduledDate: "26 Jul 2026", completedDate: "26 Jul 2026", ageing: "0 Days", updatedBy: "HR Onboarding" }
      ],
      interviewPanels: [
        { round: "L1 Technical Round", interviewer: "Rahul Sharma (Lead Architect)", status: "Completed" },
        { round: "L2 Architecture Round", interviewer: "Anita Rao (Principal Director)", status: "Completed" },
        { round: "Client Interview", interviewer: "ABC Retail Panel (John Miller & Team)", status: "Completed" }
      ],
      offerProgress: [
        { name: "Offer Initiated", date: "22 Jul 2026", status: "Completed" },
        { name: "Offer Released", date: "23 Jul 2026", status: "Completed" },
        { name: "Offer Accepted", date: "24 Jul 2026", status: "Completed" },
        { name: "Yet To Join", date: "25 Jul 2026", status: "Completed" },
        { name: "Joined", date: "26 Jul 2026", status: "Completed" }
      ],
      joiningInfo: {
        offerAcceptanceDate: "24 Jul 2026",
        expectedJoiningDate: "26 Jul 2026",
        actualJoiningDate: "26 Jul 2026",
        onboardingStatus: "Fully Onboarded & Active"
      },
      activities: [
        { id: "A1", timestamp: "12 Jul • 10:00 AM", author: "Sarah Jenkins", message: "Talent Mobility shared internal profile for REQ-2026-1042.", type: "system" },
        { id: "A2", timestamp: "15 Jul • 02:30 PM", author: "Rahul Sharma", message: "L1 Technical completed. Rating 4.8/5. Excellent React & TypeScript skills.", type: "interview" },
        { id: "A3", timestamp: "18 Jul • 04:00 PM", author: "Anita Rao", message: "L2 Architecture completed. Recommended for client round.", type: "interview" },
        { id: "A4", timestamp: "21 Jul • 11:15 AM", author: "ABC Retail Panel", message: "Client interview cleared. Approved by Client Engineering Director.", type: "interview" },
        { id: "A5", timestamp: "23 Jul • 03:00 PM", author: "HR Operations", message: "Offer released officially via portal.", type: "offer" },
        { id: "A6", timestamp: "24 Jul • 05:20 PM", author: "Divya Nair", message: "Offer accepted by candidate.", type: "offer" },
        { id: "A7", timestamp: "26 Jul • 09:00 AM", author: "HR Onboarding", message: "Candidate officially joined team.", type: "system" }
      ]
    },
    {
      id: "CAND-202",
      name: "Sunita Joshi",
      avatar: "SJ",
      source: "External",
      role: role || "Senior Frontend Engineer",
      experience: "5 Years",
      skills: ["React", "JavaScript ES6+", "CSS Modules", "Webpack", "REST APIs"],
      recruiter: "Marcus Vance (Staffing)",
      requirementId: demandId,
      matchPercentage: 88,
      currentStage: "Client Interview Pending",
      currentStatus: "Client Interview Pending",
      stageAgeingDays: 4,
      profileSharedDate: "18 Jul 2026",
      expectedJoiningDate: "20 Aug 2026",
      workflowType: "Standard (L1+L2+Client)",
      timeline: [
        { stageName: "Profile Shared", status: "Completed", date: "18 Jul 2026", owner: "Marcus Vance", remarks: "External candidate sourced via LinkedIn" },
        { stageName: "L1 Interview", status: "Completed", date: "21 Jul 2026", owner: "David Vance", remarks: "Cleared coding exercise with strong scores" },
        { stageName: "L2 Interview", status: "Completed", date: "23 Jul 2026", owner: "Vikram Sharma", remarks: "Cleared system design round" },
        { stageName: "Client Interview", status: "Active", date: "Pending Slot", owner: "ABC Retail Tech Panel", remarks: "Slot requested with client hiring manager; pending confirmation", ageingDays: 4 },
        { stageName: "Internal Approval", status: "Pending", owner: "Delivery Director" },
        { stageName: "Offer Initiated", status: "Pending", owner: "HR Operations" },
        { stageName: "Offer Released", status: "Pending", owner: "HR Operations" },
        { stageName: "Offer Accepted", status: "Pending", owner: "Sunita Joshi" },
        { stageName: "Yet To Join", status: "Pending", owner: "HR Onboarding" },
        { stageName: "Joined", status: "Pending", owner: "HR Onboarding" }
      ],
      stageHistory: [
        { stage: "Profile Shared", scheduledDate: "18 Jul 2026", completedDate: "18 Jul 2026", ageing: "1 Day", updatedBy: "Marcus Vance" },
        { stage: "L1 Technical", scheduledDate: "20 Jul 2026", completedDate: "21 Jul 2026", ageing: "2 Days", updatedBy: "David Vance" },
        { stage: "L2 Architecture", scheduledDate: "22 Jul 2026", completedDate: "23 Jul 2026", ageing: "2 Days", updatedBy: "Vikram Sharma" }
      ],
      interviewPanels: [
        { round: "L1 Technical Round", interviewer: "David Vance (Engineering Mgr)", status: "Completed" },
        { round: "L2 Architecture Round", interviewer: "Vikram Sharma (Tech Lead)", status: "Completed" },
        { round: "Client Interview", interviewer: "ABC Retail Tech Panel", status: "Pending" }
      ],
      offerProgress: [
        { name: "Offer Initiated", date: "Pending", status: "Pending" },
        { name: "Offer Released", date: "Pending", status: "Pending" },
        { name: "Offer Accepted", date: "Pending", status: "Pending" },
        { name: "Yet To Join", date: "Pending", status: "Pending" },
        { name: "Joined", date: "Pending", status: "Pending" }
      ],
      joiningInfo: {
        offerAcceptanceDate: "Pending",
        expectedJoiningDate: "20 Aug 2026",
        actualJoiningDate: "TBD",
        onboardingStatus: "Pre-Hire Verification Pending"
      },
      activities: [
        { id: "A10", timestamp: "18 Jul • 11:30 AM", author: "Marcus Vance", message: "Profile shared with hiring manager.", type: "system" },
        { id: "A11", timestamp: "21 Jul • 03:00 PM", author: "David Vance", message: "L1 Technical completed. Strong React foundations.", type: "interview" },
        { id: "A12", timestamp: "23 Jul • 05:15 PM", author: "Vikram Sharma", message: "L2 Architecture cleared. Escalating to client panel for slot.", type: "interview" },
        { id: "A13", timestamp: "24 Jul • 10:00 AM", author: "Marcus Vance", message: "Client interview requested with ABC Retail Manager.", type: "user" }
      ]
    },
    {
      id: "CAND-203",
      name: "Amit Kumar",
      avatar: "AK",
      source: "External",
      role: role || "Senior Frontend Engineer",
      experience: "6 Years",
      skills: ["React", "Redux", "GraphQL", "Jest", "Micro-frontends"],
      recruiter: "Priya Sharma (Staffing)",
      requirementId: demandId,
      matchPercentage: 82,
      currentStage: "L1 Scheduled",
      currentStatus: "L1 Scheduled",
      stageAgeingDays: 2,
      profileSharedDate: "23 Jul 2026",
      expectedJoiningDate: "01 Sep 2026",
      workflowType: "Fast-Track (Skipped L2)",
      timeline: [
        { stageName: "Profile Shared", status: "Completed", date: "23 Jul 2026", owner: "Priya Sharma", remarks: "Shortlisted for Fast-Track evaluation" },
        { stageName: "L1 Interview", status: "Active", date: "28 Jul 2026", owner: "Rajesh Patel", remarks: "Scheduled for 28 Jul 2:00 PM", ageingDays: 2 },
        { stageName: "L2 Interview", status: "Skipped", owner: "N/A", remarks: "Skipped via Fast-Track Approval" },
        { stageName: "Client Interview", status: "Pending", owner: "ABC Retail Panel" },
        { stageName: "Internal Approval", status: "Pending", owner: "Delivery Director" },
        { stageName: "Offer Initiated", status: "Pending", owner: "HR Operations" },
        { stageName: "Offer Released", status: "Pending", owner: "HR Operations" },
        { stageName: "Offer Accepted", status: "Pending", owner: "Amit Kumar" },
        { stageName: "Yet To Join", status: "Pending", owner: "HR Onboarding" },
        { stageName: "Joined", status: "Pending", owner: "HR Onboarding" }
      ],
      stageHistory: [
        { stage: "Profile Shared", scheduledDate: "23 Jul 2026", completedDate: "23 Jul 2026", ageing: "1 Day", updatedBy: "Priya Sharma" }
      ],
      interviewPanels: [
        { round: "L1 Technical Round", interviewer: "Rajesh Patel (Senior Architect)", status: "Scheduled" },
        { round: "L2 Architecture Round", interviewer: "Skipped (Fast-Track)", status: "Skipped" },
        { round: "Client Interview", interviewer: "ABC Retail Tech Panel", status: "Pending" }
      ],
      offerProgress: [
        { name: "Offer Initiated", date: "Pending", status: "Pending" },
        { name: "Offer Released", date: "Pending", status: "Pending" },
        { name: "Offer Accepted", date: "Pending", status: "Pending" },
        { name: "Yet To Join", date: "Pending", status: "Pending" },
        { name: "Joined", date: "Pending", status: "Pending" }
      ],
      joiningInfo: {
        offerAcceptanceDate: "Pending",
        expectedJoiningDate: "01 Sep 2026",
        actualJoiningDate: "TBD",
        onboardingStatus: "Not Started"
      },
      activities: [
        { id: "A20", timestamp: "23 Jul • 09:15 AM", author: "Priya Sharma", message: "Profile submitted by staffing partner.", type: "system" },
        { id: "A21", timestamp: "24 Jul • 02:00 PM", author: "Priya Sharma", message: "L1 interview scheduled with Rajesh Patel for 28 Jul.", type: "interview" }
      ]
    },
    {
      id: "CAND-204",
      name: "Vikram Singh",
      avatar: "VS",
      source: "Internal",
      role: role || "Senior Frontend Engineer",
      experience: "8 Years",
      skills: ["React", "Kubernetes", "Scala", "System Design"],
      recruiter: "Sarah Jenkins (Talent Mobility)",
      requirementId: demandId,
      matchPercentage: 76,
      currentStage: "Rejected",
      currentStatus: "Rejected",
      stageAgeingDays: 5,
      profileSharedDate: "10 Jul 2026",
      expectedJoiningDate: "—",
      workflowType: "Standard (L1+L2+Client)",
      timeline: [
        { stageName: "Profile Shared", status: "Completed", date: "10 Jul 2026", owner: "Sarah Jenkins", remarks: "Internal transfer request" },
        { stageName: "L1 Interview", status: "Completed", date: "13 Jul 2026", owner: "David Vance", remarks: "Cleared with minor state management feedback" },
        { stageName: "L2 Interview", status: "Rejected", date: "16 Jul 2026", owner: "Anita Rao", remarks: "Not recommended due to architectural skill mismatch" },
        { stageName: "Client Interview", status: "Skipped", owner: "N/A" },
        { stageName: "Internal Approval", status: "Skipped", owner: "N/A" },
        { stageName: "Offer Initiated", status: "Skipped", owner: "N/A" },
        { stageName: "Offer Released", status: "Skipped", owner: "N/A" },
        { stageName: "Offer Accepted", status: "Skipped", owner: "N/A" },
        { stageName: "Yet To Join", status: "Skipped", owner: "N/A" },
        { stageName: "Joined", status: "Skipped", owner: "N/A" }
      ],
      stageHistory: [
        { stage: "Profile Shared", scheduledDate: "10 Jul 2026", completedDate: "10 Jul 2026", ageing: "1 Day", updatedBy: "Sarah Jenkins" },
        { stage: "L1 Technical", scheduledDate: "12 Jul 2026", completedDate: "13 Jul 2026", ageing: "2 Days", updatedBy: "David Vance" },
        { stage: "L2 Architecture", scheduledDate: "15 Jul 2026", completedDate: "16 Jul 2026", ageing: "2 Days", updatedBy: "Anita Rao (Rejected)" }
      ],
      interviewPanels: [
        { round: "L1 Technical Round", interviewer: "David Vance (Engineering Mgr)", status: "Completed" },
        { round: "L2 Architecture Round", interviewer: "Anita Rao (Principal Director)", status: "Rejected" }
      ],
      offerProgress: [
        { name: "Offer Initiated", date: "N/A", status: "Pending" },
        { name: "Offer Released", date: "N/A", status: "Pending" },
        { name: "Offer Accepted", date: "N/A", status: "Pending" },
        { name: "Yet To Join", date: "N/A", status: "Pending" },
        { name: "Joined", date: "N/A", status: "Pending" }
      ],
      joiningInfo: {
        offerAcceptanceDate: "N/A",
        expectedJoiningDate: "N/A",
        actualJoiningDate: "N/A",
        onboardingStatus: "Archived / Rejected"
      },
      activities: [
        { id: "A30", timestamp: "10 Jul • 04:00 PM", author: "Sarah Jenkins", message: "Profile shared for internal consideration.", type: "system" },
        { id: "A31", timestamp: "13 Jul • 11:00 AM", author: "David Vance", message: "L1 cleared.", type: "interview" },
        { id: "A32", timestamp: "16 Jul • 02:00 PM", author: "Anita Rao", message: "L2 evaluation not cleared due to gap in cloud architecture prerequisites.", type: "interview" }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = (candidateId: string) => {
    if (!newComment.trim()) return;
    setCandidatesList((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const newAct: CandidateActivityLog = {
            id: `ACT-${Date.now()}`,
            timestamp: "Just now",
            author: "You (Logged-in User)",
            message: newComment.trim(),
            type: "user"
          };
          return {
            ...c,
            activities: [newAct, ...c.activities]
          };
        }
        return c;
      })
    );
    setNewComment("");
  };

  const handleSwitchWorkflow = (candidateId: string, newWorkflow: FullCandidateData["workflowType"]) => {
    setCandidatesList((prev) =>
      prev.map((c) => {
        if (c.id !== candidateId) return c;

        let updatedTimeline = [...c.timeline];
        if (newWorkflow === "Fast-Track (Skipped L2)") {
          updatedTimeline = updatedTimeline.map((stg) => {
            if (stg.stageName === "L2 Interview") {
              return { ...stg, status: "Skipped", remarks: "Skipped via Fast-Track Workflow" };
            }
            return stg;
          });
        } else if (newWorkflow === "Direct Client (Skipped L2/Client)") {
          updatedTimeline = updatedTimeline.map((stg) => {
            if (stg.stageName === "L2 Interview" || stg.stageName === "Client Interview") {
              return { ...stg, status: "Skipped", remarks: "Waived by Direct Client Approval" };
            }
            return stg;
          });
        }
        return {
          ...c,
          workflowType: newWorkflow,
          timeline: updatedTimeline
        };
      })
    );
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden transition-all">
      {/* 1. Demand Summary Top Bar */}
      <div className="p-4 bg-slate-50/90 border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Demand ID</span>
            <span className="font-extrabold text-[#1D4F91] text-sm">{demandId}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Project</span>
            <span className="font-bold text-[#111827]">{project}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Role</span>
            <span className="font-bold text-[#111827]">{role}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Positions</span>
            <span className="font-bold text-[#111827]">{positions} FTE</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Progress</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <span className="font-bold text-emerald-700">{progress}%</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Aging</span>
            <span className="font-bold text-slate-700">{agingDays} Days</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Last Updated</span>
            <span className="text-slate-500 font-medium">{lastUpdated}</span>
          </div>
        </div>

        {/* Action Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3.5 py-1.5 bg-white border border-[#E5E7EB] hover:bg-slate-100 rounded-lg text-xs font-bold text-[#1D4F91] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <span>{isExpanded ? "Collapse Candidates" : "View Candidate Pipeline"}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Expanded Candidate Drill-down Area (Level 2) */}
      {isExpanded && (
        <div className="p-4 bg-[#F8FAFC]/60 space-y-4 animate-in fade-in duration-200 border-t border-[#E5E7EB]">
          
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#111827]">
              <Users className="w-4 h-4 text-[#1D4F91]" />
              <span>Candidate Pipeline ({candidatesList.length} Active Candidates)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Configurable Recruitment Workflow Active</span>
            </div>
          </div>

          {/* LEVEL 2: Candidate Pipeline Table */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4">Ageing (In Stage)</th>
                    <th className="py-3 px-4">Profile Shared Date</th>
                    <th className="py-3 px-4">Expected Joining</th>
                    <th className="py-3 px-4 text-right">Expand Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[#111827]">
                  {candidatesList.map((cand) => {
                    const isCandExpanded = expandedCandidateId === cand.id;

                    return (
                      <React.Fragment key={cand.id}>
                        <tr 
                          onClick={() => setExpandedCandidateId(isCandExpanded ? null : cand.id)}
                          className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                            isCandExpanded ? "bg-blue-50/40 border-l-4 border-l-[#1D4F91]" : ""
                          }`}
                        >
                          {/* 1. Candidate */}
                          <td className="py-3.5 px-4 font-bold">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#1D4F91]/10 text-[#1D4F91] font-extrabold text-xs flex items-center justify-center shrink-0 border border-blue-200">
                                {cand.avatar}
                              </div>
                              <div>
                                <span className="text-[#111827] font-bold block hover:text-[#1D4F91] transition-colors">
                                  {cand.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-normal block">
                                  {cand.role}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* 2. Source */}
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              cand.source === "Internal" 
                                ? "bg-purple-50 text-purple-700 border border-purple-200" 
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}>
                              {cand.source}
                            </span>
                          </td>

                          {/* 3. Current Status */}
                          <td className="py-3.5 px-4">
                            <StatusChip status={cand.currentStatus} size="sm" />
                          </td>

                          {/* 4. Ageing (Calculated from current stage) */}
                          <td className="py-3.5 px-4 font-bold">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>{cand.stageAgeingDays} Days</span>
                            </div>
                          </td>

                          {/* 5. Profile Shared Date */}
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {cand.profileSharedDate}
                          </td>

                          {/* 6. Expected Joining Date */}
                          <td className="py-3.5 px-4 font-bold text-slate-800">
                            {cand.expectedJoiningDate}
                          </td>

                          {/* 7. Expand Details Button */}
                          <td className="py-3.5 px-4 text-right">
                            <button className="text-[#1D4F91] hover:underline font-bold text-xs inline-flex items-center gap-1 cursor-pointer">
                              <span>{isCandExpanded ? "Collapse" : "Details"}</span>
                              {isCandExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>

                        {/* LEVEL 3: Detailed Candidate Tracking Panel */}
                        {isCandExpanded && (
                          <tr className="bg-[#F8FAFC]">
                            <td colSpan={7} className="p-4 border-t-2 border-blue-200">
                              <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-md p-5 space-y-6">
                                
                                {/* A. Candidate Summary Header */}
                                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-[#1D4F91] text-white font-black text-base flex items-center justify-center shadow-xs">
                                      {cand.avatar}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-[#111827]">{cand.name}</h3>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-[#1D4F91]">
                                          {cand.matchPercentage}% Requirement Match
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        {cand.experience} Experience • Source: <strong className="text-slate-700">{cand.source}</strong> • Recruiter: <strong className="text-slate-700">{cand.recruiter}</strong>
                                      </p>
                                    </div>
                                  </div>

                                  {/* Ageing & Completed Stage Dates Summary Box */}
                                  <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-[#E5E7EB]">
                                    <div className="border-r border-slate-200 pr-4">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Stage Ageing</span>
                                      <span className="text-sm font-extrabold text-amber-700 flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-amber-600" />
                                        {cand.stageAgeingDays} Days in {cand.currentStage}
                                      </span>
                                    </div>

                                    <div>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Configured Workflow</span>
                                      <div className="relative mt-0.5">
                                        <select
                                          value={cand.workflowType}
                                          onChange={(e) => handleSwitchWorkflow(cand.id, e.target.value as any)}
                                          className="text-xs font-bold text-[#1D4F91] bg-blue-50/80 border border-blue-200 rounded px-2 py-1 focus:outline-none cursor-pointer"
                                        >
                                          <option value="Standard (L1+L2+Client)">Standard (L1 + L2 + Client)</option>
                                          <option value="Fast-Track (Skipped L2)">Fast-Track (Skipped L2)</option>
                                          <option value="Direct Client (Skipped L2/Client)">Direct Client (Skipped L2/Client)</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* B. Skills Tags */}
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="font-bold text-slate-500">Candidate Skills:</span>
                                  {cand.skills.map((sk) => (
                                    <span key={sk} className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-md font-semibold text-[11px]">
                                      {sk}
                                    </span>
                                  ))}
                                </div>

                                {/* Navigation Sub-Tabs inside Level 3 */}
                                <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2 overflow-x-auto text-xs">
                                  {[
                                    { id: "timeline", label: "Recruitment Journey Timeline", icon: GitCommit },
                                    { id: "history", label: `Stage History (${cand.stageHistory.length})`, icon: Clock },
                                    { id: "panels", label: `Interview Panels (${cand.interviewPanels.length})`, icon: UserCheck },
                                    { id: "offer", label: "Offer & Joining Progress", icon: Award },
                                    { id: "activity", label: `Comments & Activity (${cand.activities.length})`, icon: MessageSquare }
                                  ].map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeCandidateTab === tab.id;
                                    return (
                                      <button
                                        key={tab.id}
                                        onClick={() => setActiveCandidateTab(tab.id as any)}
                                        className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                                          isActive
                                            ? "bg-[#1D4F91] text-white shadow-2xs"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                      >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{tab.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* SUB-TAB 1: Vertical Recruitment Journey Timeline */}
                                {activeCandidateTab === "timeline" && (
                                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                                        <GitCommit className="w-4 h-4 text-[#1D4F91]" />
                                        <span>Dynamic Recruitment Journey Timeline</span>
                                      </h4>
                                      <span className="text-[11px] text-slate-500">
                                        Active Stage: <strong className="text-[#1D4F91]">{cand.currentStage}</strong> ({cand.stageAgeingDays} Days Ageing)
                                      </span>
                                    </div>

                                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                                      {cand.timeline.map((stg, idx) => {
                                        const isCompleted = stg.status === "Completed";
                                        const isActive = stg.status === "Active";
                                        const isSkipped = stg.status === "Skipped";
                                        const isRejected = stg.status === "Rejected";

                                        return (
                                          <div key={idx} className="relative flex items-start justify-between gap-4 group">
                                            {/* Node Circle Icon */}
                                            <div className="absolute -left-6 top-0.5">
                                              {isCompleted ? (
                                                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-emerald-100 shadow-2xs">
                                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                </div>
                                              ) : isActive ? (
                                                <div className="w-5 h-5 rounded-full bg-[#1D4F91] text-white flex items-center justify-center ring-4 ring-blue-100 animate-pulse shadow-2xs">
                                                  <Circle className="w-3 h-3 fill-current" />
                                                </div>
                                              ) : isRejected ? (
                                                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center ring-4 ring-red-100 shadow-2xs">
                                                  <XCircle className="w-3.5 h-3.5" />
                                                </div>
                                              ) : isSkipped ? (
                                                <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center">
                                                  <span className="text-[9px] font-bold">SKIP</span>
                                                </div>
                                              ) : (
                                                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                                                  <Circle className="w-2.5 h-2.5" />
                                                </div>
                                              )}
                                            </div>

                                            {/* Stage Info */}
                                            <div className="flex-1 bg-white p-3 rounded-lg border border-[#E5E7EB] shadow-2xs space-y-1">
                                              <div className="flex items-center justify-between">
                                                <span className={`text-xs font-bold ${
                                                  isCompleted ? "text-emerald-900" :
                                                  isActive ? "text-[#1D4F91]" :
                                                  isRejected ? "text-red-700" : "text-slate-600"
                                                }`}>
                                                  {stg.stageName}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                  {stg.date && (
                                                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                                      {stg.date}
                                                    </span>
                                                  )}
                                                  <StatusChip status={stg.status} size="sm" />
                                                </div>
                                              </div>

                                              {stg.owner && (
                                                <p className="text-[11px] text-slate-500">
                                                  Owner / Panel: <strong className="text-slate-700">{stg.owner}</strong>
                                                </p>
                                              )}

                                              {stg.remarks && (
                                                <p className="text-[11px] text-slate-600 italic bg-slate-50 p-1.5 rounded border border-slate-100 mt-1">
                                                  "{stg.remarks}"
                                                </p>
                                              )}

                                              {stg.ageingDays !== undefined && (
                                                <p className="text-[10px] font-bold text-amber-700 mt-1">
                                                  ⏱ Stage Ageing: {stg.ageingDays} Days
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* SUB-TAB 2: Stage History Table */}
                                {activeCandidateTab === "history" && (
                                  <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                                      Completed Stage History
                                    </h4>
                                    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white">
                                      <table className="w-full text-left text-xs">
                                        <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase text-[10px] border-b border-[#E5E7EB]">
                                          <tr>
                                            <th className="p-3">Stage</th>
                                            <th className="p-3">Scheduled Date</th>
                                            <th className="p-3">Completed Date</th>
                                            <th className="p-3">Ageing</th>
                                            <th className="p-3">Updated By</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-[#111827]">
                                          {cand.stageHistory.map((sh, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                              <td className="p-3 font-bold text-[#1D4F91]">{sh.stage}</td>
                                              <td className="p-3 text-slate-600">{sh.scheduledDate}</td>
                                              <td className="p-3 font-semibold text-emerald-800">{sh.completedDate}</td>
                                              <td className="p-3 font-bold text-amber-700">{sh.ageing}</td>
                                              <td className="p-3 text-slate-700 font-medium">{sh.updatedBy}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {/* SUB-TAB 3: Interview Panels */}
                                {activeCandidateTab === "panels" && (
                                  <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                                      Assigned Interview Panels
                                    </h4>
                                    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white">
                                      <table className="w-full text-left text-xs">
                                        <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase text-[10px] border-b border-[#E5E7EB]">
                                          <tr>
                                            <th className="p-3">Round</th>
                                            <th className="p-3">Interviewer</th>
                                            <th className="p-3">Status</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-[#111827]">
                                          {cand.interviewPanels.map((p, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                              <td className="p-3 font-bold text-[#111827]">{p.round}</td>
                                              <td className="p-3 font-medium text-slate-700">{p.interviewer}</td>
                                              <td className="p-3">
                                                <StatusChip status={p.status} size="sm" />
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {/* SUB-TAB 4: Offer Progress & Joining Info */}
                                {activeCandidateTab === "offer" && (
                                  <div className="space-y-6">
                                    {/* Horizontal Offer Progress */}
                                    <div className="p-4 bg-slate-50 rounded-xl border border-[#E5E7EB] space-y-3">
                                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                                        Offer Lifecycle Tracker
                                      </h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                                        {cand.offerProgress.map((op, idx) => {
                                          const isDone = op.status === "Completed";
                                          return (
                                            <div
                                              key={idx}
                                              className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                                                isDone
                                                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                                                  : "bg-white border-slate-200 text-slate-400"
                                              }`}
                                            >
                                              <span className="text-[10px] font-extrabold uppercase block tracking-wider">
                                                {op.name}
                                              </span>
                                              <span className="text-xs font-bold block">
                                                {op.date}
                                              </span>
                                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded inline-block ${
                                                isDone ? "bg-emerald-200 text-emerald-900" : "bg-slate-100 text-slate-500"
                                              }`}>
                                                {op.status}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Joining Information Grid */}
                                    <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] space-y-3">
                                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                                        Joining & Onboarding Summary
                                      </h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Offer Acceptance Date</span>
                                          <span className="font-bold text-[#111827] mt-0.5 block">{cand.joiningInfo.offerAcceptanceDate}</span>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Expected Joining Date</span>
                                          <span className="font-bold text-[#1D4F91] mt-0.5 block">{cand.joiningInfo.expectedJoiningDate}</span>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Actual Joining Date</span>
                                          <span className="font-bold text-emerald-800 mt-0.5 block">{cand.joiningInfo.actualJoiningDate}</span>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Onboarding Status</span>
                                          <span className="font-bold text-slate-800 mt-0.5 block">{cand.joiningInfo.onboardingStatus}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* SUB-TAB 5: Comments & Activity Stream */}
                                {activeCandidateTab === "activity" && (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                                        Chronological Activity & Comments
                                      </h4>
                                    </div>

                                    {/* Add Comment Input */}
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        placeholder="Add an activity update or recruitment note..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(cand.id)}
                                        className="flex-1 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:border-[#1D4F91]"
                                      />
                                      <button
                                        onClick={() => handleAddComment(cand.id)}
                                        className="px-4 py-2 bg-[#1D4F91] text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                      >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Post</span>
                                      </button>
                                    </div>

                                    {/* Activity List Stream */}
                                    <div className="space-y-2.5 pt-1">
                                      {cand.activities.map((act) => (
                                        <div key={act.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-start gap-3">
                                          <div className="p-1.5 bg-blue-100 text-[#1D4F91] rounded-full shrink-0 mt-0.5">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                              <span className="font-bold text-[#111827]">{act.author}</span>
                                              <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                                            </div>
                                            <p className="text-slate-600 mt-0.5">{act.message}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
