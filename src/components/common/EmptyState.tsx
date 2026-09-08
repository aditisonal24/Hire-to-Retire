import React from "react";
import { FolderSearch } from "lucide-react";

interface EmptyStateProps {
  id?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id,
  title,
  description,
  actionLabel,
  onAction,
  icon
}) => {
  return (
    <div
      id={id || "empty-state-card"}
      className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 my-4"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#447180] flex items-center justify-center mb-4 border border-slate-200">
        {icon || <FolderSearch className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          id="empty-state-action-btn"
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#024AD8] hover:bg-blue-700 rounded-xl shadow-2xs transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
