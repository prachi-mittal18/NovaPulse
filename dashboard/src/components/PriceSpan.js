import React from "react";
import { usePriceFlash } from "../hooks/usePriceFlash";
import "../styles/PriceFlash.css";

const PriceSpan = ({ price }) => {
  const flashClass = usePriceFlash(price);

  return (
    <span className={`price ${flashClass}`}>
      {price ? price.toFixed(2) : "0.00"}
    </span>
  );
};

export default PriceSpan;