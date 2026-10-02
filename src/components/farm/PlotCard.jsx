import React from "react";
import { Link } from "react-router-dom";
import { Droplet, HeartPulse, CheckCircle2, AlertTriangle, Clock, ArrowRight, Play, Zap } from "lucide-react";
import { useFarm } from "../../context/FarmContext";

export const PlotCard = ({ plot, onQuickIrrigate }) => {
  const { activePump } = useFarm();
  const isPumping = activePump?.plotId === plot.id;
  const isHealthy = plot.status === "Healthy" || plot.status === "Optimal Health";

  return (
    <div className="group relative overflow-hidden rounded-3xl glass-futuristic-dark p-5 border border-white/10 hover:border-[#00D084]/50 shadow-glass transition-all duration-300 hover:scale-[1.02]">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-display text-base font-bold text-white group-hover:text-[#67F5C2] transition-colors">
              {plot.name}
            </h4>
            <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {plot.area}
            </span>
          </div>
          <p className="text-xs font-mono font-bold text-[#67F5C2] mt-0.5">{plot.crop}</p>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold border ${
            isHealthy
              ? "bg-[#00D084]/15 border-[#00D084]/40 text-[#67F5C2]"
              : "bg-amber-500/15 border-amber-500/40 text-amber-300"
          }`}
        >
          {plot.status}
        </span>
      </div>

      {/* Sensor Metrics Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Soil Moisture */}
        <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white mb-1.5 font-mono">
            <span className="flex items-center gap-1 font-medium text-white/70">
              <Droplet className="h-3.5 w-3.5 text-[#38BDF8]" />
              Moisture
            </span>
            <span className="font-bold text-[#38BDF8]">{plot.soilMoisture}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                plot.soilMoisture < 45
                  ? "bg-amber-500"
                  : plot.soilMoisture > 80
                  ? "bg-[#38BDF8]"
                  : "bg-[#00D084]"
              }`}
              style={{ width: `${plot.soilMoisture}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] font-mono text-white/40">
            <span>Ideal: 55-75%</span>
            <span>{plot.soilMoisture < 50 ? "Needs Drip" : "Optimal"}</span>
          </div>
        </div>

        {/* Crop Health */}
        <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white mb-1.5 font-mono">
            <span className="flex items-center gap-1 font-medium text-white/70">
              <HeartPulse className="h-3.5 w-3.5 text-[#00D084]" />
              Health
            </span>
            <span className="font-bold text-[#00D084]">{plot.cropHealth}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#00D084] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${plot.cropHealth}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] font-mono text-white/40">
            <span>AI Index</span>
            <span className="text-[#67F5C2]">
              {plot.cropHealth >= 90 ? "Excellent" : plot.cropHealth >= 75 ? "Good" : "At Risk"}
            </span>
          </div>
        </div>
      </div>

      {/* Plot Info row */}
      <div className="mt-3.5 flex items-center justify-between text-xs font-mono text-white/50 pt-3 border-t border-white/10">
        <span className="flex items-center gap-1 text-[11px]">
          <Clock className="h-3 w-3 text-white/40" />
          Next: {plot.nextIrrigation}
        </span>
        <span className="text-[11px] font-mono text-white/40">
          {plot.sensorId}
        </span>
      </div>

      {/* Action Footer */}
      <div className="mt-3 flex items-center gap-2 pt-2">
        <button
          onClick={() => onQuickIrrigate && onQuickIrrigate(plot.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
            isPumping
              ? "bg-red-500/20 border border-red-500/40 text-red-300 animate-pulse"
              : "bg-[#00D084]/15 hover:bg-[#00D084]/25 border border-[#00D084]/30 text-[#67F5C2]"
          }`}
        >
          {isPumping ? (
            <>
              <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
              <span>Pump Active ({activePump.remainingMinutes}m)</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 text-[#00D084]" />
              <span>Solar Drip (20m)</span>
            </>
          )}
        </button>

        <Link
          to={`/simulation`}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
          title="Inspect in 3D Digital Twin"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
