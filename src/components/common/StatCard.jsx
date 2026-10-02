import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  trend = "up",
  icon: Icon,
  subtitle,
  badgeText,
  accentColor = "emerald",
  className = ""
}) => {
  const colorMap = {
    emerald: {
      borderGlow: "border-[#00D084]/30 hover:border-[#00D084]/60",
      text: "text-[#67F5C2]",
      iconGrad: "from-[#00D084] to-[#064e3b]",
      glow: "shadow-neon-emerald",
    },
    blue: {
      borderGlow: "border-[#38BDF8]/30 hover:border-[#38BDF8]/60",
      text: "text-[#38BDF8]",
      iconGrad: "from-[#38BDF8] to-[#0284c7]",
      glow: "shadow-neon-cyan",
    },
    amber: {
      borderGlow: "border-[#F59E0B]/30 hover:border-[#F59E0B]/60",
      text: "text-[#F59E0B]",
      iconGrad: "from-[#F59E0B] to-[#d97706]",
      glow: "shadow-amber-500/20",
    },
    green: {
      borderGlow: "border-[#00D084]/30 hover:border-[#00D084]/60",
      text: "text-[#00D084]",
      iconGrad: "from-[#10b981] to-[#047857]",
      glow: "shadow-neon-emerald",
    }
  };

  const scheme = colorMap[accentColor] || colorMap.emerald;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl glass-futuristic-dark p-6 border ${scheme.borderGlow} shadow-glass backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#67F5C2]/80">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold tracking-tight text-white">
              {value}
            </span>
            {badgeText && (
              <span className="rounded-full bg-[#00D084]/20 border border-[#00D084]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#67F5C2]">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${scheme.iconGrad} text-white ${scheme.glow} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/10 text-xs font-mono">
        {trend === "down" ? (
          <span
            className={`inline-flex items-center gap-1 font-bold ${
              isPositive ? "text-[#00D084]" : "text-red-400"
            }`}
          >
            <TrendingDown className="h-3.5 w-3.5" />
            {change}
          </span>
        ) : trend === "up" ? (
          <span
            className={`inline-flex items-center gap-1 font-bold ${
              isPositive ? "text-[#00D084]" : "text-red-400"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            {change}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 font-medium text-white/50">
            <Minus className="h-3.5 w-3.5" />
            {change}
          </span>
        )}

        {subtitle && (
          <span className="ml-auto text-white/50 truncate font-normal">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
