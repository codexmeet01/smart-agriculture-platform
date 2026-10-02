import React from "react";

export const RadialScore = ({ score = 82, size = 180, strokeWidth = 14, label = "Sustainability Score" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="rotate-[-90deg] transition-all duration-1000 ease-out" width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />
        {/* Active Gradient Progress Circle */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Inner Label and Score Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="font-display text-3xl md:text-4xl font-extrabold text-agri-dark tracking-tight">
          {score}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-agri-muted">
          / 100
        </span>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-1">
          Top Tier
        </span>
      </div>
    </div>
  );
};
