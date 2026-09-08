import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { StatusChip } from "../common/StatusChip";
import { Modal } from "../common/Modal";
import { 
  CheckSquare, 
  Clock, 
  DollarSign, 
  Users, 
  Percent, 
  Check, 
  X, 
  RotateCcw, 
  MessageSquare,
  LayoutGrid,
  List
} from "lucide-react";
import { ApprovalStage, ApprovalItem } from "../../types";

export const ApprovalCenter: React.FC = () => {
  const { approvals, approveDemand, rejectDemand, returnForRework, navigateTo } = useApp();

  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [activeItem, setActiveItem] = useState<ApprovalItem | null>(null);
  const [commentText, setCommentText] = useState("");
  const [modalAction, setModalAction] = useState<"approve" | "reject" | "rework" | null>(null);

  const columns: ApprovalStage[] = [
    "Pending DD Review",
    "Finance Review",
    "PM Review",
    "Regional Approval",
    "Approved",
    "Rejected"
  ];

  const handleOpenActionModal = (item: ApprovalItem, action: "approve" | "reject" | "rework") => {
    setActiveItem(item);
    setModalAction(action);
    setCommentText("");
  };

  const handleConfirmAction = () => {
    if (!activeItem || !modalAction) return;

    if (modalAction === "approve") {
      approveDemand(activeItem.demandId, commentText || "Approved by DD.");
    } else if (modalAction === "reject") {
      rejectDemand(activeItem.demandId, commentText || "Rejected by DD.");
    } else if (modalAction === "rework") {
      returnForRework(activeItem.demandId, commentText || "Returned for commercial rework.");
    }

    setActiveItem(null);
    setModalAction(null);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & Toggle View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Demand Approval Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stage-gate governance workflow for Delivery Directors, Finance Heads, and Regional Leaders.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F8FAFC] p-1 rounded-lg border border-[#E5E7EB]">
          <button
            onClick={() => setViewMode("kanban")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === "kanban" ? "bg-white text-[#1D4F91] shadow-2xs border border-[#E5E7EB]" : "text-slate-600 hover:text-[#111827]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === "list" ? "bg-white text-[#1D4F91] shadow-2xs border border-[#E5E7EB]" : "text-slate-600 hover:text-[#111827]"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const columnItems = approvals.filter((a) => a.stage === col);

            return (
              <div key={col} className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E7EB] flex flex-col min-w-[240px]">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
                  <span className="text-xs font-bold text-slate-700 tracking-tight">{col}</span>
                  <span className="text-[10px] font-bold bg-white border border-[#E5E7EB] text-slate-700 px-2 py-0.5 rounded-full">
                    {columnItems.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-0.5">
                  {columnItems.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-slate-400 border border-dashed border-[#E5E7EB] rounded-lg">
                      No items
                    </div>
                  ) : (
                    columnItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all space-y-2.5"
                      >
                        {/* Header ID & Timer */}
                        <div className="flex items-center justify-between">
                          <span
                            onClick={() => navigateTo("demand-detail", item.demandId)}
                            className="font-bold text-xs text-[#1D4F91] hover:underline cursor-pointer"
                          >
                            {item.demandId}
                          </span>
                          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-100">
                            <Clock className="w-3 h-3" /> {item.slaTimer}
                          </span>
                        </div>

                        {/* Customer & Project */}
                        <div>
                          <p className="font-bold text-[#111827] text-xs">{item.customer}</p>
                          <p className="text-[11px] text-slate-500 truncate">{item.project}</p>
                        </div>

                        {/* Financial Metrics */}
                        <div className="grid grid-cols-2 gap-2 p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[11px]">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-semibold">Revenue</span>
                            <span className="font-bold text-[#111827]">${(item.revenue / 1e6).toFixed(2)}M</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-semibold">Margin</span>
                            <span className={`font-bold ${item.margin >= 35 ? "text-emerald-700" : "text-red-600"}`}>
                              {item.margin}%
                            </span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        {item.stage === "Pending DD Review" && (
                          <div className="flex items-center gap-1 pt-1 border-t border-[#E5E7EB]">
                            <button
                              onClick={() => handleOpenActionModal(item, "approve")}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#1D4F91] hover:bg-[#163e73] text-white font-bold text-[10px] rounded-lg shadow-2xs transition-colors"
                            >
                              <Check className="w-3 h-3" /> Approve
                            </button>
                            <button
                              onClick={() => handleOpenActionModal(item, "rework")}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[10px] rounded-lg transition-colors"
                              title="Return for Rework"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleOpenActionModal(item, "reject")}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-[10px] rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-5">Demand ID</th>
                <th className="py-3 px-5">Customer & Project</th>
                <th className="py-3 px-5">Stage</th>
                <th className="py-3 px-5">Revenue</th>
                <th className="py-3 px-5">Margin</th>
                <th className="py-3 px-5">SLA Timer</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {approvals.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#1D4F91] cursor-pointer hover:underline" onClick={() => navigateTo("demand-detail", app.demandId)}>
                    {app.demandId}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#111827]">{app.customer}</div>
                    <div className="text-[11px] text-slate-500">{app.project}</div>
                  </td>
                  <td className="py-4 px-5">
                    <StatusChip status={app.stage} />
                  </td>
                  <td className="py-4 px-5 font-semibold text-[#111827]">${(app.revenue / 1e6).toFixed(2)}M</td>
                  <td className="py-4 px-5 font-bold text-emerald-700">{app.margin}%</td>
                  <td className="py-4 px-5 text-amber-700 font-semibold">{app.slaTimer}</td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleOpenActionModal(app, "approve")}
                      className="px-3.5 py-1.5 bg-[#1D4F91] hover:bg-[#163e73] text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
                    >
                      Action →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Dialog Modal */}
      {activeItem && modalAction && (
        <Modal
          id="approval-action-modal"
          isOpen={true}
          onClose={() => setActiveItem(null)}
          title={`${modalAction.toUpperCase()} Demand: ${activeItem.demandId}`}
          subtitle={`Customer: ${activeItem.customer} | Revenue: $${(activeItem.revenue/1e6).toFixed(2)}M`}
          maxWidth="md"
          footer={
            <>
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-xs font-bold text-white rounded-xl ${
                  modalAction === "approve"
                    ? "bg-[#024AD8] hover:bg-blue-700"
                    : modalAction === "reject"
                    ? "bg-[#CC2D32] hover:bg-red-700"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                Confirm {modalAction}
              </button>
            </>
          }
        >
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Approval Decision Comments / Governance Notes:
            </label>
            <textarea
              rows={3}
              placeholder="Enter approval conditions, rate card notes, or rejection reasoning..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
