import React, { useContext } from "react";
import UserContext from "./UserContext";
import Menu from "./Menu";

const TopBar = () => {
  const { prices, isFinnhubLive } = useContext(UserContext);

  const indices = {
    nifty: prices["NIFTY 50"] || 18000.0,
    sensex: prices["SENSEX"] || 60000.0,
  };

  // These should ideally come from an API, but keeping them as static baselines for now
  const openingValues = { nifty: 23000.45, sensex: 75000.85 };

  const niftyClass = indices.nifty >= openingValues.nifty ? "up" : "down";
  const sensexClass = indices.sensex >= openingValues.sensex ? "up" : "down";

  // Helper to check if Indian Market is currently open (9:15 AM - 3:30 PM IST)
  const isMarketOpen = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const day = istTime.getUTCDay();
    const hours = istTime.getUTCHours() + istTime.getUTCMinutes() / 60;
    return day >= 1 && day <= 5 && hours >= 9.25 && hours <= 15.5;
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="status-indicator" style={{ marginRight: "20px", display: "flex", alignItems: "center" }}>
          <span style={{ 
            fontSize: "11px", 
            fontWeight: "bold",
            color: isFinnhubLive ? "#4caf50" : "#ff9800", 
          }}>
            ● {isFinnhubLive 
                ? (isMarketOpen() ? "MARKET LIVE" : "FEED LIVE (MARKET CLOSED)") 
                : "SIMULATED FEED"}
          </span>
        </div>
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className={`index-points ${niftyClass}`}>{indices.nifty.toFixed(2)}</p>
          <p className={`percent ${niftyClass}`}>
            {(((indices.nifty - openingValues.nifty) / openingValues.nifty) * 100).toFixed(2)}%
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className={`index-points ${sensexClass}`}>{indices.sensex.toFixed(2)}</p>
          <p className={`percent ${sensexClass}`}>
            {(((indices.sensex - openingValues.sensex) / openingValues.sensex) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;
