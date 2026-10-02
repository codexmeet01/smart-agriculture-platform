// AgriSustain AI - Comprehensive Domain Mock Data

export const INITIAL_FARMER_PROFILE = {
  name: "Ramesh Patel",
  farmName: "Patel Organic Agro Farm",
  farmId: "AGRI-IN-UP-2024-884",
  location: "Kalyanpur, Kanpur Nagar, Uttar Pradesh",
  state: "Uttar Pradesh",
  pinCode: "208017",
  farmSize: "4.2 Hectares (10.4 Acres)",
  primaryCrop: "Wheat & Seasonal Vegetables",
  irrigationType: "Solar Drip & Micro-Sprinkler",
  soilType: "Alluvial Loam (pH 6.8)",
  phone: "+91 98765 43210",
  email: "ramesh.patel.agri@gmail.com",
  joinedDate: "October 2023",
  sensorNodes: 6,
  activePlotsCount: 3,
};

export const INITIAL_KPIS = {
  waterUsage: {
    value: "1,240 L",
    numeric: 1240,
    change: "-18% lower than last week",
    trend: "down",
    isPositive: true,
    benchmark: "1,520 L standard",
  },
  energyUsage: {
    value: "8.4 kWh",
    numeric: 8.4,
    change: "-12% lower than last week",
    trend: "down",
    isPositive: true,
    solarContribution: "76% Solar Powered",
  },
  cropHealth: {
    value: "87%",
    numeric: 87,
    change: "Healthy overall",
    status: "Healthy",
    trend: "up",
    isPositive: true,
  },
  estimatedYield: {
    value: "3.8 Tons",
    numeric: 3.8,
    change: "+8% projected boost",
    trend: "up",
    isPositive: true,
    harvestWindow: "Mid November",
  }
};

export const INITIAL_PLOTS = [
  {
    id: "plot-a",
    name: "Plot A - North Field",
    crop: "Wheat (HD-2967)",
    stage: "Tillering & Vegetative",
    area: "1.8 ha",
    soilMoisture: 64,
    cropHealth: 91,
    status: "Healthy",
    statusColor: "emerald",
    lastIrrigated: "2 days ago",
    nextIrrigation: "Tomorrow 6:00 AM",
    sensorId: "NODE-IOT-01",
    soilTemp: "23°C",
    npkLevel: "Optimal (N: 140, P: 45, K: 180)",
  },
  {
    id: "plot-b",
    name: "Plot B - Central Basin",
    crop: "Rice / Mustard",
    stage: "Grain Formation",
    area: "1.4 ha",
    soilMoisture: 42,
    cropHealth: 78,
    status: "Needs Attention",
    statusColor: "amber",
    lastIrrigated: "4 days ago",
    nextIrrigation: "Scheduled for Today 5:30 PM",
    sensorId: "NODE-IOT-02",
    soilTemp: "26°C",
    npkLevel: "Low Nitrogen (Needs Top Dressing)",
  },
  {
    id: "plot-c",
    name: "Plot C - Green Polyhouse",
    crop: "Vegetables (Tomato & Chilli)",
    stage: "Flowering & Fruiting",
    area: "1.0 ha",
    soilMoisture: 71,
    cropHealth: 94,
    status: "Healthy",
    statusColor: "emerald",
    lastIrrigated: "Yesterday 7:00 PM",
    nextIrrigation: "In 2 days",
    sensorId: "NODE-IOT-03",
    soilTemp: "21°C",
    npkLevel: "Balanced Organic",
  }
];

export const CURRENT_WEATHER = {
  city: "Kanpur",
  state: "Uttar Pradesh",
  temp: 31,
  condition: "Partly Cloudy",
  conditionCode: "partly-cloudy",
  humidity: 64,
  rainProbability: 35,
  wind: 12,
  rainfall: 4.2,
  uvIndex: 6,
  airQuality: "Moderate (AQI 98)",
  sunrise: "5:54 AM",
  sunset: "6:14 PM",
};

export const SEVEN_DAY_FORECAST = [
  { day: "Monday", temp: 31, minTemp: 22, rain: 35, condition: "Partly Cloudy", icon: "CloudSun" },
  { day: "Tuesday", temp: 29, minTemp: 21, rain: 65, condition: "Light Rain Expected", icon: "CloudRain" },
  { day: "Wednesday", temp: 30, minTemp: 23, rain: 40, condition: "Scattered Showers", icon: "CloudDrizzle" },
  { day: "Thursday", temp: 32, minTemp: 24, rain: 15, condition: "Mostly Sunny", icon: "Sun" },
  { day: "Friday", temp: 33, minTemp: 24, rain: 10, condition: "Sunny & Warm", icon: "Sun" },
  { day: "Saturday", temp: 31, minTemp: 22, rain: 25, condition: "Passing Clouds", icon: "CloudSun" },
  { day: "Sunday", temp: 28, minTemp: 20, rain: 70, condition: "Monsoon Showers", icon: "CloudLightning" },
];

export const HOURLY_FORECAST = [
  { time: "06:00", temp: 23, rain: 10, moisture: 72 },
  { time: "09:00", temp: 26, rain: 15, moisture: 68 },
  { time: "12:00", temp: 31, rain: 25, moisture: 62 },
  { time: "15:00", temp: 32, rain: 35, moisture: 58 },
  { time: "18:00", temp: 29, rain: 45, moisture: 65 },
  { time: "21:00", temp: 26, rain: 50, moisture: 70 },
  { time: "00:00", temp: 24, rain: 60, moisture: 74 },
];

export const WEATHER_ADVISORIES = [
  {
    id: 1,
    title: "Rain Expected Tomorrow",
    desc: "12 mm precipitation forecast for Tuesday afternoon. Delay scheduled irrigation to reduce pump energy and prevent waterlogging.",
    severity: "warning",
    icon: "CloudRain",
    action: "Delay Irrigation",
  },
  {
    id: 2,
    title: "High Daytime Temperature Ahead",
    desc: "Peak temperature reaching 33°C by Friday. Check soil moisture in Plot B and consider evening mulching.",
    severity: "info",
    icon: "ThermometerSun",
    action: "Check Moisture",
  },
  {
    id: 3,
    title: "Moderate Wind Speeds",
    desc: "Gusts up to 18 km/h on Wednesday afternoon. Avoid foliar pesticide spraying during 1:00 PM to 4:00 PM to prevent spray drift.",
    severity: "neutral",
    icon: "Wind",
    action: "Schedule Spraying",
  },
];

export const SOIL_MOISTURE_SERIES = [
  { time: "00:00", plotA: 68, plotB: 48, plotC: 74, idealMin: 55, idealMax: 75, rainfall: 0 },
  { time: "04:00", plotA: 67, plotB: 46, plotC: 73, idealMin: 55, idealMax: 75, rainfall: 0 },
  { time: "08:00", plotA: 65, plotB: 45, plotC: 72, idealMin: 55, idealMax: 75, rainfall: 0 },
  { time: "12:00", plotA: 62, plotB: 41, plotC: 70, idealMin: 55, idealMax: 75, rainfall: 0 },
  { time: "14:00", plotA: 60, plotB: 39, plotC: 69, idealMin: 55, idealMax: 75, rainfall: 1.2 },
  { time: "16:00", plotA: 64, plotB: 42, plotC: 71, idealMin: 55, idealMax: 75, rainfall: 3.0 },
  { time: "20:00", plotA: 66, plotB: 44, plotC: 72, idealMin: 55, idealMax: 75, rainfall: 0 },
  { time: "23:59", plotA: 64, plotB: 42, plotC: 71, idealMin: 55, idealMax: 75, rainfall: 0 },
];

export const IRRIGATION_RECOMMENDATION = {
  action: "Do not irrigate today.",
  urgency: "Optimal Balance",
  statusColor: "emerald",
  reasons: [
    { label: "Expected rainfall", value: "12 mm tomorrow afternoon" },
    { label: "Current average soil moisture", value: "68% (within optimal 55-75% zone)" },
    { label: "Crop water requirement", value: "Low at current vegetative stage" },
    { label: "Solar pump efficiency", value: "Maximum recharge phase" }
  ],
  nextScheduled: "Tomorrow – 6:00 AM (Auto-delay if rain > 8mm)",
  recommendedDuration: "22 minutes",
  estimatedWater: "420 Litres",
  waterSaved: "180 Litres saved vs conventional timer",
  energySaved: "1.4 kWh conserved",
};

export const IRRIGATION_SCHEDULE_TABLE = [
  { id: "SCH-01", plot: "Plot A (Wheat)", valve: "V-North-01", duration: "25 min", scheduledTime: "Tomorrow 06:00 AM", status: "AI Paused (Rain Expected)", waterVolume: "380 L", method: "Drip" },
  { id: "SCH-02", plot: "Plot B (Rice/Mustard)", valve: "V-Central-02", duration: "18 min", scheduledTime: "Today 05:30 PM", status: "Active Scheduled", waterVolume: "290 L", method: "Sprinkler" },
  { id: "SCH-03", plot: "Plot C (Vegetables)", valve: "V-Poly-03", duration: "15 min", scheduledTime: "Oct 03, 07:00 AM", status: "Scheduled", waterVolume: "210 L", method: "Micro-Drip" },
  { id: "SCH-04", plot: "Plot A (Wheat)", valve: "V-North-01", duration: "30 min", scheduledTime: "Sep 29, 06:00 AM", status: "Completed", waterVolume: "450 L", method: "Drip" },
];

export const CROP_PRESETS = [
  {
    id: "preset-tomato-blight",
    name: "Tomato Leaf (Early Blight signs)",
    crop: "Tomato",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
    health: 82,
    status: "Moderate Stress",
    issue: "Early signs of Alternaria solani (Early Blight)",
    riskLevel: "Low to Moderate",
    indicators: {
      leafHealth: 82,
      growthRate: 89,
      moistureRetention: 71,
      diseaseRisk: "Low (Early Stage)",
    },
    recommendations: [
      "Increase monitoring of lower foliage over the next 48 hours",
      "Avoid overhead sprinkler irrigation to prevent leaf wetness",
      "Prune affected lower leaves displaying concentric dark spots",
      "Apply bio-fungicide (Trichoderma viride or copper oxychloride 0.2%) during clear skies"
    ]
  },
  {
    id: "preset-wheat-healthy",
    name: "Wheat Crop (Healthy Tillering)",
    crop: "Wheat",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
    health: 95,
    status: "Optimal Health",
    issue: "No significant pest or pathogen detected",
    riskLevel: "None",
    indicators: {
      leafHealth: 96,
      growthRate: 94,
      moistureRetention: 88,
      diseaseRisk: "Very Low",
    },
    recommendations: [
      "Maintain current precision irrigation schedule",
      "Apply scheduled nitrogen split dose before first node formation",
      "Keep soil aerated with shallow inter-culture"
    ]
  },
  {
    id: "preset-rice-blast",
    name: "Rice Paddy (Leaf Blast Risk)",
    crop: "Rice",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80",
    health: 74,
    status: "Attention Required",
    issue: "Spindle-shaped lesions indicative of Magnaporthe oryzae",
    riskLevel: "Moderate",
    indicators: {
      leafHealth: 74,
      growthRate: 80,
      moistureRetention: 65,
      diseaseRisk: "Moderate",
    },
    recommendations: [
      "Avoid excess urea application as high nitrogen accelerates blast spread",
      "Ensure proper field drainage to reduce standing canopy humidity",
      "Apply recommended formulation of Tricyclazole 75% WP at 0.6g/L"
    ]
  }
];

export const CROP_HEALTH_HISTORY = [
  { week: "Week 1", plotA: 88, plotB: 82, plotC: 90 },
  { week: "Week 2", plotA: 90, plotB: 80, plotC: 92 },
  { week: "Week 3", plotA: 89, plotB: 76, plotC: 93 },
  { week: "Week 4", plotA: 91, plotB: 78, plotC: 94 },
];

export const MANDI_MARKET_PRICES = [
  {
    id: "mkt-1",
    crop: "Wheat",
    variety: "Sharbati / HD-2967",
    currentPrice: 2450,
    unit: "quintal",
    priceChange: 4.2,
    trend: "up",
    market: "Kanpur Mandi, UP",
    arrivalQuantity: "1,200 Quintals",
    msp: 2275,
    recommendation: "Hold & Monitor (Upward momentum)",
  },
  {
    id: "mkt-2",
    crop: "Rice (Basmati)",
    variety: "Pusa 1121",
    currentPrice: 3100,
    unit: "quintal",
    priceChange: 2.1,
    trend: "up",
    market: "Karnal Mandi, Haryana",
    arrivalQuantity: "840 Quintals",
    msp: 2183,
    recommendation: "Favorable window to sell 40% stock",
  },
  {
    id: "mkt-3",
    crop: "Tomato",
    variety: "Hybrid Red",
    currentPrice: 2800,
    unit: "quintal",
    priceChange: -1.3,
    trend: "down",
    market: "Nashik Mandi, Maharashtra",
    arrivalQuantity: "3,400 Crates",
    msp: "Open Market",
    recommendation: "Sell immediately due to supply surge",
  },
  {
    id: "mkt-4",
    crop: "Mustard Seed",
    variety: "Pusa Bold",
    currentPrice: 5600,
    unit: "quintal",
    priceChange: 3.8,
    trend: "up",
    market: "Jaipur Mandi, Rajasthan",
    arrivalQuantity: "650 Quintals",
    msp: 5650,
    recommendation: "Hold for peak festival demand",
  },
  {
    id: "mkt-5",
    crop: "Maize (Corn)",
    variety: "Hybrid Yellow",
    currentPrice: 2150,
    unit: "quintal",
    priceChange: 0.9,
    trend: "up",
    market: "Indore Mandi, MP",
    arrivalQuantity: "980 Quintals",
    msp: 2090,
    recommendation: "Steady price, normal liquidation",
  },
  {
    id: "mkt-6",
    crop: "Potato",
    variety: "Kufri Jyoti",
    currentPrice: 1650,
    unit: "quintal",
    priceChange: 5.4,
    trend: "up",
    market: "Agra Mandi, UP",
    arrivalQuantity: "2,100 Bags",
    msp: "Open Market",
    recommendation: "High cold-storage pull, good time to dispatch",
  }
];

export const MARKET_TREND_SERIES = [
  { month: "May", Wheat: 2150, Rice: 2800, Tomato: 1900, Mustard: 5100 },
  { month: "Jun", Wheat: 2200, Rice: 2880, Tomato: 2200, Mustard: 5250 },
  { month: "Jul", Wheat: 2280, Rice: 2950, Tomato: 3400, Mustard: 5350 },
  { month: "Aug", Wheat: 2340, Rice: 3020, Tomato: 3100, Mustard: 5480 },
  { month: "Sep", Wheat: 2400, Rice: 3060, Tomato: 2850, Mustard: 5540 },
  { month: "Oct", Wheat: 2450, Rice: 3100, Tomato: 2800, Mustard: 5600 },
];

export const SUSTAINABILITY_METRICS = {
  overallScore: 82,
  maxScore: 100,
  category: "High Sustainability Tier (Top 12% in Region)",
  breakdown: [
    { category: "Water Efficiency", score: 86, benchmark: 60, icon: "Droplet" },
    { category: "Energy Efficiency", score: 78, benchmark: 52, icon: "Zap" },
    { category: "Crop Health & Biodiversity", score: 91, benchmark: 70, icon: "Sprout" },
    { category: "Post-Harvest Efficiency", score: 72, benchmark: 55, icon: "PackageCheck" },
    { category: "Climate Resilience", score: 81, benchmark: 58, icon: "ShieldCheck" }
  ],
  savedImpact: {
    water: "12,400 Litres",
    waterEquivalent: "Equivalent to 62 family days of freshwater",
    energy: "84 kWh",
    energyEquivalent: "Saved ₹720 in grid electricity / diesel",
    carbon: "18 kg CO₂e",
    carbonEquivalent: "Equivalent to planting 1.2 mature trees",
  },
  beforeAfter: {
    traditional: {
      water: 1520,
      energy: 12.8,
      yieldLoss: 18,
      fertilizerOveruse: "22%",
    },
    smartAgri: {
      water: 1240,
      energy: 8.4,
      yieldLoss: 7,
      fertilizerOveruse: "4%",
    },
    delta: {
      waterSaved: 280,
      energySaved: 4.4,
      yieldGain: "+11%",
    }
  }
};

export const CLIMATE_RISKS = [
  {
    id: "risk-heat",
    factor: "Heat Stress",
    level: "Medium",
    color: "amber",
    score: 54,
    headline: "High daytime temperature expected in the next 3 days",
    advisory: "Increase soil moisture monitoring and irrigate during early morning hours (5:00 AM – 7:30 AM) to minimize evapotranspiration losses.",
    impactArea: "Fruiting crops in Plot C & Vegetative Wheat"
  },
  {
    id: "risk-drought",
    factor: "Drought Risk",
    level: "Low",
    color: "emerald",
    score: 18,
    headline: "Adequate subsoil moisture reserve & water table stable",
    advisory: "Farm water pond is at 84% capacity. Current drip setup ensures 32 days of buffer even without rainfall.",
    impactArea: "All plots secure"
  },
  {
    id: "risk-rain",
    factor: "Heavy Rain Risk",
    level: "Medium",
    color: "amber",
    score: 48,
    headline: "Forecast indicates 12-18 mm rainfall in 48 hours",
    advisory: "Clear perimeter drainage channels in Plot B to prevent standing puddles and fungal damp-off.",
    impactArea: "Plot B - Central Basin"
  },
  {
    id: "risk-soil",
    factor: "Soil Moisture Risk",
    level: "Low",
    color: "emerald",
    score: 22,
    headline: "Sensor network reporting stable root-zone humidity",
    advisory: "Sensors at 15cm and 30cm depth demonstrate balanced capillary action. No risk of root asphyxiation.",
    impactArea: "Optimal root aeration"
  }
];

export const ANALYTICS_DATA = {
  days7: [
    { date: "Day 1", water: 1300, energy: 9.1, cropHealth: 86, rainfall: 0 },
    { date: "Day 2", water: 1280, energy: 8.8, cropHealth: 86, rainfall: 0 },
    { date: "Day 3", water: 1250, energy: 8.5, cropHealth: 87, rainfall: 1.2 },
    { date: "Day 4", water: 1220, energy: 8.2, cropHealth: 87, rainfall: 4.2 },
    { date: "Day 5", water: 1190, energy: 7.9, cropHealth: 87, rainfall: 0.5 },
    { date: "Day 6", water: 1210, energy: 8.3, cropHealth: 88, rainfall: 0 },
    { date: "Day 7", water: 1240, energy: 8.4, cropHealth: 87, rainfall: 0 },
  ],
  days30: [
    { date: "Week 1", water: 9800, energy: 65, cropHealth: 84, rainfall: 14 },
    { date: "Week 2", water: 9200, energy: 61, cropHealth: 85, rainfall: 22 },
    { date: "Week 3", water: 8800, energy: 58, cropHealth: 86, rainfall: 35 },
    { date: "Week 4", water: 8680, energy: 56, cropHealth: 87, rainfall: 18 },
  ],
  days90: [
    { date: "Month 1", water: 42000, energy: 275, cropHealth: 81, rainfall: 92 },
    { date: "Month 2", water: 39500, energy: 254, cropHealth: 84, rainfall: 140 },
    { date: "Month 3", water: 36200, energy: 238, cropHealth: 87, rainfall: 68 },
  ]
};

export const NOTIFICATIONS_FEED = [
  {
    id: "notif-1",
    type: "weather",
    title: "🌧️ Rain Alert",
    message: "Rain expected tomorrow (approx 12mm). Automatic recommendation: pause scheduled irrigation.",
    timestamp: "10 mins ago",
    unread: true,
    route: "/weather",
  },
  {
    id: "notif-2",
    type: "irrigation",
    title: "💧 Irrigation Alert",
    message: "Soil moisture in Plot B dropped to 42% (below 50% target). Scheduled micro-irrigation set for 5:30 PM.",
    timestamp: "45 mins ago",
    unread: true,
    route: "/irrigation",
  },
  {
    id: "notif-3",
    type: "crop",
    title: "🌱 Crop Alert",
    message: "Possible mild stress detected in Plot B. Check moisture and nitrogen availability.",
    timestamp: "3 hours ago",
    unread: false,
    route: "/crop-health",
  },
  {
    id: "notif-4",
    type: "market",
    title: "💰 Market Alert",
    message: "Wheat prices in Kanpur Mandi jumped +4.2% to ₹2,450/quintal.",
    timestamp: "5 hours ago",
    unread: false,
    route: "/market",
  },
];
