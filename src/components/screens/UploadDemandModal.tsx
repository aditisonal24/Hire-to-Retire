import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useApp } from "../../context/AppContext";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export const UploadDemandModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, addDemand, addToast } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [previewData, setPreviewData] = useState<Array<any>>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setParsing(true);

    setTimeout(() => {
      // Mock parsed rows from sheet
      setPreviewData([
        { customer: "Goldman Sachs", project: "Algorithmic Risk Engine", revenue: 3100000, practice: "Cloud & DevOps", requestedFTE: 14 },
        { customer: "Pfizer Inc", project: "R&D Cloud Pipeline", revenue: 2400000, practice: "AI & Data", requestedFTE: 10 },
        { customer: "Siemens AG", project: "Factory Digital Twin", revenue: 4800000, practice: "Digital Engineering", requestedFTE: 20 }
      ]);
      setParsing(false);
    }, 800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleImport = () => {
    previewData.forEach((row) => {
      addDemand(row);
    });
    addToast({
      type: "success",
      title: "Bulk Demands Imported",
      message: `Successfully imported ${previewData.length} new demands from ${uploadedFile?.name}.`
    });
    setIsUploadModalOpen(false);
    setUploadedFile(null);
    setPreviewData([]);
  };

  return (
    <Modal
      id="upload-demand-modal"
      isOpen={isUploadModalOpen}
      onClose={() => setIsUploadModalOpen(false)}
      title="Upload Demand Excel/CSV Sheet"
      subtitle="Import bulk demands with auto-field mapping & validation"
      maxWidth="xl"
      footer={
        previewData.length > 0 ? (
          <>
            <button
              onClick={() => {
                setUploadedFile(null);
                setPreviewData([]);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Reset
            </button>
            <button
              onClick={handleImport}
              className="px-4 py-2 text-xs font-bold text-white bg-[#024AD8] hover:bg-blue-700 rounded-xl shadow-2xs"
            >
              Import {previewData.length} Demands
            </button>
          </>
        ) : null
      }
    >
      <div className="space-y-4">
        {!uploadedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              dragActive ? "border-[#024AD8] bg-blue-50/50" : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#024AD8] flex items-center justify-center mx-auto mb-3 border border-blue-100">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Drag & Drop your Excel (.xlsx) or CSV file here
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Supported columns: Customer, Project, Revenue, Cost, Practice, FTEs, Geography
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#024AD8] hover:bg-blue-700 rounded-xl cursor-pointer shadow-2xs">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Browse File</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
                }}
              />
            </label>
          </div>
        ) : parsing ? (
          <div className="py-12 text-center text-slate-600 text-xs">
            <Upload className="w-8 h-8 text-[#024AD8] animate-bounce mx-auto mb-2" />
            <span>Parsing spreadsheet structure & verifying rate card fields...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Parsed {uploadedFile.name} successfully ({previewData.length} records ready)</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Customer</th>
                    <th className="p-2.5">Project</th>
                    <th className="p-2.5">Revenue</th>
                    <th className="p-2.5">Practice</th>
                    <th className="p-2.5">FTEs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-semibold text-slate-900">{row.customer}</td>
                      <td className="p-2.5 text-slate-700">{row.project}</td>
                      <td className="p-2.5 font-medium text-slate-900">${(row.revenue / 1e6).toFixed(2)}M</td>
                      <td className="p-2.5 text-slate-600">{row.practice}</td>
                      <td className="p-2.5 text-slate-800 font-semibold">{row.requestedFTE} FTE</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
