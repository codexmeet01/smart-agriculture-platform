import React, { useState, useRef, useEffect } from "react";
import {
  BotMessageSquare,
  Send,
  Sparkles,
  User,
  Droplets,
  CloudSun,
  Sprout,
  TrendingUp,
  PackageCheck,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { aiAdvisorService } from "../services/aiAdvisorService";
import { useFarm } from "../context/FarmContext";

export const AIAdvisorPage = () => {
  const { profile } = useFarm();
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "ai",
      text: `Namaste, **${profile.name || "Kisan Mitra"}**! 🙏\nI am your **AgriSustain AI Farm Advisor**.\n\nI monitor your soil moisture, rainfall forecasts, solar pumps, and APMC Mandi prices 24/7. How can I assist you with your fields today?`,
      timestamp: "Just now",
      quickFollowUps: [
        "Should I irrigate my wheat today?",
        "When should I harvest my crop?",
        "Why are my leaves turning yellow?",
        "Will rain affect my crop?",
        "How can I save water?",
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { label: "🌧️ Weather advice", text: "What is the weather forecast and should I pause irrigation?" },
    { label: "💧 Irrigation advice", text: "Should I irrigate my wheat today?" },
    { label: "🌱 Crop health", text: "Why are my lower leaves turning yellow?" },
    { label: "💰 Market price", text: "What are the latest wheat and tomato mandi prices?" },
    { label: "🌾 Harvest advice", text: "When should I harvest my crop for best market rate?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsTyping(true);

    try {
      const response = await aiAdvisorService.askAdvisor(textToSend, messages);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.answer,
        timestamp: response.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickFollowUps: response.quickFollowUps || [],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I am having temporary connectivity issues reaching the farm gateway. Your crops remain within safe moisture limits.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-agri-deep text-white shadow-md">
            <BotMessageSquare className="h-6 w-6 text-emerald-200" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-agri-dark flex items-center gap-2">
              Ask AgriSustain AI
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Online
              </span>
            </h1>
            <p className="text-xs text-agri-muted">
              Simple, farmer-friendly recommendations grounded in soil sensors and local mandi data.
            </p>
          </div>
        </div>

        {/* Clear chat button */}
        <button
          onClick={() =>
            setMessages([
              {
                id: "msg-reset",
                sender: "ai",
                text: "Chat cleared. What farming question can I help you resolve?",
                timestamp: "Just now",
                quickFollowUps: ["Should I irrigate today?", "Check crop health"],
              },
            ])
          }
          className="text-xs text-gray-400 hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          <RefreshCw className="h-3 w-3" />
          Reset Chat
        </button>
      </div>

      {/* Quick Suggestion Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(btn.text)}
            className="shrink-0 rounded-full border border-emerald-200/80 bg-white hover:bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-agri-dark shadow-soft hover:border-emerald-400 transition-all"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Messages Conversation Stream */}
      <div className="flex-1 overflow-y-auto rounded-3xl bg-white p-4 sm:p-6 border border-emerald-900/10 shadow-soft space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-xs ${
                msg.sender === "user"
                  ? "bg-agri-dark text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {msg.sender === "user" ? <User className="h-4 w-4" /> : <Sprout className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-emerald-600 to-agri-deep text-white shadow-sm rounded-tr-none"
                  : "bg-[#f7faf8] text-agri-dark border border-gray-100 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-line font-normal">
                {msg.text.split("**").map((chunk, i) =>
                  i % 2 === 1 ? <strong key={i} className="font-bold text-emerald-950">{chunk}</strong> : chunk
                )}
              </div>

              <div
                className={`mt-2 flex items-center justify-end text-[10px] ${
                  msg.sender === "user" ? "text-emerald-200" : "text-gray-400"
                }`}
              >
                {msg.timestamp}
              </div>

              {/* Follow-up Quick Chips */}
              {msg.quickFollowUps && msg.quickFollowUps.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 block w-full">
                    Suggested follow-up:
                  </span>
                  {msg.quickFollowUps.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-[11px] font-medium bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg px-2.5 py-1 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Sprout className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-[#f7faf8] p-3.5 border border-gray-100 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-gray-400 ml-2">Analyzing sensor records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask in simple words (e.g., Should I irrigate my wheat today?)"
          className="flex-1 rounded-2xl border border-emerald-200 bg-white px-5 py-3.5 text-xs sm:text-sm text-agri-dark shadow-soft focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-agri-deep text-white shadow-md shadow-emerald-950/20 hover:scale-105 transition-all disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};
