import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row text-center mt-5 p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="col-8 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5" style={{ color: '#a78bfa' }}>Brokerage Calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "12px" }}
            className="p-5"
          >
            <li style={{ color: '#9a9ab0' }}>
              Call & Trade and RMS auto-squareoff: Additional charges of Rs.50+
              GST per order
            </li>
            <li style={{ color: '#9a9ab0' }}>Digital contract notes will be shared via e-mail</li>
            <li style={{ color: '#9a9ab0' }}>
              Physical copies of contract notes, if required, shall be charged
              Rs.20 per contract note. Courier charges may apply
            </li>
            <li style={{ color: '#9a9ab0' }}>
              For NRI account(non-PIS), 0.5% or Rs.100 per executed order for
              equity(whichever is lower)
            </li>
            <li style={{ color: '#9a9ab0' }}>
              For NRI account(PIS), 0.5% or Rs.200 per executed order for
              equity(whichever is lower)
            </li>
            <li style={{ color: '#9a9ab0' }}>
              If the account is in debit balance, any order placed will be
              charged Rs.40 per executed order instead of Rs.20 per executed
              order.
            </li>
          </ul>
        </div>

        <div className="col-4 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5" style={{ color: '#a78bfa' }}>List of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
