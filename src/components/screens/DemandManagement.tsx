import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { DemandDrillDownTable } from "../common/DemandDrillDownTable";
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  PauseCircle, 
  XCircle, 
  X 
} from "lucide-react";

export const DemandManagement: React.FC = () => {
  const { demands, navigateTo, addToast } = useApp();

  const [search, setSearch] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("All Stages");
  const [selectedPriority, setSelectedPriority] = useState<string>("All Priorities");

  const [isStageDropdownOpen, setIsStageDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [expandedDemandId, setExpandedDemandId] = useState<string | null>("REQ-2026-1042");

  // Selection & Bulk Action States
  const [selectedDemandIds, setSelectedDemandIds] = useState<string[]>([]);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [modifyFormData, setModifyFormData] = useState({
    stage: "ACTIVE HIRING",
    priority: "HIGH"
  });

  // Default initial table items matching screenshot precisely if state is empty or fallback
  const initialScreenshotDemands = [
    {
      id: "REQ-2026-5091",
      position: "Senior Full Stack Dev",
      project: "Enterprise Core Platform",
      domain: "Cloud Engineering",
      stage: "SUBMITTED",
      priority: "MEDIUM",
      startDate: "2026-07-24"
    },
    {
      id: "REQ-2026-1042",
      position: "Senior Frontend Engineer",
      project: "Retail Omni-Channel Redesign",
      domain: "Digital Transformation",
      stage: "ACTIVE HIRING",
      priority: "HIGH",
      startDate: "2026-08-15"
    },
    {
      id: "REQ-2026-1043",
      position: "Cloud Solutions Architect",
      project: "Data Lake Migration",
      domain: "Cloud Modernization",
      stage: "PM REVIEW",
      priority: "HIGH",
      startDate: "2026-09-01"
    },
    {
      id: "REQ-2026-1044",
      position: "UX Designer",
      project: "Retail Omni-Channel Redesign",
      domain: "Digital Transformation",
      stage: "TRACK HEAD APPROVAL",
      priority: "MEDIUM",
      startDate: "2026-08-01"
    },
    {
      id: "REQ-2026-1045",
      position: "Data Engineer",
      project: "Customer Analytics Platform",
      domain: "Data Insights",
      stage: "OFFER",
      priority: "MEDIUM",
      startDate: "2026-07-25"
    }
  ];

  const [demandsList, setDemandsList] = useState(initialScreenshotDemands);

  // Merge app context demands if any dynamic demands created
  const allDemands = useMemo(() => {
    const contextMapped = demands.map((d) => ({
      id: d.id.replace("DEM", "REQ"),
      position: d.project.toLowerCase().includes("ai") ? "AI Data Specialist" : "Senior Software Engineer",
      project: d.project,
      domain: d.practice,
      stage: (d.status === "Staffing" ? "ACTIVE HIRING" : d.status === "Validation" ? "PM REVIEW" : d.status === "Submitted" ? "SUBMITTED" : d.status.toUpperCase()),
      priority: d.priority.toUpperCase(),
      startDate: d.startDate
    }));

    const existingIds = new Set(demandsList.map(item => item.id));
    const extraDemands = contextMapped.filter(item => !existingIds.has(item.id));
    return [...demandsList, ...extraDemands];
  }, [demands, demandsList]);

  const filteredDemands = useMemo(() => {
    return allDemands.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.position.toLowerCase().includes(search.toLowerCase()) ||
        item.project.toLowerCase().includes(search.toLowerCase()) ||
        item.domain.toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        selectedStage === "All Stages" ||
        item.stage.toUpperCase() === selectedStage.toUpperCase();

      const matchesPriority =
        selectedPriority === "All Priorities" ||
        item.priority.toUpperCase() === selectedPriority.toUpperCase();

      return matchesSearch && matchesStage && matchesPriority;
    });
  }, [allDemands, search, selectedStage, selectedPriority]);

  const isAllSelected = filteredDemands.length > 0 && filteredDemands.every((r) => selectedDemandIds.includes(r.id));
  const isSomeSelected = selectedDemandIds.length > 0 && !isAllSelected;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDemandIds(filteredDemands.map((r) => r.id));
    } else {
      setSelectedDemandIds([]);
    }
  };

  const handleToggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDemandIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePutOnHoldBulk = () => {
    if (selectedDemandIds.length === 0) return;
    setDemandsList((prev) =>
      prev.map((row) =>
        selectedDemandIds.includes(row.id) ? { ...row, stage: "ON HOLD" } : row
      )
    );
    addToast({
      type: "warning",
      title: "Demands Placed on Hold",
      message: `${selectedDemandIds.length} demand(s) [${selectedDemandIds.join(", ")}] put on hold.`
    });
    setSelectedDemandIds([]);
  };

  const handleCancelBulk = () => {
    if (selectedDemandIds.length === 0) return;
    setDemandsList((prev) =>
      prev.map((row) =>
        selectedDemandIds.includes(row.id) ? { ...row, stage: "CANCELLED" } : row
      )
    );
    addToast({
      type: "error",
      title: "Demands Cancelled",
      message: `${selectedDemandIds.length} demand(s) [${selectedDemandIds.join(", ")}] cancelled.`
    });
    setSelectedDemandIds([]);
  };

  const handleSaveModify = () => {
    setDemandsList((prev) =>
      prev.map((row) =>
        selectedDemandIds.includes(row.id)
          ? { ...row, stage: modifyFormData.stage, priority: modifyFormData.priority }
          : row
      )
    );
    addToast({
      type: "success",
      title: "Demands Updated",
      message: `Modified ${selectedDemandIds.length} selected demand(s).`
    });
    setIsModifyModalOpen(false);
    setSelectedDemandIds([]);
  };

  const stagesOptions = ["All Stages", "SUBMITTED", "ACTIVE HIRING", "PM REVIEW", "TRACK HEAD APPROVAL", "OFFER", "ON HOLD", "CANCELLED"];
  const priorityOptions = ["All Priorities", "HIGH", "MEDIUM", "LOW"];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            My Demands
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View and manage all your resource requests.
          </p>
        </div>

        <button
          id="create-demand-btn"
          onClick={() => navigateTo("create-demand")}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4F91] hover:bg-[#163e73] rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Demand</span>
        </button>
      </div>

      {/* Contextual Action Bar */}
      {selectedDemandIds.length > 0 && (
        <div className="bg-[#0F1E36] text-white p-3.5 px-5 rounded-xl border border-[#1E2E4A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-150 sticky top-16 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#00E599] text-slate-950 font-black text-xs rounded-full shadow-xs">
              {selectedDemandIds.length} Selected
            </span>
            <span className="text-xs font-semibold text-slate-200 hidden md:inline">
              Apply bulk actions to selected demands:
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsModifyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#0F1E36] hover:bg-slate-100 font-bold text-xs rounded-lg transition-all cursor-pointer active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5 text-[#1D4F91]" />
              <span>Modify Demand</span>
            </button>

            <button
              onClick={handlePutOnHoldBulk}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-all cursor-pointer active:scale-95"
            >
              <PauseCircle className="w-3.5 h-3.5" />
              <span>Put on Hold</span>
            </button>

            <button
              onClick={handleCancelBulk}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-all cursor-pointer active:scale-95"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Demand</span>
            </button>

            <button
              onClick={() => setSelectedDemandIds([])}
              className="p-1.5 ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Deselect All"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Table Container Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        {/* Filter Toolbar Header */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              id="search-demands-input"
              type="text"
              placeholder="Search demands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg pl-9 pr-4 py-2 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20 transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3">
            {/* Stage Filter */}
            <div className="relative">
              <button
                id="filter-stages-btn"
                onClick={() => {
                  setIsStageDropdownOpen(!isStageDropdownOpen);
                  setIsPriorityDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedStage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isStageDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 p-1 divide-y divide-slate-100">
                  {stagesOptions.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => {
                        setSelectedStage(stage);
                        setIsStageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors ${
                        selectedStage === stage
                          ? "bg-blue-50 text-[#1D4F91] font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <button
                id="filter-priorities-btn"
                onClick={() => {
                  setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
                  setIsStageDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedPriority}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isPriorityDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 p-1 divide-y divide-slate-100">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => {
                        setSelectedPriority(priority);
                        setIsPriorityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors ${
                        selectedPriority === priority
                          ? "bg-blue-50 text-[#1D4F91] font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demands Table with Multilevel Drill-down */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isSomeSelected;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-[#1D4F91] border-slate-300 focus:ring-[#1D4F91] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">DEMAND ID</th>
                <th className="py-3 px-4">PROJECT</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">POSITIONS</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PROGRESS</th>
                <th className="py-3 px-4">AGING</th>
                <th className="py-3 px-4">LAST UPDATED</th>
                <th className="py-3 px-4 text-right font-bold">EXPAND / DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {filteredDemands.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 text-xs">
                    No demands match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDemands.map((row) => {
                  const isSelected = selectedDemandIds.includes(row.id);
                  const isExpanded = expandedDemandId === row.id;
                  const progressVal = row.stage === "OFFER" ? 90 : row.stage === "ACTIVE HIRING" ? 65 : row.stage === "PM REVIEW" ? 40 : 20;
                  const agingVal = row.stage === "SUBMITTED" ? 2 : row.stage === "ACTIVE HIRING" ? 14 : 8;

                  return (
                    <React.Fragment key={row.id}>
                      <tr
                        className={`transition-colors ${
                          isSelected ? "bg-blue-50/50" : isExpanded ? "bg-blue-50/20" : "hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleToggleRow(row.id, e as any)}
                            className="w-4 h-4 rounded text-[#1D4F91] border-slate-300 focus:ring-[#1D4F91] cursor-pointer"
                          />
                        </td>
                        <td 
                          onClick={() => navigateTo("demand-detail", row.id)}
                          className="py-4 px-4 font-bold text-[#1D4F91] hover:underline cursor-pointer"
                        >
                          {row.id}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#111827]">{row.project}</div>
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5">{row.domain}</div>
                        </td>
                        <td className="py-4 px-4 font-bold text-[#111827]">
                          {row.position}
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-700">
                          {row.id === "REQ-2026-1042" ? "3 FTE" : "1 FTE"}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
                            row.stage === "ON HOLD"
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : row.stage === "CANCELLED"
                              ? "bg-rose-100 text-rose-800 border-rose-300"
                              : "bg-blue-50/80 border-blue-200 text-[#1D4F91]"
                          }`}>
                            {row.stage}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressVal}%` }} />
                            </div>
                            <span className="font-bold text-slate-700 text-[11px]">{progressVal}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-700">
                          {agingVal} Days
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          Today • 2h ago
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedDemandId(isExpanded ? null : row.id);
                              }}
                              title={isExpanded ? "Collapse Candidate Details" : "Expand Candidate Details"}
                              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                                isExpanded 
                                  ? "bg-[#1D4F91] text-white border-[#1D4F91] shadow-2xs" 
                                  : "bg-white text-slate-600 border-[#E5E7EB] hover:border-[#1D4F91] hover:text-[#1D4F91] hover:bg-blue-50/50"
                              }`}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => navigateTo("demand-detail", row.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#1D4F91] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Nested Multilevel Drill-Down Table Expansion */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={10} className="p-4 bg-[#F8FAFC] border-y-2 border-blue-100">
                            <DemandDrillDownTable
                              demandId={row.id}
                              project={row.project}
                              role={row.position}
                              positions={row.id === "REQ-2026-1042" ? 3 : 1}
                              status={row.stage}
                              currentStage={row.stage === "SUBMITTED" ? "PM Review" : "Candidate Interviews"}
                              progress={progressVal}
                              agingDays={agingVal}
                              initiallyExpanded={true}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify Modal */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#E5E7EB] shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#1D4F91]" />
                <h3 className="text-base font-bold text-[#111827]">Modify Demand ({selectedDemandIds.length})</h3>
              </div>
              <button 
                onClick={() => setIsModifyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Bulk update stage and priority for: <strong className="text-[#1D4F91]">{selectedDemandIds.join(", ")}</strong>
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Stage</label>
                <select
                  value={modifyFormData.stage}
                  onChange={(e) => setModifyFormData({ ...modifyFormData, stage: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-2.5 font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                >
                  <option value="ACTIVE HIRING">ACTIVE HIRING</option>
                  <option value="PM REVIEW">PM REVIEW</option>
                  <option value="TRACK HEAD APPROVAL">TRACK HEAD APPROVAL</option>
                  <option value="OFFER">OFFER</option>
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="ON HOLD">ON HOLD</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={modifyFormData.priority}
                  onChange={(e) => setModifyFormData({ ...modifyFormData, priority: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-2.5 font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="px-4 py-2 border border-[#E5E7EB] text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModify}
                className="px-4 py-2 bg-[#1D4F91] hover:bg-[#163e73] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

