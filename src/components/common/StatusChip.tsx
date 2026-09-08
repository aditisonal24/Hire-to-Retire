import React from "react";
import { DemandStatus, ApprovalStage, PriorityLevel } from "../../types";

interface StatusChipProps {
  status: DemandStatus | ApprovalStage | PriorityLevel | string;
  size?: "sm" | "md";
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = "md" }) => {
  let styleClass = "bg-slate-100 text-slate-700 border-slate-200";

  const lower = status.toLowerCase().trim();

  // Candidate Recruitment Workflow Statuses
  if (lower === "profile shared" || lower === "oa") {
    styleClass = "bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE] font-semibold";
  } else if (lower === "l1 scheduled" || lower === "l2 scheduled") {
    styleClass = "bg-[#EFF6FF] text-[#1D4F91] border-[#BFDBFE] font-semibold";
  } else if (lower === "l1 completed" || lower === "l2 completed") {
    styleClass = "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0] font-semibold";
  } else if (lower === "client interview pending" || lower === "od" || lower === "waiting client") {
    styleClass = "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A] font-semibold";
  } else if (lower === "client interview completed") {
    styleClass = "bg-[#F0FDF4] text-[#166534] border-[#BBF7D0] font-semibold";
  } else if (lower === "internal approval pending" || lower === "pm review" || lower === "finance review") {
    styleClass = "bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE] font-semibold";
  } else if (lower === "offer initiated" || lower === "offer released") {
    styleClass = "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0] font-semibold";
  } else if (lower === "offer accepted" || lower === "yet to join" || lower === "joining confirmed") {
    styleClass = "bg-[#ECFDF5] text-[#065F46] border-[#6EE7B7] font-bold";
  } else if (lower === "joined" || lower === "approved" || lower === "active hiring" || lower === "active") {
    styleClass = "bg-[#065F46] text-white border-[#065F46] font-bold shadow-2xs";
  } else if (lower === "rejected" || lower === "failed" || lower === "critical" || lower === "closed") {
    styleClass = "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA] font-semibold";
  } else if (lower === "backup") {
    styleClass = "bg-[#F8FAFC] text-[#475569] border-[#CBD5E1] font-semibold";
  } else if (lower === "withdrawn") {
    styleClass = "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] font-semibold";
  } else if (lower === "draft") {
    styleClass = "bg-slate-100 text-slate-600 border-slate-200";
  } else if (lower === "submitted" || lower === "pending dd review") {
    styleClass = "bg-blue-50 text-[#024AD8] border-blue-200 font-semibold";
  } else if (lower === "validation") {
    styleClass = "bg-purple-50 text-purple-700 border-purple-200";
  } else if (lower === "staffing" || lower === "allocated") {
    styleClass = "bg-teal-50 text-teal-700 border-teal-200 font-semibold";
  } else if (lower === "high" || lower === "warning") {
    styleClass = "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
  } else if (lower === "medium") {
    styleClass = "bg-sky-50 text-sky-700 border-sky-200";
  } else if (lower === "low" || lower === "on track") {
    styleClass = "bg-slate-50 text-slate-700 border-slate-200";
  }

  const px = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border tracking-tight whitespace-nowrap ${px} ${styleClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {status}
    </span>
  );
};

