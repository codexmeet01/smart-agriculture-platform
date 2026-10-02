import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Radio,
  Droplets,
  ScanHeart,
  CloudSun,
  BotMessageSquare,
  TrendingUp,
  PackageCheck,
  Leaf,
  ShieldAlert,
  BarChart3,
  UserCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useFarm } from "../../context/FarmContext";

export const Sidebar = () => {
  const { kpis } = useFarm();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "3D Digital Twin", path: "/simulation", icon: Radio, badge: "3D LIVE", highlight: true },
    { name: "Smart Irrigation", path: "/irrigation", icon: Droplets, badge: "AI Ready" },
    { name: "Crop Health", path: "/crop-health", icon: ScanHeart },
    { name: "Weather & Climate", path: "/weather", icon: CloudSun },
    { name: "AI Advisor", path: "/advisor", icon: BotMessageSquare, badge: "Chat" },
    { name: "Market Prices", path: "/market", icon: TrendingUp },
    { name: "Post-Harvest", path: "/post-harvest", icon: PackageCheck },
    { name: "Sustainability", path: "/sustainability", icon: Leaf },
    { name: "Climate Risk", path: "/climate", icon: ShieldAlert },
    { name: "Farm Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Farmer Profile", path: "/profile", icon: UserCheck },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col shrink-0 border-r border-white/10 bg-[#01120D] min-h-[calc(100vh-4rem)] transition-colors duration-300">
      {/* Platform Sub-header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D084] to-[#064e3b] text-white shadow-neon-emerald">
            <Leaf className="h-4 w-4 text-[#67F5C2]" />
          </div>
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Command Center
          </span>
        </div>
        <span className="rounded-full bg-[#00D084]/20 border border-[#00D084]/40 px-2 py-0.5 text-[9px] font-mono font-bold text-[#67F5C2]">
          v2.6 LIVE
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#00D084] to-[#059669] text-[#031A14] font-bold shadow-neon-emerald"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#031A14]" : "text-[#67F5C2]"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-tight ${
                        isActive
                          ? "bg-[#031A14]/20 text-[#031A14]"
                          : item.highlight
                          ? "bg-gradient-to-r from-[#00D084] to-[#38BDF8] text-[#031A14] animate-pulse"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Sustainability Quick Meter Widget */}
      <div className="p-4 border-t border-white/10 bg-[#01120D]">
        <div className="rounded-2xl glass-futuristic-dark p-3.5 border border-white/10 shadow-glass">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
              Eco Score
            </span>
            <span className="font-bold text-[#67F5C2] text-sm">82 / 100</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#00D084] to-[#67F5C2] h-2 rounded-full transition-all duration-700 shadow-neon-emerald"
              style={{ width: "82%" }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-white/50">
            <span className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-[#38BDF8]" /> 18% Water Saved
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-[#F59E0B]" /> 8.4 kWh
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
