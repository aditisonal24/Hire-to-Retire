import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle, Info } from "lucide-react";

interface ConfirmDialogProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  id,
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDanger = false
}) => {
  return (
    <Modal
      id={id || "confirm-dialog"}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      footer={
        <>
          <button
            id="cancel-confirm-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            id="proceed-confirm-btn"
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors ${
              isDanger
                ? "bg-[#CC2D32] hover:bg-red-700"
                : "bg-[#024AD8] hover:bg-blue-700"
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-2.5 rounded-xl shrink-0 ${
            isDanger ? "bg-red-50 text-[#CC2D32]" : "bg-blue-50 text-[#024AD8]"
          }`}
        >
          {isDanger ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{message}</p>
      </div>
    </Modal>
  );
};
