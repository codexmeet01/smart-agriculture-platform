import { fetchWithFallback, delay, IS_PRODUCTION_API, API_BASE_URL } from "./apiConfig";

const KNOWLEDGE_BASE = [
  {
    keywords: ["irrigate", "water", "irrigation", "pump", "watering", "dry"],
    reply: "💧 **Irrigation Recommendation:**\nDo not irrigate today! Your current soil moisture is 68%, which is healthy. Plus, our forecast predicts **12 mm of rain tomorrow afternoon**. Irrigating now would waste 420 Litres of water and 1.4 kWh of pumping energy.",
    quickFollowUps: ["When is next scheduled irrigation?", "Check soil moisture for Plot B", "Start manual pump"]
  },
  {
    keywords: ["weather", "rain", "temperature", "forecast", "cloud", "heat", "storm"],
    reply: "🌧️ **Weather Advisory:**\nTomorrow has a 65% chance of light to moderate showers (approx 12 mm). Daytime temperature will be around 29°C. We advise keeping drainage furrows open in low-lying plots to avoid water stagnation.",
    quickFollowUps: ["Will rain affect wheat?", "7-day weather outlook", "Pest risk after rain"]
  },
  {
    keywords: ["yellow", "leaf", "leaves", "disease", "spots", "curl", "fungus", "pest", "stress", "insects"],
    reply: "🌱 **Crop Health Doctor:**\nYellowing lower leaves typically indicate early nitrogen deficiency or prolonged leaf dampness. \n\n**Quick Steps:**\n1. Inspect the underside of leaves for powdery spots or mites.\n2. Avoid overhead splashing of water.\n3. Upload a photo in the Crop Health tab for instant leaf analysis!",
    quickFollowUps: ["Take me to Crop Health scanner", "What fertilizer should I apply?", "Check Plot B health"]
  },
  {
    keywords: ["harvest", "reap", "cutting", "maturity", "yield"],
    reply: "🌾 **Harvest Advisory:**\nFor your Wheat (HD-2967), the crop is currently in the tillering & vegetative stage. Expected harvest window is **mid-November**. Wait until grain moisture drops below 14% and stalks turn golden-amber for maximum milling weight.",
    quickFollowUps: ["Current wheat market price", "Post-harvest storage tips", "Projected yield report"]
  },
  {
    keywords: ["price", "market", "mandi", "sell", "rate", "cost", "quintal", "bhav"],
    reply: "💰 **Market Intelligence:**\nWheat in Kanpur Mandi is trading at **₹2,450 / quintal (+4.2%)**, comfortably above the MSP of ₹2,275. Demand is trending upward. We recommend holding your produce for another 1–2 weeks if you have dry storage.",
    quickFollowUps: ["View all Mandi rates", "Tomato prices today", "Calculate storage savings"]
  },
  {
    keywords: ["save", "saving", "sustainability", "solar", "energy", "carbon", "eco"],
    reply: "🌿 **Farm Sustainability Insight:**\nYour farm has achieved an **82/100 Sustainability Score**! Through AI-timed drip irrigation and solar pumping, you have saved **12,400 Litres of water** and **84 kWh of power** this season.",
    quickFollowUps: ["View Sustainability breakdown", "How to reach 90+ score?", "Download Carbon Certificate"]
  },
  {
    keywords: ["post-harvest", "storage", "loss", "rot", "spoilage", "transport"],
    reply: "📦 **Post-Harvest Guidance:**\nIndian smallholders lose 15–20% of perishables during transit and damp storage. Keep harvested crops in well-aerated crates at 12–15°C, away from direct sunlight, and use our Loss Calculator to plan sales.",
    quickFollowUps: ["Open Loss Calculator", "Nearby cold storage units", "Packaging recommendations"]
  }
];

export const aiAdvisorService = {
  /**
   * Generates a farmer-friendly answer to a query
   * Ready for direct integration with Gemini API, OpenAI, or a self-hosted LLM backend
   */
  async askAdvisor(question, conversationHistory = []) {
    if (IS_PRODUCTION_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/advisor/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, history: conversationHistory }),
        });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn("AI Chat API call failed, falling back to local advisor engine:", err);
      }
    }

    // Realistic typing latency
    await delay(700);

    const cleanQuery = question.toLowerCase();

    // Match keywords from knowledgebase
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => cleanQuery.includes(k))) {
        return {
          answer: item.reply,
          quickFollowUps: item.quickFollowUps,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }

    // Default farmer-friendly fallback
    return {
      answer: `🌾 **AgriSustain AI Assistant:**\nBased on your farm profile (${cleanQuery.includes("plot") ? "Plot details" : "Patel Agro Farm"}), all parameters are stable. \n\nSoil moisture is 68%, next rainfall is expected tomorrow (12 mm), and market prices are trending favorably. Let me know if you would like specific guidance on **Irrigation**, **Crop Health**, or **Weather Alerts**!`,
      quickFollowUps: ["Should I irrigate today?", "Check crop health", "Show weather forecast"],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
};
