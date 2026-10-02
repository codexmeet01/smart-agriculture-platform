import React, { useState } from "react";
import {
  Droplets,
  CloudRain,
  Clock,
  Sparkles,
  Calendar,
  Play,
  Square,
  Plus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sun,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  Bar,
  ComposedChart,
  Legend,
} from "recharts";
import { useFarm } from "../context/FarmContext";
import {
  IRRIGATION_RECOMMENDATION,
  SOIL_MOISTURE_SERIES,
  IRRIGATION_SCHEDULE_TABLE,
} from "../data/mockData";
import { Badge } from "../components/common/Badge";

export const SmartIrrigationPage = () => {
  const { activePump, startIrrigation, stopIrrigation, showToast, plots } = useFarm();
  const [schedules, setSchedules] = useState(IRRIGATION_SCHEDULE_TABLE);
  const [selectedPlot, setSelectedPlot] = useState("plot-a");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    plot: "Plot A (Wheat)",
    valve: "V-North-01",
    duration: "20 min",
    scheduledTime: "Tomorrow 06:00 AM",
    method: "Drip",
    waterVolume: "340 L",
  });

  const handleStart = () => {
    startIrrigation(selectedPlot, 22);
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const item = {
      id: `SCH-0${schedules.length + 1}`,
      ...newSchedule,
      status: "Scheduled",
    };
    setSchedules([item, ...schedules]);
    setIsScheduleModalOpen(false);
    showToast(`Irrigation schedule added for ${newSchedule.plot}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Droplets className="h-3.5 w-3.5" />
            Sustainable Water Management
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
            Smart Irrigation
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
            AI recommends when and how much to irrigate based on soil moisture, weather, crop stage, and recent rainfall.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {activePump ? (
            <button
              onClick={stopIrrigation}
              className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 text-xs font-bold shadow-md transition-all"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop Active Pump
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-agri-deep hover:from-emerald-700 hover:to-agri-dark text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-emerald-950/10 hover:scale-[1.02] transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Start Irrigation
            </button>
          )}

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 px-4 py-2.5 text-xs font-bold text-agri-dark shadow-soft transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-emerald-700" />
            Schedule
          </button>
        </div>
      </div>

      {/* Primary Recommendation Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-emerald-200/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                AI Recommendation Engine
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
                {IRRIGATION_RECOMMENDATION.action}
              </h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Optimal Balance
              </span>
            </div>

            {/* Reasons List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {IRRIGATION_RECOMMENDATION.reasons.map((r, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold text-gray-500 block">{r.label}</span>
                    <span className="text-xs font-bold text-agri-dark">{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Summary Panel */}
          <div className="rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#022c22] text-white p-5 sm:p-6 shadow-xl space-y-4 lg:w-80 shrink-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-emerald-200 font-medium">Next Irrigation</span>
              <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                Tomorrow 06:00 AM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl bg-white/10">
                <span className="text-[10px] text-emerald-200 block uppercase">Duration</span>
                <span className="text-base font-bold font-display text-white">
                  {IRRIGATION_RECOMMENDATION.recommendedDuration}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10">
                <span className="text-[10px] text-emerald-200 block uppercase">Est. Water</span>
                <span className="text-base font-bold font-display text-white">
                  {IRRIGATION_RECOMMENDATION.estimatedWater}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-emerald-500/20 p-3 border border-emerald-400/30 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <Droplets className="h-4 w-4 text-emerald-400" />
                <span>{IRRIGATION_RECOMMENDATION.waterSaved}</span>
              </div>
              <p className="mt-1 text-[11px] text-emerald-100">
                Conserves groundwater while keeping root zone in ideal capillary tension.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Soil Moisture Chart Section with Ideal Range & Rainfall Events */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display text-lg font-bold text-agri-dark">
              Soil Moisture Dynamics & Rain Events
            </h3>
            <p className="text-xs text-agri-muted">
              Live capacitive sensor curves across 24 hours. The green shaded area shows the optimal root hydration zone (55% - 75%).
            </p>
          </div>

          {/* Plot Filter Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Active Plot:</span>
            <select
              value={selectedPlot}
              onChange={(e) => setSelectedPlot(e.target.value)}
              className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-agri-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="plot-a">Plot A (Wheat)</option>
              <option value="plot-b">Plot B (Rice/Mustard)</option>
              <option value="plot-c">Plot C (Vegetables)</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={SOIL_MOISTURE_SERIES} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="moisture" domain={[20, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
              <YAxis yAxisId="rain" orientation="right" domain={[0, 10]} stroke="#38bdf8" fontSize={11} unit="mm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              {/* Optimal moisture zone shading */}
              <ReferenceArea
                yAxisId="moisture"
                y1={55}
                y2={75}
                fill="#10b981"
                fillOpacity={0.12}
                label={{ value: "Ideal Moisture Range (55% - 75%)", position: "insideTopLeft", fill: "#059669", fontSize: 11 }}
              />
              <ReferenceLine yAxisId="moisture" y={45} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Critical Stress Threshold (45%)", fill: "#d97706", fontSize: 10 }} />
              
              <Bar yAxisId="rain" dataKey="rainfall" name="Rainfall Event (mm)" fill="#38bdf8" radius={[4, 4, 0, 0]} opacity={0.6} />
              <Line
                yAxisId="moisture"
                type="monotone"
                dataKey="plotA"
                name="Plot A - Wheat (%)"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 4, fill: "#059669" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="moisture"
                type="monotone"
                dataKey="plotB"
                name="Plot B - Rice (%)"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: "#f59e0b" }}
              />
              <Line
                yAxisId="moisture"
                type="monotone"
                dataKey="plotC"
                name="Plot C - Polyhouse (%)"
                stroke="#0284c7"
                strokeWidth={2}
                dot={{ r: 3, fill: "#0284c7" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Irrigation Schedule Table Section */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-agri-dark">
              Irrigation Schedule & Valve Management
            </h3>
            <p className="text-xs text-agri-muted">
              Solar pump schedules integrated with soil moisture triggers and meteorological pauses.
            </p>
          </div>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3 py-1.5 text-xs font-semibold transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Schedule
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-100 bg-[#f7faf8] text-gray-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3">Schedule ID</th>
                <th className="p-3">Plot & Crop</th>
                <th className="p-3">Valve / Zone</th>
                <th className="p-3">Method</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Volume</th>
                <th className="p-3">Scheduled Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedules.map((row) => (
                <tr key={row.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="p-3 font-mono font-medium text-gray-500">{row.id}</td>
                  <td className="p-3 font-semibold text-agri-dark">{row.plot}</td>
                  <td className="p-3 text-gray-600">{row.valve}</td>
                  <td className="p-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                      {row.method}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700 font-medium">{row.duration}</td>
                  <td className="p-3 text-agri-dark font-bold">{row.waterVolume}</td>
                  <td className="p-3 text-gray-600">{row.scheduledTime}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        row.status.includes("Active")
                          ? "emerald"
                          : row.status.includes("Paused")
                          ? "amber"
                          : row.status.includes("Completed")
                          ? "blue"
                          : "gray"
                      }
                      size="sm"
                      dot={row.status.includes("Active")}
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-emerald-100">
            <h3 className="font-display text-lg font-bold text-agri-dark mb-1">
              Add New Irrigation Schedule
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              AI automatically syncs solar pump triggers with morning evapotranspiration lows.
            </p>

            <form onSubmit={handleAddSchedule} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-agri-dark mb-1">Plot Name</label>
                <select
                  value={newSchedule.plot}
                  onChange={(e) => setNewSchedule({ ...newSchedule, plot: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 focus:border-emerald-500 focus:outline-none"
                >
                  <option>Plot A (Wheat)</option>
                  <option>Plot B (Rice/Mustard)</option>
                  <option>Plot C (Vegetables)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-agri-dark mb-1">Valve ID</label>
                  <input
                    type="text"
                    value={newSchedule.valve}
                    onChange={(e) => setNewSchedule({ ...newSchedule, valve: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 focus:border-emerald-500 focus:outline-none"
                    placeholder="V-North-01"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-agri-dark mb-1">Method</label>
                  <select
                    value={newSchedule.method}
                    onChange={(e) => setNewSchedule({ ...newSchedule, method: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 focus:border-emerald-500 focus:outline-none"
                  >
                    <option>Drip</option>
                    <option>Sprinkler</option>
                    <option>Micro-Drip</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-agri-dark mb-1">Duration</label>
                  <input
                    type="text"
                    value={newSchedule.duration}
                    onChange={(e) => setNewSchedule({ ...newSchedule, duration: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 focus:border-emerald-500 focus:outline-none"
                    placeholder="25 min"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-agri-dark mb-1">Estimated Water</label>
                  <input
                    type="text"
                    value={newSchedule.waterVolume}
                    onChange={(e) => setNewSchedule({ ...newSchedule, waterVolume: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 focus:border-emerald-500 focus:outline-none"
                    placeholder="350 L"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-agri-dark mb-1">Scheduled Time</label>
                <input
                  type="text"
                  value={newSchedule.scheduledTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, scheduledTime: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 focus:border-emerald-500 focus:outline-none"
                  placeholder="Tomorrow 06:00 AM"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-900/10"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
