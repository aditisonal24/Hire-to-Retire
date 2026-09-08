import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { StatusChip } from "../common/StatusChip";
import { 
  Bell, 
  X, 
  CheckCheck, 
  Search, 
  ExternalLink, 
  Check, 
  Clock, 
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";

export const NotificationDrawer: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    navigateTo 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Filter by category
      if (categoryFilter === "UNREAD" && n.read) return false;
      if (categoryFilter !== "ALL" && categoryFilter !== "UNREAD" && n.category !== categoryFilter) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchMsg = n.message.toLowerCase().includes(q);
        const matchCat = n.category.toLowerCase().includes(q);
        const matchLink = n.actionLink ? n.actionLink.toLowerCase().includes(q) : false;
        return matchTitle || matchMsg || matchCat || matchLink;
      }

      return true;
    });
  }, [notifications, categoryFilter, searchQuery]);

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Pop-over Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-150"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Floating Pop-over Card */}
      <div className="absolute top-14 right-4 sm:right-6 w-96 sm:w-[420px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Pop-over Arrow / Notch Indicator */}
        <div className="absolute -top-1.5 right-12 w-3 h-3 bg-slate-50 rotate-45 border-t border-l border-[#E5E7EB]" />

        {/* Header */}
        <div className="p-3.5 border-b border-[#E5E7EB] bg-slate-50/90 flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-100 text-[#1D4F91] rounded-lg">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-[#111827]">Notifications Pop-over</h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.2 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">Real-time Ascendion demand alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="p-1 text-[11px] font-semibold text-[#1D4F91] hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All</span>
              </button>
            )}
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              title="Close pop-over"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 border-b border-[#E5E7EB] bg-white space-y-2.5">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:border-[#1D4F91] focus:ring-1 focus:ring-[#1D4F91]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
            {[
              { id: "ALL", label: "All" },
              { id: "UNREAD", label: `Unread (${unreadCount})` },
              { id: "Approval", label: "Approval" },
              { id: "Validation", label: "Validation" },
              { id: "SLA", label: "SLA" },
              { id: "Staffing", label: "Staffing" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-[#1D4F91] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-50/50">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No notifications found</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                {searchQuery ? "Try clearing your search query or switching filters." : "You're all caught up with your demand alerts!"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border transition-all bg-white relative group shadow-2xs ${
                  !n.read 
                    ? "border-blue-300 bg-blue-50/20" 
                    : "border-[#E5E7EB] hover:border-slate-300 opacity-90"
                }`}
              >
                {/* Unread indicator dot */}
                {!n.read && (
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-blue-600" />
                )}

                <div className="space-y-1.5 pr-4">
                  {/* Category & Priority Chips */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusChip status={n.category} size="sm" />
                    <StatusChip status={n.priority} size="sm" />
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {n.timestamp}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-xs font-bold text-[#111827] leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    {n.message}
                  </p>

                  {/* Action Links & Buttons */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    {n.actionLink ? (
                      <button
                        onClick={() => {
                          markNotificationRead(n.id);
                          navigateTo("demand-detail", n.actionLink);
                          setIsNotificationDrawerOpen(false);
                        }}
                        className="font-bold text-[#1D4F91] hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Demand {n.actionLink}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">System Event</span>
                    )}

                    {!n.read ? (
                      <button
                        onClick={() => markNotificationRead(n.id)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-blue-700 flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-100 cursor-pointer"
                        title="Mark as read"
                      >
                        <Check className="w-3 h-3" />
                        <span>Mark read</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <CheckCheck className="w-3 h-3 text-emerald-600" />
                        <span>Read</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[#E5E7EB] bg-white flex items-center justify-between gap-3">
          <button
            onClick={() => {
              navigateTo("notifications");
              setIsNotificationDrawerOpen(false);
            }}
            className="w-full py-2 px-3 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>Open Notification Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
