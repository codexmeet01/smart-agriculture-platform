import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Radio,
  Droplets,
  BotMessageSquare,
  CloudSun,
  Grid,
  X,
  ScanHeart,
  TrendingUp,
  PackageCheck,
  Leaf,
  ShieldAlert,
  BarChart3,
  UserCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useFarm } from "../../context/FarmContext";

export const MobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useFarm();

  const bottomItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "3D Twin", path: "/simulation", icon: Radio },
    { name: "Irrigation", path: "/irrigation", icon: Droplets },
    { name: "Advisor", path: "/advisor", icon: BotMessageSquare },
    { name: "Weather", path: "/weather", icon: CloudSun },
  ];

  const drawerItems = [
    { name: "3D Farm Digital Twin", path: "/simulation", icon: Radio, desc: "Interactive 3D simulation & physics" },
    { name: "AI Crop Health", path: "/crop-health", icon: ScanHeart, desc: "Leaf scanning & diagnosis" },
    { name: "Market Prices", path: "/market", icon: TrendingUp, desc: "Mandi APMC live rates" },
    { name: "Post-Harvest Loss", path: "/post-harvest", icon: PackageCheck, desc: "Value loss calculator" },
    { name: "Sustainability Score", path: "/sustainability", icon: Leaf, desc: "Circular score & eco stats" },
    { name: "Climate Risk", path: "/climate", icon: ShieldAlert, desc: "Heat, rain & drought monitors" },
    { name: "Farm Analytics", path: "/analytics", icon: BarChart3, desc: "7d, 30d, 90d trends" },
    { name: "Farmer Profile", path: "/profile", icon: UserCheck, desc: "Plot setup & farm info" },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-darkbg-800/95 backdrop-blur-md border-t border-emerald-900/10 dark:border-emerald-800/30 px-2 py-1 shadow-2xl transition-colors duration-300">
        <div className="flex items-center justify-around">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all ${
                    isActive
                      ? "text-emerald-700 dark:text-emerald-400 font-bold"
                      : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`h-5 w-5 ${isActive ? "text-emerald-700 dark:text-emerald-400 stroke-[2.5]" : ""}`} />
                    <span className="text-[10px] mt-0.5">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center py-1.5 px-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-medium"
          >
            <Grid className="h-5 w-5 text-emerald-800 dark:text-emerald-300" />
            <span className="text-[10px] mt-0.5 font-semibold text-agri-dark dark:text-emerald-200">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-over Drawer for All Modules */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full sm:max-w-md bg-white dark:bg-darkbg-800 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto border border-emerald-900/10 dark:border-emerald-800/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-darkbg-border">
              <div>
                <h3 className="font-display font-bold text-agri-dark dark:text-emerald-50 text-lg">All Farm Modules</h3>
                <p className="text-xs text-agri-muted dark:text-emerald-300/80">Explore smart farming tools</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="rounded-full p-2 text-agri-dark dark:text-amber-300 hover:bg-gray-100 dark:hover:bg-darkbg-card"
                >
                  {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-darkbg-card"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-3">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-emerald-50/70 dark:hover:bg-darkbg-card border border-gray-100 dark:border-darkbg-border transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-agri-dark dark:text-emerald-100">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
