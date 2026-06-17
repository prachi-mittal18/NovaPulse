require("dotenv").config();
const { SmartAPI } = require('smartapi-javascript');
const { generateSync } = require('otplib');

const watchlistMap = {
  "HDFCBANK": "1333",
  "ICICIBANK": "4963",
  "SBIN": "3045",
  "TCS": "3456",
  "INFY": "1594",
};

// Helper function to format date
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} 09:15`;
};

async function testHistoricalData() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 TESTING ANGEL ONE HISTORICAL CANDLE DATA (REST API)");
  console.log("=".repeat(80) + "\n");

  // Check credentials
  const apiKey = process.env.ANGEL_ONE_API_KEY;
  const clientCode = process.env.ANGEL_ONE_CLIENT_ID;
  const password = process.env.ANGEL_ONE_PASSWORD;
  const totpSecret = process.env.ANGEL_ONE_TOTP_SECRET;

  if (!apiKey || !clientCode || !password || !totpSecret) {
    console.error("❌ ERROR: Missing Angel One credentials in .env\n");
    process.exit(1);
  }

  console.log("📋 Credentials Found:");
  console.log(`   API Key: ${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}`);
  console.log(`   Client Code: ${clientCode}`);
  console.log(`   TOTP Secret: ••••••••••\n`);

  try {
    // Initialize SmartAPI
    console.log("🔐 Attempting to authenticate with Angel One...\n");
    
    const smartApi = new SmartAPI({
      api_key: apiKey
    });

    // Generate TOTP
    const totpCode = generateSync({ secret: totpSecret });
    console.log(`   Generated TOTP: ${totpCode}`);

    // Login
    const session = await smartApi.generateSession(clientCode, password, totpCode);
    
    console.log(`   Session Response Status: ${session.status}`);
    console.log(`   Message: ${session.message}\n`);

    if (!session.status) {
      console.error(`❌ LOGIN FAILED: ${session.message}`);
      console.log(`\nCommon issues:`);
      console.log(`  1. Invalid credentials (Client ID, Password, or API Key)`);
      console.log(`  2. TOTP Secret is incorrect`);
      console.log(`  3. Angel One account is not activated for API access`);
      console.log(`  4. Wrong account type (Paper trading vs Real trading)\n`);
      process.exit(1);
    }

    console.log(`✅ AUTHENTICATION SUCCESSFUL\n`);

    // Now test historical data
    console.log("📊 Testing Historical Candle Data Retrieval:\n");

    const toDateObj = new Date();
    const fromDateObj = new Date();
    fromDateObj.setDate(fromDateObj.getDate() - 10);

    const fromdate = formatDate(fromDateObj);
    const todate = formatDate(toDateObj);

    console.log(`   Date Range: ${fromdate.split(' ')[0]} to ${todate.split(' ')[0]}`);
    console.log(`   Testing Stocks:\n`);

    let successCount = 0;
    let failureCount = 0;

    for (const [ticker, token] of Object.entries(watchlistMap)) {
      console.log(`   📍 ${ticker} (Token: ${token}):`);
      
      try {
        const response = await smartApi.getCandleData({
          exchange: "NSE",
          symboltoken: token,
          interval: "DAY",
          fromdate,
          todate
        });

        console.log(`      Response Status: ${response?.status ? "✅" : "❌"}`);
        
        if (response?.data && response.data.length > 0) {
          successCount++;
          console.log(`      ✅ Data Received: ${response.data.length} candles`);
          
          // Show sample candles
          const firstCandle = response.data[0];
          const lastCandle = response.data[response.data.length - 1];
          
          console.log(`      Sample - First: ${firstCandle[0]} → Close ₹${firstCandle[4]}`);
          console.log(`      Sample - Last: ${lastCandle[0]} → Close ₹${lastCandle[4]}`);
          
          // Calculate sample P&L
          const avgBuyPrice = 1500; // Example
          const qty = 10; // Example
          const firstPnL = (Number(firstCandle[4]) - avgBuyPrice) * qty;
          const lastPnL = (Number(lastCandle[4]) - avgBuyPrice) * qty;
          
          console.log(`      Sample P&L (₹${avgBuyPrice} @ 10 qty): ${firstPnL > 0 ? "+" : ""}₹${firstPnL.toFixed(2)} → ${lastPnL > 0 ? "+" : ""}₹${lastPnL.toFixed(2)}\n`);
        } else {
          failureCount++;
          console.log(`      ❌ No Data Returned`);
          console.log(`      Raw Response: ${JSON.stringify(response)}\n`);
        }
      } catch (error) {
        failureCount++;
        console.log(`      ❌ Error: ${error.message}\n`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Summary
    console.log("\n" + "=".repeat(80));
    console.log("✅ TEST COMPLETE");
    console.log("=".repeat(80));
    console.log(`
    Stocks with data: ${successCount}/${Object.keys(watchlistMap).length}
    Failed stocks: ${failureCount}/${Object.keys(watchlistMap).length}
    `);

    if (successCount === Object.keys(watchlistMap).length) {
      console.log(`    🟢 VERDICT: Angel One is returning historical data correctly!`);
      console.log(`    → Your P&L charts will show REAL data`);
      console.log(`    → Safe to deploy to production`);
    } else if (successCount > 0) {
      console.log(`    🟡 VERDICT: Angel One has partial access`);
      console.log(`    → Some stocks work, others don't`);
      console.log(`    → Check token mappings and API permissions`);
    } else {
      console.log(`    🔴 VERDICT: Angel One is NOT returning historical data`);
      console.log(`    → Current app falls back to deterministic mock data`);
      console.log(`    → P&L charts will show patterns, not real prices`);
      console.log(`    → This is acceptable for testing/demo but not production`);
    }

    console.log("\n    Recommendations:");
    console.log(`    1. Check Angel One account tier (does it include historical data?)`);
    console.log(`    2. Verify API key permissions`);
    console.log(`    3. Test with a live Angel One account (not demo)`);
    console.log(`    4. For production: Either use real data or label as 'Demo Mode'\n`);
    console.log("=".repeat(80) + "\n");

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Fatal Error: ${error.message}\n`);
    console.error(`Stack: ${error.stack}\n`);
    process.exit(1);
  }
}

testHistoricalData();
