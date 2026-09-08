import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DemandDrillDownTable } from "../common/DemandDrillDownTable";
import { 
  FileText, 
  Clock, 
  Users, 
  CheckCircle2, 
  Plus, 
  Filter,
  ChevronDown,
  ChevronUp,
  Edit3,
  PauseCircle,
  XCircle,
  X,
  Sliders,
  Check,
  AlertCircle
} from "lucide-react";

export const ExecutiveDashboard: React.FC = () => {
  const { navigateTo, addToast } = useApp();

  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [selectedDemandIds, setSelectedDemandIds] = useState<string[]>([]);
  const [expandedDemandId, setExpandedDemandId] = useState<string | null>(null);

  // Stateful Active Demands
  const [tableRows, setTableRows] = useState([
    {
      id: "REQ-2026-1042",
      position: "Senior Frontend Engineer",
      project: "Retail Omni-Channel Redesign",
      domain: "Digital Transformation",
      stage: "Active Hiring",
      priority: "High",
      owner: "Anjali Desai",
      candidates: 5,
      aging: "12 Days",
      sla: "ON TRACK",
      slaColor: "green"
    },
    {
      id: "REQ-2026-1043",
      position: "Cloud Solutions Architect",
      project: "Data Lake Migration",
      domain: "Cloud Modernization",
      stage: "PM Review",
      priority: "High",
      owner: "Anjali Desai",
      candidates: 1,
      aging: "2 Days",
      sla: "ON TRACK",
      slaColor: "green"
    },
    {
      id: "REQ-2026-1044",
      position: "UX Designer",
      project: "Retail Omni-Channel Redesign",
      domain: "Digital Transformation",
      stage: "Track Head Approval",
      priority: "Medium",
      owner: "Suresh Rao",
      candidates: 1,
      aging: "5 Days",
      sla: "AT RISK",
      slaColor: "amber"
    },
    {
      id: "REQ-2026-1045",
      position: "GenAI Lead Engineer",
      project: "Customer Analytics Platform",
      domain: "AI & Data",
      stage: "Active Hiring",
      priority: "High",
      owner: "Anjali Desai",
      candidates: 3,
      aging: "18 Days",
      sla: "ON TRACK",
      slaColor: "green"
    }
  ]);

  // Bulk Modify Modal State
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [modifyFormData, setModifyFormData] = useState({
    stage: "Active Hiring",
    priority: "High",
    owner: "Anjali Desai"
  });

  // Filtered rows
  const filteredRows = tableRows.filter((row) => {
    if (priorityFilter === "All") return true;
    return row.priority.toLowerCase() === priorityFilter.toLowerCase();
  });

  const isAllSelected = filteredRows.length > 0 && filteredRows.every((r) => selectedDemandIds.includes(r.id));
  const isSomeSelected = selectedDemandIds.length > 0 && !isAllSelected;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDemandIds(filteredRows.map((r) => r.id));
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

  // Bulk Actions Handlers
  const handlePutOnHoldBulk = () => {
    if (selectedDemandIds.length === 0) return;
    setTableRows((prev) =>
      prev.map((row) =>
        selectedDemandIds.includes(row.id)
          ? { ...row, stage: "ON HOLD", sla: "PAUSED", slaColor: "amber" }
          : row
      )
    );
    addToast({
      type: "warning",
      title: "Demands Placed on Hold",
      message: `${selectedDemandIds.length} demand(s) [${selectedDemandIds.join(", ")}] have been put on hold.`
    });
    setSelectedDemandIds([]);
  };

  const handleCancelBulk = () => {
    if (selectedDemandIds.length === 0) return;
    setTableRows((prev) =>
      prev.map((row) =>
        selectedDemandIds.includes(row.id)
          ? { ...row, stage: "CANCELLED", sla: "CANCELLED", slaColor: "amber" }
          : row
      )
    );
    addToast({
      type: "error",
      title: "Demands Cancelled",
      message: `${selectedDemandIds.length} demand(s) [${selectedDemandIds.join(", ")}] have been cancelled.`
    });
    setSelectedDemandIds([]);
  };

  const handleOpenModifyModal = () => {
    if (selectedDemandIds.length === 0) return;
    const firstSelected = tableRows.find((r) => selectedDemandIds.includes(r.id));
    if (firstSelected) {
      setModifyFormData({
        stage: firstSelected.stage,
        priority: firstSelected.priority,
        owner: firstSelected.owner
      });
    }
    setIsModifyModalOpen(true);
  };

  const handleSaveModify = () => {
    setTableRows((prev) =>
      prev.map((row) =>
        selectedDemandIds.includes(row.id)
          ? {
              ...row,
              stage: modifyFormData.stage,
              priority: modifyFormData.priority,
              owner: modifyFormData.owner
            }
          : row
      )
    );
    addToast({
      type: "success",
      title: "Demands Updated",
      message: `Modified ${selectedDemandIds.length} selected demand(s) [${selectedDemandIds.join(", ")}].`
    });
    setIsModifyModalOpen(false);
    setSelectedDemandIds([]);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Resource Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your complete resource demand lifecycle.
          </p>
        </div>

        <button
          id="dash-create-demand-primary-btn"
          onClick={() => navigateTo("create-demand")}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4F91] hover:bg-[#163e73] rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Demand</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              OPEN DEMANDS
            </span>
            <div className="text-3xl font-extrabold text-[#111827]">{tableRows.filter(r => r.stage !== "CANCELLED").length}</div>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 pt-1">
              <span>↗</span> 2 added this week
            </p>
          </div>
          <div className="p-2.5 bg-blue-50 text-[#1D4F91] rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              PENDING PM REVIEW
            </span>
            <div className="text-3xl font-extrabold text-[#111827]">1</div>
            <p className="text-xs text-slate-500 pt-1">
              Avg review time: 1.2 days
            </p>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              ACTIVE HIRING
            </span>
            <div className="text-3xl font-extrabold text-[#111827]">2</div>
            <p className="text-xs font-semibold text-emerald-600 pt-1">
              3 interviews scheduled
            </p>
          </div>
          <div className="p-2.5 bg-blue-50 text-[#1D4F91] rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              FULFILLED (YTD)
            </span>
            <div className="text-3xl font-extrabold text-[#111827]">14</div>
            <p className="text-xs text-slate-500 pt-1">
              85% SLA compliance
            </p>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Contextual Bulk Action Bar - Visible ONLY when 1 or more rows selected */}
      {selectedDemandIds.length > 0 && (
        <div className="bg-[#0F1E36] text-white p-3.5 px-5 rounded-xl border border-[#1E2E4A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in zoom-in-98 duration-150 sticky top-16 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#00E599] text-slate-950 font-black text-xs rounded-full shadow-xs">
              {selectedDemandIds.length} Selected
            </span>
            <span className="text-xs font-semibold text-slate-200 hidden md:inline">
              Select bulk actions to apply across selected active demands:
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Action 1: Modify Demand */}
            <button
              onClick={handleOpenModifyModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#0F1E36] hover:bg-slate-100 font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5 text-[#1D4F91]" />
              <span>Modify Demand</span>
            </button>

            {/* Action 2: Put on Hold */}
            <button
              onClick={handlePutOnHoldBulk}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <PauseCircle className="w-3.5 h-3.5" />
              <span>Put on Hold</span>
            </button>

            {/* Action 3: Cancel Demand */}
            <button
              onClick={handleCancelBulk}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Demand</span>
            </button>

            {/* Clear Selection */}
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

      {/* Active Demands Table Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        {/* Table Header Toolbar */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#111827]">Active Demands</h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600">
              {filteredRows.length} Total
            </span>
          </div>

          <button
            id="dash-filter-btn"
            onClick={() => setPriorityFilter(priorityFilter === "All" ? "High" : "All")}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter by Priority ({priorityFilter})</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                {/* 1. Checkbox Column Header */}
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isSomeSelected;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-[#1D4F91] border-slate-300 focus:ring-[#1D4F91] cursor-pointer"
                    title="Select All"
                  />
                </th>

                <th className="py-3.5 px-5">ID / POSITION</th>
                <th className="py-3.5 px-5">PROJECT</th>
                <th className="py-3.5 px-5">STAGE</th>
                <th className="py-3.5 px-5">OWNER / PM</th>
                <th className="py-3.5 px-5">CANDIDATES</th>
                <th className="py-3.5 px-5">AGING / SLA</th>
                <th className="py-3.5 px-5 text-right">CANDIDATE DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {filteredRows.map((row) => {
                const isSelected = selectedDemandIds.includes(row.id);
                const isExpanded = expandedDemandId === row.id;

                return (
                  <React.Fragment key={row.id}>
                    <tr 
                      onClick={() => navigateTo("demand-detail", row.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected ? "bg-blue-50/50" : "hover:bg-slate-50"
                      }`}
                    >
                      {/* 1. Selection Checkbox */}
                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleToggleRow(row.id, e as any)}
                          className="w-4 h-4 rounded text-[#1D4F91] border-slate-300 focus:ring-[#1D4F91] cursor-pointer"
                        />
                      </td>

                      {/* 2. ID / Position */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#1D4F91] hover:underline">{row.id}</div>
                        <div className="font-extrabold text-[#111827] text-xs mt-0.5">{row.position}</div>
                      </td>

                      {/* 3. Project */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#111827] text-xs">{row.project}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{row.domain}</div>
                      </td>

                      {/* 4. Stage */}
                      <td className="py-4 px-5">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border ${
                          row.stage === "ON HOLD"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : row.stage === "CANCELLED"
                            ? "bg-rose-100 text-rose-800 border-rose-300"
                            : "bg-blue-50/70 border-blue-200 text-[#1D4F91]"
                        }`}>
                          {row.stage}
                        </span>
                      </td>

                      {/* 5. Owner */}
                      <td className="py-4 px-5 font-semibold text-[#111827]">
                        {row.owner}
                      </td>

                      {/* 6. Candidates */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                            {row.candidates}
                          </div>
                          <span className="text-[11px] text-slate-500">Active</span>
                        </div>
                      </td>

                      {/* 7. Aging / SLA */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-[#111827]">{row.aging}</div>
                        <span 
                          className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.slaColor === "amber"
                              ? "bg-amber-100 text-amber-800"
                              : row.slaColor === "red"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {row.sla}
                        </span>
                      </td>

                      {/* 8. Candidate Details Expand/Collapse Toggle Button */}
                      <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setExpandedDemandId(isExpanded ? null : row.id)}
                          title={isExpanded ? "Collapse Candidate Details" : "View Candidate Pipeline Details"}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            isExpanded
                              ? "bg-[#1D4F91] text-white border-[#1D4F91] shadow-2xs"
                              : "bg-white text-slate-700 border-[#E5E7EB] hover:border-[#1D4F91] hover:text-[#1D4F91] hover:bg-blue-50/50"
                          }`}
                        >
                          <span>Candidates</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Candidate Details Panel */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={8} className="p-4 bg-[#F8FAFC] border-y-2 border-blue-100">
                          <DemandDrillDownTable
                            demandId={row.id}
                            project={row.project}
                            role={row.position}
                            positions={row.candidates}
                            status={row.stage}
                            initiallyExpanded={true}
                          />
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

      {/* Modify Demand Bulk Modal */}
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
              Updating stage, priority, and assigned owner for selected demands: <strong className="text-[#1D4F91]">{selectedDemandIds.join(", ")}</strong>
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Stage</label>
                <select
                  value={modifyFormData.stage}
                  onChange={(e) => setModifyFormData({ ...modifyFormData, stage: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-2.5 font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                >
                  <option value="Active Hiring">Active Hiring</option>
                  <option value="PM Review">PM Review</option>
                  <option value="Track Head Approval">Track Head Approval</option>
                  <option value="Submitted">Submitted</option>
                  <option value="ON HOLD">ON HOLD</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
                <select
                  value={modifyFormData.priority}
                  onChange={(e) => setModifyFormData({ ...modifyFormData, priority: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-2.5 font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Owner / PM</label>
                <select
                  value={modifyFormData.owner}
                  onChange={(e) => setModifyFormData({ ...modifyFormData, owner: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-2.5 font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                >
                  <option value="Anjali Desai">Anjali Desai (Delivery Mgr)</option>
                  <option value="Suresh Rao">Suresh Rao (Practice Lead)</option>
                  <option value="Sarah Jenkins">Sarah Jenkins (Director)</option>
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

