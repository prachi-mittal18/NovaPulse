import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row text-center mt-5 p-5 mb-3 border-bottom">
        <h1 className="display-5" style={{ fontWeight: 800 }}>NovaPulse Products</h1>
        <h3 className="h4 mt-2 text-muted" style={{ fontWeight: 500 }}>Sleek, modern, and intuitive trading platforms</h3>
        <p className="mt-3">Check out our <a href="" className="fw-bold">investment offerings →</a></p>
      </div>
    </div>
  );
}

export default Hero;
