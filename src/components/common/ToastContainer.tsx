import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container" 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let bgClass = "bg-white border-slate-200 text-slate-900";
        let Icon = Info;
        let iconColor = "text-blue-600";

        if (toast.type === "success") {
          Icon = CheckCircle2;
          iconColor = "text-emerald-600";
          bgClass = "bg-emerald-50/95 border-emerald-200 text-emerald-950";
        } else if (toast.type === "warning") {
          Icon = AlertTriangle;
          iconColor = "text-amber-600";
          bgClass = "bg-amber-50/95 border-amber-200 text-amber-950";
        } else if (toast.type === "error") {
          Icon = AlertCircle;
          iconColor = "text-red-600";
          bgClass = "bg-red-50/95 border-red-200 text-red-950";
        } else if (toast.type === "info") {
          Icon = Info;
          iconColor = "text-[#024AD8]";
          bgClass = "bg-blue-50/95 border-blue-200 text-blue-950";
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-200 ${bgClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
