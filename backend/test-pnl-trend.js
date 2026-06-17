require("dotenv").config();
const AngelOneService = require("./services/AngelOneService");

// Stock token mappings
const watchlistMap = {
  "HDFCBANK": "1333",
  "ICICIBANK": "4963",
  "SBIN": "3045",
  "TCS": "3456",
  "INFY": "1594",
};

const indexMap = {
  "NIFTY 50": { token: "99926000", exchange: "NSE" },
  "SENSEX": { token: "99919000", exchange: "BSE" }
};

let isConnected = false;
let angelOne = null;

// Helper function to format date
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} 09:15`;
};

async function testCandleData() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 TESTING ANGEL ONE HISTORICAL CANDLE DATA");
  console.log("=".repeat(80) + "\n");

  // Check environment variables
  console.log("📋 Checking Environment Variables:");
  console.log(`   API Key: ${process.env.ANGEL_ONE_API_KEY ? "✅ SET" : "❌ NOT SET"}`);
  console.log(`   Client ID: ${process.env.ANGEL_ONE_CLIENT_ID ? "✅ SET" : "❌ NOT SET"}`);
  console.log(`   Password: ${process.env.ANGEL_ONE_PASSWORD ? "✅ SET" : "❌ NOT SET"}`);
  console.log(`   TOTP Secret: ${process.env.ANGEL_ONE_TOTP_SECRET ? "✅ SET" : "❌ NOT SET"}`);

  if (!process.env.ANGEL_ONE_API_KEY || !process.env.ANGEL_ONE_CLIENT_ID) {
    console.error("\n❌ ERROR: Missing Angel One credentials in .env file\n");
    process.exit(1);
  }

  // Initialize Angel One Service
  console.log("\n🔌 Connecting to Angel One...");
  
  const uniqueSymbols = [...new Set(Object.values(watchlistMap))];
  
  try {
    angelOne = new AngelOneService(
      process.env.ANGEL_ONE_API_KEY,
      process.env.ANGEL_ONE_CLIENT_ID,
      process.env.ANGEL_ONE_PASSWORD,
      process.env.ANGEL_ONE_TOTP_SECRET,
      uniqueSymbols,
      (token, price) => {
        // Trade update handler (not needed for this test)
      },
      (status) => {
        isConnected = status;
        console.log(`   Connection Status: ${status ? "✅ CONNECTED" : "❌ DISCONNECTED"}`);
      }
    );

    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (!isConnected) {
      console.error("❌ Failed to connect to Angel One\n");
      process.exit(1);
    }

    // Test historical data for each stock
    console.log("\n📊 Testing Candle Data Retrieval:\n");

    const toDateObj = new Date();
    const fromDateObj = new Date();
    fromDateObj.setDate(fromDateObj.getDate() - 10);

    const fromdate = formatDate(fromDateObj);
    const todate = formatDate(toDateObj);

    console.log(`   Date Range: ${fromdate.split(' ')[0]} to ${todate.split(' ')[0]} (10 days)\n`);

    for (const [ticker, token] of Object.entries(watchlistMap)) {
      console.log(`   Testing ${ticker} (Token: ${token}):`);
      
      try {
        const response = await angelOne.smartApi.getCandleData({
          exchange: "NSE",
          symboltoken: token,
          interval: "DAY",
          fromdate,
          todate
        });

        console.log(`      Response Status: ${response?.status ? "✅ SUCCESS" : "❌ FAILED"}`);
        
        if (response?.data && response.data.length > 0) {
          console.log(`      Data Points: ${response.data.length} candles received`);
          
          // Show first and last candle
          const firstCandle = response.data[0];
          const lastCandle = response.data[response.data.length - 1];
          
          console.log(`      First Candle (${firstCandle[0]}): Close = ₹${firstCandle[4]}`);
          console.log(`      Last Candle (${lastCandle[0]}): Close = ₹${lastCandle[4]}`);
          
          // Display all candles
          console.log(`\n      All Candle Data:`);
          response.data.forEach((candle, index) => {
            console.log(`         [${index + 1}] Date: ${candle[0]} | Open: ₹${candle[1]} | High: ₹${candle[2]} | Low: ₹${candle[3]} | Close: ₹${candle[4]} | Volume: ${candle[5]}`);
          });
          
          console.log(`      ✅ CANDLE DATA AVAILABLE\n`);
        } else {
          console.log(`      ❌ NO DATA RECEIVED`);
          console.log(`      Response: ${JSON.stringify(response, null, 2)}\n`);
        }
      } catch (error) {
        console.log(`      ❌ ERROR: ${error.message}\n`);
      }

      // Throttle to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Test a single stock in detail
    console.log("\n" + "=".repeat(80));
    console.log("📈 DETAILED P&L CALCULATION TEST (Using HDFCBANK)");
    console.log("=".repeat(80) + "\n");

    const testTicker = "HDFCBANK";
    const testToken = watchlistMap[testTicker];
    const avgBuyPrice = 1580; // Example average buy price
    const quantity = 10; // Example quantity

    console.log(`   Stock: ${testTicker}`);
    console.log(`   Average Buy Price: ₹${avgBuyPrice}`);
    console.log(`   Quantity: ${quantity} shares\n`);

    try {
      const response = await angelOne.smartApi.getCandleData({
        exchange: "NSE",
        symboltoken: testToken,
        interval: "DAY",
        fromdate,
        todate
      });

      if (response?.data && response.data.length > 0) {
        console.log(`   P&L Calculation for each day:\n`);
        
        let totalPnL = 0;
        const pnlData = [];

        response.data.forEach((candle, index) => {
          const date = candle[0].split('T')[0];
          const closePrice = Number(candle[4]);
          const dayPnL = (closePrice - avgBuyPrice) * quantity;
          totalPnL += dayPnL;
          pnlData.push({ date, closePrice, dayPnL, totalPnL });

          const sign = dayPnL >= 0 ? "📈" : "📉";
          const color = dayPnL >= 0 ? "+" : "";
          console.log(`   ${sign} Day ${index + 1} (${date}): Close ₹${closePrice} | Daily P&L: ${color}₹${dayPnL.toFixed(2)} | Cumulative: ${color}₹${totalPnL.toFixed(2)}`);
        });

        console.log(`\n   ✅ P&L CALCULATION SUCCESSFUL`);
        console.log(`   Final P&L: ₹${totalPnL.toFixed(2)}`);
        console.log(`   Status: ${totalPnL > 0 ? "📈 PROFIT" : totalPnL < 0 ? "📉 LOSS" : "➡️ BREAK-EVEN"}\n`);
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}\n`);
    }

  } catch (error) {
    console.error(`\n❌ Connection Error: ${error.message}\n`);
    process.exit(1);
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(80));
  console.log(`
Connection Status: ${isConnected ? "✅ CONNECTED" : "❌ DISCONNECTED"}

If you see ✅ CANDLE DATA AVAILABLE:
  → Angel One is working correctly
  → P&L trends will show REAL historical data
  → You can deploy with confidence

If you see ❌ NO DATA RECEIVED or ❌ ERROR:
  → Angel One API may have limitations on this endpoint
  → Your credentials might not have access to historical data
  → You may need to upgrade your Angel One account

Current Status in your app:
  → If Angel One fails, the app falls back to DETERMINISTIC mock data
  → This is safe but not ideal for production
  → Real users expect real historical P&L data
  `);
  console.log("=".repeat(80) + "\n");

  process.exit(0);
}

// Run the test
testCandleData().catch(error => {
  console.error("Fatal Error:", error);
  process.exit(1);
});
