export const watchlist = [
  // BANKING SECTOR (6 stocks)
  { name: "HDFCBANK" },
  { name: "ICICIBANK" },
  { name: "SBIN" },
  { name: "AXISBANK" },
  { name: "KOTAKBANK" },
  { name: "INDUSIND" },

  // IT SECTOR (5 stocks)
  { name: "TCS" },
  { name: "INFY" },
  { name: "WIPRO" },
  { name: "HCLTECH" },
  { name: "TECHM" },

  // ENERGY & INFRASTRUCTURE (5 stocks)
  { name: "RELIANCE" },
  { name: "LT" },
  { name: "POWERGRID" },
  { name: "NTPC" },
  { name: "JSWSTEEL" },

  // PHARMA & HEALTHCARE (4 stocks)
  { name: "SUNPHARMA" },
  { name: "CIPLA" },
  { name: "BAJAJHLTCARE" },
  { name: "LUPIN" },

  // CONSUMER & FMCG (5 stocks)
  { name: "HINDUNILVR" },
  { name: "ITC" },
  { name: "NESTLEIND" },
  { name: "BRITANNIA" },
  { name: "COLPAL" },

  // AUTO SECTOR (3 stocks)
  { name: "MARUTI" },
  { name: "HEROMOTOCO" },
  { name: "BAJAJFINSV" },

  // TELECOM & UTILITIES (2 stocks)
  { name: "BHARTIARTL" },
  { name: "VODAFONE" },
];

// holdings - Sample data representing diverse holdings across all sectors (30 stocks now supported)
export const holdings = [
  // BANKING SECTOR
  {
    name: "HDFCBANK",
    qty: 8,
    avg: 1500.00,
    price: 0, // Will be updated by live data
    net: "+6.67%",
    day: "+3.10%",
  },
  {
    name: "ICICIBANK",
    qty: 10,
    avg: 1050.00,
    price: 0,
    net: "+6.67%",
    day: "+2.20%",
  },
  {
    name: "SBIN",
    qty: 15,
    avg: 610.00,
    price: 0,
    net: "+36.07%",
    day: "-0.45%",
  },
  {
    name: "KOTAKBANK",
    qty: 7,
    avg: 1800.00,
    price: 0,
    net: "+6.67%",
    day: "+1.80%",
  },
  {
    name: "AXISBANK",
    qty: 12,
    avg: 1100.00,
    price: 0,
    net: "+7.27%",
    day: "+2.50%",
  },
  // IT SECTOR
  {
    name: "INFY",
    qty: 10,
    avg: 1450.00,
    price: 0,
    net: "+7.59%",
    day: "+2.50%",
  },
  {
    name: "TCS",
    qty: 2,
    avg: 3800.00,
    price: 0,
    net: "+1.32%",
    day: "+0.45%",
  },
  {
    name: "WIPRO",
    qty: 10,
    avg: 450.00,
    price: 0,
    net: "+6.67%",
    day: "-1.10%",
  },
  {
    name: "HCLTECH",
    qty: 8,
    avg: 1200.00,
    price: 0,
    net: "+7.08%",
    day: "+1.80%",
  },
  // ENERGY & INFRASTRUCTURE
  {
    name: "RELIANCE",
    qty: 5,
    avg: 2450.00,
    price: 0,
    net: "+20.41%",
    day: "+1.20%",
  },
  {
    name: "LT",
    qty: 1,
    avg: 3300.00,
    price: 0,
    net: "+7.58%",
    day: "+0.50%",
  },
  {
    name: "POWERGRID",
    qty: 20,
    avg: 250.00,
    price: 0,
    net: "+6.00%",
    day: "+0.80%",
  },
  {
    name: "JSWSTEEL",
    qty: 6,
    avg: 800.00,
    price: 0,
    net: "+6.25%",
    day: "+1.20%",
  },
  // PHARMA & HEALTHCARE
  {
    name: "SUNPHARMA",
    qty: 4,
    avg: 1450.00,
    price: 0,
    net: "+4.14%",
    day: "+1.50%",
  },
  {
    name: "CIPLA",
    qty: 5,
    avg: 1350.00,
    price: 0,
    net: "+5.56%",
    day: "+0.90%",
  },
  {
    name: "LUPIN",
    qty: 6,
    avg: 800.00,
    price: 0,
    net: "+8.13%",
    day: "+2.10%",
  },
  // CONSUMER & FMCG
  {
    name: "HINDUNILVR",
    qty: 4,
    avg: 2200.00,
    price: 0,
    net: "+11.36%",
    day: "-0.20%",
  },
  {
    name: "ITC",
    qty: 20,
    avg: 380.00,
    price: 0,
    net: "+13.16%",
    day: "+1.50%",
  },
  {
    name: "BRITANNIA",
    qty: 3,
    avg: 4500.00,
    price: 0,
    net: "+4.89%",
    day: "+0.70%",
  },
  {
    name: "COLPAL",
    qty: 5,
    avg: 1700.00,
    price: 0,
    net: "+7.35%",
    day: "+1.20%",
  },
  // AUTO SECTOR
  {
    name: "MARUTI",
    qty: 1,
    avg: 9500.00,
    price: 0,
    net: "+3.68%",
    day: "+2.10%",
  },
  {
    name: "HEROMOTOCO",
    qty: 3,
    avg: 3400.00,
    price: 0,
    net: "+5.29%",
    day: "+1.50%",
  },
  // TELECOM & UTILITIES
  {
    name: "BHARTIARTL",
    qty: 6,
    avg: 1100.00,
    price: 0,
    net: "+29.09%",
    day: "+0.80%",
  },
];

// positions - Sample intraday positions and CNC holdings across multiple sectors
export const positions = [
  // CNC (Collateral holding)
  {
    product: "CNC",
    name: "TCS",
    qty: 2,
    avg: 3800.00,
    price: 0, // Will be updated by live data
    net: "+1.32%",
    day: "+0.45%",
    isLoss: false,
  },
  // MIS (Margin Intraday Square-off)
  {
    product: "MIS", // Margin Intraday Square-off
    name: "WIPRO",
    qty: 10,
    avg: 450.00,
    price: 0, // Will be updated by live data
    net: "+6.67%",
    day: "-1.10%",
    isLoss: false,
  },
  // CNC (Long-term holdings)
  {
    product: "CNC",
    name: "LT",
    qty: 1,
    avg: 3300.00,
    price: 0, // Will be updated by live data
    net: "+7.58%",
    day: "+0.50%",
    isLoss: false,
  },
  // MIS (Short-term trading)
  {
    product: "MIS",
    name: "NESTLEIND",
    qty: 1,
    avg: 21000.00,
    price: 0,
    net: "+2.38%",
    day: "-0.30%",
    isLoss: false,
  },
  // CNC (Banking sector position)
  {
    product: "CNC",
    name: "KOTAKBANK",
    qty: 3,
    avg: 1850.00,
    price: 0,
    net: "+3.79%",
    day: "+1.20%",
    isLoss: false,
  },
  // MIS (Pharma sector trading)
  {
    product: "MIS",
    name: "SUNPHARMA",
    qty: 2,
    avg: 1480.00,
    price: 0,
    net: "-1.35%",
    day: "-2.10%",
    isLoss: true,
  },
];
