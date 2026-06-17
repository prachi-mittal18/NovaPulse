import React from "react";

function Team() {
  return (
    <div className="container np-team">
      <div className="row p-3">
        <h1 className="display-6 text-center" style={{ fontWeight: 800 }}>
          Built by Traders, for Traders
        </h1>
      </div>

      <div className="row p-5 align-items-center">
        <div className="col-lg-6 p-3 text-center">
          {/* 
            TO ADD YOUR IMAGE:
            1. Save your photo as "founder.jpg" or "founder.png" 
            2. Place it in: frontend/public/media/
            3. Uncomment the img tag below and comment out the emoji div
          */}
          {/* <img src="/media/founder.jpg" style={{ borderRadius: "100%", width: "60%", boxShadow: 'var(--shadow)' }} alt="Prachi Mittal"/> */}
          
          <div style={{ 
            borderRadius: "100%", 
            width: "60%", 
            boxShadow: 'var(--shadow)',
            background: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            margin: '0 auto',
            fontSize: '80px'
          }}>
            👨‍💻
          </div>
          <h4 className="mt-4" style={{ fontWeight: 700 }}>Prachi Mittal</h4>
          <h6 className="mt-2 text-muted">Founder & Full-Stack Developer</h6>
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center p-4">
          <p>
            I built NovaPulse from scratch as a full-stack application, handling everything from backend API design and real-time WebSocket integration to frontend development and database architecture. My mission was to create a modern, intuitive trading platform that proves sophisticated financial technology doesn't require complexity.
          </p>
    
          <p>
            NovaPulse features secure JWT authentication, encrypted trading PINs with bcrypt, real-time price updates via Socket.io, Razorpay payment integration, and intelligent order management. Every component is crafted with attention to security, performance, and user experience.
          </p>
          <p>
            I'm passionate about solving real problems with clean code and thoughtful design. Whether it's implementing atomic database operations to prevent race conditions or building responsive UIs that work seamlessly across devices, I'm committed to quality in every detail.
          </p>
          <div className="mt-3">
            <a href="https://github.com/prachi-mittal18" target="_blank" rel="noopener noreferrer" className="me-3 fw-bold">GitHub</a>
            <a href="https://www.linkedin.com/in/prachimittal18" target="_blank" rel="noopener noreferrer" className="me-3 fw-bold">LinkedIn</a>
            <a href="mailto:mittalprachi18@gmail.com" className="fw-bold">Email</a>
          </div>
        </div>
      </div>

      <div className="row p-5 text-center" style={{ background: '#f8fafc', borderRadius: '8px', marginTop: '40px' }}>
        <h3 className="mb-4" style={{ fontWeight: 700 }}>Technical Highlights</h3>
        <div className="col-lg-3 p-3">
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚡</div>
          <h5>Real-Time Architecture</h5>
          <p style={{ fontSize: '0.9rem' }}>WebSocket-powered live updates with fallback mechanisms</p>
        </div>
        <div className="col-lg-3 p-3">
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔐</div>
          <h5>Security First</h5>
          <p style={{ fontSize: '0.9rem' }}>JWT tokens, bcrypt hashing, secure transaction handling</p>
        </div>
        <div className="col-lg-3 p-3">
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
          <h5>Smart Analytics</h5>
          <p style={{ fontSize: '0.9rem' }}>P&L tracking, portfolio analytics, market data integration</p>
        </div>
        <div className="col-lg-3 p-3">
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
          <h5>Production Ready</h5>
          <p style={{ fontSize: '0.9rem' }}>Scalable architecture, error handling, comprehensive logging</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
