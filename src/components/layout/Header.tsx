import React from "react";
import { useApp } from "../../context/AppContext";
import { AscendionLogo } from "../common/AscendionLogo";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Settings
} from "lucide-react";

export const Header: React.FC = () => {
  const { 
    notifications, 
    setIsAiDrawerOpen,
    setIsKeyboardShortcutsOpen,
    setIsNotificationDrawerOpen,
    navigateTo,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] h-14 px-6 flex items-center justify-between">
      {/* Left: ASCENDION Logo */}
      <div 
        className="flex items-center gap-3 select-none cursor-pointer group"
        onClick={() => navigateTo("dashboard")}
      >
        <AscendionLogo variant="light" size="md" />
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative w-64 lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search records..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full bg-[#F1F5F9] border-0 rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4F91]/20 transition-all"
          />
        </div>

        {/* Notifications Icon */}
        <button
          id="header-notifications-btn"
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="p-1.5 text-slate-500 hover:text-[#111827] rounded-lg hover:bg-slate-100 relative transition-colors cursor-pointer"
          title="Notifications Panel"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-4 h-4 bg-blue-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Help Button */}
        <button
          id="header-help-btn"
          onClick={() => setIsKeyboardShortcutsOpen(true)}
          className="p-1.5 text-slate-500 hover:text-[#111827] rounded-lg hover:bg-slate-100 transition-colors"
          title="Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          id="header-settings-btn"
          onClick={() => navigateTo("settings")}
          className="p-1.5 text-slate-500 hover:text-[#111827] rounded-lg hover:bg-slate-100 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

