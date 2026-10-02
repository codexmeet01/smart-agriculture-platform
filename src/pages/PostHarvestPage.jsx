import React, { useState } from "react";
import {
  PackageCheck,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Warehouse,
  CheckCircle2,
  Thermometer,
  Calculator,
  IndianRupee,
  Layers,
  ChevronDown,
} from "lucide-react";
import { sustainabilityService } from "../services/sustainabilityService";

export const PostHarvestPage = () => {
  // Calculator inputs
  const [crop, setCrop] = useState("Wheat");
  const [quantity, setQuantity] = useState(120); // quintals
  const [sellingPrice, setSellingPrice] = useState(2450); // ₹ per quintal
  const [currentLossPct, setCurrentLossPct] = useState(18); // %
  const [targetLossPct, setTargetLossPct] = useState(6); // % with AgriSustain

  const calculation = sustainabilityService.calculateLossSavings(
    quantity,
    sellingPrice,
    currentLossPct,
    targetLossPct
  );

  const workflowSteps = [
    {
      step: 1,
      title: "Precision Harvest",
      desc: "Wait until grain moisture drops below 14% to prevent Aspergillus fungal rot.",
      icon: "🌾",
      stat: "14% moisture benchmark",
    },
    {
      step: 2,
      title: "AI Quality Grading",
      desc: "Sort produce by size and grade using mobile phone camera optics before packing.",
      icon: "🔍",
      stat: "A-Grade segregation",
    },
    {
      step: 3,
      title: "Smart Storage",
      desc: "Store perishable horticulture in ventilated crates at 12–15°C with humidity dampers.",
      icon: "🏪",
      stat: "Nearest cold unit: 4.8 km",
    },
    {
      step: 4,
      title: "Route Optimization",
      desc: "Coordinate aggregated truck pickups during cooler dawn hours to avoid heat degradation.",
      icon: "🚚",
      stat: "Save 3.2 hrs in transit",
    },
    {
      step: 5,
      title: "Direct APMC Mandi Sale",
      desc: "Dispatch to high-demand mandis with live price telemetry for maximum realization.",
      icon: "💰",
      stat: "+12% net price premium",
    },
  ];

  const recommendations = [
    { title: "Optimal Storage Temp", desc: "Keep potatoes and onions in diffused-light cool storage (10–12°C) with low ethylene buildup.", icon: Thermometer },
    { title: "Nearest Verified Storage", desc: "Kanpur Central Agro Cold Chain Hub (Capacity: 8,000 MT) currently offering 30% subsidized rates.", icon: Warehouse },
    { title: "Cool Transit Windows", desc: "Transport between 4:00 AM and 8:00 AM to decrease fruit respiration and moisture loss.", icon: Truck },
    { title: "Shelf-Life Extension", desc: "Pre-cool field harvest immediately after harvest to eliminate residual field heat.", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <PackageCheck className="h-3.5 w-3.5" />
          Value Chain Optimization
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
          Post-Harvest Intelligence & Loss Reduction
        </h1>
        <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
          Indian smallholder farmers lose 15–20% of produce value between field harvest and mandi sale. AgriSustain AI closes the preservation gap.
        </p>
      </div>

      {/* Problem Context Banner */}
      <div className="rounded-3xl bg-amber-50/80 border border-amber-200/80 p-6 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            Critical Agricultural Challenge
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-agri-dark">
            15–20% of Produce Value is Lost Across Key Value Chains
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 max-w-3xl">
            Improper moisture management during cutting, unventilated transit, and lack of nearby cold chain data result in billions of rupees in smallholder losses every year.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 border border-amber-200 shadow-sm shrink-0 text-center sm:w-56">
          <span className="text-[11px] text-gray-500 uppercase font-semibold block">Target Recovery</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-display">Up to 60%</span>
          <span className="text-[11px] text-emerald-800 block mt-0.5">Reduced produce waste</span>
        </div>
      </div>

      {/* 5-Step Value Chain Workflow */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-1">
          The 5-Step Post-Harvest Preservation Flow
        </h3>
        <p className="text-xs text-agri-muted mb-6">
          Guided journey from field sickle to mandi auction table.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.step}
              className="relative rounded-2xl bg-[#f7faf8] p-4 border border-gray-100 hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-agri-dark">{step.title}</h4>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-200/60 text-[10px] font-semibold text-emerald-700">
                ✓ {step.stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loss Reduction Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calculator Inputs Column */}
        <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/5 shadow-soft space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            <h3 className="font-display text-lg font-bold text-agri-dark">
              Loss Reduction Calculator
            </h3>
          </div>
          <p className="text-xs text-agri-muted">
            Enter your harvest details to project savings achieved with AgriSustain smart scheduling.
          </p>

          <div className="space-y-4 pt-2 text-xs">
            {/* Crop Selector */}
            <div>
              <label className="block font-semibold text-agri-dark mb-1">Crop Type</label>
              <select
                value={crop}
                onChange={(e) => {
                  setCrop(e.target.value);
                  if (e.target.value === "Tomato") {
                    setSellingPrice(2800);
                    setCurrentLossPct(22);
                  } else if (e.target.value === "Wheat") {
                    setSellingPrice(2450);
                    setCurrentLossPct(15);
                  } else {
                    setSellingPrice(3100);
                    setCurrentLossPct(18);
                  }
                }}
                className="w-full rounded-xl border border-gray-200 p-2.5 font-medium text-agri-dark focus:border-emerald-500 focus:outline-none"
              >
                <option value="Wheat">Wheat (Rabi Season)</option>
                <option value="Rice">Rice / Paddy</option>
                <option value="Tomato">Tomato / Perishable Vegetables</option>
                <option value="Potato">Potato / Tubers</option>
              </select>
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex justify-between font-semibold text-agri-dark mb-1">
                <span>Harvest Quantity (Quintals)</span>
                <span className="font-mono text-emerald-700 font-bold">{quantity} Quintals</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Selling Price */}
            <div>
              <div className="flex justify-between font-semibold text-agri-dark mb-1">
                <span>Selling Price (₹ per Quintal)</span>
                <span className="font-mono text-emerald-700 font-bold">₹{sellingPrice}</span>
              </div>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-200 p-2.5 font-medium text-agri-dark focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Current Loss % */}
            <div>
              <div className="flex justify-between font-semibold text-agri-dark mb-1">
                <span>Traditional Loss Rate</span>
                <span className="font-mono text-red-600 font-bold">{currentLossPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                value={currentLossPct}
                onChange={(e) => setCurrentLossPct(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-gray-400">National average for smallholders: 15–20%</span>
            </div>
          </div>
        </div>

        {/* Calculator Output Card Column */}
        <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-emerald-800 to-agri-dark text-white p-6 sm:p-8 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Projected Financial Recovery
            </div>

            <div className="mt-4">
              <span className="text-xs text-emerald-200">Total Produce Baseline Value</span>
              <div className="font-display text-2xl font-bold">
                ₹{calculation.totalProduceValue.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Recovery Highlights */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
                <span className="text-[10px] text-emerald-200 block uppercase">Traditional Loss</span>
                <span className="text-xl font-bold font-display text-red-300 block mt-1">
                  ₹{calculation.currentLossValue.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-red-200">
                  {calculation.currentLossQuantity} quintals wasted
                </span>
              </div>

              <div className="rounded-2xl bg-emerald-500/25 p-4 border border-emerald-400/40">
                <span className="text-[10px] text-emerald-200 block uppercase">Recovered with AI</span>
                <span className="text-xl font-bold font-display text-white block mt-1">
                  ₹{calculation.potentialRecoveredValue.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-emerald-200">
                  {calculation.savedProduceQuantity} quintals saved
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-1">
              <div className="flex justify-between text-emerald-200 font-semibold">
                <span>Loss Rate Reduction:</span>
                <span className="text-white font-bold">{currentLossPct}% → {targetLossPct}%</span>
              </div>
              <p className="text-[11px] text-emerald-100">
                Precision drying and ventilated cold staging recovers up to <strong>₹{calculation.potentialRecoveredValue.toLocaleString("en-IN")}</strong> back into your family bank account.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200">
            <span>ROI Payback: ~{calculation.roiMonths} harvest cycles</span>
            <span className="font-bold text-white">Guaranteed Margin Protection</span>
          </div>
        </div>
      </div>

      {/* Best Practices Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="rounded-2xl bg-white p-5 border border-emerald-900/5 shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="text-xs font-bold text-agri-dark">{item.title}</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
