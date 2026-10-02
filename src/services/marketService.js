import { MANDI_MARKET_PRICES, MARKET_TREND_SERIES } from "../data/mockData";
import { fetchWithFallback } from "./apiConfig";

export const marketService = {
  async getMarketPrices() {
    return fetchWithFallback(
      `/api/market/prices`,
      {},
      () => MANDI_MARKET_PRICES
    );
  },

  async getMarketTrends() {
    return fetchWithFallback(
      `/api/market/trends`,
      {},
      () => MARKET_TREND_SERIES
    );
  },

  getSellAdvisory(cropName) {
    const crop = MANDI_MARKET_PRICES.find(
      c => c.crop.toLowerCase().includes(cropName.toLowerCase())
    );
    if (!crop) {
      return {
        advisory: "Market prices fluctuate based on seasonal harvest arrivals. Monitor local APMC mandi bids before transporting.",
        sentiment: "Neutral",
      };
    }

    if (crop.priceChange > 3) {
      return {
        advisory: `High demand momentum detected for ${crop.crop}. Price has jumped +${crop.priceChange}% to ₹${crop.currentPrice}/${crop.unit}. Consider holding short-term or selling in staggered batches.`,
        sentiment: "Bullish (Hold / Stagger)",
      };
    } else if (crop.priceChange < 0) {
      return {
        advisory: `Excess market arrival has softened ${crop.crop} rates by ${crop.priceChange}%. If you possess ventilated cold/dry storage, hold for 2–3 weeks to avoid distress sales.`,
        sentiment: "Bearish (Store if possible)",
      };
    }

    return {
      advisory: `${crop.crop} prices are steady at ₹${crop.currentPrice}/${crop.unit}, comfortably above the government MSP of ₹${crop.msp}. Good window for regular liquidation.`,
      sentiment: "Stable",
    };
  }
};
