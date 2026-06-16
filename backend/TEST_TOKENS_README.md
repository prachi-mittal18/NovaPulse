# Angel One Token Verification Test

## Overview
This test script verifies which token set is correct for NIFTY 50 and SENSEX indices in Angel One API.

**Current tokens** (in use): 
- NIFTY 50: `9992637`
- SENSEX: `9991900`

**Suggested tokens** (from Angel One Scrip Master):
- NIFTY 50: `99926000`
- SENSEX: `99919000`

## Running the Test

### Prerequisites
1. Ensure all dependencies are installed:
   ```bash
   cd backend
   npm install
   ```

2. Verify `.env` file has Angel One credentials:
   ```
   ANGEL_ONE_API_KEY=your_api_key
   ANGEL_ONE_CLIENT_ID=your_client_id
   ANGEL_ONE_PASSWORD=your_password
   ANGEL_ONE_TOTP_SECRET=your_totp_secret
   ```

### Execute Test
```bash
cd backend
node test-tokens.js
```

## Test Output

The script will:
1. Verify all required environment variables are set
2. Test current tokens by attempting REST API OHLC data fetch
3. Test suggested tokens by attempting REST API OHLC data fetch
4. Display results and recommendations

### Sample Output
```
================================================================================
           ANGEL ONE TOKEN VERIFICATION TEST
================================================================================

Environment Check:
  API Key:        ✓ Set
  Client ID:      ✓ Set
  Password:       ✓ Set
  TOTP Secret:    ✓ Set

Timeout per test: 8000ms

--- TEST 1: CURRENT TOKENS (from backend/index.js) ---

[TEST] CURRENT Token Set
       NIFTY 50: 9992637
       SENSEX:  9991900
       Attempting REST API OHLC fetch...
       ✓ Login successful
       ✗ Data not received

Result: ✗ FAIL
Reason: Tokens not found in Angel One: 9992637, 9991900

--- TEST 2: SUGGESTED TOKENS (from research) ---

[TEST] SUGGESTED Token Set
       NIFTY 50: 99926000
       SENSEX:  99919000
       Attempting REST API OHLC fetch...
       ✓ Login successful
       ✓ Data received (2 symbols)
       - Nifty 50 (Token: 99926000): LTP 23456.78
       - Sensex (Token: 99919000): LTP 75432.10

Result: ✓ PASS
Reason: REST API successfully returned market data

================================================================================
                           TEST SUMMARY
================================================================================

Current Tokens (9992637 / 9991900):     ✗ FAILED
Suggested Tokens (99926000 / 99919000):  ✓ WORKING

--- RECOMMENDATIONS ---

✓ RECOMMENDED ACTION: Update to suggested tokens
  - NIFTY 50: 9992637 → 99926000
  - SENSEX:   9991900 → 99919000

  Source: Angel One SmartAPI Scrip Master (official documentation)

  Files to update:
  1. backend/index.js (line 44-47)
  2. SENSEX_NIFTY_LIVE_EXPLANATION.md
  3. QUICK_ANSWER.txt
  4. DATA_FLOW_DIAGRAM.txt
```

## Interpretation of Results

### ✓ PASS - Current tokens working
- No changes needed
- System is functioning correctly with existing tokens

### ✓ PASS - Suggested tokens working (Current ✗)
- **ACTION REQUIRED**: Update to suggested tokens
- Files need to be updated (see recommendations)
- This is the most likely scenario

### ✓ PASS - Both tokens working
- Both sets are valid
- Recommended: Update to suggested tokens anyway (official Scrip Master)

### ✗ FAIL - Both tests failed
- Check Angel One API credentials in `.env`
- Verify network connectivity
- Confirm TOTP secret is correct
- Check if Angel One service is operational

## Next Steps After Test

### If Suggested Tokens Pass:
1. Update `backend/index.js` (lines 44-47)
2. Update documentation files with new tokens
3. Test the backend connection with `npm start`
4. Verify price updates in the dashboard

### Files to Update:
```
1. backend/index.js
   Lines 44-47 - Update indexMap tokens

2. SENSEX_NIFTY_LIVE_EXPLANATION.md
   - Update all token references
   - Update in code examples
   - Update in documentation

3. QUICK_ANSWER.txt
   - Update all token references in explanations
   - Update in code examples

4. DATA_FLOW_DIAGRAM.txt
   - Update token references if present
```

## Troubleshooting

### "Timeout - API did not respond"
- Check network connectivity
- Verify Angel One servers are accessible
- Try increasing timeout in test script (line 13)

### "Login failed: Unknown error"
- Verify credentials in `.env` file
- Check if 2FA/TOTP is enabled on Angel One account
- Verify TOTP secret matches account settings

### "Tokens not found in Angel One"
- Current tokens are likely incorrect
- Suggested tokens should work

## Manual Verification (Optional)

You can verify tokens manually by:

1. **Via Angel One Dashboard**:
   - Log in to Angel One web/mobile app
   - Navigate to market data section
   - Search for NIFTY 50 and SENSEX
   - Note the token IDs displayed

2. **Via Angel One API Documentation**:
   - Download the latest Scrip Master file
   - Search for "Nifty 50" and "Sensex"
   - Verify token values

3. **Via SmartAPI Forum**:
   - Visit: https://smartapi.angelone.in/smartapi/forum/
   - Search for "NIFTY 50 token" or "SENSEX token"
   - Check confirmed answers from moderators

## Questions?

If you encounter issues:
1. Review the error message carefully
2. Check `.env` file for missing credentials
3. Verify network connectivity
4. Consult Angel One documentation or support

