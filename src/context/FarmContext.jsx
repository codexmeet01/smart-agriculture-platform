import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_FARMER_PROFILE,
  INITIAL_KPIS,
  INITIAL_PLOTS,
  CURRENT_WEATHER,
  SEVEN_DAY_FORECAST,
  NOTIFICATIONS_FEED,
} from "../data/mockData";

const FarmContext = createContext(null);

export const FarmProvider = ({ children }) => {
  // Theme state: default based on localStorage or user system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("agrisustain_theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
  });

  // Profile state with localStorage persistence
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("agrisustain_profile");
    return saved ? JSON.parse(saved) : INITIAL_FARMER_PROFILE;
  });

  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [plots, setPlots] = useState(INITIAL_PLOTS);
  const [weather, setWeather] = useState(CURRENT_WEATHER);
  const [forecast] = useState(SEVEN_DAY_FORECAST);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_FEED);
  const [demoMode, setDemoMode] = useState(true);
  const [activePump, setActivePump] = useState(null); // { plotId, remainingSeconds, totalSeconds }
  const [toastMessage, setToastMessage] = useState(null);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("agrisustain_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("agrisustain_theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    showToast(!darkMode ? "🌙 Dark Mode activated" : "☀️ Light Mode activated");
  };

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem("agrisustain_profile", JSON.stringify(profile));
  }, [profile]);

  // Active pump countdown timer
  useEffect(() => {
    if (!activePump) return;
    const interval = setInterval(() => {
      setActivePump(prev => {
        if (!prev) return null;
        if (prev.remainingSeconds <= 1) {
          showToast(`✅ Irrigation completed for ${prev.plotName}! 420 L water precisely delivered.`);
          return null;
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activePump]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const updateProfile = (updatedFields) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
    showToast("Farmer profile updated successfully!");
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast("All notifications marked as read.");
  };

  const startIrrigation = (plotId, durationMinutes = 22) => {
    const targetPlot = plots.find(p => p.id === plotId) || plots[0];
    setActivePump({
      plotId: targetPlot.id,
      plotName: targetPlot.name,
      totalSeconds: durationMinutes * 60,
      remainingSeconds: Math.min(durationMinutes * 60, 120), // 2 min demo speed for fast preview
    });

    // Update plot moisture slightly
    setPlots(prev =>
      prev.map(p =>
        p.id === targetPlot.id
          ? { ...p, soilMoisture: Math.min(85, p.soilMoisture + 12), lastIrrigated: "Just now", status: "Healthy", statusColor: "emerald" }
          : p
      )
    );

    showToast(`💧 Solar drip irrigation started for ${targetPlot.name}!`);
  };

  const stopIrrigation = () => {
    if (activePump) {
      showToast(`Irrigation halted manually for ${activePump.plotName}.`);
      setActivePump(null);
    }
  };

  const loadDemoFarm = () => {
    setProfile(INITIAL_FARMER_PROFILE);
    setPlots(INITIAL_PLOTS);
    setKpis(INITIAL_KPIS);
    setNotifications(NOTIFICATIONS_FEED);
    setWeather(CURRENT_WEATHER);
    showToast("🌱 Demo farm data loaded successfully!");
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  return (
    <FarmContext.Provider
      value={{
        profile,
        updateProfile,
        kpis,
        plots,
        setPlots,
        weather,
        setWeather,
        forecast,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        demoMode,
        setDemoMode,
        activePump,
        startIrrigation,
        stopIrrigation,
        loadDemoFarm,
        showToast,
        toastMessage,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error("useFarm must be used within a FarmProvider");
  }
  return context;
};
