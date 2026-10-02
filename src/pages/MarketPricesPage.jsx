import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  MapPin,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
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
import { MANDI_MARKET_PRICES, MARKET_TREND_SERIES } from "../data/mockData";
import { marketService } from "../services/marketService";
import { Badge } from "../components/common/Badge";

export const MarketPricesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [prices] = useState(MANDI_MARKET_PRICES);

  const filteredPrices = prices.filter(
    (item) =>
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSellAdvisory = marketService.getSellAdvisory(selectedCrop);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <TrendingUp className="h-3.5 w-3.5" />
            APMC Mandi Intelligence
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-agri-dark">
            Market Prices & Sell Timing
          </h1>
          <p className="text-xs sm:text-sm text-agri-muted max-w-2xl mt-1 leading-relaxed">
            Real-time wholesale mandi rates, price change momentum, and AI-driven timing to maximize harvest profitability.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop or mandi..."
            className="w-full rounded-2xl border border-emerald-200 bg-white pl-10 pr-4 py-2 text-xs font-medium text-agri-dark shadow-soft focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* "Best Time to Sell" Intelligence Feature Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-800 to-agri-dark text-white p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                AI Sell Advisor • {selectedCrop}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
              Best Time to Sell Advisory
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {currentSellAdvisory.advisory}
            </p>

            <div className="flex items-center gap-4 text-xs pt-1">
              <span className="rounded-full bg-emerald-700/80 border border-emerald-500/30 px-3 py-1 font-semibold text-emerald-100">
                Market Sentiment: <strong>{currentSellAdvisory.sentiment}</strong>
              </span>
              <span className="text-emerald-300">
                Updated: <strong>Today, 11:30 AM</strong>
              </span>
            </div>
          </div>

          {/* Crop Switcher */}
          <div className="rounded-2xl bg-white/10 p-4 border border-white/15 backdrop-blur-md space-y-2 shrink-0 sm:w-64">
            <span className="text-xs font-semibold text-emerald-200 block">Select Crop Advisory:</span>
            <div className="grid grid-cols-2 gap-2">
              {["Wheat", "Rice", "Tomato", "Mustard"].map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedCrop === crop
                      ? "bg-white text-agri-dark shadow-sm"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandi Price Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrices.map((item) => {
          const isUp = item.priceChange >= 0;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedCrop(item.crop.split(" ")[0])}
              className={`cursor-pointer rounded-2xl bg-white p-5 border shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
                selectedCrop.toLowerCase() === item.crop.toLowerCase().split(" ")[0]
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : "border-emerald-900/5 hover:border-emerald-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-display text-base font-bold text-agri-dark">
                    {item.crop}
                  </h4>
                  <span className="text-xs text-gray-500">{item.variety}</span>
                </div>

                <Badge
                  variant={isUp ? "emerald" : "red"}
                  size="sm"
                  className="font-bold"
                >
                  {isUp ? "+" : ""}{item.priceChange}%
                </Badge>
              </div>

              {/* Price Figure */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-agri-dark">
                  ₹{item.currentPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  / {item.unit}
                </span>
              </div>

              {/* Mandi & MSP */}
              <div className="mt-4 space-y-1.5 pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    {item.market}
                  </span>
                  <span className="font-mono text-gray-400">{item.arrivalQuantity}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>MSP Baseline: ₹{item.msp}</span>
                  <span className="font-semibold text-emerald-700">
                    {item.currentPrice > item.msp ? "Above MSP" : "At Par"}
                  </span>
                </div>
              </div>

              {/* Recommendation pill */}
              <div className="mt-3 rounded-lg bg-[#f7faf8] p-2 text-[11px] text-agri-dark font-medium border border-gray-100">
                💡 {item.recommendation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Market Price Trends Chart */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-900/5 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-agri-dark">
              6-Month Commodity Price Trends (₹ / Quintal)
            </h3>
            <p className="text-xs text-agri-muted">
              Wholesale modal mandi prices across primary agricultural markets.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MARKET_TREND_SERIES} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis domain={[1500, 6000]} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                formatter={(value) => [`₹${value}`, ""]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
              <Line type="monotone" dataKey="Wheat" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Rice" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Mustard" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Tomato" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
