import React, { useState } from "react";
import { 
  X, 
  Briefcase, 
  FileText, 
  RotateCcw, 
  MessageSquare,
  Sparkles,
  UserCheck,
  UserX,
  Check,
  Calendar,
  Share2,
  MoreVertical,
  Clock,
  MapPin,
  Award,
  BrainCircuit,
  ShieldCheck,
  Download,
  ExternalLink,
  CheckCircle2,
  Send,
  Eye,
  SlidersHorizontal
} from "lucide-react";

interface Candidate360ModalProps {
  candidate: any;
  demand?: any;
  onClose: () => void;
  onAction?: (actionType: string, candidate: any) => void;
}

export const Candidate360Modal: React.FC<Candidate360ModalProps> = ({
  candidate,
  demand,
  onClose,
  onAction
}) => {
  const [viewMode, setViewMode] = useState<"evaluation" | "360_full">("evaluation");
  const [activeTab, setActiveTab] = useState<
    "overview" | "skills_ai" | "feedback" | "documents" | "activity_notes"
  >("overview");

  const [notes, setNotes] = useState("");
  const [noteList, setNoteList] = useState([
    {
      id: 1,
      author: "Vikram Mehta (Delivery Director)",
      date: "Today, 10:30 AM",
      text: "Strong profile and solid technical background. Recommended for immediate Customer Interview round once panel is locked."
    },
    {
      id: 2,
      author: "Ananya Sharma (Talent Acquisition)",
      date: "Yesterday, 3:15 PM",
      text: "Candidate verified profile against REQ requirements. Notice period aligned with project timeline."
    }
  ]);

  const [showOverflowMenu, setShowOverflowMenu] = useState(false);

  // Normalized Candidate Data
  const cand = {
    id: candidate?.id || "C-108",
    name: candidate?.name || "Amit Kumar",
    initials: candidate?.initials || (candidate?.name ? candidate.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "AK"),
    experience: candidate?.experience || "4 Years Experience",
    stage: candidate?.stage || "L1 Interview",
    matchScore: candidate?.matchScore || "92%",
    location: candidate?.location || "Bangalore, India (Hybrid)",
    targetRole: candidate?.targetRole || demand?.positionTitle || "UX Designer",
    demandId: candidate?.demandId || demand?.id || "REQ-2026-1044",
    skills: candidate?.skills || candidate?.primarySkills || ["Figma", "Sketch", "Prototyping"],
    secondarySkills: candidate?.secondarySkills || ["User Research", "Wireframing", "Design Systems", "Usability Testing"],
    feedbackStatus: candidate?.feedbackStatus || "Pending feedback completion",
    resumeName: candidate?.resumeName || "Resume_v2.pdf",
    customer: demand?.projectName ? `${demand.projectName} Client` : "Global Retail Corp",
    projectName: demand?.projectName || "Retail Omni-Channel Redesign",
    hiringManager: demand?.reportingManager || "Rajesh Kumar",
    recruiter: "Ananya Sharma",
    noticePeriod: "30 Days Notice",
    expectedCtc: candidate?.expectedCtc || "22.0 LPA"
  };

  const handleAddNote = () => {
    if (!notes.trim()) return;
    setNoteList([
      {
        id: Date.now(),
        author: "Delivery Director",
        date: "Just now",
        text: notes
      },
      ...noteList
    ]);
    setNotes("");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className={`bg-white rounded-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden transition-all duration-200 ${
          viewMode === "evaluation" ? "max-w-lg" : "max-w-5xl h-[92vh]"
        }`}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
              Candidate Evaluation
            </h2>
            <button
              onClick={() => setViewMode(viewMode === "evaluation" ? "360_full" : "evaluation")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1.5"
              title="Toggle Detailed 360 View"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#1D4F91]" />
              <span>{viewMode === "evaluation" ? "Expand 360 View" : "Compact View"}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          
          {/* ================= COMPACT EVALUATION VIEW (PER SCREENSHOT) ================= */}
          {viewMode === "evaluation" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Candidate Profile Info Header */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF3FF] border border-blue-100/80 text-[#1D4F91] font-extrabold text-lg flex items-center justify-center shrink-0 shadow-2xs">
                  {cand.initials}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight leading-none">
                    {cand.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {cand.experience}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-md border border-slate-200/60">
                      ID: {cand.id}
                    </span>
                    <span className="px-2.5 py-0.5 bg-blue-50 text-[#1D4F91] font-bold text-xs rounded-md border border-blue-100">
                      {cand.stage}
                    </span>
                  </div>
                </div>
              </div>

              {/* TARGET ROLE Box */}
              <div className="bg-[#F8FAFC] border border-slate-200/70 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  TARGET ROLE
                </span>

                <div className="flex items-center gap-2.5 font-bold text-sm text-[#0F172A]">
                  <Briefcase className="w-4 h-4 text-[#1D4F91] shrink-0" />
                  <span>{cand.targetRole} ({cand.demandId})</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {cand.skills.map((skill: string) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-white border border-slate-200/80 text-slate-700 font-medium text-xs rounded-lg shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* INTERVIEW TIMELINE & FEEDBACK */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100/80 text-[#1D4F91] text-[10px] font-bold rounded uppercase tracking-wider">
                    INTERVIEW
                  </span>
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    TIMELINE & FEEDBACK
                  </span>
                </div>

                <div className="pl-2 border-l-2 border-slate-100 space-y-4 pt-1">
                  {/* Step 1: Profiles Submitted */}
                  <div className="relative pl-5">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                    <h4 className="font-bold text-xs text-emerald-800">Profiles Submitted</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Talent Acquisition verified profile against Req.
                    </p>
                  </div>

                  {/* Step 2: L1/L2 Technical Interviews */}
                  <div className="relative pl-5">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#1D4F91] ring-4 ring-blue-50" />
                    <h4 className="font-bold text-xs text-[#1D4F91]">L1/L2 Technical Interviews</h4>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mt-2 text-xs text-slate-600 italic font-medium">
                      "{cand.feedbackStatus}"
                    </div>
                  </div>
                </div>
              </div>

              {/* DOCUMENTS */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  DOCUMENTS
                </span>

                <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#0F172A]">{cand.resumeName}</div>
                      <div className="text-[11px] text-slate-400 font-medium">View Candidate CV</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onAction && onAction("view_cv", cand)}
                    className="text-xs font-bold text-[#1D4F91] hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= EXPANDED 360 FULL VIEW ================= */}
          {viewMode === "360_full" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Section Tabs */}
              <div className="flex items-center gap-1 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "overview"
                      ? "bg-[#1D4F91] text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Overview & Fit</span>
                </button>

                <button
                  onClick={() => setActiveTab("skills_ai")}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "skills_ai"
                      ? "bg-[#1D4F91] text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Skills & AI Matrix</span>
                </button>

                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "feedback"
                      ? "bg-[#1D4F91] text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Interview Feedback</span>
                </button>

                <button
                  onClick={() => setActiveTab("activity_notes")}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "activity_notes"
                      ? "bg-[#1D4F91] text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Director Notes</span>
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-5 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Target Role</span>
                      <span className="font-bold text-[#0F172A]">{cand.targetRole}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Demand ID</span>
                      <span className="font-bold text-[#1D4F91]">{cand.demandId}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">AI Match Score</span>
                      <span className="font-bold text-emerald-700">{cand.matchScore} Match</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Notice Period</span>
                      <span className="font-bold text-amber-800">{cand.noticePeriod}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-2">
                      Full Requirement & Project Context
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div><span className="text-slate-400">Project:</span> <strong className="text-slate-800">{cand.projectName}</strong></div>
                      <div><span className="text-slate-400">Customer:</span> <strong className="text-slate-800">{cand.customer}</strong></div>
                      <div><span className="text-slate-400">Hiring Manager:</span> <strong className="text-slate-800">{cand.hiringManager}</strong></div>
                      <div><span className="text-slate-400">Expected CTC:</span> <strong className="text-emerald-700">{cand.expectedCtc}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Skills & AI */}
              {activeTab === "skills_ai" && (
                <div className="space-y-4 text-xs">
                  <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 space-y-2">
                    <span className="font-bold text-[#1D4F91] flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-[#1D4F91]" />
                      AI Technical Assessment Summary
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      Candidate shows strong alignment with core requirements. High proficiency in standard UI development workflows, design systems, and state architecture.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-500 font-bold block">PRIMARY SKILLS</span>
                    <div className="flex flex-wrap gap-2">
                      {cand.skills.map((sk: string) => (
                        <span key={sk} className="px-3 py-1 bg-blue-50 text-[#1D4F91] font-bold rounded-lg border border-blue-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-500 font-bold block">SECONDARY & DESIRABLE SKILLS</span>
                    <div className="flex flex-wrap gap-2">
                      {cand.secondarySkills.map((sk: string) => (
                        <span key={sk} className="px-3 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Feedback */}
              {activeTab === "feedback" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-bold text-sm text-[#0F172A]">L1 Technical Interview Feedback</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        Rating: 4.8 / 5
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Demonstrated solid technical execution, clean component abstraction, and strong architectural reasoning.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: Activity Notes */}
              {activeTab === "activity_notes" && (
                <div className="space-y-3 text-xs">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter notes or feedback..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-[#1D4F91] hover:bg-[#163e73] text-white font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Post Note
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {noteList.map((n) => (
                      <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>{n.author}</span>
                          <span className="text-slate-400 font-normal">{n.date}</span>
                        </div>
                        <p className="text-slate-600">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Sticky Footer Actions (Matching User Screenshot precisely) */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0 space-y-2.5">
          {/* Primary Screenshot Actions */}
          <div className="space-y-2">
            <button
              onClick={() => onAction && onAction("replace", cand)}
              className="w-full bg-[#1D4F91] hover:bg-[#163e73] text-white font-bold py-3 rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 text-sm active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Request Replacement</span>
            </button>

            <button
              onClick={() => onAction && onAction("clarify", cand)}
              className="w-full bg-white hover:bg-slate-50 text-[#0F172A] font-semibold py-2.5 rounded-xl border border-slate-200/90 transition-all text-sm flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4 text-slate-600" />
              <span>Clarify</span>
            </button>
          </div>

          {/* Quick Action Pills for Pipeline Stage Decisions */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
            <button
              onClick={() => onAction && onAction("reject", cand)}
              className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-colors flex items-center gap-1"
            >
              <UserX className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>

            <button
              onClick={() => onAction && onAction("schedule", cand)}
              className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Schedule Interview</span>
            </button>

            <button
              onClick={() => onAction && onAction("advance", cand)}
              className="px-3 py-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg font-bold transition-colors flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Approve Candidate</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
