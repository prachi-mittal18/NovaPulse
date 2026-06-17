import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5">
        <h1 className="display-6 text-center" style={{ fontWeight: 800 }}>
          Modern trading for the digital generation.
          <br /> Powerful technology meets simplicity.
        </h1>
      </div>

      <div className="row p-lg-5" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
        <div className="col-lg-6 p-4">
          <p>
            NovaPulse was born from a simple belief: investing and trading should be accessible, 
            intuitive, and transparent for everyone. We built this platform to eliminate complexity 
            and empower retail investors with professional-grade tools at their fingertips.
          </p>
          <p>
            Our name combines "Nova" (a new star in the sky) and "Pulse" (the heartbeat of the markets), 
            representing our commitment to bringing fresh innovation and real-time market connectivity to traders everywhere.
          </p>
          <p>
            We believe that technology should work for you, not against you. That's why NovaPulse features 
            real-time price updates, instant order execution, and comprehensive portfolio analytics—all 
            designed with the modern trader in mind.
          </p>
        </div>
        <div className="col-lg-6 p-4">
          <p>
            <strong>Our Core Values:</strong>
          </p>
          <p>
            <strong>Transparency:</strong> You always know exactly what you're paying and why. No hidden charges, no surprises.
          </p>
          <p>
            <strong>Innovation:</strong> We leverage cutting-edge technologies like WebSockets for real-time data, 
            secure payment processing, and intelligent order management systems.
          </p>
          <p>
            <strong>Security:</strong> Your funds and data are protected with enterprise-grade encryption, 
            bcrypt password hashing, and secure trading PIN protection.
          </p>
          <p>
            <strong>Education:</strong> We're committed to helping traders make informed decisions through 
            clear analytics, historical data visualization, and continuous platform improvements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
