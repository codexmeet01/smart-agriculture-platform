import React from "react";
import {
  ShieldAlert,
  ThermometerSun,
  CloudRain,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import { CLIMATE_RISKS } from "../data/mockData";
import { Badge } from "../components/common/Badge";

export const ClimateRiskPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <ShieldAlert className="h-3.5 w-3.5" />
          Proactive Vulnerability Assessment
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
          Climate Risk Monitor & Resilience
        </h1>
        <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
          Continuous radar and soil satellite modeling to predict microclimatic stressors before they damage crop physiology.
        </p>
      </div>

      {/* 4 Risk Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CLIMATE_RISKS.map((risk) => {
          const isMedium = risk.level === "Medium";
          return (
            <div
              key={risk.id}
              className={`rounded-3xl p-6 sm:p-7 border shadow-soft transition-all ${
                isMedium
                  ? "bg-amber-50/50 border-amber-200"
                  : "bg-emerald-50/50 border-emerald-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm text-white ${
                      isMedium ? "bg-amber-500" : "bg-emerald-600"
                    }`}
                  >
                    {risk.factor.includes("Heat") && <ThermometerSun className="h-6 w-6" />}
                    {risk.factor.includes("Drought") && <Droplets className="h-6 w-6" />}
                    {risk.factor.includes("Rain") && <CloudRain className="h-6 w-6" />}
                    {risk.factor.includes("Soil") && <ShieldCheck className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-agri-dark">
                      {risk.factor}
                    </h3>
                    <span className="text-xs text-gray-500">Risk Index: {risk.score}/100</span>
                  </div>
                </div>

                <Badge
                  variant={isMedium ? "amber" : "emerald"}
                  size="md"
                  dot={true}
                >
                  {risk.level} Risk
                </Badge>
              </div>

              {/* Headline */}
              <div className="mt-4 p-3 rounded-xl bg-white/80 border border-gray-100 text-xs font-semibold text-agri-dark">
                {risk.headline}
              </div>

              {/* Action Advisory */}
              <div className="mt-4 space-y-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  AI Recommended Mitigation:
                </span>
                <p className="text-xs text-gray-700 leading-relaxed bg-white/60 p-3 rounded-xl border border-gray-100">
                  {risk.advisory}
                </p>
              </div>

              {/* Impact Zone */}
              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 font-medium">
                  <Layers className="h-3.5 w-3.5 text-gray-400" />
                  Target Area:
                </span>
                <span className="font-semibold text-agri-dark">{risk.impactArea}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resilience Preparedness Checklist */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-1">
          Farm Climate Resilience Protocol
        </h3>
        <p className="text-xs text-agri-muted mb-6">
          Pre-emptive measures verified by Indian Council of Agricultural Research (ICAR) field standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-emerald-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Drip Furrow Maintenance</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Flush micro-drip laterals with dilute vinegar/citric acid once monthly to prevent hard water clogging.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-emerald-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Organic Mulching Buffer</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Apply 5cm straw mulch over vegetable beds in Plot C to reduce direct soil evaporation during peak sun.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7faf8] border border-emerald-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Solar Backup Inverter Sync</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Lithium iron phosphate storage ensures 4 hours of nighttime sprinkler operation if heat wave occurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
