import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  id?: string;
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: "blue" | "amber" | "red" | "emerald";
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  id,
  title,
  value,
  change,
  isPositive = true,
  subtext,
  icon: Icon,
  badge,
  badgeColor = "blue",
  onClick
}) => {
  let badgeStyle = "bg-blue-50 text-[#024AD8] border-blue-100";
  if (badgeColor === "amber") badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
  if (badgeColor === "red") badgeStyle = "bg-red-50 text-[#CC2D32] border-red-200";
  if (badgeColor === "emerald") badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div
      id={id || `kpi-${title.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-blue-300" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-2 rounded-xl bg-slate-50 text-[#447180] border border-slate-100">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
        {badge && (
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${badgeStyle}`}>
            {badge}
          </span>
        )}
      </div>

      {(change || subtext) && (
        <div className="flex items-center gap-2 mt-2 text-xs">
          {change && (
            <span
              className={`inline-flex items-center font-semibold ${
                isPositive ? "text-emerald-600" : "text-[#CC2D32]"
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
          )}
          {subtext && <span className="text-slate-500">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
