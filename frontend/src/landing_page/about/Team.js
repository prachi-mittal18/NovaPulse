import React from "react";

function Team() {
  return (
    <div className="container np-team">
      <div className="row p-3">
        <h1 className="display-6 text-center" style={{ fontWeight: 800 }}>
          The Team
        </h1>
      </div>

      <div className="row p-5 align-items-center">
        <div className="col-lg-6 p-3 text-center">
          <img src="\media\nithinKamath.jpg" style={{ borderRadius: "100%", width: "60%", boxShadow: 'var(--shadow)' }} alt="Founder"/>
          <h4 className="mt-4" style={{ fontWeight: 700 }}>Nithin Kamath</h4>
          <h6 className="mt-2 text-muted">Founder, CEO</h6>
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center p-4">
          <p>
            Nithin bootstrapped and founded NovaPulse in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, NovaPulse has changed the landscape of the Indian broking industry.
          </p>
    
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>
            Playing basketball is his zen.
          </p>
          <div className="mt-3">
            <a href="" className="me-3 fw-bold">Homepage</a>
            <a href="" className="me-3 fw-bold">TradingQnA</a>
            <a href="" className="fw-bold">Twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
