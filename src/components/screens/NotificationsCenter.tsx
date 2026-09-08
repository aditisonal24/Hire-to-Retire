import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { StatusChip } from "../common/StatusChip";
import { Bell, CheckCheck, Filter, ArrowRight } from "lucide-react";

export const NotificationsCenter: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigateTo } = useApp();

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filtered = notifications.filter((n) =>
    categoryFilter === "ALL" ? true : n.category === categoryFilter
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            System alerts, SLA warnings, demand validation logs, and approval notifications.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1D4F91] bg-blue-50/70 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        {["ALL", "Approval", "Validation", "Staffing", "Financial", "SLA", "System"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              categoryFilter === cat
                ? "bg-[#1D4F91] text-white border-[#1D4F91] font-bold"
                : "bg-white text-slate-600 border-[#E5E7EB] hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-[#E5E7EB]">
            No notifications found in this category.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.actionLink) navigateTo("demand-detail", n.actionLink);
              }}
              className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !n.read ? "border-blue-300 bg-blue-50/20 shadow-2xs" : "border-[#E5E7EB] hover:border-slate-300"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827] text-xs">{n.title}</span>
                  <StatusChip status={n.category} size="sm" />
                  <StatusChip status={n.priority} size="sm" />
                </div>
                <p className="text-xs text-slate-600">{n.message}</p>
                <span className="text-[10px] text-slate-400 block pt-1">{n.timestamp}</span>
              </div>

              {n.actionLink && (
                <span className="text-xs font-semibold text-[#1D4F91] hover:underline flex items-center gap-1 shrink-0">
                  Open Demand →
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
