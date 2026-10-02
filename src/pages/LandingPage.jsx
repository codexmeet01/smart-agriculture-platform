import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Droplets,
  Sun,
  Cpu,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Activity,
  Zap,
  BarChart3,
  BotMessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Layers,
  Radio,
  Eye,
  RotateCw,
  Compass,
  CloudRain,
  Flame,
  Check,
  Send,
  Sliders,
} from "lucide-react";
import { FuturisticNavbar } from "../components/navigation/FuturisticNavbar";
import { DigitalTwinCanvas, CAMERA_STAGES } from "../components/digitaltwin/DigitalTwinCanvas";
import { useFarm } from "../context/FarmContext";

export const LandingPage = () => {
  const { kpis, weather, plots, startIrrigation, stopIrrigation, activePump, showToast } = useFarm();

  // 3D Canvas Stage & Controls
  const [currentStage, setCurrentStage] = useState("hero");
  const [activeLayers, setActiveLayers] = useState({
    soilMoisture: true,
    irrigation: true,
    cropHealth: true,
    weather: true,
    energy: true,
  });
  const [selectedZone, setSelectedZone] = useState("zone-a");
  const [weatherSim, setWeatherSim] = useState("sunny");
  const [sprinklersOn, setSprinklersOn] = useState(false);

  // Chat Console State for Section 8
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Agri AI Core. Ask me about your soil moisture, rainfall forecasts, irrigation scheduling, or mandi crop prices.",
    },
    {
      sender: "user",
      text: "Should I irrigate my wheat today?",
    },
    {
      sender: "ai",
      text: "No irrigation is recommended today. Soil moisture is currently 68% and rainfall (12 mm) is expected within 18 hours. Estimated water saved: 420 L.",
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState("");

  const handleAskQuestion = (q) => {
    const questionText = q || inputQuestion;
    if (!questionText.trim()) return;

    const newMsgs = [...chatMessages, { sender: "user", text: questionText }];
    setChatMessages(newMsgs);
    setInputQuestion("");

    // Simulate AI Core instant intelligent response
    setTimeout(() => {
      let reply = "Processing farm telemetry from IoT mesh...";
      const lower = questionText.toLowerCase();

      if (lower.includes("irrigate") || lower.includes("water")) {
        reply = "Hold irrigation for next 24h. Soil moisture is optimal at 64% and high humidity prevents evapotranspiration.";
      } else if (lower.includes("crop") || lower.includes("disease") || lower.includes("health")) {
        reply = "Plot A Wheat is at 91% optimal health. Plot B Rice paddy requires monitoring for slight nitrogen deficiency.";
      } else if (lower.includes("weather") || lower.includes("rain")) {
        reply = "Rainfall of 12 mm expected tomorrow afternoon with 35% probability. Wind speed normal at 12 km/h.";
      } else if (lower.includes("market") || lower.includes("price") || lower.includes("sell")) {
        reply = "Wheat is trading at ₹2,450/q (+4.2%) at Kanpur Mandi. Upward trend observed; recommend holding for 48h.";
      } else if (lower.includes("solar") || lower.includes("energy")) {
        reply = "Solar microgrid generated 8.4 kWh today, saving 19% in diesel grid costs.";
      } else {
        reply = "Farm telemetry verified. All 6 IoT soil sensors and solar irrigation pumps are operating within sustainable limits.";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 450);
  };

  // Toggle Layer
  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Scroll to section smoothly
  const scrollToId = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#031A14] text-[#F1F5F9] antialiased selection:bg-[#00D084]/30 selection:text-[#67F5C2] relative">
      {/* Floating Futuristic Minimalist Navbar */}
      <FuturisticNavbar />

      {/* ========================================================
          1. HERO SECTION — FULL 3D DIGITAL FARM DIGITAL TWIN
          ======================================================== */}
      <section id="farm-hero" className="relative w-full h-screen min-h-[720px] overflow-hidden">
        {/* Fullscreen 3D WebGL Digital Twin Scene */}
        <div className="absolute inset-0 z-0">
          <DigitalTwinCanvas
            stage={currentStage}
            layers={activeLayers}
            weatherMode={weatherSim}
            sprinklersActive={sprinklersOn}
            onSelectObject={(type) => {
              if (type === "solar") setCurrentStage("solar");
              else if (type === "sensor") setCurrentStage("sensor");
              else if (type === "water") setCurrentStage("irrigation");
              else if (type === "crop") setCurrentStage("crops");
              else if (type === "weather") setCurrentStage("weather");
              else if (type === "aicore") setCurrentStage("aicore");
            }}
          />
        </div>

        {/* Subtle Radial Vignette for Contrast */}
        <div className="absolute inset-0 pointer-events-none radial-vignette z-10" />

        {/* Top-Right Quick 3D Camera Controls */}
        <div className="absolute top-20 right-6 z-20 hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl glass-futuristic border border-white/10 shadow-glass">
          <button
            onClick={() => setCurrentStage("hero")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              currentStage === "hero"
                ? "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            GLOBAL VIEW
          </button>
          <button
            onClick={() => setCurrentStage("solar")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              currentStage === "solar"
                ? "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            SOLAR
          </button>
          <button
            onClick={() => setCurrentStage("sensor")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              currentStage === "sensor"
                ? "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            SOIL SENSORS
          </button>
          <button
            onClick={() => setCurrentStage("irrigation")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              currentStage === "irrigation"
                ? "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            IRRIGATION
          </button>
          <button
            onClick={() => setCurrentStage("crops")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              currentStage === "crops"
                ? "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            CROPS
          </button>
        </div>

        {/* Hero Typography & Core CTA Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none px-6 sm:px-12 lg:px-20 max-w-4xl">
          <div className="pointer-events-auto space-y-5">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-4 py-1.5 border border-[#00D084]/40 shadow-neon-emerald">
              <span className="h-2 w-2 rounded-full bg-[#00D084] animate-ping" />
              <span className="text-xs font-mono tracking-widest text-[#67F5C2] uppercase font-bold">
                AGRI-SUSTAIN AI • NEXT-GEN DIGITAL TWIN
              </span>
            </div>

            {/* Main Cinematic Heading */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
              GROW MORE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D084] via-[#67F5C2] to-[#38BDF8] text-glow-mint">
                WASTE LESS.
              </span> <br />
              FARM SMARTER.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-white/75 max-w-xl font-normal leading-relaxed">
              An AI-powered digital twin for smarter irrigation, healthier crops and climate-resilient farming.
              Seamlessly orchestrating soil IoT sensors, solar microgrids, and water intelligence in real-time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentStage("aicore");
                  showToast("🛰️ Zooming camera into the 3D Agri AI Core...");
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00D084] to-[#059669] hover:from-[#67F5C2] hover:to-[#00D084] px-7 py-3.5 text-sm font-bold text-[#031A14] shadow-neon-emerald hover:shadow-neon-mint transition-all duration-200 hover:scale-[1.03]"
              >
                <span>ENTER FARM</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollToId("ai-core")}
                className="inline-flex items-center gap-2 rounded-2xl glass-futuristic hover:bg-white/10 border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
              >
                <span>EXPLORE DIGITAL TWIN</span>
                <ChevronRight className="h-4 w-4 text-[#67F5C2]" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. 3D DATA HUD — FLOATING GLASS PANELS AROUND THE FARM
            ======================================================== */}
        {/* HUD 1: Water Saved (Bottom Left) */}
        <div className="absolute bottom-8 left-6 sm:left-12 z-20 pointer-events-none hidden sm:block">
          <div className="pointer-events-auto rounded-2xl glass-futuristic-dark p-4 border border-[#00D084]/30 shadow-glass min-w-[190px] backdrop-blur-2xl">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#67F5C2] uppercase tracking-wider mb-1">
              <span>WATER SAVED</span>
              <Droplets className="h-3.5 w-3.5 text-[#38BDF8]" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white text-glow-emerald">
              28%
            </div>
            <div className="text-xs text-white/60 font-mono mt-0.5">
              12,400 L Total
            </div>
          </div>
        </div>

        {/* HUD 2: Energy Saved (Bottom Center-Left) */}
        <div className="absolute bottom-8 left-64 sm:left-72 z-20 pointer-events-none hidden lg:block">
          <div className="pointer-events-auto rounded-2xl glass-futuristic-dark p-4 border border-[#00D084]/30 shadow-glass min-w-[180px] backdrop-blur-2xl">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#67F5C2] uppercase tracking-wider mb-1">
              <span>SOLAR ENERGY</span>
              <Zap className="h-3.5 w-3.5 text-[#F59E0B]" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              8.4 kWh
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-0.5">
              19% Cost Saved
            </div>
          </div>
        </div>

        {/* HUD 3: Crop Health (Bottom Right) */}
        <div className="absolute bottom-8 right-6 sm:right-12 z-20 pointer-events-none hidden sm:block">
          <div className="pointer-events-auto rounded-2xl glass-futuristic-dark p-4 border border-[#00D084]/30 shadow-glass min-w-[190px] backdrop-blur-2xl">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#67F5C2] uppercase tracking-wider mb-1">
              <span>CROP HEALTH</span>
              <Sprout className="h-3.5 w-3.5 text-[#00D084]" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              87%
            </div>
            <div className="text-xs text-[#00D084] font-mono mt-0.5">
              Status: Healthy
            </div>
          </div>
        </div>

        {/* HUD 4: Climate Risk (Top Left) */}
        <div className="absolute top-20 left-6 sm:left-12 z-20 pointer-events-none hidden md:block">
          <div className="pointer-events-auto rounded-2xl glass-futuristic-dark px-4 py-2.5 border border-white/10 shadow-glass flex items-center gap-3 backdrop-blur-xl">
            <div className="h-2.5 w-2.5 rounded-full bg-[#00D084] animate-ping" />
            <div>
              <span className="text-[10px] font-mono text-white/50 block uppercase">CLIMATE RISK</span>
              <span className="text-xs font-bold text-[#67F5C2]">LOW RESILIENCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. AI CORE — CENTRAL FUTURISTIC NEURAL VISUALIZATION
          ======================================================== */}
      <section id="ai-core" className="py-24 px-6 sm:px-12 lg:px-20 relative border-t border-white/10 bg-[#02130e]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <Cpu className="h-3.5 w-3.5 text-[#00D084]" />
              CENTRAL NEURAL ORCHESTRATOR
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
              The Agri AI Core
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Six real-time telemetry streams continuously ingest soil, atmospheric, and market signals into a unified neural model to generate high-conviction farming recommendations.
            </p>
          </div>

          {/* Interactive Flow Architecture Diagram */}
          <div className="rounded-3xl glass-futuristic-dark p-8 sm:p-12 border border-white/10 shadow-glass relative overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center relative z-10">
              {/* Telemetry Input Nodes */}
              {[
                { label: "SOIL MOISTURE", val: "64% Optimal", icon: Droplets, color: "#38BDF8" },
                { label: "WEATHER RADAR", val: "12mm Tomorrow", icon: CloudRain, color: "#67F5C2" },
                { label: "CROP HEALTH", val: "87% Healthy", icon: Sprout, color: "#00D084" },
                { label: "WATER RESERVE", val: "4,280 L Left", icon: Activity, color: "#38BDF8" },
                { label: "SOLAR ENERGY", val: "8.4 kWh Stored", icon: Zap, color: "#F59E0B" },
                { label: "MANDI MARKET", val: "₹2,450 (+4.2%)", icon: TrendingUp, color: "#00D084" },
              ].map((node, i) => (
                <div
                  key={node.label}
                  className="rounded-2xl glass-futuristic p-4 border border-white/10 hover:border-[#00D084]/40 transition-all hover:scale-105"
                >
                  <node.icon className="h-6 w-6 mx-auto mb-2" style={{ color: node.color }} />
                  <span className="text-[10px] font-mono text-white/60 block uppercase font-bold">{node.label}</span>
                  <span className="text-xs font-bold text-white mt-1 block">{node.val}</span>
                </div>
              ))}
            </div>

            {/* Connecting Converging Neural Stream */}
            <div className="my-8 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-gradient-to-b from-[#00D084] to-transparent animate-pulse" />
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#00D084] to-[#064e3b] p-0.5 shadow-neon-emerald flex items-center justify-center animate-float">
                  <div className="h-full w-full bg-[#031A14] rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                    <Sparkles className="h-6 w-6 text-[#67F5C2] animate-spin-slow" />
                    <span className="text-[8px] font-mono font-bold text-[#00D084] mt-0.5">AI CORE</span>
                  </div>
                </div>
                <div className="h-8 w-0.5 bg-gradient-to-b from-transparent to-[#00D084] animate-pulse" />
              </div>
            </div>

            {/* Final Autonomous Recommendation Card */}
            <div className="max-w-xl mx-auto rounded-2xl bg-gradient-to-r from-[#00D084]/10 via-[#67F5C2]/10 to-[#38BDF8]/10 p-5 border border-[#00D084]/40 shadow-neon-emerald">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#67F5C2] uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                  AUTONOMOUS DECISION OUTPUT
                </span>
                <span className="text-[10px] font-mono text-white/60">CONFIDENCE: 99.4%</span>
              </div>
              <p className="text-sm text-white font-medium">
                "Delay irrigation by 18 hours. Approaching rainfall event will replenish topsoil moisture without drawing from groundwater reserves."
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs font-mono text-white/70 pt-2 border-t border-white/10">
                <span>💧 Saved: 420 L</span>
                <span>⚡ Energy: 1.2 kWh</span>
                <span>💰 Net Gain: ₹180</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SMART IRRIGATION 3D SECTION
          ======================================================== */}
      <section id="irrigation" className="py-24 px-6 sm:px-12 lg:px-20 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <Droplets className="h-3.5 w-3.5 text-[#38BDF8]" />
              PRECISION IRRIGATION INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white leading-tight">
              AI Determines When & Where Crops Need Water.
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Traditional irrigation wastes up to 40% of precious groundwater through blind schedules.
              AgriSustain uses subsoil volumetric probes, weather radar forecasts, and crop transpiration rates to irrigate only to the precise millimeter required.
            </p>

            {/* Visual Comparison: AI vs Traditional */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl glass-futuristic p-4 border border-[#00D084]/40 bg-[#00D084]/5">
                <span className="text-[10px] font-mono text-[#67F5C2] block uppercase font-bold">AI PRECISION USAGE</span>
                <span className="text-2xl font-display font-extrabold text-white mt-1 block">1,240 L</span>
                <span className="text-xs text-emerald-400 mt-1 block font-mono">280 L Saved (18.4%)</span>
              </div>
              <div className="rounded-2xl glass-futuristic p-4 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block uppercase font-bold">TRADITIONAL IRRIGATION</span>
                <span className="text-2xl font-display font-extrabold text-white/60 mt-1 block">1,520 L</span>
                <span className="text-xs text-red-400 mt-1 block font-mono">Excess Runoff / Evap</span>
              </div>
            </div>

            {/* Interactive Spray Trigger */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setSprinklersOn(!sprinklersOn);
                  showToast(sprinklersOn ? "3D Sprinklers Stopped" : "💧 3D Parabolic Sprinkler Particles Spraying!");
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-mono font-bold transition-all ${
                  sprinklersOn
                    ? "bg-[#38BDF8] text-[#031A14] shadow-neon-cyan animate-pulse"
                    : "glass-futuristic hover:bg-white/10 text-white border border-white/20"
                }`}
              >
                <Droplets className="h-4 w-4" />
                <span>{sprinklersOn ? "HALT 3D SPRINKLERS" : "TRIGGER 3D WATER SIMULATION"}</span>
              </button>
            </div>
          </div>

          {/* Right Interactive 3D Crop Root & Soil Profile Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-white/10 shadow-glass space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#67F5C2] uppercase font-bold tracking-wider">
                  SUBTERRANEAN SENSOR MESH
                </span>
                <span className="text-[10px] font-mono text-[#00D084] bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/30">
                  REAL-TIME TELEMETRY
                </span>
              </div>

              {/* Stratified Layer Cards */}
              <div className="space-y-3 font-mono text-xs">
                <div className="rounded-xl p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-[#d4a373]" />
                    <span className="text-white font-bold">Topsoil Layer (0 - 15 cm)</span>
                  </div>
                  <span className="text-[#67F5C2] font-bold">68% Moisture</span>
                </div>

                <div className="rounded-xl p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-[#a78bfa]" />
                    <span className="text-white font-bold">Active Root Zone (15 - 45 cm)</span>
                  </div>
                  <span className="text-[#38BDF8] font-bold">72% Optimal Hydration</span>
                </div>

                <div className="rounded-xl p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-[#0077b6]" />
                    <span className="text-white font-bold">Deep Aquifer Table (45+ cm)</span>
                  </div>
                  <span className="text-white/60">Protected / Zero Waste</span>
                </div>
              </div>

              <div className="rounded-2xl bg-black/40 p-4 border border-white/5 text-xs text-white/70 leading-relaxed">
                Next automated drip cycle scheduled for tomorrow at <strong>06:00 AM</strong> for <strong>22 minutes</strong>, powered entirely by the solar battery buffer.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CROP HEALTH 3D SECTION
          ======================================================== */}
      <section id="crop-health" className="py-24 px-6 sm:px-12 lg:px-20 relative bg-[#02130e] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <Sprout className="h-3.5 w-3.5 text-[#00D084]" />
              SPECTRAL CROP HEALTH MONITORING
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
              Multi-Zone Farm Health Scan
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Select any agricultural zone to zoom the digital twin camera and inspect leaf vitality, chlorophyll density, and pathogen risk.
            </p>
          </div>

          {/* Interactive Zone Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                id: "zone-a",
                title: "ZONE A: NORTH BASIN",
                crop: "Wheat (HD-2967)",
                health: 91,
                status: "Healthy",
                color: "#00D084",
                stage: "crops",
              },
              {
                id: "zone-b",
                title: "ZONE B: CENTRAL PADDY",
                crop: "Rice (Basmati 1509)",
                health: 78,
                status: "Moderate Stress",
                color: "#F59E0B",
                stage: "crops",
              },
              {
                id: "zone-c",
                title: "ZONE C: GREENHOUSE",
                crop: "Tomatoes (Hybrid F1)",
                health: 94,
                status: "Optimal Growth",
                color: "#67F5C2",
                stage: "crops",
              },
            ].map((zone) => (
              <div
                key={zone.id}
                onClick={() => {
                  setSelectedZone(zone.id);
                  setCurrentStage(zone.stage);
                  showToast(`Focusing camera on ${zone.title}`);
                }}
                className={`cursor-pointer rounded-3xl p-6 transition-all border ${
                  selectedZone === zone.id
                    ? "glass-futuristic-emerald border-[#00D084] shadow-neon-emerald scale-[1.02]"
                    : "glass-futuristic border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-white/60 font-bold uppercase">{zone.title}</span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: `${zone.color}20`, color: zone.color }}
                  >
                    {zone.status}
                  </span>
                </div>
                <div className="text-xl font-display font-bold text-white mb-1">{zone.crop}</div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-3xl font-display font-extrabold text-white" style={{ color: zone.color }}>
                    {zone.health}%
                  </span>
                  <span className="text-xs text-white/50 font-mono">HEALTH SCORE</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Selected Zone Floating AI Analysis Panel */}
          <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-white/10 shadow-glass">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase block">CROP VARIETY</span>
                <span className="text-base font-bold text-white mt-1 block">
                  {selectedZone === "zone-a" ? "Wheat (HD-2967)" : selectedZone === "zone-b" ? "Rice (Basmati 1509)" : "Hybrid Tomato F1"}
                </span>
                <span className="text-xs text-[#00D084] mt-0.5 block font-mono">Stage: Grain Filling</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase block">DISEASE / PEST RISK</span>
                <span className="text-base font-bold text-emerald-400 mt-1 block">Low Risk (&lt; 5%)</span>
                <span className="text-xs text-white/50 mt-0.5 block font-mono">No fungal spores detected</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase block">SOIL MOISTURE</span>
                <span className="text-base font-bold text-[#38BDF8] mt-1 block">
                  {selectedZone === "zone-a" ? "68%" : selectedZone === "zone-b" ? "82%" : "71%"}
                </span>
                <span className="text-xs text-white/50 mt-0.5 block font-mono">Capacitive Node #04</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase block">AI RECOMMENDATION</span>
                <span className="text-xs font-bold text-white mt-1 block leading-relaxed">
                  "Maintain present drip protocol. Nitrogen uptake is optimal; next leaf scan scheduled in 48 hours."
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. WEATHER / ATMOSPHERIC 3D SECTION
          ======================================================== */}
      <section id="weather" className="py-24 px-6 sm:px-12 lg:px-20 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <CloudRain className="h-3.5 w-3.5 text-[#38BDF8]" />
              ATMOSPHERIC WEATHER RADAR
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white leading-tight">
              Microclimate Radar & Rainfall Forecast
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Rainfall in smallholder regions is notoriously unpredictable. Our atmospheric digital twin simulates localized cloud formations, wind vectors, and convective showers before they reach your boundary.
            </p>

            {/* Rain Forecast Callout Card */}
            <div className="rounded-2xl glass-futuristic-emerald p-5 border border-[#00D084]/40 shadow-neon-emerald">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#67F5C2] uppercase">
                  RAIN FORECAST • 12 MM EXPECTED
                </span>
                <span className="text-xs font-bold text-white">Within 18 Hours</span>
              </div>
              <p className="text-sm text-white font-medium">
                AI Advisory: "Delay scheduled irrigation cycle by 18 hours to capture 100% free rainwater without soil waterlogging."
              </p>
            </div>

            {/* Weather Mode Switcher */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setWeatherSim("sunny");
                  showToast("☀️ Clear sky microclimate active");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  weatherSim === "sunny"
                    ? "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
                    : "glass-futuristic text-white/70 hover:text-white"
                }`}
              >
                CLEAR WEATHER
              </button>
              <button
                onClick={() => {
                  setWeatherSim("rain");
                  showToast("🌧️ 3D Rain particles simulated over farm!");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  weatherSim === "rain"
                    ? "bg-[#38BDF8] text-[#031A14] shadow-neon-cyan"
                    : "glass-futuristic text-white/70 hover:text-white"
                }`}
              >
                SIMULATE RAINFALL
              </button>
            </div>
          </div>

          {/* Right Live Weather Metrics Strip */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10">
              <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">TEMPERATURE</span>
              <span className="text-3xl font-display font-extrabold text-white mt-1 block">31°C</span>
              <span className="text-xs text-white/60 font-mono mt-1 block">Feels like 33°C</span>
            </div>
            <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10">
              <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">HUMIDITY</span>
              <span className="text-3xl font-display font-extrabold text-[#38BDF8] mt-1 block">64%</span>
              <span className="text-xs text-white/60 font-mono mt-1 block">Dew point 21°C</span>
            </div>
            <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10">
              <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">RAIN PROBABILITY</span>
              <span className="text-3xl font-display font-extrabold text-[#67F5C2] mt-1 block">35%</span>
              <span className="text-xs text-white/60 font-mono mt-1 block">Peak at 3:00 PM</span>
            </div>
            <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10">
              <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">WIND VELOCITY</span>
              <span className="text-3xl font-display font-extrabold text-[#F59E0B] mt-1 block">12 km/h</span>
              <span className="text-xs text-white/60 font-mono mt-1 block">Direction: NE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. SUSTAINABILITY IMPACT — "EVERY DROP COUNTS."
          ======================================================== */}
      <section id="impact" className="py-24 px-6 sm:px-12 lg:px-20 relative bg-[#02130e] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <Activity className="h-3.5 w-3.5 text-[#00D084]" />
              MEASURABLE SUSTAINABILITY IMPACT
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Every Drop Counts.
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Transforming climate resilience from a theoretical goal into verified, on-farm resource reductions.
            </p>
          </div>

          {/* Four Large Counter Impact Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-[#00D084]/30 shadow-glass hover:scale-105 transition-all text-center">
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#67F5C2] text-glow-mint">
                12,400 L
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white uppercase mt-2">
                WATER SAVED
              </div>
              <div className="text-[11px] text-white/50 font-mono mt-1">
                Zero groundwater depletion
              </div>
            </div>

            <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-[#00D084]/30 shadow-glass hover:scale-105 transition-all text-center">
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#F59E0B]">
                84 kWh
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white uppercase mt-2">
                ENERGY SAVED
              </div>
              <div className="text-[11px] text-white/50 font-mono mt-1">
                Solar microgrid powered
              </div>
            </div>

            <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-[#00D084]/30 shadow-glass hover:scale-105 transition-all text-center">
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#00D084]">
                18%
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white uppercase mt-2">
                LOWER RESOURCE USE
              </div>
              <div className="text-[11px] text-white/50 font-mono mt-1">
                Compared to district average
              </div>
            </div>

            <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-[#00D084]/30 shadow-glass hover:scale-105 transition-all text-center">
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#38BDF8]">
                +8%
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white uppercase mt-2">
                PROJECTED YIELD
              </div>
              <div className="text-[11px] text-white/50 font-mono mt-1">
                Stress-free harvest index
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. INTERACTIVE FARM MAP & 3D LAYERS
          ======================================================== */}
      <section id="interactive-map" className="py-24 px-6 sm:px-12 lg:px-20 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase mb-2">
                <Layers className="h-3.5 w-3.5 text-[#00D084]" />
                TELEMETRY LAYER STACK
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
                Your Farm. As a Digital Twin.
              </h2>
            </div>

            {/* Layer Checkboxes */}
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl glass-futuristic border border-white/10 text-xs font-mono">
              <span className="text-white/50 font-bold px-2">FARM LAYERS:</span>
              {[
                { key: "soilMoisture", label: "Soil Moisture" },
                { key: "irrigation", label: "Irrigation" },
                { key: "cropHealth", label: "Crop Health" },
                { key: "weather", label: "Weather" },
                { key: "energy", label: "Energy" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggleLayer(key)}
                  className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeLayers[key]
                      ? "bg-[#00D084] text-[#031A14] font-bold"
                      : "bg-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  <Check className={`h-3 w-3 ${activeLayers[key] ? "opacity-100" : "opacity-30"}`} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clickable Quick Target Navigator */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            {[
              { label: "Plot A Wheat", stage: "crops", sub: "91% Health" },
              { label: "Plot B Paddy", stage: "crops", sub: "78% Hydrated" },
              { label: "Plot C Polyhouse", stage: "crops", sub: "94% Growth" },
              { label: "Water System", stage: "irrigation", sub: "4,280 L Tank" },
              { label: "Solar Station", stage: "solar", sub: "8.4 kWh Stored" },
              { label: "Sensor Network", stage: "sensor", sub: "Mesh Active" },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => {
                  setCurrentStage(btn.stage);
                  scrollToId("farm-hero");
                  showToast(`Camera focused on ${btn.label}`);
                }}
                className="rounded-2xl glass-futuristic-dark p-3.5 border border-white/10 hover:border-[#00D084]/50 transition-all text-left group"
              >
                <span className="text-white font-bold block group-hover:text-[#67F5C2]">{btn.label}</span>
                <span className="text-[10px] text-white/50 block mt-0.5">{btn.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          11. AI FARM ADVISOR — FLOATING COMMAND CONSOLE
          ======================================================== */}
      <section id="ai-advisor" className="py-24 px-6 sm:px-12 lg:px-20 relative bg-[#02130e] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <BotMessageSquare className="h-3.5 w-3.5 text-[#00D084]" />
              COMMAND CONSOLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Ask Agri AI
            </h2>
            <p className="text-sm text-white/70">
              Conversational intelligence designed for instant, farmer-friendly answers.
            </p>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            {[
              "💧 Should I irrigate my wheat today?",
              "🌧️ Will tomorrow's rain damage my crops?",
              "🌱 Why are my paddy leaves turning pale?",
              "💰 What is the best mandi market price?",
              "⚡ How much solar energy was saved?",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleAskQuestion(prompt)}
                className="rounded-xl glass-futuristic px-3.5 py-1.5 border border-white/10 text-white/80 hover:text-white hover:border-[#00D084]/40 hover:bg-white/10 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Terminal Console Card */}
          <div className="rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-white/10 shadow-glass space-y-4">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-white/50">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#00D084] animate-pulse" />
                <span>AGRI-AI-CLI v2.6.4 [ONLINE]</span>
              </div>
              <span>NEURAL LATENCY: 24 MS</span>
            </div>

            {/* Chat Transcript Area */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-3.5 max-w-lg ${
                      msg.sender === "user"
                        ? "bg-[#00D084] text-[#031A14] font-bold shadow-neon-emerald"
                        : "glass-futuristic text-white border border-white/10"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-white/50 mb-1">
                      {msg.sender === "user" ? "YOU" : "AGRI AI"}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Command Input Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                placeholder="Type your farming question (e.g. When should I harvest?)..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084] transition-all font-sans"
              />
              <button
                onClick={() => handleAskQuestion()}
                className="flex items-center justify-center h-11 w-11 rounded-2xl bg-[#00D084] text-[#031A14] hover:bg-[#67F5C2] shadow-neon-emerald transition-all shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          12. MARKET INTELLIGENCE SECTION
          ======================================================== */}
      <section id="market" className="py-24 px-6 sm:px-12 lg:px-20 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-3.5 py-1 border border-[#00D084]/30 text-xs font-mono text-[#67F5C2] uppercase">
              <TrendingUp className="h-3.5 w-3.5 text-[#00D084]" />
              MARKET PRICE INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Real-Time Mandi Pricing & Forecasts
            </h2>
            <p className="text-sm text-white/70">
              AI evaluates harvest demand curves across key APMC mandis to recommend the optimal moment to sell.
            </p>
          </div>

          {/* Three Major Commodities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { crop: "WHEAT (HD-2967)", price: "₹2,450", unit: "/ quintal", change: "+4.2%", mandi: "Kanpur Mandi", trend: "up" },
              { crop: "RICE (BASMATI)", price: "₹3,100", unit: "/ quintal", change: "+2.1%", mandi: "Karnal Mandi", trend: "up" },
              { crop: "TOMATO (HYBRID)", price: "₹2,800", unit: "/ quintal", change: "-1.3%", mandi: "Azadpur Mandi", trend: "down" },
            ].map((c) => (
              <div key={c.crop} className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                  <span>{c.crop}</span>
                  <span className={c.trend === "up" ? "text-[#00D084] font-bold" : "text-amber-400 font-bold"}>
                    {c.change}
                  </span>
                </div>
                <div className="text-3xl font-display font-extrabold text-white">
                  {c.price} <span className="text-xs text-white/50 font-normal">{c.unit}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                  <span>{c.mandi}</span>
                  <span className="text-[#67F5C2]">BEST TIME TO SELL: HOLD 48H</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA & COMMAND CENTER LAUNCH
          ======================================================== */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 relative bg-gradient-to-b from-[#02130e] to-[#010c08] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full glass-futuristic px-4 py-1.5 border border-[#00D084]/40 text-xs font-mono text-[#67F5C2] uppercase">
            <Radio className="h-3.5 w-3.5 text-[#00D084] animate-pulse" />
            LIVE TELEMETRY WORKSPACE READY
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
            Step Inside Your Farm's Digital Twin.
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
            Experience complete automated irrigation control, sensor diagnostics, and predictive disease prevention in the dedicated farmer command center.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#00D084] to-[#059669] hover:from-[#67F5C2] hover:to-[#00D084] px-8 py-4 text-sm font-bold text-[#031A14] shadow-neon-emerald hover:shadow-neon-mint transition-all duration-200 hover:scale-105"
            >
              <span>ENTER COMMAND CENTER</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/simulation"
              className="inline-flex items-center gap-2.5 rounded-2xl glass-futuristic hover:bg-white/10 border border-white/20 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105"
            >
              <Radio className="h-4 w-4 text-[#67F5C2]" />
              <span>LAUNCH 3D LAB</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Futuristic Footer */}
      <footer className="py-8 px-6 sm:px-12 border-t border-white/10 bg-[#010c08] text-xs font-mono text-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#00D084]" />
          <span>AGRISUSTAIN AI • 2026 DIGITAL TWIN PLATFORM</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-white transition-colors">DASHBOARD</Link>
          <Link to="/irrigation" className="hover:text-white transition-colors">IRRIGATION</Link>
          <Link to="/weather" className="hover:text-white transition-colors">WEATHER</Link>
          <Link to="/advisor" className="hover:text-white transition-colors">AI ADVISOR</Link>
        </div>
      </footer>
    </div>
  );
};
