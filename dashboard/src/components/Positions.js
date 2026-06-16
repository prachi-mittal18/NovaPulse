import React, { useState, useEffect, useContext, useMemo } from "react";
import api from "../api/api";
import GeneralContext from "./GeneralContext";
import UserContext from "./UserContext";
import Skeleton from "@mui/material/Skeleton";
import PriceCell from "./PriceCell";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { prices } = useContext(UserContext);

  // Calculate total MTM (Mark-to-Market) P&L
  const totalMTM = useMemo(() => {
    return allPositions.reduce((acc, pos) => {
      const livePrice = Number(prices[pos.name]) || pos.price;
      return acc + (livePrice - pos.avg) * pos.qty;
    }, 0);
  }, [allPositions, prices]);

  const pnlClass = totalMTM >= 0 ? "profit" : "loss";

  useEffect(() => {
    api
      .get("/allPositions")
      .then((res) => {
        setAllPositions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="positions">
        <h3 className="title"><Skeleton width={120} height={30} /></h3>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Array(5)).map((_, index) => (
                <tr key={index}>
                  <td><Skeleton width={60} /></td>
                  <td><Skeleton width={80} /></td>
                  <td><Skeleton width={40} /></td>
                  <td><Skeleton width={60} /></td>
                  <td><Skeleton width={60} /></td>
                  <td><Skeleton width={60} /></td>
                  <td><Skeleton width={60} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="positions">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3 className="title" style={{ margin: 0 }}>Positions ({allPositions.length})</h3>
        {allPositions.length > 0 && (
          <button 
            className="btn btn-red" 
            style={{ fontSize: "12px", padding: "6px 12px", backgroundColor: "#ff5722", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => alert("Square off all functionality coming soon!")}
          >Exit All</button>
        )}
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              return <PositionRow key={index} stock={stock} />;
            })}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
        <div className="col">
          <h5 className={pnlClass}>₹{totalMTM.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h5>
          <p>Total MTM (Real-time P&L)</p>
        </div>
      </div>
    </div>
  );
};

const PositionRow = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);
  const generalContext = useContext(GeneralContext);
  const { prices } = useContext(UserContext);

  const buttonStyle = {
    padding: "2px 8px",
    margin: "0 2px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "11px",
    color: "white"
  };

  // Use live price from socket if available, otherwise fallback to database price
  const livePrice = Number(prices[stock.name]) || stock.price;
  const curValue = livePrice * stock.qty;
  const isProfit = curValue - stock.avg * stock.qty >= 0.0;
  const profClass = isProfit ? "profit" : "loss";

  return (
    <tr 
      onMouseEnter={() => setShowActions(true)} 
      onMouseLeave={() => setShowActions(false)}
    >
      <td>{stock.product}</td>
      <td className="instrument-cell" style={{ position: "relative", minWidth: "160px" }}>
        {stock.name}
        {showActions && (
          <div 
            className="actions" 
            style={{ 
              position: "absolute", 
              right: 0, 
              top: "50%", 
              transform: "translateY(-50%)", 
              backgroundColor: "#fff", 
              display: "flex", 
              gap: "8px", 
              padding: "5px 10px", 
              zIndex: 10,
              boxShadow: "-4px 0 10px rgba(0,0,0,0.1)"
            }}
          >
            <button className="buy" onClick={() => generalContext.openBuyWindow(stock.name)} style={{ ...buttonStyle, backgroundColor: "#4184f3" }}>Add</button>
            <button className="sell" onClick={() => generalContext.openSellWindow(stock.name)} style={{ ...buttonStyle, backgroundColor: "#ff5722" }}>Exit</button>
          </div>
        )}
      </td>
      <td>{stock.qty}</td>
      <td>{stock.avg ? `₹${stock.avg.toFixed(2)}` : "₹0.00"}</td>
      <PriceCell price={livePrice} />
      <td className={profClass}>
        ₹{(curValue - stock.avg * stock.qty).toFixed(2)}
      </td>
      <td className={profClass}>
        {((curValue - (stock.avg * stock.qty)) / (stock.avg * stock.qty) * 100).toFixed(2)}%
      </td>
    </tr>
  );
};

export default Positions;
