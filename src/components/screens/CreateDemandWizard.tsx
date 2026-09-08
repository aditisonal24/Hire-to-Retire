import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { DemandDrillDownTable } from "../common/DemandDrillDownTable";
import { 
  Check, 
  Save, 
  Send, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Plus, 
  Upload, 
  X, 
  FileText,
  UserCheck,
  Building2,
  Briefcase,
  Calendar,
  Lock,
  Layers,
  AlertCircle
} from "lucide-react";

// Lookup mapping tables directly derived from specification image
const BUSINESS_UNITS = [
  "AAVA",
  "HPS",
  "HPPS",
  "PSSW",
  "CIO",
  "TIO",
  "Internal teams"
];

const MASTER_TEAMS = [
  "Platform",
  "QE",
  "AppDev",
  "Firmware",
  "CS",
  "NOC",
  "PTM",
  "TIO NBL projects",
  "PMO",
  "Leadership",
  "Overhead",
  "AAVA",
  "AppDev - Architect",
  "Lab Mgmt"
];

const MASTER_TEAM_OF_TEAMS = [
  "AAVA Platform",
  "QE",
  "AppDev - BA",
  "AppDev",
  "Customer Success",
  "AppDev - UX",
  "QE - Architect",
  "QE - Management",
  "AAVA Platform - Architect",
  "AAVA Platform - Management",
  "AppDev - Architect",
  "AppDev - Management",
  "AAVA OneView",
  "AppDev - PTM",
  "AppDev - EXP",
  "PMO",
  "Leadership",
  "AppDev - BA EXP",
  "HR",
  "Del Ops",
  "Marketing",
  "AppDev - PMO",
  "AppDev - TIO",
  "QE - EXP",
  "QE - PMO",
  "QE - AI",
  "AAVA - Management",
  "CSE Management"
];

const TEAMS_BY_BU: Record<string, string[]> = {
  AAVA: ["Platform", "AAVA", "Trainer", "OneView", "Support", "Management"],
  HPS: ["QE", "WebJetAdmin", "SW"],
  HPPS: ["AppDev", "AppDev - Architect", "PMO", "Leadership", "Overhead", "HR", "Del Ops", "Marketing"],
  PSSW: ["Firmware", "QE", "Solution Enablement", "Common Services", "DevOps"],
  CIO: ["CS", "CTO"],
  TIO: ["NOC", "TIO NBL projects"],
  "Internal teams": ["PTM", "Lab Mgmt", "CSE"]
};

const TEAM_OF_TEAMS_BY_BU: Record<string, string[]> = {
  AAVA: [
    "AAVA Platform", "AAVA Trainer", "AAVA OneView", "AAVA Support",
    "AAVA - Management", "AAVA Platform - Architect", "AAVA Platform - Management"
  ],
  HPS: ["QE", "WebJetAdmin", "HPS SW"],
  HPPS: [
    "AppDev - BA", "AppDev", "AppDev - UX", "AppDev - Architect",
    "AppDev - Management", "AppDev - PTM", "AppDev - EXP",
    "AppDev - BA EXP", "AppDev - PMO", "AppDev - TIO",
    "PMO", "Leadership", "HR", "Del Ops", "Marketing"
  ],
  PSSW: [
    "AppDev", "QE - Architect", "QE - Management", "QE - EXP",
    "QE - PMO", "QE - AI", "PS Solution Enablement",
    "PS Common Services Arch", "PSSW - Devops"
  ],
  CIO: ["Customer Success", "CTO"],
  TIO: ["AppDev - UX", "QE - Management"],
  "Internal teams": ["QE - Architect", "AppDev - PTM", "CSE Management"]
};

const TRACKS_BY_BU: Record<string, string[]> = {
  PSSW: [
    "PSSW QE", "BA, UX & UI", "PSSW", "PS Agentic",
    "PS HW Enablement & NPI Support", "PS Common Services Arch",
    "PS OnDevice Framework", "Agentic COE", "PS Program Management",
    "PS Solution Enablement", "PS ODF Core Services", "PS Management",
    "PS PC Performance", "PS Data Enablement", "PS Shared Core", "PSSW - Devops"
  ],
  AAVA: [
    "AAVA Platform", "Print and PS", "AAVA Trainer", "AAVA OneView",
    "HPIP - Cloud & Connectivity", "AAVA", "CTO"
  ],
  HPPS: [
    "Instant Ink", "AIP SI", "AIP Asset", "Firmware Platforms", "HPX",
    "Firmware", "HPIP - Cloud & Connectivity", "Shared", "Product Management",
    "Print OS", "BA, UX & UI", "Consolidated Portal", "HPIP Instant Services",
    "HPIP - Core Services", "Instant Services", "NPI SI", "Leadership",
    "System Engineering", "NOC", "Program Management", "HP Print",
    "HPIP - Cloud & Infra", "PMO", "SW Solutions + HPX", "AIQA"
  ],
  HPS: [
    "HPS - WebJetAdmin", "HPS SW"
  ],
  CIO: ["CS", "CTO"],
  TIO: ["NOC", "TIO NBL"],
  "Internal teams": ["PTM", "Lab Mgmt", "CSE"]
};

const PROJECTS_BY_TRACK: Record<string, string[]> = {
  "PSSW QE": ["PS core"],
  "BA, UX & UI": ["Print and PS", "AIQA"],
  "PSSW": ["On-Device Framework (ODF)", "ODF", "Horizon China"],
  "PS Agentic": ["Office on the web Frame"],
  "PS HW Enablement & NPI Support": ["Telemetry Service"],
  "PS Common Services Arch": ["ODF"],
  "PS OnDevice Framework": ["Horizon China"],
  "Agentic COE": ["Auth Helper Service"],
  "PS Program Management": ["AI Studio"],
  "PS Solution Enablement": ["OMEN AI"],
  "PS ODF Core Services": ["OMEN Data Quality"],
  "PS Management": ["Icicle embeded/remote system control"],
  "PS PC Performance": ["Touch Pad"],
  "PS Data Enablement": ["Smart Resource optimizer"],
  "PS Shared Core": ["System Control"],
  "PSSW - Devops": [
    "ACS", "Management", "Perform (AI Companion)", "ARM",
    "Energy Consumption", "Icicle Cloud", "Shangai", "HP ProCloud",
    "Orion BKC", "Agentic Team", "PSSW", "TUF"
  ],
  "AAVA Platform": ["AAVA Platform dev & support"],
  "Print and PS": ["Customer Success Team"],
  "AAVA Trainer": ["Customer Success"],
  "AAVA OneView": ["AAVA Trainer"],
  "HPIP - Cloud & Connectivity": ["OneView - Platform Implementation", "Agentic Team - UCDE"],
  "AAVA": ["AAVA Support"],
  "CTO": ["AI Services", "Gen 1", "AAVA UAT Testing", "CTO"],
  "Instant Ink": ["Instant Ink"],
  "AIP SI": ["Agentic Team"],
  "AIP Asset": ["Agentic Team - Communications"],
  "Firmware Platforms": ["Agentic Team - Consent Management"],
  "HPX": ["Agentic Team - Fleet Management"],
  "Firmware": ["Agentic Team - HPPK"],
  "Shared": ["Agentic Team - Workpath"],
  "Product Management": ["AIP"],
  "Print OS": ["AIP SI"],
  "Consolidated Portal": ["Appcenter"],
  "HPIP Instant Services": ["Artificers (DevOps)"],
  "HPIP - Core Services": ["CDM Bridge & Data Gateway"],
  "Instant Services": ["Cental Intake -Agentificatoin"],
  "NPI SI": ["Cloud & Connectivity"],
  "Leadership": ["Cloud & Infra"],
  "System Engineering": ["Com Services"],
  "NOC": ["Communication Service / Message Hub"],
  "Program Management": ["Communication Service / Message Hub(comms Observer)"],
  "HP Print": ["Core Services"],
  "HPIP - Cloud & Infra": ["Customer Success"],
  "PMO": ["Deep Triage"],
  "SW Solutions + HPX": ["Defect Triage"],
  "AIQA": ["Defect triage - Agentic", "Design to Operate", "Device & Utility", "Device Communication"],
  "HPS - WebJetAdmin": ["JAM"],
  "HPS SW": [
    "OnPrem-PrintSW - WJA", "OnPrem-PrintSW - HPSM", "WXP (PC/Print/Wolf)",
    "PolyCom", "Anyware", "WebJetAdmin (BAU)", "HPWS", "HPS SW",
    "Web Jet Admin (DUNE Integration)", "Web Jet Admin (Lab Management)"
  ]
};

const LOCATION_OPTIONS = [
  "Bangalore, India",
  "Hyderabad, India",
  "Chennai, India",
  "Pune, India",
  "Gurgaon / Noida, India",
  "Coimbatore, India",
  "US - Onsite (Austin, TX)",
  "US - Onsite (Palo Alto, CA)",
  "US - Onsite (Atlanta, GA)",
  "Remote (India)",
  "Remote (US)"
];

export const CreateDemandWizard: React.FC = () => {
  const { addDemand, navigateTo, addToast, user } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedDemandId, setSubmittedDemandId] = useState<string>("REQ-2026-6812");

  // --- 22 MANDATORY & SPECIFIED FIELDS FROM USER IMAGE ---
  
  // 1. Business Unit (Dropdown, Yes, Refer link)
  const [businessUnit, setBusinessUnit] = useState("AAVA");

  // 2. Team (Dropdown, Yes, Refer link - Cascades from BU)
  const [team, setTeam] = useState("Platform");

  // 3. Team of Teams (Dropdown, Yes, Refer link - Cascades from BU)
  const [teamOfTeams, setTeamOfTeams] = useState("AAVA Platform");

  // 4. Track (Dropdown, Yes, Refer link - Cascades from BU)
  const [track, setTrack] = useState("AAVA Platform");

  // 5. Project (Dropdown, Yes, Refer link - Cascades from Track/BU)
  const [project, setProject] = useState("AAVA Platform dev & support");

  // 6. Name of the Position (Varchar, Yes)
  const [positionName, setPositionName] = useState("");

  // 7. # of Positions (Number, Yes)
  const [numPositions, setNumPositions] = useState("1");

  // 8. Demand Type (Dropdown, Yes: Ramp-up | Replacement)
  const [demandType, setDemandType] = useState<"Ramp-up" | "Replacement">("Ramp-up");

  // 9. Replacement Associate Name (Varchar, Yes if Demand Type Replacement, else disabled)
  const [replacementAssociateName, setReplacementAssociateName] = useState("");

  // 10. Billability (Checkbox / Yes-No, Yes)
  const [billability, setBillability] = useState<"Yes" | "No">("Yes");

  // 11. Expected Billable Date (DD/MM/YYYY, Yes - disabled if Billability is No)
  const [expectedBillableDate, setExpectedBillableDate] = useState("");

  // 12. Requestor (Logged in User, Yes)
  const requestorName = user?.name ? `${user.name} (${user.email})` : "Aditi Sonal (aditi.s@ascendion.com)";

  // 13. Ascendion Reporting Manager (Varchar, Yes)
  const [ascendionManager, setAscendionManager] = useState("");

  // 14. Ascendion Manager Email id (Varchar, Yes)
  const [ascendionManagerEmail, setAscendionManagerEmail] = useState("");

  // 15. Location (Dropdown, Yes)
  const [location, setLocation] = useState("Bangalore, India");

  // 16. Experience (In Yrs) (Number, Yes)
  const [experienceYrs, setExperienceYrs] = useState("5");

  // 17. Skill Set (Varchar, Yes)
  const [skillSet, setSkillSet] = useState("");

  // 18. Job Description (255 Char & Upload doc option, No)
  const [jobDescription, setJobDescription] = useState("");

  // 19. HP L4 Leader (Varchar, Yes)
  const [hpL4Leader, setHpL4Leader] = useState("");

  // 20. Client Hiring Manager (Varchar, Yes)
  const [clientHiringManager, setClientHiringManager] = useState("");

  // 21. Client Hiring Manager Email (Varchar, Yes)
  const [clientHiringManagerEmail, setClientHiringManagerEmail] = useState("");

  // 22. Client Interview (Checkbox / Yes-No, Yes)
  const [clientInterview, setClientInterview] = useState<"Yes" | "No">("Yes");

  // Secondary Context Fields
  const [priority, setPriority] = useState<"CRITICAL" | "HIGH" | "MEDIUM" | "LOW">("HIGH");
  const [attachments, setAttachments] = useState<Array<{ name: string; size: string }>>([]);

  // --- CASCADING DROPDOWN OPTIONS ---
  const availableTeams = useMemo(() => {
    const buTeams = TEAMS_BY_BU[businessUnit] || [];
    return Array.from(new Set([...buTeams, ...MASTER_TEAMS]));
  }, [businessUnit]);

  const availableTeamOfTeams = useMemo(() => {
    const buToT = TEAM_OF_TEAMS_BY_BU[businessUnit] || [];
    return Array.from(new Set([...buToT, ...MASTER_TEAM_OF_TEAMS]));
  }, [businessUnit]);

  const availableTracks = useMemo(() => {
    return TRACKS_BY_BU[businessUnit] || TRACKS_BY_BU["AAVA"];
  }, [businessUnit]);

  const availableProjects = useMemo(() => {
    if (PROJECTS_BY_TRACK[track]) {
      return PROJECTS_BY_TRACK[track];
    }
    return ["Default Project"];
  }, [track]);

  // Handle Business Unit Change -> Cascading Updates
  const handleBUChange = (newBU: string) => {
    setBusinessUnit(newBU);
    const teams = TEAMS_BY_BU[newBU] || [];
    setTeam(teams[0] || "");

    const tot = TEAM_OF_TEAMS_BY_BU[newBU] || [];
    setTeamOfTeams(tot[0] || "");

    const trks = TRACKS_BY_BU[newBU] || [];
    const firstTrk = trks[0] || "";
    setTrack(firstTrk);

    const prjs = PROJECTS_BY_TRACK[firstTrk] || ["Default Project"];
    setProject(prjs[0] || "");
  };

  // Handle Track Change -> Cascading Update to Projects
  const handleTrackChange = (newTrack: string) => {
    setTrack(newTrack);
    const prjs = PROJECTS_BY_TRACK[newTrack] || ["Default Project"];
    setProject(prjs[0] || "");
  };

  // Validation Checkers per Step according to 4 Sections
  const isStep1Valid = useMemo(() => {
    return Boolean(businessUnit && team && teamOfTeams && track && project);
  }, [businessUnit, team, teamOfTeams, track, project]);

  const isStep2Valid = useMemo(() => {
    if (!positionName.trim() || !numPositions || !demandType || !billability) {
      return false;
    }
    if (demandType === "Replacement" && !replacementAssociateName.trim()) {
      return false;
    }
    if (billability === "Yes" && !expectedBillableDate) {
      return false;
    }
    return true;
  }, [positionName, numPositions, demandType, replacementAssociateName, billability, expectedBillableDate]);

  const isStep3Valid = useMemo(() => {
    return Boolean(location && experienceYrs && skillSet.trim());
  }, [location, experienceYrs, skillSet]);

  const isStep4Valid = useMemo(() => {
    return Boolean(
      requestorName &&
      ascendionManager.trim() &&
      ascendionManagerEmail.trim() &&
      hpL4Leader.trim() &&
      clientHiringManager.trim() &&
      clientHiringManagerEmail.trim() &&
      clientInterview
    );
  }, [requestorName, ascendionManager, ascendionManagerEmail, hpL4Leader, clientHiringManager, clientHiringManagerEmail, clientInterview]);

  const handleNext = () => {
    if (step === 1 && !isStep1Valid) {
      addToast({
        type: "warning",
        title: "Required Fields Missing",
        message: "Please select Team, Team of Teams, Business Unit, Track, and Project."
      });
      return;
    }
    if (step === 2 && !isStep2Valid) {
      addToast({
        type: "warning",
        title: "Required Fields Missing",
        message: "Please complete Position Name, # of Positions, Demand Type, Billability, and Billable Date."
      });
      return;
    }
    if (step === 3 && !isStep3Valid) {
      addToast({
        type: "warning",
        title: "Required Fields Missing",
        message: "Please provide Location, Experience, and Skill Set."
      });
      return;
    }
    if (step === 4 && !isStep4Valid) {
      addToast({
        type: "warning",
        title: "Required Fields Missing",
        message: "Please provide all Approvals & Stakeholders details (Reporting Manager, HP Leader, Client Hiring Manager)."
      });
      return;
    }
    setStep((prev) => Math.min(5, prev + 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSaveDraft = () => {
    addToast({
      title: "Draft Saved",
      message: "Demand draft with updated specifications saved successfully.",
      type: "info"
    });
  };

  const handleSubmit = () => {
    const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedDemandId(newId);

    addDemand({
      customer: businessUnit,
      project: project,
      description: `${positionName || "Resource Request"} (${numPositions} FTE)`,
      practice: track,
      geography: location,
      deliveryUnit: team,
      startDate: expectedBillableDate || new Date().toISOString().substring(0, 10),
      endDate: "2027-08-31",
      revenue: 250000,
      cost: 150000,
      requestedFTE: Number(numPositions) || 1,
      priority: priority,
      attachments: attachments.map((a, i) => ({
        id: `att-${i}`,
        name: a.name,
        size: a.size,
        type: "Document",
        uploadDate: new Date().toISOString().substring(0, 10)
      }))
    });

    setIsSubmitted(true);
    addToast({
      title: "Demand Created",
      message: `Demand ${newId} created successfully with all 22 required attributes.`,
      type: "success"
    });
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setStep(1);
    setPositionName("");
    setNumPositions("1");
    setDemandType("Ramp-up");
    setReplacementAssociateName("");
    setExperienceYrs("5");
    setSkillSet("");
    setJobDescription("");
    setHpL4Leader("");
    setClientHiringManager("");
    setClientHiringManagerEmail("");
    setAscendionManager("");
    setAscendionManagerEmail("");
    setExpectedBillableDate("");
  };

  const steps = [
    { num: 1, label: "PROJECT DETAILS" },
    { num: 2, label: "RESOURCE REQUEST" },
    { num: 3, label: "ROLE REQUIREMENTS" },
    { num: 4, label: "APPROVALS & STAKEHOLDERS" },
    { num: 5, label: "FINAL REVIEW" }
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Demand Created Successfully
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Demand <strong className="text-[#1D4F91]">{submittedDemandId}</strong> has been created with all specified mandatory metadata and routed to Central PM.
          </p>
        </div>

        {/* Summary Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                DEMAND ID
              </span>
              <span className="font-extrabold text-[#1D4F91] text-sm">{submittedDemandId}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                BUSINESS UNIT
              </span>
              <span className="font-bold text-[#111827]">{businessUnit}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                TRACK / PROJECT
              </span>
              <span className="font-bold text-[#111827] truncate block">{project}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                DEMAND TYPE
              </span>
              <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                {demandType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-1">
            <div>
              <span className="text-slate-500 block">Position:</span>
              <strong className="text-[#111827] font-bold">{positionName} ({numPositions} FTE)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Requestor:</span>
              <strong className="text-[#111827] font-bold">{requestorName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Location:</span>
              <strong className="text-[#111827] font-bold">{location}</strong>
            </div>
          </div>
        </div>

        {/* Multilevel Demand Drill-down Table Preview */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              NEW DEMAND DRILL-DOWN PREVIEW
            </h3>
            <span className="text-xs text-[#1D4F91] font-semibold">Live Multi-level Record</span>
          </div>
          <DemandDrillDownTable
            demandId={submittedDemandId}
            project={project}
            role={positionName}
            positions={Number(numPositions) || 1}
            status="SUBMITTED"
            currentStage="Central PM Review"
            progress={20}
            agingDays={1}
            initiallyExpanded={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={handleResetForm}
            className="px-5 py-2.5 border border-[#E5E7EB] text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Another Demand</span>
          </button>
          <button
            onClick={() => navigateTo("demand-detail", submittedDemandId)}
            className="px-6 py-2.5 bg-[#1D4F91] hover:bg-[#18427a] text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Open Full Demand Workspace
          </button>
          <button
            onClick={() => navigateTo("demands")}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            View All Demands
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header & Breadcrumb */}
      <div>
        <button
          onClick={() => navigateTo("demands")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1D4F91] transition-colors mb-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Demand Management</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
              Create Demand
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in all mandatory organizational, position, and manager fields for approval.
            </p>
          </div>
          <span className="text-xs font-bold text-[#1D4F91] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            Mandatory Attributes Form (* = Required)
          </span>
        </div>
      </div>

      {/* Stepper Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-2xs">
        <div className="flex items-center justify-between relative">
          {steps.map((s, idx) => {
            const isActive = s.num === step;
            const isCompleted = s.num < step;

            return (
              <React.Fragment key={s.num}>
                {/* Step Item */}
                <div 
                  className="flex flex-col items-center relative z-10 group cursor-pointer" 
                  onClick={() => isCompleted && setStep(s.num)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      isActive || isCompleted
                        ? "bg-[#1D4F91] text-white shadow-2xs"
                        : "bg-white border-2 border-slate-200 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase mt-2 text-center ${
                      isActive || isCompleted ? "text-[#111827]" : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 -mt-5 relative z-0 bg-slate-200">
                    <div
                      className="h-full bg-[#1D4F91] transition-all duration-300"
                      style={{
                        width: step > s.num ? "100%" : "0%"
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          
          {/* STEP 1: PROJECT DETAILS */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#1D4F91]" />
                  <span>1. Project Details</span>
                </h2>
                <span className="text-xs text-slate-400">Step 1 of 5</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Team */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Team <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer font-medium"
                  >
                    {availableTeams.map((tm) => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </div>

                {/* Team of Teams */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Team of Teams <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={teamOfTeams}
                    onChange={(e) => setTeamOfTeams(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer font-medium"
                  >
                    {availableTeamOfTeams.map((tot) => (
                      <option key={tot} value={tot}>{tot}</option>
                    ))}
                  </select>
                </div>

                {/* Business Unit */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Business Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={businessUnit}
                    onChange={(e) => handleBUChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] font-semibold focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer"
                  >
                    {BUSINESS_UNITS.map((bu) => (
                      <option key={bu} value={bu}>{bu}</option>
                    ))}
                  </select>
                </div>

                {/* Track */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Track <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={track}
                    onChange={(e) => handleTrackChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer font-medium"
                  >
                    {availableTracks.map((trk) => (
                      <option key={trk} value={trk}>{trk}</option>
                    ))}
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Project <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer font-medium"
                  >
                    {availableProjects.map((prj) => (
                      <option key={prj} value={prj}>{prj}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: RESOURCE REQUEST */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#1D4F91]" />
                  <span>2. Resource Request</span>
                </h2>
                <span className="text-xs text-slate-400">Step 2 of 5</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Position Name */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Position Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Fullstack Engineer"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Number of Positions */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Number of Positions <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={numPositions}
                    onChange={(e) => setNumPositions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all"
                  />
                </div>

                {/* Demand Type */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Demand Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={demandType}
                    onChange={(e) => setDemandType(e.target.value as "Ramp-up" | "Replacement")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] font-semibold focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer"
                  >
                    <option value="Ramp-up">Ramp-up</option>
                    <option value="Replacement">Replacement</option>
                  </select>
                </div>

                {/* Replacement Associate Name */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Replacement Associate Name {demandType === "Replacement" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    disabled={demandType !== "Replacement"}
                    placeholder={demandType === "Replacement" ? "e.g. John Miller" : "Disabled for Ramp-up demands"}
                    value={replacementAssociateName}
                    onChange={(e) => setReplacementAssociateName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border transition-all ${
                      demandType === "Replacement"
                        ? "border-[#E5E7EB] bg-white text-[#111827] focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91]"
                        : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  />
                  {demandType !== "Replacement" && (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Enabled automatically when Demand Type is set to "Replacement".
                    </p>
                  )}
                </div>

                {/* Billability */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Billability <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="radio"
                        name="billabilityRadio"
                        checked={billability === "Yes"}
                        onChange={() => setBillability("Yes")}
                        className="text-[#1D4F91] focus:ring-[#1D4F91]"
                      />
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Yes (Billable)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="radio"
                        name="billabilityRadio"
                        checked={billability === "No"}
                        onChange={() => setBillability("No")}
                        className="text-[#1D4F91] focus:ring-[#1D4F91]"
                      />
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        No (Non-Billable)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Expected Billable Date */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Expected Billable Date {billability === "Yes" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="date"
                    disabled={billability === "No"}
                    value={expectedBillableDate}
                    onChange={(e) => setExpectedBillableDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border transition-all ${
                      billability === "Yes"
                        ? "border-[#E5E7EB] bg-white text-[#111827] focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91]"
                        : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-60"
                    }`}
                  />
                  {billability === "No" && (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Disabled because Billability is set to No.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ROLE REQUIREMENTS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#1D4F91]" />
                  <span>3. Role Requirements</span>
                </h2>
                <span className="text-xs text-slate-400">Step 3 of 5</span>
              </div>

              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Location */}
                  <div>
                    <label className="block font-bold text-[#111827] mb-1.5">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all cursor-pointer font-medium"
                    >
                      {LOCATION_OPTIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block font-bold text-[#111827] mb-1.5">
                      Experience (In Yrs) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      placeholder="e.g. 5"
                      value={experienceYrs}
                      onChange={(e) => setExperienceYrs(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all"
                    />
                  </div>
                </div>

                {/* Skill Set */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Skill Set <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Java, Spring Boot, Microservices, React"
                    value={skillSet}
                    onChange={(e) => setSkillSet(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Job Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-bold text-[#111827]">
                      Job Description Summary (Max 255 Chars)
                    </label>
                    <span className={`text-[11px] font-bold ${jobDescription.length > 255 ? "text-red-600" : "text-slate-400"}`}>
                      {jobDescription.length} / 255
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={255}
                    placeholder="Enter brief job description summary (up to 255 characters)..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all"
                  />
                </div>

                {/* Document Upload Option */}
                <div className="space-y-2 pt-1">
                  <label className="block font-bold text-[#111827]">
                    Upload Detailed JD / SOW Document
                  </label>
                  <div className="border-2 border-dashed border-[#E5E7EB] bg-slate-50 p-5 rounded-xl text-center">
                    <Upload className="w-5 h-5 text-[#1D4F91] mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-[#111827]">
                      Click to upload or drag & drop full JD / SOW
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      PDF, DOCX, XLSX up to 10MB
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachments((prev) => [
                          ...prev,
                          { name: "Full_Job_Description_Specification.pdf", size: "1.4 MB" }
                        ]);
                        addToast({
                          type: "success",
                          title: "Document Attached",
                          message: "Added detailed JD specification document."
                        });
                      }}
                      className="mt-2.5 px-3.5 py-1.5 bg-white border border-[#E5E7EB] text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Attach Sample Document</span>
                    </button>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      {attachments.map((att, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-[#E5E7EB] rounded-lg text-xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#1D4F91]" />
                            <span className="font-semibold text-slate-700">{att.name}</span>
                            <span className="text-slate-400 text-[11px]">({att.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
                            className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: APPROVALS & STAKEHOLDERS */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1D4F91]" />
                  <span>4. Approvals & Stakeholders</span>
                </h2>
                <span className="text-xs text-slate-400">Step 4 of 5</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Requestor */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Requestor <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-[#111827] font-semibold">
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{requestorName}</span>
                    <span className="ml-auto text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Logged In
                    </span>
                  </div>
                </div>

                {/* Reporting Manager */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Reporting Manager <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vikram Sharma"
                    value={ascendionManager}
                    onChange={(e) => setAscendionManager(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Manager Email */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Manager Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. v.sharma@ascendion.com"
                    value={ascendionManagerEmail}
                    onChange={(e) => setAscendionManagerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* HP L4 Leader */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    HP L4 Leader <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. David Vance"
                    value={hpL4Leader}
                    onChange={(e) => setHpL4Leader(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Client Hiring Manager */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Client Hiring Manager <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Robert Smith"
                    value={clientHiringManager}
                    onChange={(e) => setClientHiringManager(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Client Hiring Manager Email */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Client Hiring Manager Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. r.smith@clientcompany.com"
                    value={clientHiringManagerEmail}
                    onChange={(e) => setClientHiringManagerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91] transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Client Interview */}
                <div>
                  <label className="block font-bold text-[#111827] mb-1.5">
                    Client Interview Required <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="radio"
                        name="clientInterviewRadio"
                        checked={clientInterview === "Yes"}
                        onChange={() => setClientInterview("Yes")}
                        className="text-[#1D4F91] focus:ring-[#1D4F91]"
                      />
                      <span>Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="radio"
                        name="clientInterviewRadio"
                        checked={clientInterview === "No"}
                        onChange={() => setClientInterview("No")}
                        className="text-[#1D4F91] focus:ring-[#1D4F91]"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL REVIEW */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 bg-[#F0F6FF] rounded-xl flex items-center justify-between border border-[#D0E2FF]/60">
                <div>
                  <h3 className="font-bold text-base text-[#111827]">
                    Review Demand Attributes
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verify all form sections before final submission.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#D1FAE5] text-emerald-800 inline-flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  All Sections Validated
                </span>
              </div>

              {/* Grid of 4 Sections */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 divide-y divide-slate-100 text-xs space-y-4">
                
                {/* 1. Project Details */}
                <div className="pb-4 space-y-3">
                  <h4 className="font-extrabold text-[#1D4F91] uppercase text-[11px] tracking-wider">
                    1. PROJECT DETAILS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6">
                    <div><span className="text-slate-400">Team:</span> <strong className="text-[#111827]">{team}</strong></div>
                    <div><span className="text-slate-400">Team of Teams:</span> <strong className="text-[#111827]">{teamOfTeams}</strong></div>
                    <div><span className="text-slate-400">Business Unit:</span> <strong className="text-[#111827]">{businessUnit}</strong></div>
                    <div><span className="text-slate-400">Track:</span> <strong className="text-[#111827]">{track}</strong></div>
                    <div><span className="text-slate-400">Project:</span> <strong className="text-[#111827]">{project}</strong></div>
                  </div>
                </div>

                {/* 2. Resource Request */}
                <div className="py-4 space-y-3">
                  <h4 className="font-extrabold text-[#1D4F91] uppercase text-[11px] tracking-wider">
                    2. RESOURCE REQUEST
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6">
                    <div><span className="text-slate-400">Position Name:</span> <strong className="text-[#111827]">{positionName}</strong></div>
                    <div><span className="text-slate-400">Number of Positions:</span> <strong className="text-[#111827]">{numPositions} FTE</strong></div>
                    <div><span className="text-slate-400">Demand Type:</span> <strong className="text-[#111827]">{demandType}</strong></div>
                    <div><span className="text-slate-400">Replacement Associate Name:</span> <strong className="text-[#111827]">{demandType === "Replacement" ? replacementAssociateName : "N/A (Ramp-up)"}</strong></div>
                    <div><span className="text-slate-400">Billability:</span> <strong className="text-[#111827]">{billability}</strong></div>
                    <div><span className="text-slate-400">Expected Billable Date:</span> <strong className="text-[#111827]">{billability === "Yes" ? expectedBillableDate : "N/A (Non-Billable)"}</strong></div>
                  </div>
                </div>

                {/* 3. Role Requirements */}
                <div className="py-4 space-y-3">
                  <h4 className="font-extrabold text-[#1D4F91] uppercase text-[11px] tracking-wider">
                    3. ROLE REQUIREMENTS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6">
                    <div><span className="text-slate-400">Location:</span> <strong className="text-[#111827]">{location}</strong></div>
                    <div><span className="text-slate-400">Experience:</span> <strong className="text-[#111827]">{experienceYrs} Years</strong></div>
                    <div><span className="text-slate-400">Skill Set:</span> <strong className="text-[#111827]">{skillSet}</strong></div>
                    <div className="col-span-full"><span className="text-slate-400">Job Description:</span> <strong className="text-[#111827]">{jobDescription || "Attached document / Standard role spec"}</strong></div>
                  </div>
                </div>

                {/* 4. Approvals & Stakeholders */}
                <div className="pt-4 space-y-3">
                  <h4 className="font-extrabold text-[#1D4F91] uppercase text-[11px] tracking-wider">
                    4. APPROVALS & STAKEHOLDERS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6">
                    <div><span className="text-slate-400">Requestor:</span> <strong className="text-[#111827]">{requestorName}</strong></div>
                    <div><span className="text-slate-400">Reporting Manager:</span> <strong className="text-[#111827]">{ascendionManager}</strong></div>
                    <div><span className="text-slate-400">Manager Email:</span> <strong className="text-[#111827]">{ascendionManagerEmail}</strong></div>
                    <div><span className="text-slate-400">HP L4 Leader:</span> <strong className="text-[#111827]">{hpL4Leader}</strong></div>
                    <div><span className="text-slate-400">Client Hiring Manager:</span> <strong className="text-[#111827]">{clientHiringManager}</strong></div>
                    <div><span className="text-slate-400">Client Hiring Manager Email:</span> <strong className="text-[#111827]">{clientHiringManagerEmail}</strong></div>
                    <div><span className="text-slate-400">Client Interview:</span> <strong className="text-[#111827]">{clientInterview}</strong></div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Card Footer Actions */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-5 py-2 border border-[#E5E7EB] text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < 5 ? (
              <>
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 border border-[#E5E7EB] text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-slate-400" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-[#1D4F91] hover:bg-[#18427a] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#1D4F91] hover:bg-[#18427a] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Demand</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
