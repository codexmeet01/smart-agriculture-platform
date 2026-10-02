import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  CloudRain,
  Flame,
  Droplets,
  Zap,
  Radio,
  Eye,
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Square,
  ShieldCheck,
  Layers,
  Activity,
  Compass,
  RotateCw,
  Maximize2,
} from "lucide-react";
import { useFarm } from "../context/FarmContext";
import { FarmScene3D } from "../components/simulation/FarmScene3D";

export const SimulationPage = () => {
  const { activePump, startIrrigation, stopIrrigation, showToast, darkMode } = useFarm();

  // Environment controls
  const [timeOfDay, setTimeOfDay] = useState("noon"); // 'dawn' | 'noon' | 'sunset' | 'night'
  const [weatherCondition, setWeatherCondition] = useState("sunny"); // 'sunny' | 'rain' | 'heat'
  const [droneActive, setDroneActive] = useState(true);
  const [sprinklersOn, setSprinklersOn] = useState(false);
  const [viewMode, setViewMode] = useState("surface"); // 'surface' | 'subsurface'
  const [selectedEntity, setSelectedEntity] = useState("plot-a");
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Audio Context Ref for simulated nature/water audio synthesis
  const audioCtxRef = useRef(null);

  // Sync sprinkler with active pump
  useEffect(() => {
    if (activePump) {
      setSprinklersOn(true);
    }
  }, [activePump]);

  const toggleSprinklers = () => {
    if (sprinklersOn || activePump) {
      setSprinklersOn(false);
      stopIrrigation();
    } else {
      setSprinklersOn(true);
      startIrrigation("plot-a", 22);
      showToast("💧 3D Sprinklers activated! Water particle physics spraying across Plot A.");
    }
  };

  // Web Audio API Ambience Synthesizer (Zero external files needed)
  const toggleSound = () => {
    if (soundEnabled) {
      setSoundEnabled(false);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      showToast("🔇 Ambient sound turned off");
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // White noise generator for water / wind rustle
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 450;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.05;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start();

        setSoundEnabled(true);
        showToast("🔊 Nature & irrigation ambient sound active");
      } catch (e) {
        console.warn("Audio autoplay blocked by browser policy", e);
      }
    }
  };

  const entityDetails = {
    "plot-a": {
      name: "Plot A - North Wheat Basin",
      crop: "Wheat (HD-2967)",
      status: "Optimal Hydration",
      moisture: sprinklersOn ? "76%" : "64%",
      temp: "23°C",
      npk: "N: 140, P: 45, K: 180",
      solarEnergyDraw: "1.4 kW",
      valve: "V-North-01 (Drip active)",
      health: "91%",
    },
    "plot-b": {
      name: "Plot B - Central Rice Paddy",
      crop: "Rice / Mustard",
      status: "Standing Moisture Subsurface",
      moisture: "42%",
      temp: "26°C",
      npk: "N: 95, P: 40, K: 160",
      solarEnergyDraw: "0 kW (Idle)",
      valve: "V-Central-02 (Scheduled 5:30 PM)",
      health: "78%",
    },
    "plot-c": {
      name: "Plot C - Precision Polyhouse",
      crop: "Hybrid Tomatoes & Chilli",
      status: "Microclimate Controlled",
      moisture: "71%",
      temp: "21.5°C",
      npk: "Balanced Organic Bio",
      solarEnergyDraw: "0.8 kW",
      valve: "V-Poly-03 (Micro-mist ready)",
      health: "94%",
    },
    "solar-hub": {
      name: "Solar Generation Station",
      crop: "Photovoltaic Dual-Axis Array",
      status: timeOfDay === "night" ? "Battery Discharge Mode" : "Generating Clean Power",
      moisture: "N/A",
      temp: "42°C (Panel Heat)",
      npk: "N/A",
      solarEnergyDraw: timeOfDay === "night" ? "0 kW" : "8.4 kWh Peak Output",
      valve: "Inverter Synchronized",
      health: "98% Efficiency",
    },
    drone: {
      name: "Autonomous Agri-Drone Alpha",
      crop: "Multispectral LiDAR & Optical",
      status: droneActive ? "Field Patrol & NDVI Scanning" : "Docked on Pad",
      moisture: "LiDAR Penetration: OK",
      temp: "Battery: 88% (28 min fly time)",
      npk: "NDVI Index: 0.86 (Healthy)",
      solarEnergyDraw: "Solar Station Fast-Charged",
      valve: "Telemetry: 5G Mesh Link",
      health: "100%",
    },
  };

  const currentInfo = entityDetails[selectedEntity] || entityDetails["plot-a"];

  return (
    <div className="space-y-6">
      {/* Page Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            WebGL 3D Physics & Digital Twin
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark dark:text-emerald-50">
            Smart Farm 3D Simulation & Digital Twin
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted dark:text-emerald-300/80 max-w-2xl mt-1 leading-relaxed">
            Genuine 3D WebGL environment. Left-click & drag to rotate the farm in 360°, scroll to zoom in close, toggle day/night lighting, and trigger real-time 3D water spray particles and drone LiDAR scans.
          </p>
        </div>

        {/* Global Controls & Audio Sound */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              soundEnabled
                ? "bg-emerald-600 text-white border-emerald-500 shadow-glow"
                : "bg-white dark:bg-darkbg-card text-agri-dark dark:text-emerald-300 border-gray-200 dark:border-darkbg-border"
            }`}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span>{soundEnabled ? "Sound ON" : "Sound Muted"}</span>
          </button>

          <button
            onClick={toggleSprinklers}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              sprinklersOn
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 animate-pulse"
                : "bg-emerald-700 hover:bg-emerald-800 text-white"
            }`}
          >
            <Droplets className="h-4 w-4" />
            <span>{sprinklersOn ? "Stop Sprinklers" : "Spray 3D Water"}</span>
          </button>
        </div>
      </div>

      {/* Top 3D Control Bar */}
      <div className="rounded-3xl glass-futuristic-dark p-3.5 border border-white/10 shadow-glass flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Time of Day */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white/50">SUN & SKY:</span>
          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => {
                setTimeOfDay("dawn");
                showToast("🌅 Dawn sunlight simulated");
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                timeOfDay === "dawn" ? "bg-amber-500 text-[#031A14] shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              🌅 Dawn
            </button>
            <button
              onClick={() => {
                setTimeOfDay("noon");
                showToast("☀️ Noon peak sunlight simulated");
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                timeOfDay === "noon" ? "bg-[#00D084] text-[#031A14] shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              ☀️ Noon
            </button>
            <button
              onClick={() => {
                setTimeOfDay("sunset");
                showToast("🌇 Sunset golden hour simulated");
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                timeOfDay === "sunset" ? "bg-orange-600 text-white shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              🌇 Sunset
            </button>
            <button
              onClick={() => {
                setTimeOfDay("night");
                showToast("🌙 Starry night with glowing sensor LEDs");
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                timeOfDay === "night" ? "bg-indigo-600 text-white shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              🌙 Night
            </button>
          </div>
        </div>

        {/* Weather condition buttons */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white/50">WEATHER:</span>
          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => setWeatherCondition("sunny")}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                weatherCondition === "sunny" ? "bg-[#00D084] text-[#031A14] shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              Clear
            </button>
            <button
              onClick={() => {
                setWeatherCondition("rain");
                showToast("🌧️ 3D Rainfall physics activated with 1400+ raindrops!");
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                weatherCondition === "rain" ? "bg-[#38BDF8] text-[#031A14] shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              Rainfall
            </button>
            <button
              onClick={() => {
                setWeatherCondition("heat");
                showToast("🔥 Heatwave simulated. Strong sunlight and evaporation!");
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                weatherCondition === "heat" ? "bg-orange-600 text-white shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              Heatwave
            </button>
          </div>
        </div>

        {/* View Mode */}
        <button
          onClick={() => {
            const nextMode = viewMode === "surface" ? "subsurface" : "surface";
            setViewMode(nextMode);
            showToast(nextMode === "subsurface" ? "🔬 Inspected 3D subsurface root bed & aquifer" : "🌱 Returned to surface field");
          }}
          className={`px-3 py-1.5 rounded-2xl font-bold transition-all border ${
            viewMode === "subsurface"
              ? "bg-amber-600 text-white border-amber-400 shadow-glow"
              : "glass-futuristic text-white border-white/20 hover:bg-white/10"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-[#00D084]" />
            {viewMode === "surface" ? "3D Subsurface Roots" : "3D Surface View"}
          </span>
        </button>
      </div>

      {/* Main Genuine Three.js 3D Canvas */}
      <div className="relative">
        <FarmScene3D
          timeOfDay={timeOfDay}
          weatherCondition={weatherCondition}
          sprinklersOn={sprinklersOn}
          droneActive={droneActive}
          viewMode={viewMode}
          selectedEntity={selectedEntity}
          onSelectEntity={(id) => {
            setSelectedEntity(id);
            showToast(`Inspecting ${entityDetails[id]?.name || id}`);
          }}
        />
      </div>

      {/* Selected Entity Live Telemetry Strip HUD */}
      <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D084] to-[#064e3b] text-[#031A14] font-bold text-base shadow-neon-emerald shrink-0">
              3D
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#67F5C2] uppercase tracking-wider block">
                Selected 3D Mesh Telemetry • {currentInfo.name}
              </span>
              <span className="text-base font-bold text-white">
                {currentInfo.crop} — <span className="text-[#00D084]">{currentInfo.status}</span>
              </span>
            </div>
          </div>

          {/* Live Parameter Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
              <span className="text-[10px] text-white/50 block uppercase">Soil Moisture</span>
              <span className="font-bold text-[#38BDF8] text-sm mt-0.5 block">{currentInfo.moisture}</span>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
              <span className="text-[10px] text-white/50 block uppercase">Temperature</span>
              <span className="font-bold text-[#F59E0B] text-sm mt-0.5 block">{currentInfo.temp}</span>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
              <span className="text-[10px] text-white/50 block uppercase">Solar Power</span>
              <span className="font-bold text-[#00D084] text-sm mt-0.5 block">{currentInfo.solarEnergyDraw}</span>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 border border-white/10">
              <span className="text-[10px] text-white/50 block uppercase">Health Index</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{currentInfo.health}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Deck for Hackathon Demonstration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Interactive Sprinkler Demo */}
        <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Precision Drip Sprinklers
              </h3>
              <span className="text-xs font-mono text-[#67F5C2]">3D Particle Physics</span>
            </div>
          </div>
          <p className="text-xs text-white/70 mb-4 leading-relaxed font-sans">
            Click to activate parabolic 3D water spray particles projecting over Plot A's wheat stalks in real-time.
          </p>
          <button
            onClick={toggleSprinklers}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
              sprinklersOn
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gradient-to-r from-[#00D084] to-[#059669] hover:from-[#67F5C2] hover:to-[#00D084] text-[#031A14]"
            }`}
          >
            {sprinklersOn ? "Halt 3D Water Spray" : "Launch 3D Sprinklers (420 L/hr)"}
          </button>
        </div>

        {/* Card 2: Aerial Drone Autonomous Survey */}
        <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Aerial LiDAR & NDVI Drone
              </h3>
              <span className="text-xs font-mono text-[#67F5C2]">3D Volumetric Scanning</span>
            </div>
          </div>
          <p className="text-xs text-white/70 mb-4 leading-relaxed font-sans">
            Quadcopter drone with 4 spinning rotors flying across the 3D plots with a volumetric laser scanning beam.
          </p>
          <button
            onClick={() => {
              setDroneActive(!droneActive);
              showToast(droneActive ? "Drone landed in solar charging dock." : "🛸 Drone launched on field aerial patrol!");
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
              droneActive
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-[#00D084] text-[#031A14] shadow-neon-emerald"
            }`}
          >
            {droneActive ? "Land Drone in Charging Dock" : "Launch 3D Drone Patrol"}
          </button>
        </div>

        {/* Card 3: Deep Root Hydrology */}
        <div className="rounded-3xl glass-futuristic-dark p-6 border border-white/10 shadow-glass">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Subsurface Cross-Section
              </h3>
              <span className="text-xs font-mono text-[#F59E0B]">3D Root Zone Horizon</span>
            </div>
          </div>
          <p className="text-xs text-white/70 mb-4 leading-relaxed font-sans">
            Rotates the 3D camera to inspect root branching structures and underground moisture sensor needles.
          </p>
          <button
            onClick={() => {
              const next = viewMode === "surface" ? "subsurface" : "surface";
              setViewMode(next);
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-md"
          >
            {viewMode === "surface" ? "Inspect 3D Root Layers" : "Return to Surface Field"}
          </button>
        </div>
      </div>
    </div>
  );
};
