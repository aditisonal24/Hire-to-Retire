import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  BarChart3, 
  Download, 
  Clock, 
  Share2, 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  Check, 
  Send
} from "lucide-react";
import { Modal } from "../common/Modal";

export const ReportsLibrary: React.FC = () => {
  const { reports, addToast } = useApp();

  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");

  const handleExport = (title: string, format: string) => {
    addToast({
      type: "success",
      title: "Report Exported",
      message: `Exported "${title}" in ${format} format.`
    });
  };

  const handleShare = () => {
    if (!emailTo.trim()) return;
    addToast({
      type: "info",
      title: "Report Shared",
      message: `Sent report link to ${emailTo}.`
    });
    setIsShareModalOpen(false);
    setEmailTo("");
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          Reports Library
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Executive analytics exports, SLA efficiency benchmarks, gross margin realization, and staffing gap forecasting.
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1D4F91] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                  {rep.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{rep.schedule} Schedule</span>
              </div>

              <h3 className="text-sm font-bold text-[#111827] tracking-tight">{rep.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{rep.description}</p>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Updated: {rep.lastGenerated}</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleExport(rep.title, "PDF")}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  title="Export PDF"
                >
                  <FileText className="w-3.5 h-3.5 text-red-600" />
                </button>

                <button
                  onClick={() => handleExport(rep.title, "Excel")}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  title="Export Excel"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                </button>

                <button
                  onClick={() => {
                    setSelectedReport(rep);
                    setIsShareModalOpen(true);
                  }}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  title="Share Report"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#1D4F91]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      {selectedReport && (
        <Modal
          id="share-report-modal"
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          title={`Share Report: ${selectedReport.title}`}
          subtitle="Send interactive report link or automated schedule"
          maxWidth="md"
          footer={
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-[#1D4F91] hover:bg-[#163e73] text-white font-semibold text-xs rounded-lg shadow-2xs transition-colors"
            >
              Send Link
            </button>
          }
        >
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Recipient Email Address:</label>
            <input
              type="email"
              placeholder="e.g. vp.delivery@enterprise.com"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20 transition-all"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
