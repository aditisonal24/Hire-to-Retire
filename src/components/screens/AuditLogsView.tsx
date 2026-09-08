import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Modal } from "../common/Modal";
import { Search, ShieldCheck, FileText, Smartphone } from "lucide-react";
import { AuditLog } from "../../types";

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.demandId && log.demandId.toLowerCase().includes(search.toLowerCase()));

    const matchesModule = moduleFilter === "ALL" || log.module === moduleFilter;

    return matchesSearch && matchesModule;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          Governance Audit Logs
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Immutable logging of demand creations, approval gate changes, validation waivers, and resource allocations.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by User, Action, or Demand ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg pl-9 pr-8 py-2 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20 transition-all"
          />
        </div>

        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
        >
          <option value="ALL">All Modules</option>
          <option value="Demand Management">Demand Management</option>
          <option value="Validation Center">Validation Center</option>
          <option value="Approval Center">Approval Center</option>
          <option value="Resource Management">Resource Management</option>
        </select>
      </div>

      {/* Audit Data Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-500 font-bold uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">User & Role</th>
                <th className="py-3 px-5">Module</th>
                <th className="py-3 px-5">Action</th>
                <th className="py-3 px-5">Previous State</th>
                <th className="py-3 px-5">New State</th>
                <th className="py-3 px-5">Device & IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-5 font-mono text-[11px] text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <img src={log.userAvatar} alt={log.user} className="w-6 h-6 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-[#111827]">{log.user}</div>
                        <div className="text-[10px] text-slate-400">{log.userRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-semibold text-[#111827]">{log.module}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-[#1D4F91] bg-blue-50/70 px-2.5 py-1 rounded-md border border-blue-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-mono text-[11px] text-slate-500 truncate max-w-[150px]">{log.previousValue}</td>
                  <td className="py-4 px-5 font-mono text-[11px] text-emerald-700 font-bold truncate max-w-[150px]">{log.newValue}</td>
                  <td className="py-4 px-5 text-[10px] text-slate-400">
                    <div>{log.device}</div>
                    <div className="font-mono">{log.ipAddress}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Diff Modal */}
      {selectedLog && (
        <Modal
          id="audit-diff-modal"
          isOpen={true}
          onClose={() => setSelectedLog(null)}
          title={`Audit Log Record: ${selectedLog.id}`}
          subtitle={`Recorded on ${selectedLog.timestamp}`}
          maxWidth="md"
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div><strong>User:</strong> {selectedLog.user} ({selectedLog.userRole})</div>
              <div><strong>Action:</strong> {selectedLog.action}</div>
              <div><strong>Module:</strong> {selectedLog.module}</div>
              <div><strong>Demand Target:</strong> {selectedLog.demandId || "N/A"}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <span className="font-bold text-red-900 uppercase text-[10px] block">Previous State:</span>
                <p className="font-mono text-red-950 mt-1">{selectedLog.previousValue}</p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="font-bold text-emerald-900 uppercase text-[10px] block">New State:</span>
                <p className="font-mono text-emerald-950 mt-1">{selectedLog.newValue}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
