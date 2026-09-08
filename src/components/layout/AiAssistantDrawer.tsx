import React, { useState } from "react";
import { Drawer } from "../common/Drawer";
import { useApp } from "../../context/AppContext";
import { Sparkles, Send, Bot, User, ArrowRight, Lightbulb } from "lucide-react";

export const AiAssistantDrawer: React.FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, demands, validations, resources, navigateTo } = useApp();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hello Delivery Director! I am your Enterprise AI Assistant. Ask me anything about demand validations, margin risks, open resource staffing gaps, or SLA performance."
    }
  ]);

  const quickPrompts = [
    "Analyze Revenue at Risk across all active demands",
    "Find optimal resource match for DEM-2024-002",
    "List critical SLA warnings requiring immediate DD action",
    "How can I increase EMEA Practice gross margin by 2%?"
  ];

  const handleSend = async (promptText?: string) => {
    const textToSend = promptText || query;
    if (!textToSend.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: textToSend }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          contextData: {
            demandsSummary: demands.map((d) => ({
              id: d.id,
              customer: d.customer,
              margin: d.margin,
              revenue: d.revenue,
              status: d.status,
              slaStatus: d.slaStatus
            })),
            failedValidationsCount: validations.filter((v) => v.status === "Failed").length,
            benchCount: resources.filter((r) => r.allocationStatus === "Bench").length
          }
        })
      });

      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "No insights returned." }
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "[Simulated Response] Error connecting to server. Pipeline Insight: Demands DEM-2024-002 (Novartis) and DEM-2024-006 (E.ON Energy) require immediate Delivery Director attention due to SLA expiration and margin threshold breach (28%)."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      id="ai-copilot-drawer"
      isOpen={isAiDrawerOpen}
      onClose={() => setIsAiDrawerOpen(false)}
      title="DD AI Executive Copilot"
      subtitle="Powered by Gemini 2.5 Flash for enterprise demand insights"
      width="lg"
    >
      <div className="flex flex-col h-full space-y-4">
        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Executive Quick Analysis
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] text-left px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-[#024AD8] text-slate-700 rounded-lg border border-slate-200 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-200" />

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === "user"
                    ? "bg-[#024AD8] text-white"
                    : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xs"
                }`}
              >
                {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#024AD8] text-white font-medium"
                    : "bg-slate-100 text-slate-800 border border-slate-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
              <Sparkles className="w-4 h-4 animate-spin text-[#024AD8]" />
              <span>Analyzing enterprise pipeline telemetry...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
          <input
            id="ai-copilot-input"
            type="text"
            placeholder="Ask about margins, staffing, SLA risks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#024AD8]/20 focus:border-[#024AD8]"
          />
          <button
            id="send-ai-copilot-btn"
            onClick={() => handleSend()}
            disabled={loading || !query.trim()}
            className="p-2.5 bg-[#024AD8] hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition-colors shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Drawer>
  );
};
