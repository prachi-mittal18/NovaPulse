const WebSocket = require('ws');

/**
 * FinnhubService manages the WebSocket connection to Finnhub.io
 * Handles connection lifecycle, exponential backoff reconnection, heartbeat ping/pong,
 * and trade deduplication.
 *
 * @class FinnhubService
 */
class FinnhubService {
  /**
   * Creates a new FinnhubService instance
   *
   * @param {string} apiKey - Finnhub.io API Key from environment
   * @param {string[]} symbols - List of symbols to subscribe to (e.g., ["INFY.NS", "TCS.NS"])
   * @param {Function} onTrade - Callback executed on every trade event: (symbol, price) => Promise<void>
   * @param {Function} onStatusChange - Callback to track connection status: (isConnected) => void
   *
   * @example
   * const finnhub = new FinnhubService(
   *   process.env.FINNHUB_API_KEY,
   *   ["INFY.NS", "TCS.NS"],
   *   handleTradeUpdate,
   *   (status) => { isFinnhubConnected = status; }
   * );
   * finnhub.connect();
   */
  constructor(apiKey, symbols, onTrade, onStatusChange) {
    this.apiKey = apiKey;
    this.symbols = symbols;
    this.onTrade = onTrade;
    this.onStatusChange = onStatusChange;

    // WebSocket connection
    this._ws = null;

    // Exponential backoff state
    this._reconnectDelay = 1000; // Start at 1 second
    this._maxReconnectDelay = 30000; // Cap at 30 seconds
    this._reconnectTimer = null;

    // Heartbeat state
    this._heartbeatTimer = null;
    this._heartbeatInterval = 30000; // 30 seconds
  }

  /**
   * Initiates the WebSocket connection to Finnhub
   * Subscribes to all symbols on successful connection
   * Implements exponential backoff for reconnection on failure
   *
   * @returns {void}
   */
  connect() {
    if (!this.apiKey) {
      console.error(
        `[${this._getTimestamp()}] CRITICAL: Finnhub API Key missing. WebSocket service disabled.`
      );
      this.onStatusChange(false);
      return;
    }

    console.log(
      `[${this._getTimestamp()}] Attempting to connect to Finnhub WebSocket...`
    );

    try {
      this._ws = new WebSocket(`wss://ws.finnhub.io?token=${this.apiKey}`);

      this._ws.on('open', () => this._handleOpen());
      this._ws.on('message', (data) => this._handleMessage(data));
      this._ws.on('error', (err) => this._handleError(err));
      this._ws.on('close', () => this._handleClose());
    } catch (err) {
      console.error(
        `[${this._getTimestamp()}] WS CONNECTION ERROR: Failed to create WebSocket:`,
        err.message
      );
      this.onStatusChange(false);
      this._scheduleReconnect();
    }
  }

  /**
   * Gracefully closes the WebSocket connection and cancels all timers
   * Safe to call multiple times
   *
   * @returns {void}
   */
  disconnect() {
    console.log(
      `[${this._getTimestamp()}] Gracefully disconnecting from Finnhub...`
    );

    // Cancel reconnect timer if pending
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }

    // Stop heartbeat
    this._stopHeartbeat();

    // Close WebSocket
    if (this._ws) {
      try {
        this._ws.close();
      } catch (err) {
        console.error(
          `[${this._getTimestamp()}] WS CLOSE ERROR: Failed to close WebSocket:`,
          err.message
        );
      }
      this._ws = null;
    }

    this.onStatusChange(false);
  }

  /**
   * Returns whether the WebSocket is currently connected and open
   *
   * @returns {boolean} true if connected, false otherwise
   */
  get isConnected() {
    return this._ws && this._ws.readyState === WebSocket.OPEN;
  }

  /**
   * Handles the WebSocket 'open' event
   * Subscribes to all symbols and starts heartbeat
   *
   * @private
   * @returns {void}
   */
  _handleOpen() {
    console.log(
      `[${this._getTimestamp()}] WS OPEN: Connected to Finnhub Real-Time Stream`
    );

    // Reset backoff delay on successful connection
    this._reconnectDelay = 1000;

    // Subscribe to all symbols
    this.symbols.forEach((symbol) => {
      try {
        this._ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      } catch (err) {
        console.error(
          `[${this._getTimestamp()}] WS SUBSCRIBE ERROR: Failed to subscribe to ${symbol}:`,
          err.message
        );
      }
    });

    // Start heartbeat
    this._startHeartbeat();

    // Notify caller of successful connection
    this.onStatusChange(true);
  }

  /**
   * Handles incoming WebSocket messages
   * Processes trade events and ping/pong messages
   * Deduplicates trades by symbol (latest price wins)
   *
   * @private
   * @param {string} data - Raw message data from WebSocket
   * @returns {void}
   */
  _handleMessage(data) {
    try {
      const message = JSON.parse(data);

      if (message.type === 'trade') {
        // Deduplicate trades by symbol: keep only the latest price per symbol
        const latestBySymbol = {};
        if (Array.isArray(message.data)) {
          message.data.forEach((trade) => {
            if (trade.s && typeof trade.p === 'number') {
              latestBySymbol[trade.s] = trade.p; // Last write wins (trades are time-ordered)
            }
          });
        }

        // Invoke onTrade callback for each unique symbol
        Object.entries(latestBySymbol).forEach(([symbol, price]) => {
          try {
            this.onTrade(symbol, price);
          } catch (err) {
            console.error(
              `[${this._getTimestamp()}] TRADE CALLBACK ERROR for ${symbol}:`,
              err.message
            );
          }
        });
      } else if (message.type === 'ping') {
        // Respond to Finnhub ping with pong
        try {
          this._ws.send(JSON.stringify({ type: 'pong' }));
        } catch (err) {
          console.error(
            `[${this._getTimestamp()}] WS PONG ERROR: Failed to send pong:`,
            err.message
          );
        }
      }
      // Silently ignore unknown message types
    } catch (err) {
      console.error(
        `[${this._getTimestamp()}] WS MESSAGE ERROR: Failed to parse message:`,
        err.message
      );
      // Continue processing; don't close connection on parse error
    }
  }

  /**
   * Handles WebSocket errors
   * Logs the error and schedules reconnection
   *
   * @private
   * @param {Error} err - The error object
   * @returns {void}
   */
  _handleError(err) {
    console.error(
      `[${this._getTimestamp()}] WS ERROR: Finnhub WebSocket error:`,
      err.message
    );
    // Note: error event is typically followed by close event
    // We handle reconnection in _handleClose
  }

  /**
   * Handles WebSocket close event
   * Notifies caller and schedules reconnection with exponential backoff
   *
   * @private
   * @returns {void}
   */
  _handleClose() {
    console.warn(
      `[${this._getTimestamp()}] WS CLOSED: Connection lost. Attempting reconnect in ${
        this._reconnectDelay / 1000
      }s...`
    );

    // Stop heartbeat
    this._stopHeartbeat();

    // Notify caller of disconnection
    this.onStatusChange(false);

    // Schedule reconnection
    this._scheduleReconnect();
  }

  /**
   * Schedules a reconnection attempt with exponential backoff
   * Delay sequence: 1s → 2s → 4s → 8s → 16s → 30s (capped)
   *
   * @private
   * @returns {void}
   */
  _scheduleReconnect() {
    // Cancel any pending reconnect timer
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
    }

    const delay = this._reconnectDelay;
    console.log(
      `[${this._getTimestamp()}] Scheduling reconnect in ${delay / 1000}s...`
    );

    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null;
      this.connect();
    }, delay);

    // Double the delay for next attempt, capped at 30 seconds
    this._reconnectDelay = Math.min(
      this._reconnectDelay * 2,
      this._maxReconnectDelay
    );
  }

  /**
   * Starts the heartbeat timer
   * Sends a WebSocket ping every 30 seconds to keep the connection alive
   *
   * @private
   * @returns {void}
   */
  _startHeartbeat() {
    this._stopHeartbeat(); // Clear any existing timer

    this._heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        try {
          this._ws.ping();
        } catch (err) {
          console.error(
            `[${this._getTimestamp()}] WS PING ERROR: Failed to send ping:`,
            err.message
          );
        }
      }
    }, this._heartbeatInterval);
  }

  /**
   * Stops the heartbeat timer
   *
   * @private
   * @returns {void}
   */
  _stopHeartbeat() {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer);
      this._heartbeatTimer = null;
    }
  }

  /**
   * Returns a formatted timestamp string for logging
   *
   * @private
   * @returns {string} ISO timestamp
   */
  _getTimestamp() {
    return new Date().toISOString();
  }
}

module.exports = FinnhubService;
