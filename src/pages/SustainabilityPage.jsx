import React from "react";
import {
  Leaf,
  Droplets,
  Zap,
  Sprout,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Download,
  Award,
  CheckCircle2,
} from "lucide-react";
import { RadialScore } from "../components/farm/RadialScore";
import { SUSTAINABILITY_METRICS } from "../data/mockData";
import { useFarm } from "../context/FarmContext";

export const SustainabilityPage = () => {
  const { showToast } = useFarm();
  const { overallScore, breakdown, savedImpact, beforeAfter } = SUSTAINABILITY_METRICS;

  const handleDownloadCertificate = () => {
    showToast("📜 Farm Sustainability Certificate generated and downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Leaf className="h-3.5 w-3.5" />
            Ecological Stewardship
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
            Sustainability & Environmental Impact
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
            Quantifying natural resource conservation, solar carbon offsets, and soil health indexes for smallholder agro-ecosystems.
          </p>
        </div>

        <button
          onClick={handleDownloadCertificate}
          className="flex items-center gap-2 rounded-xl bg-white border border-emerald-300 px-4 py-2.5 text-xs font-bold text-agri-dark shadow-soft hover:bg-emerald-50 transition-colors"
        >
          <Award className="h-4 w-4 text-emerald-700" />
          Download Eco Certificate
        </button>
      </div>

      {/* Large Hero Card with Radial Score & Breakdown */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-200/90 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radial Score Indicator */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-gray-100">
            <RadialScore score={overallScore} size={220} strokeWidth={18} />
            <div className="mt-4 text-center">
              <span className="font-display text-lg font-bold text-agri-dark block">
                Overall Sustainability Score
              </span>
              <p className="text-xs text-agri-muted mt-1 max-w-xs">
                Based on continuous real-time IoT monitoring across water, energy, and crop canopy data.
              </p>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-agri-dark">
                Sustainability Dimension Breakdown
              </h3>
              <span className="text-xs font-semibold text-emerald-700">Top 12% in District</span>
            </div>

            <div className="space-y-3.5">
              {breakdown.map((item) => (
                <div key={item.category} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-agri-dark">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-800">{item.score} / 100</span>
                      <span className="text-[10px] text-gray-400">(Avg: {item.benchmark})</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-agri-deep transition-all duration-1000"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* "Your Farm Saved Approximately" Highlight Row */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="font-display text-lg font-bold text-agri-dark">
            Your Farm Saved Approximately
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Water Saved */}
          <div className="rounded-3xl bg-blue-50/70 p-6 border border-blue-200 shadow-soft flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shrink-0">
              <Droplets className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block">
                Water Conserved
              </span>
              <span className="font-display text-3xl font-extrabold text-blue-950 mt-1 block">
                {savedImpact.water}
              </span>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                {savedImpact.waterEquivalent}
              </p>
            </div>
          </div>

          {/* Energy Saved */}
          <div className="rounded-3xl bg-amber-50/70 p-6 border border-amber-200 shadow-soft flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">
                Energy Saved
              </span>
              <span className="font-display text-3xl font-extrabold text-amber-950 mt-1 block">
                {savedImpact.energy}
              </span>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                {savedImpact.energyEquivalent}
              </p>
            </div>
          </div>

          {/* Carbon Saved */}
          <div className="rounded-3xl bg-emerald-50/70 p-6 border border-emerald-200 shadow-soft flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md shrink-0">
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider block">
                Carbon Offset
              </span>
              <span className="font-display text-3xl font-extrabold text-emerald-950 mt-1 block">
                {savedImpact.carbon}
              </span>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                {savedImpact.carbonEquivalent}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Before / After Comparison Grid */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-4">
          Comparative Environmental Audit: Traditional vs. AgriSustain AI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Practice */}
          <div className="rounded-2xl bg-red-50/40 p-5 border border-red-100 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
              Conventional Flood Irrigation
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-red-100">
                <span className="text-gray-600">Weekly Water Consumed:</span>
                <span className="font-bold text-gray-800">1,520 Litres</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-100">
                <span className="text-gray-600">Pumping Energy Expended:</span>
                <span className="font-bold text-gray-800">12.8 kWh (Grid/Diesel)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-100">
                <span className="text-gray-600">Nutrient Leaching / Runoff:</span>
                <span className="font-bold text-red-600">High (22% Over-application)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-600">Post-Harvest Rot:</span>
                <span className="font-bold text-red-600">18% Lost</span>
              </div>
            </div>
          </div>

          {/* Smart Practice */}
          <div className="rounded-2xl bg-emerald-50/70 p-5 border border-emerald-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              AgriSustain Precision AI Setup
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-emerald-200">
                <span className="text-gray-600">Weekly Water Consumed:</span>
                <span className="font-bold text-emerald-800">1,240 Litres (280 L Saved)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200">
                <span className="text-gray-600">Pumping Energy Expended:</span>
                <span className="font-bold text-emerald-800">8.4 kWh (76% Solar)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-200">
                <span className="text-gray-600">Capillary Root Hydration:</span>
                <span className="font-bold text-emerald-800">Optimal (Zero Runoff)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-600">Post-Harvest Loss:</span>
                <span className="font-bold text-emerald-800">Reduced to 6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
