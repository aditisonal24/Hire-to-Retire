import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Settings, 
  Shield, 
  Sliders, 
  RefreshCw, 
  Save, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Bell, 
  Building2,
  Cpu,
  Layers
} from "lucide-react";

export const SettingsView: React.FC = () => {
  const { resetToDefaults, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<"governance" | "sla" | "validation" | "notifications">("governance");

  // Financial & Operational State
  const [minMargin, setMinMargin] = useState(35.0);
  const [approvalSla, setApprovalSla] = useState(48);
  const [currency, setCurrency] = useState("USD");

  // Stage SLA Limits
  const [screeningSla, setScreeningSla] = useState(3);
  const [techEvalSla, setTechEvalSla] = useState(5);
  const [pmReviewSla, setPmReviewSla] = useState(4);
  const [offerSla, setOfferSla] = useState(7);

  // Validation & AI Settings
  const [autoValidation, setAutoValidation] = useState(true);
  const [aiSkillMatching, setAiSkillMatching] = useState(true);
  const [strictSowCheck, setStrictSowCheck] = useState(true);

  // Notifications
  const [popoverAlerts, setPopoverAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slaBreachAlerts, setSlaBreachAlerts] = useState(true);

  const handleSave = () => {
    addToast({
      type: "success",
      title: "Settings Updated",
      message: "Ascendion Platform governance rules & SLA thresholds saved successfully."
    });
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#111827] tracking-tight">
              Ascendion Platform Settings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00E599]/20 text-emerald-800 border border-[#00E599]/40">
              v3.2 Enterprise
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage Ascendion Demand Management, Candidate Pipeline Stage SLAs, Financial Baselines, and AI Validation Rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1D4F91] hover:bg-[#163e73] text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2 text-xs font-bold">
        {[
          { id: "governance", label: "Financial & Governance", icon: <DollarSign className="w-4 h-4" /> },
          { id: "sla", label: "Pipeline Stage SLAs", icon: <Clock className="w-4 h-4" /> },
          { id: "validation", label: "Automated AI Engine", icon: <Cpu className="w-4 h-4" /> },
          { id: "notifications", label: "Pop-over & Alerts", icon: <Bell className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1D4F91] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6 text-xs">
        
        {/* Tab 1: Governance & Financial Baseline */}
        {activeTab === "governance" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1D4F91]" />
                <span>Financial Baseline & Demand Governance</span>
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Set minimum gross margin thresholds and demand approval SLA time limits across business units.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">Minimum Gross Margin (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={minMargin}
                  onChange={(e) => setMinMargin(Number(e.target.value))}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#111827] font-bold focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                />
                <p className="text-[10px] text-slate-500">
                  Demands below this margin will automatically flag a Validation Alert.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">Approval SLA Limit (Hours)</label>
                <input
                  type="number"
                  value={approvalSla}
                  onChange={(e) => setApprovalSla(Number(e.target.value))}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#111827] font-bold focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                />
                <p className="text-[10px] text-slate-500">
                  Maximum hours allowed for Delivery Directors to approve submitted demands.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">Operating Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2.5 text-xs text-[#111827] font-bold focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20"
                >
                  <option value="USD">USD ($) - Global</option>
                  <option value="INR">INR (₹) - India Delivery</option>
                  <option value="EUR">EUR (€) - Europe</option>
                  <option value="GBP">GBP (£) - UK</option>
                </select>
                <p className="text-[10px] text-slate-500">
                  Base currency for resource rate cards and project financial estimations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Candidate Pipeline Stage SLAs */}
        {activeTab === "sla" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1D4F91]" />
                <span>Candidate Pipeline Stage Aging Limits (Days)</span>
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Define target SLA durations per candidate stage before triggering aging alerts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">Initial Screening SLA</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={screeningSla}
                    onChange={(e) => setScreeningSla(Number(e.target.value))}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#111827] font-bold"
                  />
                  <span className="font-semibold text-slate-500">Days</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">Tech Evaluation SLA</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={techEvalSla}
                    onChange={(e) => setTechEvalSla(Number(e.target.value))}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#111827] font-bold"
                  />
                  <span className="font-semibold text-slate-500">Days</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">PM Review SLA</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pmReviewSla}
                    onChange={(e) => setPmReviewSla(Number(e.target.value))}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#111827] font-bold"
                  />
                  <span className="font-semibold text-slate-500">Days</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block font-bold text-slate-800">Offer Release SLA</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={offerSla}
                    onChange={(e) => setOfferSla(Number(e.target.value))}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2 text-xs text-[#111827] font-bold"
                  />
                  <span className="font-semibold text-slate-500">Days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Validation Engine */}
        {activeTab === "validation" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#1D4F91]" />
                <span>Automated SOW & Skill Matching AI Engine</span>
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Enable automated verification of attached SOW documents, skill relevance scoring, and PO validation.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#111827] block">Real-time SOW & PO Document Audit</span>
                  <span className="text-[11px] text-slate-500">Automatically inspect attached SOW PDF files and highlight line-item variances</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoValidation}
                  onChange={(e) => setAutoValidation(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1D4F91] focus:ring-[#1D4F91]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#111827] block">AI Skill Match Scoring</span>
                  <span className="text-[11px] text-slate-500">Compare candidate profiles against demand technical requirements using automated scoring</span>
                </div>
                <input
                  type="checkbox"
                  checked={aiSkillMatching}
                  onChange={(e) => setAiSkillMatching(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1D4F91] focus:ring-[#1D4F91]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#111827] block">Strict SOW Requirement Verification</span>
                  <span className="text-[11px] text-slate-500">Require mandatory SOW attachment before releasing candidate offers</span>
                </div>
                <input
                  type="checkbox"
                  checked={strictSowCheck}
                  onChange={(e) => setStrictSowCheck(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1D4F91] focus:ring-[#1D4F91]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notifications & Alert Preferences */}
        {activeTab === "notifications" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#1D4F91]" />
                <span>Notification Pop-over & Alert Channels</span>
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Configure real-time pop-over alerts, email digests, and SLA breach warnings.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#111827] block">Header Pop-over Notifications</span>
                  <span className="text-[11px] text-slate-500">Show floating pop-over card under bell icon for real-time demand & candidate updates</span>
                </div>
                <input
                  type="checkbox"
                  checked={popoverAlerts}
                  onChange={(e) => setPopoverAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1D4F91] focus:ring-[#1D4F91]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#111827] block">SLA Breach Escalation Warnings</span>
                  <span className="text-[11px] text-slate-500">Send high-priority alerts when candidate stage aging exceeds configured SLA limit</span>
                </div>
                <input
                  type="checkbox"
                  checked={slaBreachAlerts}
                  onChange={(e) => setSlaBreachAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1D4F91] focus:ring-[#1D4F91]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#111827] block">Daily Email Executive Digest</span>
                  <span className="text-[11px] text-slate-500">Send daily summary of open demands, candidate pipelines, and resource onboardings</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1D4F91] focus:ring-[#1D4F91]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section: Demonstration Dataset Control */}
        <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
          <h3 className="font-bold text-[#111827] text-xs uppercase tracking-wider text-slate-400">Dataset Governance</h3>
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div>
              <span className="font-bold text-amber-950 block">Reset Seed Enterprise Data</span>
              <span className="text-[11px] text-amber-800">Restore default Ascendion demo demands, candidate pipelines, resources, approvals, and logs</span>
            </div>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

