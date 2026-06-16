# Stocks Stuck at 0.0 Price - Root Cause & Fixes

## Problem Identified
Several stocks like HCLTECH, MARUTI, and others were showing 0.0 prices on the dashboard despite Angel One API integration being in place.

## Root Cause Analysis

### 1. **Token Mapping Conflict (CRITICAL BUG)**
The most critical issue was in `backend/index.js` line 64:
```javascript
"MARUTI": "1333"  // WRONG - This is HDFCBANK's token!
```

Token "1333" was mapped to BOTH HDFCBANK and MARUTI, causing a conflict in the WebSocket subscription. When the Angel One API sent price updates for token 1333, only HDFCBANK would receive the update, and MARUTI would remain at 0.0.

### 2. **Missing or Incorrect Token Mappings**
Some stocks in the watchlist may have had incorrect Angel One NSE token mappings, preventing price subscriptions.

### 3. **Poor Fallback Logic**
When stocks didn't receive live updates, they defaulted to 0.0 instead of using the initialized base prices. This was because:
- The `basePrices` object was recreated in each loop iteration instead of being reused
- If a price update never arrived, the stock remained at 0.0

### 4. **Lack of Visibility**
There was no way to diagnose which stocks were receiving live updates and which weren't. No logging showed which tokens were mapped or which were missing.

## Fixes Applied

### 1. **Fixed Token Mapping** ✅
```javascript
// AUTO SECTOR (3 stocks)
"MARUTI": "3032",  // FIXED: Was incorrectly mapped to 1333 (HDFCBANK)
"HEROMOTOCO": "2158",
"BAJAJFINSV": "4464",
```

### 2. **Optimized Initialization** ✅
Moved `basePrices` outside the loop so all stocks initialize with proper fallback values:
```javascript
const basePrices = { 
  "NIFTY 50": 23000.45, "SENSEX": 75000.85,
  "HDFCBANK": 1600.00, "ICICIBANK": 1120.00, // ... all 30 stocks
};

["NIFTY 50", "SENSEX", ...Object.keys(watchlistMap)].forEach(ticker => {
  // Initialize with base price, never default to 0.0
  currentPrices[ticker] = fromCents(toCents(basePrices[ticker] || 100.00));
});
```

### 3. **Added Diagnostic Logging** ✅
When the server starts, it now logs all token mappings:
```
DEBUG: Token subscription map (30 stocks):
  HDFCBANK        => 1333
  ICICIBANK       => 4963
  ...
  MARUTI          => 3032
  ...
```

### 4. **Added Diagnostic Endpoint** ✅
New API endpoint `/api/price-diagnostics` shows real-time status of all stocks:
```json
{
  "lastUpdated": "2025-01-15T10:30:45.123Z",
  "angelOneConnected": true,
  "stocks": {
    "HCLTECH": {
      "currentPrice": 1285.00,
      "token": "2233",
      "lastLiveUpdate": "2025-01-15T10:30:40.000Z",
      "isLive": true,
      "timeSinceLastUpdateMs": 5123
    },
    ...
  }
}
```

### 5. **Improved Logging** ✅
Enhanced `handleTradeUpdate` to log when stocks first receive live updates:
```
LIVE_UPDATE: HCLTECH (2233) = ₹1285.50
```

## How to Verify the Fix

1. **Restart the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Check the console logs** for the token subscription map showing all 30 stocks

3. **Monitor the dashboard** - MARUTI and other stocks should now show live prices

4. **Check diagnostics endpoint** (for debugging):
   ```
   curl http://localhost:3002/api/price-diagnostics
   ```
   This will show which stocks are receiving live updates and which are using fallback simulation.

## Expected Behavior After Fix

- ✅ MARUTI should receive prices from token "3032" (correct)
- ✅ HDFCBANK should only use token "1333" (no conflicts)
- ✅ All stocks initialize with realistic base prices, not 0.0
- ✅ WebSocket fallback simulation kicks in only for restricted symbols
- ✅ Better visibility into which stocks are live vs. simulated

## Files Modified

1. **`backend/index.js`**
   - Fixed MARUTI token mapping (1333 → 3032)
   - Optimized price initialization logic
   - Added diagnostic logging and endpoint
   - Enhanced logging for live updates

## Next Steps (Optional Improvements)

1. Verify all 30 token mappings against latest Angel One documentation
2. Add a token validation endpoint that checks against Angel One API
3. Consider storing correct token mappings in a configuration file
4. Add alerts if a stock hasn't received a live update in 5+ minutes

