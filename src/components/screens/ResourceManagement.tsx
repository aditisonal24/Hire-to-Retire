import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Calendar, User, Briefcase, CheckCircle2, Building, Mail, Phone, FileText } from "lucide-react";

interface ResourceRecord {
  id: string;
  avatar: string;
  name: string;
  experience: string;
  reqId: string;
  role: string;
  joiningStatus: "Accepted" | "Offer" | "Joining" | "Onboarded";
  expectedOnboarding: string;
  email: string;
  phone: string;
  location: string;
}

export const ResourceManagement: React.FC = () => {
  const { navigateTo, addToast } = useApp();

  const [selectedResource, setSelectedResource] = useState<ResourceRecord | null>(null);

  const resourceRecords: ResourceRecord[] = [
    {
      id: "RES-101",
      avatar: "KG",
      name: "Kartik Gupta",
      experience: "6 Years",
      reqId: "REQ-2026-1042",
      role: "Senior Frontend Engineer",
      joiningStatus: "Accepted",
      expectedOnboarding: "2026-08-15",
      email: "kartik.gupta@example.com",
      phone: "+91 98765 43210",
      location: "Bangalore, India"
    },
    {
      id: "RES-102",
      avatar: "RV",
      name: "Rahul Verma",
      experience: "5 Years",
      reqId: "REQ-2026-1045",
      role: "Data Engineer",
      joiningStatus: "Offer",
      expectedOnboarding: "2026-07-25",
      email: "rahul.verma@example.com",
      phone: "+91 98123 45678",
      location: "Hyderabad, India"
    },
    {
      id: "RES-103",
      avatar: "SR",
      name: "Sneha Rao",
      experience: "6 Years",
      reqId: "REQ-2026-1045",
      role: "Data Engineer",
      joiningStatus: "Joining",
      expectedOnboarding: "2026-07-25",
      email: "sneha.rao@example.com",
      phone: "+91 97654 32109",
      location: "Pune, India"
    }
  ];

  const getStatusBadge = (status: ResourceRecord["joiningStatus"]) => {
    switch (status) {
      case "Accepted":
      case "Offer":
        return (
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-800 border border-amber-200/80 inline-block shadow-2xs">
            {status}
          </span>
        );
      case "Joining":
        return (
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-100/70 text-blue-800 border border-blue-200/80 inline-block shadow-2xs">
            {status}
          </span>
        );
      case "Onboarded":
        return (
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200/80 inline-block shadow-2xs">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          Resource Tracking
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track selected candidates, joining status, and expected onboarding dates.
        </p>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-400 font-bold uppercase text-[11px] tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-4 px-6">CANDIDATE DETAILS</th>
                <th className="py-4 px-6">DEMAND / ROLE</th>
                <th className="py-4 px-6">JOINING STATUS</th>
                <th className="py-4 px-6">EXPECTED ONBOARDING</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {resourceRecords.map((res) => (
                <tr
                  key={res.id}
                  onClick={() => setSelectedResource(res)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  {/* Candidate Details */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-[#F1F5F9] text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                        {res.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-[#111827] text-xs hover:text-[#1D4F91]">
                          {res.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                          {res.experience}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Demand / Role */}
                  <td className="py-4 px-6">
                    <div 
                      onClick={(e) => { e.stopPropagation(); navigateTo("demand-detail", res.reqId); }}
                      className="font-bold text-[#111827] hover:text-[#1D4F91] transition-colors"
                    >
                      {res.reqId}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      {res.role}
                    </div>
                  </td>

                  {/* Joining Status */}
                  <td className="py-4 px-6">
                    {getStatusBadge(res.joiningStatus)}
                  </td>

                  {/* Expected Onboarding */}
                  <td className="py-4 px-6 font-bold text-[#111827]">
                    {res.expectedOnboarding}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Resource View Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1D4F91] text-white font-bold text-sm flex items-center justify-center">
                  {selectedResource.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#111827]">
                    {selectedResource.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedResource.role} • {selectedResource.experience} Experience
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-slate-400 font-medium block">Demand ID</span>
                  <button 
                    onClick={() => { setSelectedResource(null); navigateTo("demand-detail", selectedResource.reqId); }}
                    className="font-bold text-[#1D4F91] hover:underline"
                  >
                    {selectedResource.reqId}
                  </button>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Joining Status</span>
                  <div className="mt-0.5">{getStatusBadge(selectedResource.joiningStatus)}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Expected Onboarding</span>
                  <span className="font-bold text-[#111827]">{selectedResource.expectedOnboarding}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Base Location</span>
                  <span className="font-semibold text-slate-700">{selectedResource.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Contact & Onboarding Details</h4>
                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedResource.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedResource.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-between">
              <button
                onClick={() => {
                  addToast({
                    title: "Status Updated",
                    message: `Onboarding status updated for ${selectedResource.name}`,
                    type: "success"
                  });
                  setSelectedResource(null);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-[#1D4F91] bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg"
              >
                Confirm Onboarding
              </button>
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
