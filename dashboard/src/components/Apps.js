import React from "react";
import "./AppsGrid.css";

const Apps = () => {
  const apps = [
    {
      icon: "📱",
      title: "Mobile App",
      description: "Trade on the go with our native mobile application",
      status: "Coming Soon"
    },
    {
      icon: "🔗",
      title: "API Integration",
      description: "Build trading bots and automate with our REST API",
      status: "Available"
    },
    {
      icon: "📊",
      title: "TradingView",
      description: "Advanced charting and technical analysis tools",
      status: "Coming Soon"
    },
    {
      icon: "🔍",
      title: "Market Screener",
      description: "Find trading opportunities automatically",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="apps-container">
      <h3 className="title">Available Applications</h3>
      <p style={{ color: "#666", marginBottom: "30px", fontSize: "14px" }}>
        Expand your trading experience with NovaPulse tools and integrations
      </p>
      
      <div className="apps-grid">
        {apps.map((app, index) => (
          <div key={index} className="app-card">
            <div className="app-icon">{app.icon}</div>
            <h4>{app.title}</h4>
            <p>{app.description}</p>
            <span className={`badge ${app.status.includes("Available") ? "available" : "coming-soon"}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>

      <div className="api-section">
        <h5>📚 API Documentation</h5>
        <p style={{ marginBottom: "15px" }}>
          Build custom trading strategies and automate your portfolio management. 
          Our REST API provides real-time price data, order management, and portfolio tracking.
        </p>
        <button 
          className="btn btn-blue" 
          style={{ marginTop: "10px", padding: "8px 16px", fontSize: "12px" }}
          onClick={() => alert("API Documentation coming soon!")}
        >
          View API Docs
        </button>
      </div>
    </div>
  );
};

export default Apps;
