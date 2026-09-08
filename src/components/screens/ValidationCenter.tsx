import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Candidate360Modal } from "../common/Candidate360Modal";
import { 
  Search, 
  Filter, 
  Star, 
  ChevronDown, 
  ChevronRight
} from "lucide-react";

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  matchScore: number;
  reqId: string;
  role: string;
  project: string;
  program: string;
  stage: "profiles_submitted" | "l1_interview" | "l2_interview" | "customer_interview" | "offer";
  feedbackNote?: string;
  borderAccentColor: string;
  experience?: string;
  location?: string;
  skills?: string[];
  secondarySkills?: string[];
  noticePeriod?: string;
  expectedCtc?: string;
  resumeName?: string;
}

export const ValidationCenter: React.FC = () => {
  const { navigateTo, addToast } = useApp();

  const [search, setSearch] = useState("");
  const [selectedReq, setSelectedReq] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Recent");

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<Candidate | null>(null);

  // Initial candidate pipeline data
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "CAND-01",
      name: "Divya Nair",
      avatar: "DN",
      matchScore: 98,
      reqId: "REQ-2026-1043",
      role: "Cloud Solutions Architect",
      project: "Data Lake Migration",
      program: "Cloud Modernization",
      stage: "profiles_submitted",
      borderAccentColor: "border-indigo-500",
      experience: "8+ Years",
      location: "Bangalore, IN",
      skills: ["AWS", "Azure", "Terraform", "Kubernetes"],
      secondarySkills: ["Python", "Docker", "CI/CD"],
      noticePeriod: "30 Days",
      expectedCtc: "35 LPA",
      resumeName: "Divya_Nair_Cloud_Architect.pdf"
    },
    {
      id: "CAND-02",
      name: "Sunita Joshi",
      avatar: "SJ",
      matchScore: 88,
      reqId: "REQ-2026-1042",
      role: "Senior Frontend Engineer",
      project: "Retail Omni-Channel Redesign",
      program: "Digital Transformation",
      stage: "profiles_submitted",
      borderAccentColor: "border-indigo-500",
      experience: "6 Years",
      location: "Pune, IN",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      secondarySkills: ["Next.js", "Redux", "Jest"],
      noticePeriod: "15 Days",
      expectedCtc: "28 LPA",
      resumeName: "Sunita_Joshi_Frontend_Resume.pdf"
    },
    {
      id: "CAND-03",
      name: "Amit Kumar",
      avatar: "AK",
      matchScore: 89,
      reqId: "REQ-2026-1044",
      role: "UX Designer",
      project: "Retail Omni-Channel Redesign",
      program: "Digital Transformation",
      stage: "l1_interview",
      borderAccentColor: "border-purple-500",
      experience: "5 Years",
      location: "Mumbai, IN",
      skills: ["Figma", "Design Systems", "Prototyping"],
      secondarySkills: ["User Research", "Wireframing", "Usability Testing"],
      noticePeriod: "Immediate",
      expectedCtc: "22 LPA",
      feedbackNote: "L1 Technical interview scheduled for tomorrow 11:00 AM.",
      resumeName: "Amit_Kumar_UX_Portfolio.pdf"
    },
    {
      id: "CAND-04",
      name: "Priya Patel",
      avatar: "PP",
      matchScore: 85,
      reqId: "REQ-2026-1042",
      role: "Senior Frontend Engineer",
      project: "Retail Omni-Channel Redesign",
      program: "Digital Transformation",
      stage: "l1_interview",
      borderAccentColor: "border-indigo-500",
      experience: "7 Years",
      location: "Hyderabad, IN",
      skills: ["React.js", "JavaScript", "HTML/CSS"],
      secondarySkills: ["Vue.js", "REST APIs", "Webpack"],
      noticePeriod: "30 Days",
      expectedCtc: "26 LPA",
      resumeName: "Priya_Patel_Frontend_Lead.pdf"
    },
    {
      id: "CAND-05",
      name: "Vikram Singh",
      avatar: "VS",
      matchScore: 92,
      reqId: "REQ-2026-1042",
      role: "Senior Frontend Engineer",
      project: "Retail Omni-Channel Redesign",
      program: "Digital Transformation",
      stage: "l2_interview",
      borderAccentColor: "border-blue-600",
      experience: "9 Years",
      location: "Gurgaon, IN",
      skills: ["React", "TypeScript", "Micro-frontends", "GraphQL"],
      secondarySkills: ["Node.js", "Performance Optimization"],
      noticePeriod: "45 Days",
      expectedCtc: "32 LPA",
      feedbackNote: '"Strong technical execution & architecture skills, cleared L1 with 4.8/5 score."',
      resumeName: "Vikram_Singh_Sr_Frontend.pdf"
    },
    {
      id: "CAND-06",
      name: "Arjun Menon",
      avatar: "AM",
      matchScore: 95,
      reqId: "REQ-2026-1042",
      role: "Senior Frontend Engineer",
      project: "Retail Omni-Channel Redesign",
      program: "Digital Transformation",
      stage: "customer_interview",
      borderAccentColor: "border-blue-600",
      experience: "8 Years",
      location: "Bangalore, IN",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      secondarySkills: ["Storybook", "Cypress", "Zustand"],
      noticePeriod: "15 Days",
      expectedCtc: "30 LPA",
      feedbackNote: '"Cleared L2 Technical Round. Customer interview pending slot confirmation."',
      resumeName: "Arjun_Menon_Lead_Dev.pdf"
    },
    {
      id: "CAND-07",
      name: "Rohan Gupta",
      avatar: "RG",
      matchScore: 91,
      reqId: "REQ-2026-1045",
      role: "Data Engineer",
      project: "Customer Analytics Platform",
      program: "Data Insights",
      stage: "offer",
      borderAccentColor: "border-emerald-500",
      experience: "6 Years",
      location: "Noida, IN",
      skills: ["PySpark", "Snowflake", "SQL", "Airflow"],
      secondarySkills: ["AWS Redshift", "dbt", "Python"],
      noticePeriod: "Serving Notice",
      expectedCtc: "27 LPA",
      feedbackNote: '"Customer interview cleared with high recommendation. Formal offer extended on 2026-07-20."',
      resumeName: "Rohan_Gupta_Data_Eng.pdf"
    }
  ]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase()) ||
        c.reqId.toLowerCase().includes(search.toLowerCase()) ||
        (c.skills && c.skills.some(s => s.toLowerCase().includes(search.toLowerCase())));

      const matchesReq = selectedReq === "All" || c.reqId === selectedReq;
      const matchesProgram = selectedProgram === "All" || c.program === selectedProgram;
      const matchesProject = selectedProject === "All" || c.project === selectedProject;
      const matchesPosition = selectedPosition === "All" || c.role === selectedPosition;

      return matchesSearch && matchesReq && matchesProgram && matchesProject && matchesPosition;
    });
  }, [candidates, search, selectedReq, selectedProgram, selectedProject, selectedPosition]);

  // Columns definition (5 Kanban stages)
  const columns = [
    {
      key: "profiles_submitted",
      title: "PROFILES SUBMITTED",
      candidates: filteredCandidates.filter((c) => c.stage === "profiles_submitted")
    },
    {
      key: "l1_interview",
      title: "L1 INTERVIEW",
      candidates: filteredCandidates.filter((c) => c.stage === "l1_interview")
    },
    {
      key: "l2_interview",
      title: "L2 INTERVIEW",
      candidates: filteredCandidates.filter((c) => c.stage === "l2_interview")
    },
    {
      key: "customer_interview",
      title: "CUSTOMER INTERVIEW",
      candidates: filteredCandidates.filter((c) => c.stage === "customer_interview")
    },
    {
      key: "offer",
      title: "OFFER / HIRED",
      candidates: filteredCandidates.filter((c) => c.stage === "offer")
    }
  ];

  const reqOptions = ["All", "REQ-2026-1042", "REQ-2026-1043", "REQ-2026-1044", "REQ-2026-1045"];
  const programOptions = ["All", "Digital Transformation", "Cloud Modernization", "Data Insights"];
  const projectOptions = ["All", "Retail Omni-Channel Redesign", "Data Lake Migration", "Customer Analytics Platform"];
  const positionOptions = ["All", "Senior Frontend Engineer", "Cloud Solutions Architect", "UX Designer", "Data Engineer"];

  const moveCandidateStage = (candidateId: string, newStage: Candidate["stage"]) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
    addToast({
      title: "Candidate Pipeline Updated",
      message: `Candidate moved to ${newStage.replace("_", " ").toUpperCase()}`,
      type: "success"
    });
  };

  const handleCandidateAction = (actionType: string, cand: any) => {
    if (actionType === "replace") {
      addToast({
        title: "Replacement Requested",
        message: `Replacement request submitted to Talent Partner for ${cand.name}.`,
        type: "info"
      });
      setSelectedCandidateModal(null);
    } else if (actionType === "clarify") {
      addToast({
        title: "Clarification Request Sent",
        message: `Clarification query sent to Talent Acquisition for ${cand.name}.`,
        type: "info"
      });
    } else if (actionType === "advance") {
      const stages: Candidate["stage"][] = [
        "profiles_submitted",
        "l1_interview",
        "l2_interview",
        "customer_interview",
        "offer"
      ];
      const currIndex = stages.indexOf(cand.stage);
      if (currIndex < stages.length - 1) {
        const nextStage = stages[currIndex + 1];
        moveCandidateStage(cand.id, nextStage);
      } else {
        addToast({
          title: "Candidate at Final Stage",
          message: `${cand.name} is already at Offer / Hired stage.`,
          type: "info"
        });
      }
      setSelectedCandidateModal(null);
    } else if (actionType === "reject") {
      setCandidates((prev) => prev.filter((c) => c.id !== cand.id));
      addToast({
        title: "Candidate Rejected",
        message: `${cand.name} has been archived from active pipeline.`,
        type: "warning"
      });
      setSelectedCandidateModal(null);
    } else if (actionType === "schedule") {
      addToast({
        title: "Interview Scheduled",
        message: `Interview slot request sent to candidate ${cand.name}.`,
        type: "success"
      });
    } else {
      addToast({
        title: "Action Recorded",
        message: `Action '${actionType}' recorded for ${cand.name}.`,
        type: "info"
      });
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
            <span>Candidate Pipeline</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-[#1D4F91] font-bold">
              {filteredCandidates.length} Candidates
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stage tracking & evaluation management across all enterprise demands.
          </p>
        </div>

        {/* Right Badges Summary */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Pending feedback alert pill */}
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-800 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">!</span>
            <span>2 pending panel feedback</span>
          </div>

          {/* Metrics summary card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-2xs px-4 py-1.5 text-xs flex items-center gap-4">
            <div>
              <span className="font-bold text-[#111827]">{candidates.length}</span>{" "}
              <span className="text-slate-500 font-medium">Total</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div>
              <span className="font-bold text-[#111827]">
                {candidates.filter(c => c.stage === "l1_interview" || c.stage === "l2_interview").length}
              </span>{" "}
              <span className="text-slate-500 font-medium">In Rounds</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div>
              <span className="font-bold text-emerald-600">
                {candidates.filter(c => c.stage === "offer").length}
              </span>{" "}
              <span className="text-slate-500 font-medium">Offered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              id="search-candidates-input"
              type="text"
              placeholder="Search candidate name, role, skill, or REQ ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20 transition-all"
            />
          </div>

          {/* Req ID Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "req" ? null : "req")}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Req ID ({selectedReq})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {activeDropdown === "req" && (
              <div className="absolute left-0 mt-1.5 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-30 p-1">
                {reqOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedReq(opt); setActiveDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md ${selectedReq === opt ? "bg-blue-50 text-[#1D4F91] font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Program Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "program" ? null : "program")}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <span>Program ({selectedProgram})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {activeDropdown === "program" && (
              <div className="absolute left-0 mt-1.5 w-52 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-30 p-1">
                {programOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedProgram(opt); setActiveDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md ${selectedProgram === opt ? "bg-blue-50 text-[#1D4F91] font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "project" ? null : "project")}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <span>Project ({selectedProject})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {activeDropdown === "project" && (
              <div className="absolute left-0 mt-1.5 w-60 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-30 p-1">
                {projectOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedProject(opt); setActiveDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md ${selectedProject === opt ? "bg-blue-50 text-[#1D4F91] font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Position Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "position" ? null : "position")}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <span>Position ({selectedPosition})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {activeDropdown === "position" && (
              <div className="absolute left-0 mt-1.5 w-52 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-30 p-1">
                {positionOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedPosition(opt); setActiveDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md ${selectedPosition === opt ? "bg-blue-50 text-[#1D4F91] font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Button */}
          <div className="ml-auto">
            <button
              onClick={() => setSelectedSort(selectedSort === "Recent" ? "Match Score" : "Recent")}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              Sort: {selectedSort}
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="space-y-3 bg-[#F8FAFC]/70 p-3 rounded-2xl border border-slate-200/80">
            {/* Column Header */}
            <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-200">
              <h3 className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <span>{col.title}</span>
              </h3>
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center">
                {col.candidates.length}
              </span>
            </div>

            {/* Candidates Stack */}
            <div className="space-y-3 min-h-[420px]">
              {col.candidates.length === 0 ? (
                <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-xs text-slate-400 font-medium p-4 text-center">
                  <span>No candidates in stage</span>
                </div>
              ) : (
                col.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidateModal(candidate)}
                    className={`bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all cursor-pointer border-l-4 ${candidate.borderAccentColor} group space-y-2.5 relative`}
                  >
                    {/* Top Row: Avatar, Name, Match Score */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1D4F91] font-bold text-xs flex items-center justify-center border border-blue-100 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          {candidate.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#111827] leading-snug group-hover:text-[#1D4F91] transition-colors">
                            {candidate.name}
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{candidate.matchScore}% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata: Req & Role */}
                    <div className="space-y-1 text-xs border-t border-slate-100 pt-2">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-medium text-slate-400">Req ID:</span>
                        <span 
                          className="font-bold text-[#1D4F91] hover:underline" 
                          onClick={(e) => { e.stopPropagation(); navigateTo("demand-detail", candidate.reqId); }}
                        >
                          {candidate.reqId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-medium text-slate-400">Target Role:</span>
                        <span className="font-semibold text-[#111827] truncate max-w-[130px]">
                          {candidate.role}
                        </span>
                      </div>
                      {candidate.experience && (
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="font-medium text-slate-400">Experience:</span>
                          <span className="font-medium text-slate-700">{candidate.experience}</span>
                        </div>
                      )}
                    </div>

                    {/* Skills pills */}
                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {candidate.skills.slice(0, 3).map((sk) => (
                          <span key={sk} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Feedback Note Box if present */}
                    {candidate.feedbackNote && (
                      <div className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[10px] text-slate-600 italic">
                        {candidate.feedbackNote}
                      </div>
                    )}

                    {/* Hover Footer Action Hint */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#1D4F91] opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1 text-[11px]">
                        <span>View Evaluation</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Click to open</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate 360 Evaluation Modal */}
      {selectedCandidateModal && (
        <Candidate360Modal
          candidate={selectedCandidateModal}
          onClose={() => setSelectedCandidateModal(null)}
          onAction={handleCandidateAction}
        />
      )}
    </div>
  );
};
