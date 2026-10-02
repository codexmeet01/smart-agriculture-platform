import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FarmProvider } from "./context/FarmContext";
import { MainLayout } from "./layouts/MainLayout";

import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SimulationPage } from "./pages/SimulationPage";
import { SmartIrrigationPage } from "./pages/SmartIrrigationPage";
import { CropHealthPage } from "./pages/CropHealthPage";
import { WeatherPage } from "./pages/WeatherPage";
import { AIAdvisorPage } from "./pages/AIAdvisorPage";
import { MarketPricesPage } from "./pages/MarketPricesPage";
import { PostHarvestPage } from "./pages/PostHarvestPage";
import { SustainabilityPage } from "./pages/SustainabilityPage";
import { ClimateRiskPage } from "./pages/ClimateRiskPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <FarmProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Farmer Platform Authenticated / App Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/irrigation" element={<SmartIrrigationPage />} />
            <Route path="/crop-health" element={<CropHealthPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/advisor" element={<AIAdvisorPage />} />
            <Route path="/market" element={<MarketPricesPage />} />
            <Route path="/post-harvest" element={<PostHarvestPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/climate" element={<ClimateRiskPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FarmProvider>
  );
}
