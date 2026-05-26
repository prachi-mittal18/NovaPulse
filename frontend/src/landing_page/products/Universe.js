import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container ao-universe mt-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5 mb-4 display-6" style={{ fontWeight: 800 }}>The ArthaOdha Universe</h1>
        <p className="text-muted mb-5">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        
        <div className="row g-4 mt-2">
          <div className="col-lg-4 col-md-6">
            <div className="ao-card h-100">
              <img src="\media\smallcaseLogo.png" className="mb-4" height="40" alt="Smallcase" />
              <p className="small text-muted">
                Thematic investing platform that helps you invest in diversified
                baskets of stocks on ETFs.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="ao-card h-100">
              <img src="\media\arthaodhaFundhouse.png" className="mb-4" height="45" alt="Fundhouse" />
              <p className="small text-muted">
                Our asset management venture that is creating simple and transparent
                index funds to help you save for your goals.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="ao-card h-100">
              <img src="\media\sensibullLogo.svg" className="mb-4" height="50" alt="Sensibull" />
              <p className="small text-muted">
                Options trading platform that lets you create strategies, analyze
                positions, and examine data points.
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
