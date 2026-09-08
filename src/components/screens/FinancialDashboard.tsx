import React from "react";
import { useApp } from "../../context/AppContext";
import { KpiCard } from "../common/KpiCard";
import { DollarSign, TrendingUp, Percent, AlertTriangle, ShieldCheck, BarChart2 } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts";
import { revenueTrendData, practiceRevenueData } from "../../data/mockData";

export const FinancialDashboard: React.FC = () => {
  const { demands } = useApp();

  const totalRevenue = demands.reduce((acc, d) => acc + d.revenue, 0);
  const totalCost = demands.reduce((acc, d) => acc + d.cost, 0);
  const netProfit = totalRevenue - totalCost;
  const avgMargin = Number(((netProfit / (totalRevenue || 1)) * 100).toFixed(1));

  const revenueAtRisk = demands
    .filter((d) => d.status === "Validation" || d.margin < 35)
    .reduce((acc, d) => acc + d.revenue, 0);

  const customerRevenueData = demands.map((d) => ({
    customer: d.customer.split(" ")[0],
    revenue: Number((d.revenue / 1e6).toFixed(2)),
    margin: d.margin
  }));

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          Financial Analytics Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time commercial revenue pipeline tracking, delivery cost control, gross margin realization, and risk exposure.
        </p>
      </div>

      {/* Top 6 Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1e6).toFixed(2)}M`}
          change="+12.4%"
          isPositive={true}
          subtext="Confirmed pipeline"
          icon={DollarSign}
        />

        <KpiCard
          title="Delivery Cost"
          value={`$${(totalCost / 1e6).toFixed(2)}M`}
          subtext="Payroll & cloud"
          icon={BarChart2}
        />

        <KpiCard
          title="Gross Net Profit"
          value={`$${(netProfit / 1e6).toFixed(2)}M`}
          change="+8.6%"
          isPositive={true}
          subtext="Net realization"
          icon={TrendingUp}
        />

        <KpiCard
          title="Avg Gross Margin"
          value={`${avgMargin}%`}
          isPositive={avgMargin >= 35}
          subtext="Target: 35.0%"
          icon={Percent}
          badge={avgMargin >= 35 ? "On Target" : "Warning"}
          badgeColor={avgMargin >= 35 ? "emerald" : "red"}
        />

        <KpiCard
          title="Full Year Forecast"
          value={`$${((totalRevenue * 1.25) / 1e6).toFixed(1)}M`}
          change="+15% YoY"
          isPositive={true}
          subtext="Projected run-rate"
          icon={ShieldCheck}
        />

        <KpiCard
          title="Revenue at Risk"
          value={`$${(revenueAtRisk / 1e6).toFixed(2)}M`}
          subtext="Low margin demands"
          icon={AlertTriangle}
          badge={revenueAtRisk > 0 ? "Risk Exposure" : "Low Risk"}
          badgeColor={revenueAtRisk > 0 ? "red" : "emerald"}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue vs Cost Trend */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs">
          <h3 className="text-sm font-bold text-[#111827] mb-1">Quarterly Revenue vs Delivery Cost ($M)</h3>
          <p className="text-[11px] text-slate-500 mb-4">Historical performance and margin expansion</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px", border: "1px solid #E5E7EB" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="revenue" fill="#1D4F91" radius={[4, 4, 0, 0]} name="Revenue ($M)" />
                <Bar dataKey="cost" fill="#64748B" radius={[4, 4, 0, 0]} name="Cost ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Margin % Trajectory */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs">
          <h3 className="text-sm font-bold text-[#111827] mb-1">Gross Margin Realization (%)</h3>
          <p className="text-[11px] text-slate-500 mb-4">Target threshold: 35.0%</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[30, 45]} stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px", border: "1px solid #E5E7EB" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line type="monotone" dataKey="marginPct" stroke="#10B981" strokeWidth={3} name="Margin %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Practice Revenue Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs">
          <h3 className="text-sm font-bold text-[#111827] mb-1">Practice Revenue vs Annual Target ($M)</h3>
          <p className="text-[11px] text-slate-500 mb-4">Performance across business practices</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="practice" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px", border: "1px solid #E5E7EB" }} />
                <Bar dataKey="revenue" fill="#1D4F91" radius={[4, 4, 0, 0]} name="Actual Revenue ($M)" />
                <Bar dataKey="target" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Target ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Customer Revenue Distribution */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-2xs">
          <h3 className="text-sm font-bold text-[#111827] mb-1">Top Customer Portfolio Valuation ($M)</h3>
          <p className="text-[11px] text-slate-500 mb-4">Contract value breakdown</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis dataKey="customer" type="category" stroke="#94A3B8" fontSize={11} width={100} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px", border: "1px solid #E5E7EB" }} />
                <Bar dataKey="revenue" fill="#64748B" radius={[0, 4, 4, 0]} name="Revenue ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
