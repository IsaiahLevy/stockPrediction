import React from "react";
import StockDetailPage from "./StockDetailPage";
import TeslaLogo from "./assets/tesla.svg";
import avatar from "./assets/AvatarPlaceholder.svg";

function TeslaDetailPage() {
  return (
    <StockDetailPage
      stockTitle="TSLA"
      imageSrc={TeslaLogo}
      sentimentPercent={80}
      tweetData={{
        username: "Mark Roberts",
        handle: "markyroberts",
        content:
          "Tesla's innovation in the EV space is unrivaled. Bullish on #TSLA for the long term! 🚗⚡",
        imageSrc: avatar,
        stockSymbol: "TSLA",
      }}
      explanation="TSLA has a high sentiment score due to breakthroughs in electric vehicle technology and strong leadership."
    />
  );
}

export default TeslaDetailPage;
