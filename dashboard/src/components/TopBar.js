import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import Menu from "./Menu";

const TopBar = () => {
  const { prices, isLive } = useContext(UserContext);
  const [openingValues, setOpeningValues] = useState({ 
    "NIFTY 50": 23000.45, 
    "SENSEX": 75000.85 
  });

  useEffect(() => {
    const fetchBaselines = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:3002"}/api/market-indices`, { withCredentials: true });
        setOpeningValues(res.data);
      } catch (err) { console.error("Failed to fetch index baselines", err); }
    };
    fetchBaselines();
  }, []);

  const indices = {
    nifty: prices["NIFTY 50"] || 18000.0,
    sensex: prices["SENSEX"] || 60000.0,
  };

  const niftyClass = indices.nifty >= openingValues["NIFTY 50"] ? "up" : "down";
  const sensexClass = indices.sensex >= openingValues["SENSEX"] ? "up" : "down";

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
            color: isLive ? "#4caf50" : "#ff9800", 
          }}>
            ● {isLive 
                ? (isMarketOpen() ? "MARKET LIVE" : "FEED LIVE (MARKET CLOSED)") 
                : "SIMULATED FEED"}
          </span>
        </div>
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className={`index-points ${niftyClass}`}>{indices.nifty.toFixed(2)}</p>
          <p className={`percent ${niftyClass}`}>
            {(((indices.nifty - openingValues["NIFTY 50"]) / openingValues["NIFTY 50"]) * 100).toFixed(2)}%
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className={`index-points ${sensexClass}`}>{indices.sensex.toFixed(2)}</p>
          <p className={`percent ${sensexClass}`}>
            {(((indices.sensex - openingValues["SENSEX"]) / openingValues["SENSEX"]) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;
