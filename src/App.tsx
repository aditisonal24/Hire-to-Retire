import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ToastContainer } from "./components/common/ToastContainer";
import { KeyboardShortcutsModal } from "./components/layout/KeyboardShortcutsModal";
import { UploadDemandModal } from "./components/screens/UploadDemandModal";
import { NotificationDrawer } from "./components/layout/NotificationDrawer";

import { ExecutiveDashboard } from "./components/screens/ExecutiveDashboard";
import { DemandManagement } from "./components/screens/DemandManagement";
import { CreateDemandWizard } from "./components/screens/CreateDemandWizard";
import { ValidationCenter } from "./components/screens/ValidationCenter";
import { ApprovalCenter } from "./components/screens/ApprovalCenter";
import { ResourceManagement } from "./components/screens/ResourceManagement";
import { FinancialDashboard } from "./components/screens/FinancialDashboard";
import { DemandDetailView } from "./components/screens/DemandDetailView";
import { ReportsLibrary } from "./components/screens/ReportsLibrary";
import { NotificationsCenter } from "./components/screens/NotificationsCenter";
import { AuditLogsView } from "./components/screens/AuditLogsView";
import { SettingsView } from "./components/screens/SettingsView";

const MainContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
      {currentScreen === "dashboard" && <ExecutiveDashboard />}
      {currentScreen === "demands" && <DemandManagement />}
      {currentScreen === "create-demand" && <CreateDemandWizard />}
      {currentScreen === "validation" && <ValidationCenter />}
      {currentScreen === "approvals" && <ApprovalCenter />}
      {currentScreen === "resources" && <ResourceManagement />}
      {currentScreen === "financials" && <FinancialDashboard />}
      {currentScreen === "demand-detail" && <DemandDetailView />}
      {currentScreen === "reports" && <ReportsLibrary />}
      {currentScreen === "notifications" && <NotificationsCenter />}
      {currentScreen === "audit-logs" && <AuditLogsView />}
      {currentScreen === "settings" && <SettingsView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans flex flex-col antialiased">
        {/* Sticky Top Header */}
        <Header />

        {/* Main Body with Left Sidebar + Scrollable View */}
        <div className="flex flex-1">
          <Sidebar />
          <MainContent />
        </div>

        {/* Global Overlays */}
        <ToastContainer />
        <KeyboardShortcutsModal />
        <UploadDemandModal />
        <NotificationDrawer />
      </div>
    </AppProvider>
  );
}
