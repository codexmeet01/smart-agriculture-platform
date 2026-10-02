import React, { useState } from "react";
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Download,
  Calendar,
  Droplets,
  Zap,
  Sprout,
  Printer,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { ANALYTICS_DATA } from "../data/mockData";
import { useFarm } from "../context/FarmContext";

export const AnalyticsPage = () => {
  const { showToast } = useFarm();
  const [timeframe, setTimeframe] = useState("days7");

  const currentDataset = ANALYTICS_DATA[timeframe] || ANALYTICS_DATA.days7;

  const handleExportReport = () => {
    window.print();
    showToast("📄 Farm Performance Summary sent to print / PDF export!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <BarChart3 className="h-3.5 w-3.5" />
            Comprehensive Diagnostics
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
            Farm Telemetry & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
            Multi-temporal evaluation of water conservation, solar power yields, and vegetative health trajectories.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Timeframe Switcher */}
          <div className="flex items-center rounded-xl bg-white border border-emerald-200 p-1 shadow-soft">
            <button
              onClick={() => setTimeframe("days7")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === "days7"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-emerald-700"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe("days30")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === "days30"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-emerald-700"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeframe("days90")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === "days90"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-emerald-700"
              }`}
            >
              90 Days
            </button>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold shadow-md shadow-emerald-950/10 transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Comparison Cards: This Month vs Last Month */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-white p-5 border border-emerald-900/5 shadow-soft">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-agri-muted">Water Efficiency</span>
            <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded">MoM</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-agri-dark">
              -18%
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
              <TrendingDown className="h-3.5 w-3.5" /> Less Water Used
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Saved 2,800 Litres compared to prior calendar cycle by delaying irrigation before rainfall.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-emerald-900/5 shadow-soft">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-agri-muted">Energy Consumption</span>
            <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded">MoM</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-agri-dark">
              -12%
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
              <TrendingDown className="h-3.5 w-3.5" /> Lower Grid Draw
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Shifted 84% of pump run hours into daylight solar peak generation window.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-emerald-900/5 shadow-soft">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-agri-muted">Projected Yield</span>
            <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded">Harvest Model</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-emerald-700">
              +8%
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> Net Gain
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Estimated 3.8 Tons vs 3.5 Tons baseline due to zero vegetative drought stress.
          </p>
        </div>
      </div>

      {/* Dual Charts Grid: Water & Energy vs Crop Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Water Consumption & Rainfall */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-agri-dark">
                Water Usage vs. Natural Precipitation
              </h3>
              <p className="text-xs text-agri-muted">Litres pumped against rainfall volume.</p>
            </div>
            <Droplets className="h-5 w-5 text-blue-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentDataset} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="water" name="Pumped Water (L)" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rainfall" name="Rainfall (mm)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Energy & Crop Health Trend */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-agri-dark">
                Energy Draw (kWh) & Crop Health Index (%)
              </h3>
              <p className="text-xs text-agri-muted">Efficiency correlation over selected window.</p>
            </div>
            <Zap className="h-5 w-5 text-amber-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentDataset} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" domain={[50, 100]} stroke="#10b981" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line yAxisId="left" type="monotone" dataKey="energy" name="Energy (kWh)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="cropHealth" name="Crop Health (%)" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Downloadable / Report-Style Summary Section */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/10 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Audit Ready Summary
            </span>
            <h3 className="font-display text-xl font-bold text-agri-dark mt-1">
              Seasonal Agrotechnology Executive Report
            </h3>
          </div>
          <div className="text-xs font-mono text-gray-500">
            Generated: {new Date().toLocaleDateString("en-IN")} • ID: RPT-2024-884
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-gray-100">
            <span className="text-gray-500 block">Total Irrigation Sessions</span>
            <span className="text-lg font-bold text-agri-dark mt-1 block">18 Cycles</span>
            <span className="text-[11px] text-emerald-700">100% On-Target</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-gray-100">
            <span className="text-gray-500 block">Average Soil Moisture</span>
            <span className="text-lg font-bold text-agri-dark mt-1 block">67.4%</span>
            <span className="text-[11px] text-emerald-700">Within 55–75% Ideal Band</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-gray-100">
            <span className="text-gray-500 block">Power Cost Reduction</span>
            <span className="text-lg font-bold text-agri-dark mt-1 block">₹2,840</span>
            <span className="text-[11px] text-amber-700">Via Solar Pumping</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-gray-100">
            <span className="text-gray-500 block">Crop Disease Incidents</span>
            <span className="text-lg font-bold text-agri-dark mt-1 block">0 Critical</span>
            <span className="text-[11px] text-emerald-700">1 Early stress treated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
