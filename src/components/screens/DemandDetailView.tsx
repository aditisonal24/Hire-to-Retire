import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Candidate360Modal } from "../common/Candidate360Modal";
import { DemandDrillDownTable } from "../common/DemandDrillDownTable";
import { 
  ArrowLeft, 
  Briefcase, 
  Clock, 
  Check, 
  AlertTriangle, 
  User, 
  ChevronRight, 
  MessageSquare, 
  ExternalLink,
  Users,
  Building2,
  Calendar,
  Layers,
  MapPin,
  FileText
} from "lucide-react";

export const DemandDetailView: React.FC = () => {
  const { selectedDemandId, demands, navigateTo, addToast } = useApp();

  const [candidateFilter, setCandidateFilter] = useState<"ALL" | "INTERVIEWS" | "SCREENING">("ALL");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [panelConfirmed, setPanelConfirmed] = useState(false);

  const demand = demands.find((d) => d.id === selectedDemandId) || demands[0];

  if (!demand) {
    return (
      <div className="p-8 text-center text-slate-500">
        Demand not found.{" "}
        <button onClick={() => navigateTo("demands")} className="text-[#1D4F91] underline font-bold">
          Return to Demands Registry
        </button>
      </div>
    );
  }

  // Sample Candidates matching the user's screenshot
  const candidatesList = [
    {
      id: "CAND-01",
      initials: "VS",
      name: "Vikram Singh",
      experience: "6 Years",
      location: "Remote",
      matchScore: "92%",
      stage: "L2 INTERVIEW",
      interviewDate: "-",
      status: "Pending",
      category: "INTERVIEWS"
    },
    {
      id: "CAND-02",
      initials: "PP",
      name: "Priya Patel",
      experience: "5 Years",
      location: "Remote",
      matchScore: "85%",
      stage: "L1 INTERVIEW",
      interviewDate: "-",
      status: "Pending",
      category: "INTERVIEWS"
    },
    {
      id: "CAND-03",
      initials: "AM",
      name: "Arjun Menon",
      experience: "7 Years",
      location: "Remote",
      matchScore: "95%",
      stage: "CUSTOMER INTERVIEW",
      interviewDate: "-",
      status: "Pending",
      category: "SCREENING"
    },
    {
      id: "CAND-04",
      initials: "SJ",
      name: "Sunita Joshi",
      experience: "5 Years",
      location: "Remote",
      matchScore: "88%",
      stage: "PROFILES SUBMITTED",
      interviewDate: "-",
      status: "Pending",
      category: "SCREENING"
    },
    {
      id: "CAND-05",
      initials: "KG",
      name: "Kartik Gupta",
      experience: "6 Years",
      location: "Remote",
      matchScore: "91%",
      stage: "ACCEPTED",
      interviewDate: "-",
      status: "Pending",
      category: "SCREENING"
    }
  ];

  const filteredCandidates = candidatesList.filter((c) => {
    if (candidateFilter === "INTERVIEWS") return c.category === "INTERVIEWS";
    if (candidateFilter === "SCREENING") return c.category === "SCREENING";
    return true;
  });

  // 10 Lifecycle Stages
  const lifecycleStages = [
    { step: 1, label: "DRAFT", status: "completed" },
    { step: 2, label: "SUBMITTED", status: "completed" },
    { step: 3, label: "PM REVIEW", status: "completed" },
    { step: 4, label: "TRACK HEAD", status: "completed" },
    { step: 5, label: "TALENT", status: "active" },
    { step: 6, label: "INTERVIEW", status: "pending" },
    { step: 7, label: "OFFER", status: "pending" },
    { step: 8, label: "JOINING", status: "pending" },
    { step: 9, label: "ALLOCATED", status: "pending" },
    { step: 10, label: "CLOSED", status: "pending" }
  ];

  const handleConfirmPanel = () => {
    setPanelConfirmed(true);
    addToast({
      title: "Interview Panel Confirmed",
      message: "Notification sent to Talent Acquisition to schedule customer interviews.",
      type: "success"
    });
  };

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* 1. BREADCRUMB & HEADER SECTION */}
      <div className="space-y-3">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
          <button onClick={() => navigateTo("dashboard")} className="hover:text-[#1D4F91] transition-colors">
            DASHBOARD
          </button>
          <span>/</span>
          <button onClick={() => navigateTo("demands")} className="hover:text-[#1D4F91] transition-colors">
            MY DEMANDS
          </button>
          <span>/</span>
          <span className="text-slate-700 font-bold">DEMAND WORKSPACE</span>
        </div>

        {/* Title and Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
              {demand.positionTitle || "Senior Frontend Engineer"}
            </h1>
            <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md font-mono text-xs font-bold text-slate-700">
              {demand.id || "REQ-2026-1042"}
            </span>
            <span className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-[11px] font-bold uppercase tracking-wide">
              {demand.priority || "HIGH"} PRIORITY
            </span>
          </div>

          {/* Right Header Stats */}
          <div className="flex items-center gap-8 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">TARGET START</span>
              <span className="font-bold text-[#111827]">{demand.expectedStartDate || "2026-08-15"}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">STATUS</span>
              <span className="font-bold text-[#1D4F91]">{demand.status || "Talent"}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">SLA / AGE</span>
              <span className="font-bold text-emerald-700 inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                4 Days Left / 12d Open
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEMAND SUMMARY CARD */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          <Briefcase className="w-4 h-4 text-slate-400" />
          <span>DEMAND SUMMARY</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-6 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">PROJECT</span>
            <span className="font-bold text-[#111827]">{demand.projectName || "Ghekko project"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">PROGRAM</span>
            <span className="font-bold text-[#111827]">{demand.program || "Digital Transformation"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">LOCATION</span>
            <span className="font-bold text-[#111827]">{demand.workLocation || "Bellandur, bangalore"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">EXPERIENCE</span>
            <span className="font-bold text-[#111827]">{demand.experienceRequired || "5-7 Years"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">BUDGET</span>
            <span className="font-bold text-emerald-700">{demand.budget || "20-25L"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">BILLABILITY</span>
            <span className="font-bold text-[#111827]">{demand.billability || "Billable"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">HIRING SOURCE</span>
            <span className="font-bold text-[#111827]">{demand.hiringSource || "External"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">TARGET START</span>
            <span className="font-bold text-[#111827]">{demand.expectedStartDate || "2026-08-15"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">BUSINESS UNIT</span>
            <span className="font-bold text-[#111827]">{demand.businessUnit || "Digital Transformation"}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] font-semibold">COST CENTER</span>
            <span className="font-bold text-[#111827]">{demand.costCenter || "CC-4091"}</span>
          </div>
        </div>
      </div>

      {/* 3. LIFECYCLE STATUS CARD */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-2xs space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>LIFECYCLE STATUS</span>
        </div>

        {/* 10-Step Horizontal Stepper */}
        <div className="relative py-2">
          {/* Connector Line */}
          <div className="absolute top-[22px] left-[4%] right-[4%] h-[2px] bg-slate-200 z-0" />

          <div className="relative z-10 grid grid-cols-10 gap-1 text-center">
            {lifecycleStages.map((st) => (
              <div key={st.step} className="flex flex-col items-center space-y-2">
                {st.status === "completed" ? (
                  <div className="w-9 h-9 rounded-full bg-[#1D4F91] text-white flex items-center justify-center font-bold shadow-2xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : st.status === "active" ? (
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-[#1D4F91] text-[#1D4F91] flex items-center justify-center font-bold text-sm shadow-2xs">
                    {st.step}
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center font-semibold text-xs">
                    {st.step}
                  </div>
                )}

                <span
                  className={`text-[10px] font-bold tracking-tight uppercase ${
                    st.status === "active"
                      ? "text-[#1D4F91]"
                      : st.status === "completed"
                      ? "text-[#111827]"
                      : "text-slate-400"
                  }`}
                >
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ALERT BANNER */}
      {!panelConfirmed ? (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-amber-500 shadow-2xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#111827]">
                Customer Interview Panel Required
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Waiting for your interview panel confirmation. Talent Acquisition cannot schedule customer interviews until the interview panel is confirmed.
              </p>
              <p className="text-xs font-bold text-red-600 mt-1">
                Target SLA breaches tomorrow.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleConfirmPanel}
              className="px-4 py-2 bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D] text-[#92400E] font-bold text-xs rounded-lg transition-colors shadow-2xs"
            >
              Confirm Interview Panel
            </button>
            <button
              onClick={() => addToast({ title: "Contacting TA", message: "Talent Partner notified via email.", type: "info" })}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-lg transition-colors shadow-2xs"
            >
              Contact Talent Partner
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Interview Panel confirmed! Talent Acquisition is now scheduling customer interviews.</span>
          </div>
        </div>
      )}

      {/* 5. MULTI-LEVEL DRILL-DOWN DATA TABLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            DEMAND DRILL-DOWN & PIPELINE STATUS
          </h2>
        </div>
        <DemandDrillDownTable
          demandId={demand.id || "REQ-1024"}
          project={demand.projectName || demand.project || "ABC Banking"}
          role={demand.positionTitle || "Java Developer"}
          positions={demand.requestedFTE || 3}
          status={demand.status || "Hiring in Progress"}
          currentStage={demand.approvalStage || "Candidate Interviews"}
          progress={65}
          agingDays={14}
          initiallyExpanded={true}
        />
      </div>

      {/* 6. CANDIDATE PIPELINE CARD */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              CANDIDATE PIPELINE
            </h3>
          </div>

          <button
            onClick={() => navigateTo("validation")}
            className="text-xs font-bold text-[#1D4F91] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View in Pipeline Board</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setCandidateFilter("ALL")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              candidateFilter === "ALL"
                ? "bg-slate-100 text-slate-800 border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            5 ACTIVE
          </button>
          <button
            onClick={() => setCandidateFilter("INTERVIEWS")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              candidateFilter === "INTERVIEWS"
                ? "bg-purple-100 text-purple-800 border border-purple-200"
                : "bg-purple-50/60 text-purple-700 hover:bg-purple-100/60"
            }`}
          >
            2 INTERVIEWS
          </button>
          <button
            onClick={() => setCandidateFilter("SCREENING")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              candidateFilter === "SCREENING"
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-blue-50/60 text-blue-700 hover:bg-blue-100/60"
            }`}
          >
            2 SCREENING
          </button>
        </div>

        {/* Candidate Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">CANDIDATE</th>
                <th className="py-3 px-4">EXPERIENCE</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">MATCH SCORE</th>
                <th className="py-3 px-4">CURRENT STAGE</th>
                <th className="py-3 px-4">INTERVIEW DATE</th>
                <th className="py-3 px-4">CURRENT STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[#111827]">
              {filteredCandidates.map((cand) => (
                <tr
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-bold">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {cand.initials}
                      </div>
                      <span className="text-[#111827]">{cand.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{cand.experience}</td>
                  <td className="py-3.5 px-4 text-slate-600">{cand.location}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-bold">
                      {cand.matchScore}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-bold uppercase">
                      {cand.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{cand.interviewDate}</td>
                  <td className="py-3.5 px-4 text-slate-600">{cand.status}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-2.5 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md font-semibold text-[11px] transition-colors"
                      >
                        Add Comment
                      </button>
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-2.5 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md font-semibold text-[11px] transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. HIRING ACTIVITY FEED CARD */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>HIRING ACTIVITY FEED</span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
          {/* Item 1 */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#1D4F91] ring-4 ring-white" />
            <div className="font-bold text-slate-400 text-[11px] mb-0.5">Today</div>
            <p className="text-slate-700">
              <strong className="font-bold text-[#111827]">Talent Partner</strong> requested customer interview panel confirmation.
            </p>
          </div>

          {/* Item 2 */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
            <div className="font-bold text-slate-400 text-[11px] mb-0.5">Yesterday</div>
            <p className="text-slate-700">
              <strong className="font-bold text-[#111827]">Talent Acquisition</strong> submitted two candidate profiles.
            </p>
          </div>

          {/* Item 3 */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
            <div className="font-bold text-slate-400 text-[11px] mb-0.5">2 Days Ago</div>
            <p className="text-slate-700">
              <strong className="font-bold text-[#111827]">Track Head</strong> approved demand.
            </p>
          </div>

          {/* Item 4 */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
            <div className="font-bold text-slate-400 text-[11px] mb-0.5">3 Days Ago</div>
            <p className="text-slate-700">
              Demand moved to <strong className="font-bold text-[#111827]">Talent Acquisition</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Candidate 360 Evaluation Dialog */}
      {selectedCandidate && (
        <Candidate360Modal
          candidate={selectedCandidate}
          demand={demand}
          onClose={() => setSelectedCandidate(null)}
          onAction={(actionType, cand) => {
            if (actionType === "advance") {
              addToast({
                title: "Candidate Approved",
                message: `${cand.name} approved and advanced to Customer Interview stage.`,
                type: "success"
              });
              setSelectedCandidate(null);
            } else if (actionType === "reject") {
              addToast({
                title: "Candidate Rejected",
                message: `${cand.name} status updated to Rejected.`,
                type: "info"
              });
              setSelectedCandidate(null);
            } else if (actionType === "schedule") {
              addToast({
                title: "Interview Request Sent",
                message: `Scheduling request sent to Talent Acquisition for ${cand.name}.`,
                type: "success"
              });
            } else if (actionType === "hold") {
              addToast({
                title: "Candidate Held",
                message: `${cand.name} put on hold.`,
                type: "info"
              });
              setSelectedCandidate(null);
            } else {
              addToast({
                title: "Action Recorded",
                message: `Action ${actionType} recorded for ${cand.name}.`,
                type: "info"
              });
            }
          }}
        />
      )}
    </div>
  );
};
