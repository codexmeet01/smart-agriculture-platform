import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sprout, ArrowRight, Bell, Sparkles, Menu, X } from "lucide-react";
import { useFarm } from "../../context/FarmContext";
import { NotificationModal } from "../common/NotificationModal";

export const FuturisticNavbar = () => {
  const location = useLocation();
  const { unreadNotificationsCount } = useFarm();
  const [scrolled, setScrolled] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Farm 3D", path: "/" },
    { name: "Irrigation", path: "/irrigation" },
    { name: "Crop Health", path: "/crop-health" },
    { name: "Climate", path: "/weather" },
    { name: "AI Advisor", path: "/advisor" },
    { name: "Impact", path: "/#impact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300 ${
          scrolled
            ? "py-2 px-4 bg-[#031A14]/85 backdrop-blur-2xl border border-white/15 shadow-2xl rounded-2xl"
            : "py-3 px-6 bg-[#031A14]/65 backdrop-blur-xl border border-white/10 shadow-glass rounded-3xl"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D084] to-[#064e3b] text-white shadow-neon-emerald group-hover:scale-105 transition-transform">
              <Sprout className="h-5 w-5 text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-white leading-tight flex items-center gap-1">
                AgriSustain <span className="text-[#67F5C2] font-extrabold text-glow-mint">AI</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#67F5C2]/70 uppercase">
                DIGITAL TWIN PLATFORM
              </span>
            </div>
          </Link>

          {/* Center: Minimalist Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                  isActive(item.path)
                    ? "text-[#67F5C2] bg-white/10 font-bold border border-white/10 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            {/* Notification Bell */}
            <button
              onClick={() => setAlertsOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all"
              title="Real-time Farm Alerts"
            >
              <Bell className="h-4 w-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00D084] text-[9px] font-extrabold text-[#031A14] shadow-neon-emerald animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Enter Dashboard CTA */}
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00D084] to-[#059669] hover:from-[#67F5C2] hover:to-[#00D084] px-4 py-2 text-xs font-bold text-[#031A14] shadow-neon-emerald hover:shadow-neon-mint transition-all duration-200 hover:scale-[1.02]"
            >
              <span>ENTER DASHBOARD</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 pb-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-between"
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#00D084] py-2.5 text-xs font-bold text-[#031A14]"
            >
              <span>ENTER DASHBOARD</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </header>

      {/* Notification Modal */}
      <NotificationModal isOpen={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </>
  );
};
