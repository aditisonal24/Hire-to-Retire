import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  ViewScreen, 
  Demand, 
  ValidationItem, 
  ApprovalItem, 
  Resource, 
  AuditLog, 
  NotificationItem, 
  Toast 
} from "../types";
import { 
  initialDemands, 
  initialValidations, 
  initialApprovals, 
  initialResources, 
  initialAuditLogs, 
  initialNotifications 
} from "../data/mockData";

interface AppContextType {
  currentScreen: ViewScreen;
  selectedDemandId: string | null;
  role: string;
  setRole: (role: string) => void;
  navigateTo: (screen: ViewScreen, demandId?: string) => void;
  
  demands: Demand[];
  validations: ValidationItem[];
  approvals: ApprovalItem[];
  resources: Resource[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  toasts: Toast[];

  addDemand: (newDemand: Partial<Demand>) => Demand;
  updateDemand: (id: string, updates: Partial<Demand>) => void;
  cloneDemand: (id: string) => void;
  deleteDemand: (id: string) => void;

  approveDemand: (demandId: string, comment?: string) => void;
  rejectDemand: (demandId: string, comment?: string) => void;
  returnForRework: (demandId: string, comment?: string) => void;

  resolveValidation: (validationId: string, action: "Resolve" | "Waive") => void;
  assignResourceToDemand: (demandId: string, resourceId: string) => void;
  unassignResourceFromDemand: (demandId: string, resourceId: string) => void;

  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  isKeyboardShortcutsOpen: boolean;
  setIsKeyboardShortcutsOpen: (open: boolean) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "dd_dashboard_state_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>("dashboard");
  const [selectedDemandId, setSelectedDemandId] = useState<string | null>("DEM-2024-001");
  const [role, setRole] = useState<string>("Delivery Director");

  const [demands, setDemands] = useState<Demand[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_demands`);
    return saved ? JSON.parse(saved) : initialDemands;
  });

  const [validations, setValidations] = useState<ValidationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_validations`);
    return saved ? JSON.parse(saved) : initialValidations;
  });

  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_approvals`);
    return saved ? JSON.parse(saved) : initialApprovals;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_resources`);
    return saved ? JSON.parse(saved) : initialResources;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_demands`, JSON.stringify(demands));
  }, [demands]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_validations`, JSON.stringify(validations));
  }, [validations]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_approvals`, JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_resources`, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAudit = (
    action: string, 
    module: AuditLog["module"], 
    demandId?: string, 
    previousValue: string = "N/A", 
    newValue: string = "Updated"
  ) => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      user: role === "Delivery Director" ? "Sarah Jenkins" : "Current User",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      userRole: role,
      action,
      module,
      demandId,
      previousValue,
      newValue,
      device: "MacBook Pro (Chrome Enterprise)",
      ipAddress: "192.168.1.104"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const navigateTo = (screen: ViewScreen, demandId?: string) => {
    setCurrentScreen(screen);
    if (demandId) {
      setSelectedDemandId(demandId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addDemand = (data: Partial<Demand>): Demand => {
    const nextNum = demands.length + 1;
    const newId = `DEM-2024-00${nextNum}`;
    const revenue = data.revenue || 2000000;
    const cost = data.cost || Math.round(revenue * 0.62);
    const margin = data.revenue ? Number(((revenue - cost) / revenue * 100).toFixed(1)) : 38.0;

    const newDemand: Demand = {
      id: newId,
      customer: data.customer || "Acme Enterprise",
      project: data.project || "Digital Transformation Core",
      revenue,
      cost,
      margin,
      practice: data.practice || "Cloud & DevOps",
      geography: data.geography || "North America",
      deliveryUnit: data.deliveryUnit || "DU-East-01",
      startDate: data.startDate || new Date().toISOString().substring(0, 10),
      endDate: data.endDate || "2027-12-31",
      requestedFTE: data.requestedFTE || 10,
      assignedFTE: 0,
      status: "Submitted",
      approvalStage: "Pending DD Review",
      priority: data.priority || "High",
      slaHoursLeft: 48,
      slaStatus: "On Track",
      description: data.description || "Enterprise project demand created via wizard.",
      owner: `${role} User`,
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().substring(0, 10),
      attachments: data.attachments || [],
      assignedResourceIds: [],
      validationErrorCount: margin < 35 ? 1 : 0
    };

    setDemands((prev) => [newDemand, ...prev]);

    // Create approval item
    const newApproval: ApprovalItem = {
      id: `APP-${Date.now()}`,
      demandId: newId,
      customer: newDemand.customer,
      project: newDemand.project,
      revenue: newDemand.revenue,
      margin: newDemand.margin,
      requestedFTE: newDemand.requestedFTE,
      stage: "Pending DD Review",
      slaTimer: "48h 00m",
      submittedBy: newDemand.owner,
      submittedDate: new Date().toISOString().substring(0, 16).replace("T", " "),
      comments: [
        {
          id: `c-${Date.now()}`,
          author: newDemand.owner,
          role: role,
          date: new Date().toISOString().substring(0, 16).replace("T", " "),
          text: "Demand created and submitted for DD approval.",
          action: "Comment"
        }
      ]
    };
    setApprovals((prev) => [newApproval, ...prev]);

    // Validation warning if low margin
    if (margin < 35) {
      const valItem: ValidationItem = {
        id: `VAL-${Date.now()}`,
        demandId: newId,
        customer: newDemand.customer,
        project: newDemand.project,
        validationType: "Negative Margin Warning",
        severity: "High",
        owner: newDemand.owner,
        slaTimer: "48h remaining",
        status: "Failed",
        description: `Gross margin is ${margin}%, below 35% standard baseline.`,
        recommendedFix: "Adjust rate card pricing or offshore FTE ratio."
      };
      setValidations((prev) => [valItem, ...prev]);
    }

    addAudit("Created Demand", "Demand Management", newId, "N/A", `Status: Submitted, Revenue: $${(revenue/1e6).toFixed(2)}M`);
    addToast({ type: "success", title: "Demand Created", message: `${newId} successfully created & submitted for approval.` });

    return newDemand;
  };

  const updateDemand = (id: string, updates: Partial<Demand>) => {
    setDemands((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString().substring(0, 10) } : d))
    );
    addAudit("Updated Demand", "Demand Management", id, "Modified fields", JSON.stringify(updates));
    addToast({ type: "info", title: "Demand Updated", message: `Updated details for ${id}.` });
  };

  const cloneDemand = (id: string) => {
    const source = demands.find((d) => d.id === id);
    if (!source) return;
    const cloned = addDemand({
      ...source,
      project: `${source.project} (Copy)`,
      status: "Draft",
      approvalStage: "Pending DD Review"
    });
    addToast({ type: "success", title: "Demand Cloned", message: `Created copy of ${id} as ${cloned.id}` });
  };

  const deleteDemand = (id: string) => {
    setDemands((prev) => prev.filter((d) => d.id !== id));
    setApprovals((prev) => prev.filter((a) => a.demandId !== id));
    setValidations((prev) => prev.filter((v) => v.demandId !== id));
    addAudit("Deleted Demand", "Demand Management", id, id, "Deleted");
    addToast({ type: "warning", title: "Demand Deleted", message: `Demand ${id} removed.` });
  };

  const approveDemand = (demandId: string, comment: string = "Approved by Delivery Director.") => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id === demandId) {
          return {
            ...d,
            status: "Staffing",
            approvalStage: "Approved",
            updatedAt: new Date().toISOString().substring(0, 10)
          };
        }
        return d;
      })
    );

    setApprovals((prev) =>
      prev.map((app) => {
        if (app.demandId === demandId) {
          return {
            ...app,
            stage: "Approved",
            comments: [
              ...app.comments,
              {
                id: `c-${Date.now()}`,
                author: "Sarah Jenkins",
                role: role,
                date: new Date().toISOString().substring(0, 16).replace("T", " "),
                text: comment,
                action: "Approve"
              }
            ]
          };
        }
        return app;
      })
    );

    addAudit("Approved Demand", "Approval Center", demandId, "Stage: Pending DD Review", "Stage: Approved");
    addToast({ type: "success", title: "Demand Approved", message: `${demandId} approved and moved to Staffing Allocation.` });
  };

  const rejectDemand = (demandId: string, comment: string = "Rejected due to commercial misalignment.") => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id === demandId) {
          return { ...d, status: "Rejected", approvalStage: "Rejected" };
        }
        return d;
      })
    );

    setApprovals((prev) =>
      prev.map((app) => {
        if (app.demandId === demandId) {
          return {
            ...app,
            stage: "Rejected",
            comments: [
              ...app.comments,
              {
                id: `c-${Date.now()}`,
                author: "Sarah Jenkins",
                role: role,
                date: new Date().toISOString().substring(0, 16).replace("T", " "),
                text: comment,
                action: "Reject"
              }
            ]
          };
        }
        return app;
      })
    );

    addAudit("Rejected Demand", "Approval Center", demandId, "Stage: Review", "Stage: Rejected");
    addToast({ type: "error", title: "Demand Rejected", message: `${demandId} rejected.` });
  };

  const returnForRework = (demandId: string, comment: string = "Returned for rework on financial rate card.") => {
    setDemands((prev) =>
      prev.map((d) => (d.id === demandId ? { ...d, status: "Draft" } : d))
    );

    setApprovals((prev) =>
      prev.map((app) => {
        if (app.demandId === demandId) {
          return {
            ...app,
            comments: [
              ...app.comments,
              {
                id: `c-${Date.now()}`,
                author: "Sarah Jenkins",
                role: role,
                date: new Date().toISOString().substring(0, 16).replace("T", " "),
                text: comment,
                action: "Return for Rework"
              }
            ]
          };
        }
        return app;
      })
    );

    addAudit("Returned Demand for Rework", "Approval Center", demandId, "Stage: Review", "Returned to Draft");
    addToast({ type: "warning", title: "Returned for Rework", message: `${demandId} sent back to author.` });
  };

  const resolveValidation = (validationId: string, action: "Resolve" | "Waive") => {
    setValidations((prev) =>
      prev.map((v) => {
        if (v.id === validationId) {
          return { ...v, status: action === "Resolve" ? "Resolved" : "Waived" };
        }
        return v;
      })
    );
    addAudit(`Validation ${action}d`, "Validation Center", validationId, "Status: Failed", `Status: ${action}d`);
    addToast({ type: "success", title: `Validation ${action}d`, message: `Issue ${validationId} marked as ${action.toLowerCase()}d.` });
  };

  const assignResourceToDemand = (demandId: string, resourceId: string) => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id === demandId) {
          const currentIds = d.assignedResourceIds || [];
          if (currentIds.includes(resourceId)) return d;
          const updatedIds = [...currentIds, resourceId];
          return {
            ...d,
            assignedResourceIds: updatedIds,
            assignedFTE: Math.min(d.requestedFTE, d.assignedFTE + 1)
          };
        }
        return d;
      })
    );

    setResources((prev) =>
      prev.map((res) => {
        if (res.id === resourceId) {
          return {
            ...res,
            allocationStatus: "Allocated",
            utilizationPercent: 100,
            currentProject: demandId
          };
        }
        return res;
      })
    );

    addAudit("Assigned Resource", "Resource Management", demandId, "Unallocated", `Resource: ${resourceId}`);
    addToast({ type: "success", title: "Resource Allocated", message: `Allocated ${resourceId} to ${demandId}.` });
  };

  const unassignResourceFromDemand = (demandId: string, resourceId: string) => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id === demandId) {
          return {
            ...d,
            assignedResourceIds: (d.assignedResourceIds || []).filter((id) => id !== resourceId),
            assignedFTE: Math.max(0, d.assignedFTE - 1)
          };
        }
        return d;
      })
    );

    setResources((prev) =>
      prev.map((res) => {
        if (res.id === resourceId) {
          return {
            ...res,
            allocationStatus: "Bench",
            utilizationPercent: 0,
            currentProject: undefined
          };
        }
        return res;
      })
    );

    addAudit("Unassigned Resource", "Resource Management", demandId, `Resource: ${resourceId}`, "Unassigned");
    addToast({ type: "info", title: "Resource Unassigned", message: `Released ${resourceId} back to Bench.` });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({ type: "info", title: "Notifications Cleared", message: "All notifications marked as read." });
  };

  const resetToDefaults = () => {
    setDemands(initialDemands);
    setValidations(initialValidations);
    setApprovals(initialApprovals);
    setResources(initialResources);
    setAuditLogs(initialAuditLogs);
    setNotifications(initialNotifications);
    addToast({ type: "info", title: "Data Reset", message: "Restored seed enterprise demonstration dataset." });
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        selectedDemandId,
        role,
        setRole,
        navigateTo,
        demands,
        validations,
        approvals,
        resources,
        auditLogs,
        notifications,
        toasts,
        addDemand,
        updateDemand,
        cloneDemand,
        deleteDemand,
        approveDemand,
        rejectDemand,
        returnForRework,
        resolveValidation,
        assignResourceToDemand,
        unassignResourceFromDemand,
        addToast,
        removeToast,
        markNotificationRead,
        markAllNotificationsRead,
        globalSearchQuery,
        setGlobalSearchQuery,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        isKeyboardShortcutsOpen,
        setIsKeyboardShortcutsOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
