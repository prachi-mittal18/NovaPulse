import React from "react";

function Footer() {
  return (
    <footer className="np-footer">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-3 mb-4">
            <span className="footer-brand mb-3 d-block">Nova<span className="brand-mark">Pulse</span></span>
            <p className="small text-muted">&copy; 2010 - 2025, NovaPulse Broking Ltd. All rights reserved.</p>
          </div>

          <div className="col-lg-2 col-6 mb-4">  
            <h6 className="mb-3" style={{ fontWeight: 700 }}>Account</h6>
            <div className="d-flex flex-column gap-2">
              <a href="" className="footer-link small">Open demat account</a>
              <a href="" className="footer-link small">Minor demat account</a>
              <a href="" className="footer-link small">NRI demat account</a>
              <a href="" className="footer-link small">Commodity</a>
            </div>
          </div>
          
          <div className="col-lg-2 col-6 mb-4">
            <h6 className="mb-3" style={{ fontWeight: 700 }}>Support</h6>
            <div className="d-flex flex-column gap-2">
              <a href="" className="footer-link small">Contact us</a>
              <a href="" className="footer-link small">Support portal</a>
              <a href="" className="footer-link small">How to file a complaint?</a>
              <a href="" className="footer-link small">Downloads</a>
            </div>
          </div>

          <div className="col-lg-2 col-6 mb-4">
            <h6 className="mb-3" style={{ fontWeight: 700 }}>Company</h6>
            <div className="d-flex flex-column gap-2">
              <a href="" className="footer-link small">About</a>
              <a href="" className="footer-link small">Philosophy</a>
              <a href="" className="footer-link small">Careers</a>
              <a href="" className="footer-link small">Open source</a>
            </div>
          </div>

          <div className="col-lg-3 col-6 mb-4">
            <h6 className="mb-3" style={{ fontWeight: 700 }}>Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              <a href="" className="footer-link small">Upcoming IPOs</a>
              <a href="" className="footer-link small">Brokerage charges</a>
              <a href="" className="footer-link small">Market holidays</a>
              <a href="" className="footer-link small">Calculators</a>
            </div>
          </div>
        </div>

        <div className="footer-legal pt-4 mt-4" style={{ borderTop: '1px solid var(--border)', fontSize: '0.75rem', lineHeight: '1.6' }}>
          <p className="text-muted mb-4">
            NovaPulse is a full-stack stock trading simulation platform built as a portfolio project. It demonstrates real-time market data integration, order management, payment processing, and modern web technologies. This is not a registered brokerage — no real trades are executed.
          </p>
          <p className="text-muted mb-0">
            Built with React, Node.js, MongoDB, Socket.io &amp; Angel One API.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
