import { CURRENT_WEATHER, SEVEN_DAY_FORECAST, HOURLY_FORECAST, WEATHER_ADVISORIES } from "../data/mockData";
import { fetchWithFallback, delay } from "./apiConfig";

export const weatherService = {
  async getCurrentWeather(city = "Kanpur") {
    return fetchWithFallback(
      `/api/weather/current?city=${encodeURIComponent(city)}`,
      {},
      () => ({
        ...CURRENT_WEATHER,
        city: city || CURRENT_WEATHER.city,
      })
    );
  },

  async getSevenDayForecast(city = "Kanpur") {
    return fetchWithFallback(
      `/api/weather/forecast?city=${encodeURIComponent(city)}`,
      {},
      () => SEVEN_DAY_FORECAST
    );
  },

  async getHourlyForecast(city = "Kanpur") {
    return fetchWithFallback(
      `/api/weather/hourly?city=${encodeURIComponent(city)}`,
      {},
      () => HOURLY_FORECAST
    );
  },

  async getWeatherAdvisories() {
    return fetchWithFallback(
      `/api/weather/advisories`,
      {},
      () => WEATHER_ADVISORIES
    );
  },

  // Generates dynamic AI advisory based on live weather condition inputs
  generateWeatherAdvisory(temp, rainProb, windSpeed) {
    const advisories = [];
    if (rainProb >= 50) {
      advisories.push("Rain expected soon. Pause automatic irrigation schedules to prevent overwatering.");
    }
    if (temp >= 33) {
      advisories.push("High temperature peak expected. Schedule irrigation during early mornings (5:30 AM to 7:30 AM).");
    }
    if (windSpeed > 15) {
      advisories.push("Strong winds detected. Postpone foliar spraying of fertilizers or pesticides to prevent drift.");
    }
    if (advisories.length === 0) {
      advisories.push("Weather conditions are stable and optimal for ongoing field operations.");
    }
    return advisories;
  }
};
