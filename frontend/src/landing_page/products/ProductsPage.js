import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import LeftImageSection from "./LeftImageSection";
import RightImageSection from "./RightImageSection";
import Universe from "./Universe";
import Footer from "../footer";

function ProductsPage() {
  return (
    <>
      <Hero />

      <LeftImageSection
        imageURL="/media/kite.png"
        productName="Pulse Dashboard"
        productDescription="Our flagship web-based trading platform with real-time market data, advanced charting, portfolio analytics, and intelligent order management. Experience professional-grade trading with an intuitive, modern interface designed for both beginners and experienced traders."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <RightImageSection
        imageURL="/media/console.png"
        productName="Portfolio Manager"
        productDescription="The central hub for managing all your investments. Track your holdings in real-time, analyze P&L trends over 7 days, monitor margin usage, and manage your wallet all in one place. Get comprehensive insights into your investment performance."
        learnMore=""
      />

      <LeftImageSection
        imageURL="/media/coin.png"
        productName="Smart Orders"
        productDescription="Execute trades with precision using our advanced order types. Support for Market Orders (instant execution) and Limit Orders (price-based execution). Automatic order management with real-time status tracking and execution notifications."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightImageSection
      imageURL="/media/kiteconnect.png"
        productName="Trading API"
        productDescription="Build custom trading applications with our RESTful API. Seamless integration for order placement, portfolio management, and market data access. Perfect for developers, algo traders, and fintech entrepreneurs building on top of NovaPulse."
        learnMore=""
         />

      

      <LeftImageSection
        imageURL="/media/varsity.png"
        productName="Learning Platform"
        productDescription="Master stock market investing with our comprehensive learning hub. From market fundamentals to advanced trading strategies, we provide bite-sized lessons, tutorials, and real-world examples to help you become a smarter investor."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <p className="text-center" style={{ color: '#9a9ab0' }}>
        Want to know more about our technology stack? Check out our <a href="">Tech Blog</a>.
      </p>

      <Universe />
    </>
  );
}

export default ProductsPage;
