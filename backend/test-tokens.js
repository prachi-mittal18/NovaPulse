/**
 * Token Verification Test Script
 * 
 * This script tests both token sets to determine which are correct:
 * Current tokens: NIFTY 50 (9992637), SENSEX (9991900)
 * Suggested tokens: NIFTY 50 (99926000), SENSEX (99919000)
 * 
 * Run with: node test-tokens.js
 */

require("dotenv").config();
const { SmartAPI } = require('smartapi-javascript');
const { generateSync } = require('otplib');

// Test configuration
const TEST_TOKENS = {
  current: {
    "NIFTY 50": "9992637",
    "SENSEX": "9991900"
  },
  suggested: {
    "NIFTY 50": "99926000",
    "SENSEX": "99919000"
  }
};

const TIMEOUT = 8000; // 8 seconds timeout per test

/**
 * Test a token set by attempting to fetch OHLC data via REST API
 */
async function testTokenSet(setName, tokens) {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve({
        success: false,
        reason: "Timeout - API did not respond within 8 seconds"
      });
    }, TIMEOUT);

    (async () => {
      try {
        console.log(`\n[TEST] ${setName} Token Set`);
        console.log(`       NIFTY 50: ${tokens["NIFTY 50"]}`);
        console.log(`       SENSEX:  ${tokens["SENSEX"]}`);
        console.log(`       Attempting REST API OHLC fetch...`);

        // Initialize SmartAPI
        const smartApi = new SmartAPI({
          api_key: process.env.ANGEL_ONE_API_KEY
        });

        // Generate TOTP
        const totpCode = generateSync({ secret: process.env.ANGEL_ONE_TOTP_SECRET });

        // Login
        const session = await smartApi.generateSession(
          process.env.ANGEL_ONE_CLIENT_ID,
          process.env.ANGEL_ONE_PASSWORD,
          totpCode
        );

        if (!session.status) {
          clearTimeout(timeoutId);
          return resolve({
            success: false,
            reason: `Login failed: ${session.message || "Unknown error"}`
          });
        }

        console.log(`       ✓ Login successful`);

        // Test OHLC data fetch with both NSE and BSE tokens
        const response = await smartApi.marketData({
          mode: "OHLC",
          exchangeTokens: {
            NSE: [tokens["NIFTY 50"]],
            BSE: [tokens["SENSEX"]]
          }
        });

        clearTimeout(timeoutId);

        if (response?.status && response?.data?.fetched) {
          const fetched = response.data.fetched;
          console.log(`       ✓ Data received (${fetched.length} symbols)`);
          
          return resolve({
            success: true,
            reason: "REST API successfully returned market data",
            symbols: fetched.map(f => ({
              token: f.symbolToken,
              name: f.name,
              ltp: f.ltp,
              open: f.open
            }))
          });
        } else if (response?.data?.notFetched?.length > 0) {
          clearTimeout(timeoutId);
          return resolve({
            success: false,
            reason: `Tokens not found in Angel One: ${response.data.notFetched.join(", ")}`
          });
        } else {
          clearTimeout(timeoutId);
          return resolve({
            success: false,
            reason: `Unexpected API response: ${JSON.stringify(response)}`
          });
        }
      } catch (error) {
        clearTimeout(timeoutId);
        return resolve({
          success: false,
          reason: `Error: ${error.message || error}`
        });
      }
    })();
  });
}

/**
 * Main test orchestration
 */
async function runTests() {
  console.log("\n================================================================================");
  console.log("           ANGEL ONE TOKEN VERIFICATION TEST");
  console.log("================================================================================");
  console.log(`\nEnvironment Check:`);
  console.log(`  API Key:        ${process.env.ANGEL_ONE_API_KEY ? "✓ Set" : "✗ Missing"}`);
  console.log(`  Client ID:      ${process.env.ANGEL_ONE_CLIENT_ID ? "✓ Set" : "✗ Missing"}`);
  console.log(`  Password:       ${process.env.ANGEL_ONE_PASSWORD ? "✓ Set" : "✗ Missing"}`);
  console.log(`  TOTP Secret:    ${process.env.ANGEL_ONE_TOTP_SECRET ? "✓ Set" : "✗ Missing"}`);

  if (!process.env.ANGEL_ONE_API_KEY || !process.env.ANGEL_ONE_CLIENT_ID) {
    console.log("\n✗ ERROR: Angel One credentials are missing in .env file");
    process.exit(1);
  }

  console.log(`\nTimeout per test: ${TIMEOUT}ms\n`);

  // Test current tokens
  console.log("--- TEST 1: CURRENT TOKENS (from backend/index.js) ---");
  const currentResult = await testTokenSet("CURRENT", TEST_TOKENS.current);
  console.log(`Result: ${currentResult.success ? "✓ PASS" : "✗ FAIL"}`);
  console.log(`Reason: ${currentResult.reason}`);
  if (currentResult.symbols) {
    currentResult.symbols.forEach(s => {
      console.log(`        - ${s.name} (Token: ${s.token}): LTP ${s.ltp}`);
    });
  }

  // Wait between tests
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test suggested tokens
  console.log("\n--- TEST 2: SUGGESTED TOKENS (from research) ---");
  const suggestedResult = await testTokenSet("SUGGESTED", TEST_TOKENS.suggested);
  console.log(`Result: ${suggestedResult.success ? "✓ PASS" : "✗ FAIL"}`);
  console.log(`Reason: ${suggestedResult.reason}`);
  if (suggestedResult.symbols) {
    suggestedResult.symbols.forEach(s => {
      console.log(`        - ${s.name} (Token: ${s.token}): LTP ${s.ltp}`);
    });
  }

  // Summary report
  console.log("\n================================================================================");
  console.log("                           TEST SUMMARY");
  console.log("================================================================================\n");

  const currentPassed = currentResult.success;
  const suggestedPassed = suggestedResult.success;

  console.log(`Current Tokens (9992637 / 9991900):     ${currentPassed ? "✓ WORKING" : "✗ FAILED"}`);
  console.log(`Suggested Tokens (99926000 / 99919000):  ${suggestedPassed ? "✓ WORKING" : "✗ FAILED"}`);

  console.log("\n--- RECOMMENDATIONS ---\n");

  if (suggestedPassed && !currentPassed) {
    console.log("✓ RECOMMENDED ACTION: Update to suggested tokens");
    console.log("  - NIFTY 50: 9992637 → 99926000");
    console.log("  - SENSEX:   9991900 → 99919000");
    console.log("\n  Source: Angel One SmartAPI Scrip Master (official documentation)");
    console.log("\n  Files to update:");
    console.log("  1. backend/index.js (line 44-47)");
    console.log("  2. SENSEX_NIFTY_LIVE_EXPLANATION.md");
    console.log("  3. QUICK_ANSWER.txt");
    console.log("  4. DATA_FLOW_DIAGRAM.txt");
  } else if (currentPassed && !suggestedPassed) {
    console.log("✓ CURRENT TOKENS ARE CORRECT - No changes needed");
    console.log("  The existing implementation is working properly.");
  } else if (currentPassed && suggestedPassed) {
    console.log("⚠ BOTH TOKEN SETS WORK - Both are valid");
    console.log("  Recommended: Use suggested tokens (they are official Scrip Master tokens)");
    console.log("\n  Make the update for consistency:");
    console.log("  - NIFTY 50: 9992637 → 99926000");
    console.log("  - SENSEX:   9991900 → 99919000");
  } else {
    console.log("✗ VERIFICATION FAILED - Both token sets failed");
    console.log("  Possible causes:");
    console.log("  1. Angel One API credentials are invalid or expired");
    console.log("  2. Network connectivity issue");
    console.log("  3. Angel One service is temporarily unavailable");
    console.log("  4. TOTP code generation failed (wrong TOTP_SECRET)");
    console.log("\n  To debug:");
    console.log("  1. Verify credentials in .env file");
    console.log("  2. Test Angel One API connection manually");
    console.log("  3. Check network connectivity");
  }

  console.log("\n================================================================================\n");

  // Exit with appropriate code
  process.exit(currentPassed || suggestedPassed ? 0 : 1);
}

// Run tests
runTests().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
