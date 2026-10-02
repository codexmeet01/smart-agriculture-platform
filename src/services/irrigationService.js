import { IRRIGATION_RECOMMENDATION, SOIL_MOISTURE_SERIES, IRRIGATION_SCHEDULE_TABLE } from "../data/mockData";
import { fetchWithFallback, delay } from "./apiConfig";

export const irrigationService = {
  async getRecommendation() {
    return fetchWithFallback(
      `/api/irrigation/recommendation`,
      {},
      () => IRRIGATION_RECOMMENDATION
    );
  },

  async getSoilMoistureSeries() {
    return fetchWithFallback(
      `/api/irrigation/soil-moisture`,
      {},
      () => SOIL_MOISTURE_SERIES
    );
  },

  async getScheduleTable() {
    return fetchWithFallback(
      `/api/irrigation/schedules`,
      {},
      () => IRRIGATION_SCHEDULE_TABLE
    );
  },

  async startIrrigation(plotId, durationMinutes) {
    await delay(600);
    return {
      success: true,
      plotId,
      startedAt: new Date().toISOString(),
      duration: durationMinutes,
      status: "Pumping Active",
      message: `Irrigation initiated for ${plotId} for ${durationMinutes} minutes.`
    };
  },

  async scheduleIrrigation(scheduleData) {
    await delay(500);
    return {
      success: true,
      newSchedule: {
        id: `SCH-${Date.now().toString().slice(-4)}`,
        ...scheduleData,
        status: "Scheduled"
      }
    };
  }
};
