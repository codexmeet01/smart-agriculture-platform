import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sprout,
  Bell,
  Sparkles,
  Menu,
  X,
  User,
  Droplets,
  CloudSun,
  TrendingUp,
  Cpu,
  RefreshCw,
  Sun,
  Moon,
  Radio,
} from "lucide-react";
import { useFarm } from "../../context/FarmContext";
import { NotificationModal } from "./NotificationModal";

export const Navbar = () => {
  const location = useLocation();
  const {
    unreadNotificationsCount,
    demoMode,
    loadDemoFarm,
    profile,
    activePump,
    darkMode,
    toggleDarkMode,
  } = useFarm();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "3D Farm", path: "/simulation", badge: "3D" },
    { name: "Smart Irrigation", path: "/irrigation" },
    { name: "Crop Health", path: "/crop-health" },
    { name: "Weather", path: "/weather" },
    { name: "Market", path: "/market" },
    { name: "About", path: "/#challenge" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#031A14]/90 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D084] to-[#064e3b] text-white shadow-neon-emerald group-hover:scale-105 transition-transform">
              <Sprout className="h-6 w-6 text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
                AgriSustain <span className="text-[#67F5C2] font-extrabold text-glow-mint">AI</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#67F5C2]/70 uppercase">
                Digital Twin Command
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap inline-flex items-center transition-all ${
                  isActive(link.path)
                    ? "bg-white/10 text-[#67F5C2] font-bold border border-white/10 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1 rounded-full bg-gradient-to-r from-[#00D084] to-[#38BDF8] text-[#031A14] text-[9px] font-extrabold px-1.5 py-0.2 uppercase shrink-0">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center rounded-xl p-2 text-agri-dark dark:text-amber-300 hover:bg-emerald-50 dark:hover:bg-darkbg-card border border-emerald-900/10 dark:border-emerald-800/40 transition-all"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark/Light Mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-400 animate-spin [animation-duration:15s]" />
              ) : (
                <Moon className="h-5 w-5 text-agri-dark" />
              )}
            </button>

            {/* Active Pump Indicator if running */}
            {activePump && (
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-pulse border border-emerald-300 dark:border-emerald-700">
                <Droplets className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                <span>Pump: {Math.floor(activePump.remainingSeconds / 60)}m {activePump.remainingSeconds % 60}s</span>
              </div>
            )}

            {/* Demo Mode Pill */}
            {demoMode && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/80 dark:bg-emerald-950/50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Demo Mode</span>
              </div>
            )}

            {/* Load Demo Farm Button */}
            <button
              onClick={loadDemoFarm}
              title="Reload sample farm dataset"
              className="hidden md:flex items-center gap-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-white dark:bg-darkbg-card px-2.5 py-1.5 text-xs font-semibold text-agri-deep dark:text-emerald-300 shadow-sm hover:bg-emerald-50 dark:hover:bg-darkbg-700 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Load Demo</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setAlertsOpen(true)}
              className="relative rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-darkbg-card hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Profile / Login */}
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-lg border border-emerald-900/10 dark:border-emerald-800/40 bg-emerald-50/60 dark:bg-darkbg-card p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-agri-dark dark:text-emerald-100 hover:bg-emerald-100/70 dark:hover:bg-darkbg-700 transition-colors"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                {profile.name ? profile.name[0] : "F"}
              </div>
              <span className="hidden sm:inline-block max-w-[90px] truncate">
                {profile.name || "Farmer"}
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkbg-card"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-emerald-100 dark:border-emerald-900/40 bg-white dark:bg-darkbg-800 px-4 pt-3 pb-5 shadow-lg animate-fade-in">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-emerald-50/50 dark:hover:bg-darkbg-card"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="rounded-full bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-darkbg-border flex flex-col gap-2">
                <button
                  onClick={() => {
                    toggleDarkMode();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-50 dark:bg-darkbg-card py-2 text-xs font-semibold text-agri-dark dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40"
                >
                  {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
                  <span>{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                </button>
                <button
                  onClick={() => {
                    loadDemoFarm();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-50 dark:bg-darkbg-card py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                >
                  <RefreshCw className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Load Sample Farm Data
                </button>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/20"
                >
                  Open Dashboard
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Notifications Drawer */}
      <NotificationModal isOpen={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </>
  );
};
