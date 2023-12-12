import React, { useState, useEffect } from "react";
import StockDetailPage from "./StockDetailPage";
import TeslaLogo from "./assets/microsoft-logo.svg";
import avatar from "./assets/AvatarPlaceholder.svg";

function MicrosoftDetailPage() {
  const [sentimentScore, setSentimentScore] = useState(0); // Initialize to 0 or a default value

  const fetchSentimentData = async () => {
    try {
      const response = await fetch(
        "http://localhost:7430/api/stock-prediction/MSFT"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      if (data && data.confidence) {
        setSentimentScore(Math.round(data.confidence * 100));
      }
    } catch (error) {
      console.error("Failed to fetch sentiment data:", error);
    }
  };

  useEffect(() => {
    fetchSentimentData();
  }, []);

  return (
    <>
      <StockDetailPage
        stockTitle="MSFT"
        imageSrc={TeslaLogo}
        prediction="Bullish"
        sentimentPercent={sentimentScore}
        tweetData={{
          username: "Mark Roberts",
          handle: "markyroberts",
          content:
            "Microsoft's innovation in the EV space is unrivaled. Bullish on #MSFT for the long term! 🚗⚡",
          imageSrc: avatar,
          stockSymbol: "MSFT",
        }}
        explanation="Microsoft has a high sentiment score due to breakthroughs in technology and strong leadership."
      />
    </>
  );
}

export default MicrosoftDetailPage;
