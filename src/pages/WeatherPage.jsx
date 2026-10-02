import React, { useState } from "react";
import {
  CloudSun,
  CloudRain,
  CloudDrizzle,
  Sun,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Sunrise,
  Sunset,
  AlertTriangle,
  Sparkles,
  MapPin,
  Calendar,
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
import { useFarm } from "../context/FarmContext";
import { SEVEN_DAY_FORECAST, HOURLY_FORECAST, WEATHER_ADVISORIES } from "../data/mockData";
import { weatherService } from "../services/weatherService";

export const WeatherPage = () => {
  const { weather, setWeather, showToast } = useFarm();
  const [selectedCity, setSelectedCity] = useState(weather.city || "Kanpur");
  const [forecastList, setForecastList] = useState(SEVEN_DAY_FORECAST);

  const cityCoordinates = {
    Kanpur: { state: "Uttar Pradesh", temp: 31, rainProb: 35, rain: 4.2 },
    Nashik: { state: "Maharashtra", temp: 28, rainProb: 60, rain: 11.5 },
    Ludhiana: { state: "Punjab", temp: 32, rainProb: 15, rain: 0 },
    Indore: { state: "Madhya Pradesh", temp: 30, rainProb: 25, rain: 1.8 },
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    const meta = cityCoordinates[city] || cityCoordinates.Kanpur;
    setWeather((prev) => ({
      ...prev,
      city,
      state: meta.state,
      temp: meta.temp,
      rainProbability: meta.rainProb,
      rainfall: meta.rain,
    }));
    showToast(`Updated weather station to ${city}, ${meta.state}.`);
  };

  const getDayIcon = (iconName) => {
    switch (iconName) {
      case "CloudRain":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "CloudDrizzle":
        return <CloudDrizzle className="h-6 w-6 text-cyan-500" />;
      case "Sun":
        return <Sun className="h-6 w-6 text-amber-500" />;
      case "CloudLightning":
        return <CloudLightning className="h-6 w-6 text-purple-500" />;
      default:
        return <CloudSun className="h-6 w-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and City Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <CloudSun className="h-3.5 w-3.5" />
            Hyperlocal Meteorology
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
            Weather & Climate Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
            Real-time radar telemetry, 7-day precipitation forecasts, and actionable agronomic advisories to prevent waterlogging and heat stress.
          </p>
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-emerald-200 p-1.5 shadow-soft">
          <MapPin className="h-4 w-4 text-emerald-700 ml-2" />
          <span className="text-xs font-semibold text-gray-500">Mandi Region:</span>
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="rounded-xl bg-[#f7faf8] px-3 py-1.5 text-xs font-bold text-agri-dark border-0 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="Kanpur">Kanpur, UP</option>
            <option value="Nashik">Nashik, MH</option>
            <option value="Ludhiana">Ludhiana, PB</option>
            <option value="Indore">Indore, MP</option>
          </select>
        </div>
      </div>

      {/* Current Conditions Master Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-agri-deep to-agri-dark text-white p-6 sm:p-8 shadow-card">
        {/* Glow shape */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Temperature Hero */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200">
              <Calendar className="h-3.5 w-3.5" />
              <span>Current Field Conditions • {weather.city}, {weather.state || "Uttar Pradesh"}</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight">
                {weather.temp}°C
              </span>
              <div className="space-y-0.5">
                <span className="text-lg font-bold text-emerald-100 block">
                  {weather.condition}
                </span>
                <span className="text-xs text-emerald-300">
                  Feels like {weather.temp + 2}°C • High Solar Radiation
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/90 pt-1 max-w-md">
              Moderate atmospheric humidity with low wind shear. Soil evaporation rate is currently 3.4 mm/day.
            </p>
          </div>

          {/* 5-Metric Quick Tiles */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                <Droplets className="h-3.5 w-3.5 text-blue-300" /> Humidity
              </span>
              <span className="text-xl font-bold font-display mt-1 block">
                {weather.humidity}%
              </span>
              <span className="text-[10px] text-emerald-200">Optimal vegetative range</span>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                <CloudRain className="h-3.5 w-3.5 text-cyan-300" /> Rain Prob.
              </span>
              <span className="text-xl font-bold font-display mt-1 block">
                {weather.rainProbability}%
              </span>
              <span className="text-[10px] text-emerald-200">Peak chance tomorrow</span>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                <Wind className="h-3.5 w-3.5 text-emerald-300" /> Wind
              </span>
              <span className="text-xl font-bold font-display mt-1 block">
                {weather.wind} km/h
              </span>
              <span className="text-[10px] text-emerald-200">Gentle north breeze</span>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                <Droplets className="h-3.5 w-3.5 text-teal-300" /> 24h Rainfall
              </span>
              <span className="text-xl font-bold font-display mt-1 block">
                {weather.rainfall} mm
              </span>
              <span className="text-[10px] text-emerald-200">Groundwater recharged</span>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                <Sunrise className="h-3.5 w-3.5 text-amber-300" /> Sunrise / Sunset
              </span>
              <span className="text-sm font-bold font-display mt-1 block">
                5:54 AM / 6:14 PM
              </span>
              <span className="text-[10px] text-emerald-200">12.3 hrs daylight</span>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-emerald-300" /> Air Quality
              </span>
              <span className="text-sm font-bold font-display mt-1 block">
                AQI 98 (Moderate)
              </span>
              <span className="text-[10px] text-emerald-200">Safe for field labor</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Farm Advisories Section */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-agri-dark flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Farm Weather Advisory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WEATHER_ADVISORIES.map((adv) => (
            <div
              key={adv.id}
              className={`rounded-2xl p-5 border transition-all ${
                adv.severity === "warning"
                  ? "bg-amber-50/70 border-amber-200"
                  : "bg-emerald-50/60 border-emerald-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-agri-dark">{adv.title}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    adv.severity === "warning"
                      ? "bg-amber-200 text-amber-900"
                      : "bg-emerald-200 text-emerald-900"
                  }`}
                >
                  {adv.action}
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Cards */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-4">
          7-Day Forecast Outlook
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecastList.map((day, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 text-center border transition-all hover:border-emerald-300 hover:shadow-soft ${
                idx === 1
                  ? "bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20"
                  : "bg-[#f7faf8] border-gray-100"
              }`}
            >
              <span className="text-xs font-bold text-agri-dark block">{day.day}</span>
              <div className="my-3 flex justify-center">{getDayIcon(day.icon)}</div>
              <div className="text-lg font-bold font-display text-agri-dark">{day.temp}°C</div>
              <div className="text-[11px] text-gray-400">Min {day.minTemp}°C</div>
              <div className="mt-2 text-xs font-semibold text-blue-600 flex items-center justify-center gap-1">
                <CloudRain className="h-3 w-3" />
                {day.rain}%
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block truncate">
                {day.condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Dynamics Chart */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
        <h3 className="font-display text-lg font-bold text-agri-dark mb-1">
          Diurnal Temperature & Moisture Curve
        </h3>
        <p className="text-xs text-agri-muted mb-4">
          Hourly microclimate tracking to predict optimum spraying and solar pump running windows.
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOURLY_FORECAST} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorRain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
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
              <Area type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#d97706" fill="url(#colorTemp)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="rain" name="Rain Chance (%)" stroke="#0284c7" fill="url(#colorRain)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
