import React, { useEffect } from "react";
import { Modal } from "../common/Modal";
import { useApp } from "../../context/AppContext";
import { Keyboard } from "lucide-react";

export const KeyboardShortcutsModal: React.FC = () => {
  const { isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen, navigateTo, setIsAiDrawerOpen } = useApp();

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") return;

      if (e.key === "?") {
        e.preventDefault();
        setIsKeyboardShortcutsOpen(true);
      } else if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        navigateTo("create-demand");
      } else if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        navigateTo("dashboard");
      } else if (e.key.toLowerCase() === "v") {
        e.preventDefault();
        navigateTo("validation");
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        navigateTo("approvals");
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        navigateTo("resources");
      } else if (e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsAiDrawerOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [navigateTo, setIsAiDrawerOpen, setIsKeyboardShortcutsOpen]);

  const shortcuts = [
    { key: "?", description: "Open Keyboard Shortcuts Legend" },
    { key: "C", description: "Create New Demand Wizard" },
    { key: "D", description: "Go to Executive Dashboard" },
    { key: "V", description: "Go to Validation Center" },
    { key: "A", description: "Go to Approval Kanban Center" },
    { key: "R", description: "Go to Resource Management" },
    { key: "I", description: "Toggle AI Copilot Assistant" },
    { key: "Esc", description: "Close Modal or Drawer" }
  ];

  return (
    <Modal
      id="keyboard-shortcuts-modal"
      isOpen={isKeyboardShortcutsOpen}
      onClose={() => setIsKeyboardShortcutsOpen(false)}
      title="Keyboard Shortcuts"
      subtitle="Enterprise quick navigation hotkeys"
      maxWidth="md"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 p-3 bg-blue-50 text-[#024AD8] rounded-xl text-xs font-semibold">
          <Keyboard className="w-4 h-4 shrink-0" />
          <span>Press any key while viewing the dashboard to jump to pages instantly.</span>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {shortcuts.map((sc) => (
            <div key={sc.key} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
              <span className="text-xs text-slate-700 font-medium">{sc.description}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-slate-800 bg-slate-100 border border-slate-300 rounded-md shadow-2xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
