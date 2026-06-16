import React from "react";
import { usePriceFlash } from "../hooks/usePriceFlash";
import "../styles/PriceFlash.css";

const PriceCell = ({ price }) => {
  const flashClass = usePriceFlash(price);

  return (
    <td className={flashClass} style={{ textAlign: "right", padding: "10px" }}>
      {price ? `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : "₹0.00"}
    </td>
  );
};

export default PriceCell;