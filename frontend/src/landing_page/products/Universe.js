import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container np-universe mt-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5 mb-4 display-6" style={{ fontWeight: 800 }}>The NovaPulse Ecosystem</h1>
        <p className="text-muted mb-5">
          Comprehensive tools and integrations to enhance your trading and investment journey
        </p>
        
        <div className="row g-4 mt-2">
          <div className="col-lg-4 col-md-6">
            <div className="np-card h-100">
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📊</div>
              <h5 className="mb-3">Real-Time Analytics</h5>
              <p className="small text-muted">
                Advanced portfolio analytics, P&L tracking, and market data visualization to help you make informed decisions.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="np-card h-100">
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🛡️</div>
              <h5 className="mb-3">Secure Trading</h5>
              <p className="small text-muted">
                Enterprise-grade security with encrypted transactions, secure trading PINs, and 24/7 monitoring to protect your investments.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="np-card h-100">
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔗</div>
              <h5 className="mb-3">API Integration</h5>
              <p className="small text-muted">
                Build custom applications with our developer-friendly REST APIs. Perfect for algo trading and fintech innovations.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 mt-5 pt-4">
          <Link to='/signup' className="hero-cta">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;
