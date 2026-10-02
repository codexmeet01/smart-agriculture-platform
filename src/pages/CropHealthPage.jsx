import React, { useState } from "react";
import {
  ScanHeart,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  FileImage,
  ShieldCheck,
  Droplet,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { cropHealthService } from "../services/cropHealthService";
import { CROP_PRESETS, CROP_HEALTH_HISTORY } from "../data/mockData";
import { Badge } from "../components/common/Badge";
import { useFarm } from "../context/FarmContext";

export const CropHealthPage = () => {
  const { showToast } = useFarm();
  const presets = cropHealthService.getPresets();

  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [imagePreview, setImagePreview] = useState(presets[0].image);
  const [customFile, setCustomFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(presets[0]);

  // Handle local file upload from user's computer
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(file);
      setSelectedPresetId(null);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      showToast("Leaf image loaded. Click 'Analyze Crop' to run AI diagnosis.");
    }
  };

  // Handle preset selection
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setCustomFile(null);
    setImagePreview(preset.image);
    setAnalysisResult(preset);
  };

  // Run AI analysis
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await cropHealthService.analyzeCropImage(
        customFile || selectedPresetId,
        customFile ? "Tomato" : analysisResult.crop
      );
      setAnalysisResult(result);
      showToast("🌿 AI Crop Analysis complete!");
    } catch (err) {
      console.error(err);
      showToast("Analysis error. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <ScanHeart className="h-3.5 w-3.5" />
          Vision AI Pathology
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
          AI Crop Health Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
          Upload a high-resolution leaf photograph or choose a demo sample to detect early pathogen stress, nutrient deficiency, and foliage health.
        </p>
      </div>

      {/* Main Dual Grid: Upload & AI Scanner on Left, Diagnosis Report on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload Box & Sample Presets */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-white p-5 sm:p-6 border border-emerald-900/10 shadow-soft">
            <h3 className="font-display text-base font-bold text-agri-dark mb-1">
              Upload Crop Image
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Supports JPEG, PNG from mobile or field cameras.
            </p>

            {/* Upload Dropzone */}
            <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-[#f7faf8] transition-colors p-4 text-center flex flex-col items-center justify-center min-h-[240px]">
              {imagePreview ? (
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-black/5">
                  <img
                    src={imagePreview}
                    alt="Crop preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {/* Radar Scanning Line Animation while analyzing */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none">
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-glow animate-scan" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs text-white text-xs font-bold">
                        <div className="flex items-center gap-2 bg-agri-dark/90 px-4 py-2 rounded-xl border border-emerald-500/30">
                          <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                          <span>AI Neural Feature Extraction...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8">
                  <UploadCloud className="h-12 w-12 text-emerald-600 mb-3 mx-auto" />
                  <p className="text-xs font-semibold text-agri-dark">
                    Drag and drop leaf image or browse
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                </div>
              )}

              {/* Real File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                title="Select image from computer"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-agri-deep hover:from-emerald-700 hover:to-agri-dark text-white py-3 px-4 text-xs font-bold shadow-md shadow-emerald-950/10 transition-all disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing Plant Tissue...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    Analyze Crop
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Demo Presets */}
          <div className="rounded-3xl bg-white p-5 border border-emerald-900/10 shadow-soft">
            <span className="text-xs font-bold uppercase tracking-wider text-agri-muted block mb-3">
              Or Test With Sample Disease Cases:
            </span>
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                    selectedPresetId === preset.id
                      ? "border-emerald-500 bg-emerald-50/70 shadow-xs"
                      : "border-gray-100 hover:border-emerald-200 bg-white"
                  }`}
                >
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-agri-dark truncate block">
                      {preset.name}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {preset.crop} • Health: {preset.health}%
                    </span>
                  </div>
                  <Badge
                    variant={preset.health >= 90 ? "emerald" : preset.health >= 80 ? "amber" : "red"}
                    size="sm"
                  >
                    {preset.status}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Result Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-emerald-200/90 shadow-card">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Diagnostic Scan Report
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <h2 className="font-display text-2xl font-extrabold text-agri-dark">
                    Crop: {analysisResult.crop}
                  </h2>
                  <Badge
                    variant={
                      analysisResult.health >= 90
                        ? "emerald"
                        : analysisResult.health >= 80
                        ? "amber"
                        : "red"
                    }
                    size="md"
                    dot={true}
                  >
                    {analysisResult.status}
                  </Badge>
                </div>
              </div>

              {/* Overall Health Score */}
              <div className="flex items-center gap-3 bg-emerald-50/80 px-4 py-2 rounded-2xl border border-emerald-100">
                <div>
                  <span className="text-[10px] text-emerald-800 uppercase font-semibold block">
                    Health Index
                  </span>
                  <span className="text-2xl font-bold font-display text-emerald-800">
                    {analysisResult.health}%
                  </span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
            </div>

            {/* Possible Issue / Diagnosis Headline */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Detected Condition:
                  </h4>
                  <p className="text-sm font-bold text-agri-dark mt-0.5">
                    {analysisResult.issue}
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    Risk Severity: <strong>{analysisResult.riskLevel || "Low"}</strong>. Pathogen spread is in early vegetative window and fully reversible.
                  </p>
                </div>
              </div>
            </div>

            {/* Four Health Indicator Cards */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl bg-emerald-50/60 p-3.5 border border-emerald-100 text-center">
                <span className="text-[10px] uppercase font-semibold text-emerald-800 block">
                  Leaf Health
                </span>
                <span className="text-xl font-bold font-display text-agri-dark mt-1 block">
                  {analysisResult.indicators?.leafHealth || 82}%
                </span>
                <span className="text-[10px] text-emerald-700">Photosynthesis OK</span>
              </div>

              <div className="rounded-2xl bg-teal-50/60 p-3.5 border border-teal-100 text-center">
                <span className="text-[10px] uppercase font-semibold text-teal-800 block">
                  Growth Rate
                </span>
                <span className="text-xl font-bold font-display text-agri-dark mt-1 block">
                  {analysisResult.indicators?.growthRate || 89}%
                </span>
                <span className="text-[10px] text-teal-700">Healthy Tillering</span>
              </div>

              <div className="rounded-2xl bg-blue-50/60 p-3.5 border border-blue-100 text-center">
                <span className="text-[10px] uppercase font-semibold text-blue-800 block">
                  Moisture
                </span>
                <span className="text-xl font-bold font-display text-agri-dark mt-1 block">
                  {analysisResult.indicators?.moistureRetention || 71}%
                </span>
                <span className="text-[10px] text-blue-700">Adequate turgor</span>
              </div>

              <div className="rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100 text-center">
                <span className="text-[10px] uppercase font-semibold text-amber-800 block">
                  Disease Risk
                </span>
                <span className="text-xl font-bold font-display text-amber-800 mt-1 block">
                  {analysisResult.indicators?.diseaseRisk || "Low"}
                </span>
                <span className="text-[10px] text-amber-700">Contained</span>
              </div>
            </div>

            {/* Farmer-Friendly Recommendations */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-agri-dark flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Farmer Action Plan
              </h4>

              <div className="space-y-2">
                {analysisResult.recommendations?.map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f7faf8] border border-gray-100 text-xs text-agri-dark"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crop Health History Chart */}
          <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-base font-bold text-agri-dark">
                  Crop Health Trend (Past 4 Weeks)
                </h3>
                <p className="text-xs text-agri-muted">
                  Multi-spectral vegetative index across monitored plots.
                </p>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CROP_HEALTH_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
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
                  <Line type="monotone" dataKey="plotA" name="Plot A (Wheat)" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="plotB" name="Plot B (Rice)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="plotC" name="Plot C (Vegetables)" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
