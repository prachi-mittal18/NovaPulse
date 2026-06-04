import { useState, useEffect, useRef } from "react";

export const usePriceFlash = (price) => {
  const [flashClass, setFlashClass] = useState("");
  const prevPriceRef = useRef(price);

  useEffect(() => {
    // Compare current price to the previous stored price to determine direction
    if (price > prevPriceRef.current) {
      setFlashClass("price-up");
    } else if (price < prevPriceRef.current) {
      setFlashClass("price-down");
    }

    prevPriceRef.current = price;

    // Reset the class after the animation duration (1.5s)
    const timer = setTimeout(() => setFlashClass(""), 1500);
    return () => clearTimeout(timer);
  }, [price]);

  return flashClass;
};