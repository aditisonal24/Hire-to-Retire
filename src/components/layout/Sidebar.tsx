import React from "react";
import { useApp } from "../../context/AppContext";
import { ViewScreen } from "../../types";
import { 
  LayoutGrid, 
  FileText, 
  Users, 
  Briefcase,
  LogOut
} from "lucide-react";

interface NavItem {
  id: ViewScreen;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const { currentScreen, navigateTo, addToast } = useApp();

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutGrid className="w-4 h-4" />
    },
    {
      id: "demands",
      label: "My Demands",
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: "validation",
      label: "Candidate Pipeline",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "resources",
      label: "Resource Tracking",
      icon: <Briefcase className="w-4 h-4" />
    }
  ];

  const handleLogout = () => {
    addToast({
      title: "Session Terminated",
      message: "You have been logged out of ResourceOps securely.",
      type: "info"
    });
  };

  return (
    <aside className="w-60 bg-[#0F1E36] text-white flex flex-col shrink-0 min-h-screen select-none border-r border-[#1E2E4A]">
      {/* Main Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === "demands" && currentScreen === "demand-detail");
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                isActive
                  ? "border border-blue-500 bg-blue-900/30 text-white font-semibold shadow-xs"
                  : "text-slate-300 hover:bg-white/5 hover:text-white font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-white" : "text-slate-400"}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1D4F91] text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile Badge & Logout */}
      <div className="p-4 border-t border-[#1E2E4A] bg-[#0B172A] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
            AJ
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">Alice Johnson</div>
            <div className="text-[10px] text-slate-400 font-medium truncate">Delivery Director</div>
          </div>
        </div>
        <button
          id="sidebar-logout-btn"
          onClick={handleLogout}
          title="Logout"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

