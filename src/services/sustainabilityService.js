import { SUSTAINABILITY_METRICS, CLIMATE_RISKS } from "../data/mockData";
import { fetchWithFallback } from "./apiConfig";

export const sustainabilityService = {
  async getMetrics() {
    return fetchWithFallback(
      `/api/sustainability/metrics`,
      {},
      () => SUSTAINABILITY_METRICS
    );
  },

  async getClimateRisks() {
    return fetchWithFallback(
      `/api/climate/risks`,
      {},
      () => CLIMATE_RISKS
    );
  },

  /**
   * Calculates post-harvest losses and potential recovered value
   * Inputs:
   *  quantity: in Quintals (e.g. 100)
   *  pricePerQuintal: in INR (e.g. 2500)
   *  currentLossPercentage: percentage e.g. 18%
   *  targetLossPercentage: with AgriSustain smart cold-chain e.g. 6%
   */
  calculateLossSavings(quantity, pricePerQuintal, currentLossPercentage = 18, targetLossPercentage = 6) {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(pricePerQuintal) || 0;
    const currLossPct = parseFloat(currentLossPercentage) || 0;
    const targetPct = parseFloat(targetLossPercentage) || 6;

    const totalProduceValue = q * p;
    const currentLossQuantity = (q * currLossPct) / 100;
    const currentLossValue = currentLossQuantity * p;

    const optimizedLossQuantity = (q * targetPct) / 100;
    const optimizedLossValue = optimizedLossQuantity * p;

    const savedProduceQuantity = currentLossQuantity - optimizedLossQuantity;
    const potentialRecoveredValue = Math.max(0, currentLossValue - optimizedLossValue);
    const reductionPercentage = currLossPct > 0 ? (((currLossPct - targetPct) / currLossPct) * 100).toFixed(1) : 0;

    return {
      totalProduceValue,
      currentLossQuantity: currentLossQuantity.toFixed(1),
      currentLossValue: Math.round(currentLossValue),
      savedProduceQuantity: savedProduceQuantity.toFixed(1),
      potentialRecoveredValue: Math.round(potentialRecoveredValue),
      reductionPercentage,
      roiMonths: (potentialRecoveredValue > 0 ? (12000 / potentialRecoveredValue * 3).toFixed(1) : "1.2")
    };
  }
};
