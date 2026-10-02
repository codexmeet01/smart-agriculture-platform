import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  Zap,
  HeartPulse,
  TrendingUp,
  MapPin,
  Calendar,
  CloudSun,
  Layers,
  ArrowRight,
  BotMessageSquare,
  ScanHeart,
  AlertTriangle,
  Play,
  Square,
  Sparkles,
  Info,
  Radio,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { useFarm } from "../context/FarmContext";
import { StatCard } from "../components/common/StatCard";
import { PlotCard } from "../components/farm/PlotCard";

export const DashboardPage = () => {
  const { profile, kpis, plots, weather, activePump, startIrrigation, stopIrrigation } = useFarm();

  const formattedDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Top Futuristic Command Center Header */}
      <div className="relative overflow-hidden rounded-3xl glass-futuristic-dark p-6 sm:p-8 border border-white/10 shadow-glass">
        {/* Subtle radial emerald flare */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#00D084]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Live Gateway Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-mono text-[#67F5C2] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#00D084] animate-ping" />
              <span>COMMAND CENTER • LIVE TELEMETRY</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">NODE #{profile.farmId}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Good Morning, {profile.name || "Farmer"} 👋
            </h1>

            <p className="text-sm text-white/70 max-w-2xl font-normal leading-relaxed">
              Multi-sensor neural engine is operating normally. Soil moisture across 3 zones is balanced, and approaching rainfall (12 mm) will maintain optimal root zone moisture without grid pump activation.
            </p>

            {/* Farm Meta Information Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono text-white/70">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#00D084]" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <Layers className="h-3.5 w-3.5 text-[#67F5C2]" />
                <span>{profile.farmSize}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <CloudSun className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span>{weather.temp}°C, {weather.condition}</span>
              </div>
            </div>
          </div>

          {/* AI Decision Card */}
          <div className="rounded-2xl glass-futuristic p-5 border border-[#00D084]/40 shadow-neon-emerald max-w-md shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#67F5C2] flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-[#00D084]" />
                AUTONOMOUS ADVISORY
              </span>
              <span className="text-[10px] text-white/50">CONFIDENCE: 99.2%</span>
            </div>
            <p className="text-xs text-white leading-relaxed font-sans">
              <strong>Delay Plot A irrigation by 18 hours.</strong> Approaching rain will satisfy natural crop transpiration while keeping groundwater reserves untouched.
            </p>
            <div className="flex gap-2 pt-1 font-mono text-xs">
              <Link
                to="/advisor"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#00D084] hover:bg-[#67F5C2] text-[#031A14] font-bold py-2 px-3 shadow-neon-emerald transition-all"
              >
                <BotMessageSquare className="h-3.5 w-3.5" />
                Ask Advisor
              </Link>
              <Link
                to="/simulation"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl glass-futuristic hover:bg-white/10 text-white font-bold py-2 px-3 border border-white/20 transition-all"
              >
                <Radio className="h-3.5 w-3.5 text-[#67F5C2]" />
                3D Twin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Active Pump Live Banner if running */}
      {activePump && (
        <div className="rounded-2xl bg-gradient-to-r from-[#00D084] to-[#0284c7] p-4 text-[#031A14] font-bold shadow-neon-emerald flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 text-white">
              <Droplets className="h-6 w-6 animate-bounce" />
            </div>
            <div>
              <div className="text-sm font-display font-extrabold">
                Solar Drip Pump Active for {activePump.plotName}
              </div>
              <div className="text-xs opacity-90 font-mono">
                Time remaining: {Math.floor(activePump.remainingSeconds / 60)}m {activePump.remainingSeconds % 60}s • Estimated Delivery: 420 L
              </div>
            </div>
          </div>
          <button
            onClick={stopIrrigation}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-mono font-bold shadow-md transition-colors"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            HALT PUMP
          </button>
        </div>
      )}

      {/* KPI Cards Row (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Water Usage"
          value={kpis.waterUsage.value}
          change={kpis.waterUsage.change}
          trend={kpis.waterUsage.trend}
          isPositive={kpis.waterUsage.isPositive}
          subtitle={kpis.waterUsage.benchmark}
          icon={Droplets}
          accentColor="blue"
        />

        <StatCard
          title="Solar Energy Stored"
          value={kpis.energyUsage.value}
          change={kpis.energyUsage.change}
          trend={kpis.energyUsage.trend}
          isPositive={kpis.energyUsage.isPositive}
          subtitle={kpis.energyUsage.solarContribution}
          icon={Zap}
          accentColor="amber"
        />

        <StatCard
          title="Crop Health Index"
          value={kpis.cropHealth.value}
          change={kpis.cropHealth.change}
          trend={kpis.cropHealth.trend}
          isPositive={kpis.cropHealth.isPositive}
          badgeText={kpis.cropHealth.status}
          icon={HeartPulse}
          accentColor="emerald"
        />

        <StatCard
          title="Estimated Harvest Yield"
          value={kpis.estimatedYield.value}
          change={kpis.estimatedYield.change}
          trend={kpis.estimatedYield.trend}
          isPositive={kpis.estimatedYield.isPositive}
          subtitle={kpis.estimatedYield.harvestWindow}
          icon={TrendingUp}
          accentColor="green"
        />
      </div>

      {/* 3D Digital Twin Simulation Hub Callout */}
      <div className="relative overflow-hidden rounded-3xl glass-futuristic-dark p-6 sm:p-7 border border-[#00D084]/30 shadow-glass text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 px-3 py-0.5 text-xs font-mono font-bold text-[#67F5C2] uppercase">
              <Radio className="h-3.5 w-3.5 animate-pulse text-[#00D084]" />
              Interactive 3D Digital Twin
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Launch Live 3D Simulation & Physics Engine
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
              Interact with the full WebGL agricultural landscape. Rotate 360°, simulate rainstorms, trigger 3D sprinkler physics, and inspect subsurface root systems in real time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/simulation"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00D084] to-[#059669] hover:from-[#67F5C2] hover:to-[#00D084] text-[#031A14] px-6 py-3.5 text-xs font-mono font-bold shadow-neon-emerald hover:scale-105 transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>LAUNCH 3D DIGITAL TWIN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Farm Overview & Plots Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              Farm Plots Overview
            </h2>
            <p className="text-xs text-white/60 font-mono">
              Live telemetry from subsoil capacitive probes and optical health indices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#67F5C2] bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
              {plots.length} Active Plots Monitored
            </span>
            <Link
              to="/irrigation"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#00D084] hover:text-[#67F5C2]"
            >
              Smart Irrigation →
            </Link>
          </div>
        </div>

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plots.map((plot) => (
            <PlotCard
              key={plot.id}
              plot={plot}
              onQuickIrrigate={(id) => startIrrigation(id, 22)}
            />
          ))}
        </div>
      </div>

      {/* Quick Access Utility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* Weather Preview */}
        <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase text-[#67F5C2]">
              Hyperlocal Climate
            </span>
            <Link to="/weather" className="text-xs font-mono text-[#00D084] hover:underline">
              Radar Forecast →
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CloudSun className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl font-display font-extrabold text-white">
                {weather.temp}°C
              </div>
              <div className="text-xs text-white/50 font-mono">
                {weather.condition} • {weather.city}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center text-xs font-mono">
            <div>
              <span className="text-[10px] text-white/40 block">Rainfall</span>
              <span className="font-bold text-white">{weather.rainfall} mm</span>
            </div>
            <div>
              <span className="text-[10px] text-white/40 block">Humidity</span>
              <span className="font-bold text-[#38BDF8]">{weather.humidity}%</span>
            </div>
            <div>
              <span className="text-[10px] text-white/40 block">Wind</span>
              <span className="font-bold text-[#F59E0B]">{weather.wind} km/h</span>
            </div>
          </div>
        </div>

        {/* AI Crop Diagnostics Shortcut */}
        <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase text-[#67F5C2]">
              AI Crop Vision Doctor
            </span>
            <Link to="/crop-health" className="text-xs font-mono text-[#00D084] hover:underline">
              Scan Leaf →
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00D084]/10 text-[#00D084] border border-[#00D084]/20">
              <ScanHeart className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-display font-bold text-white">Plant Pathology Model</div>
              <div className="text-xs text-white/50">Upload photo for instant diagnosis</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/70 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/5 font-mono">
            Tomato early blight and rice blast symptoms detected with 94%+ diagnostic confidence.
          </p>
        </div>

        {/* Mandi Market Intelligence */}
        <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase text-[#67F5C2]">
              Mandi Rates (Kanpur)
            </span>
            <Link to="/market" className="text-xs font-mono text-[#00D084] hover:underline">
              Price Trends →
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-white/70 block">Wheat (HD-2967)</span>
              <span className="text-2xl font-display font-extrabold text-[#00D084]">₹2,450</span>
              <span className="text-[11px] text-white/40 font-mono"> / quintal</span>
            </div>
            <span className="rounded-full bg-[#00D084]/20 border border-[#00D084]/40 px-2.5 py-0.5 text-xs font-mono font-bold text-[#67F5C2]">
              +4.2% Today
            </span>
          </div>
          <div className="mt-3 text-xs font-mono text-white/60 pt-2 border-t border-white/10 flex items-center justify-between">
            <span>MSP Benchmark: ₹2,275</span>
            <span className="text-[#67F5C2] font-bold">Bullish Window</span>
          </div>
        </div>
      </div>
    </div>
  );
};
