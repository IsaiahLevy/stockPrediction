import React, { useState, useEffect } from "react";
import StockDetailPage from "./StockDetailPage";
import AmazonLogo from "./assets/amazon-logo.svg";
import avatar from "./assets/AvatarPlaceholder.svg";

function AmazonDetailPage() {
  const [sentimentScore, setSentimentScore] = useState(0);

  const fetchSentimentData = async () => {
    try {
      const response = await fetch(
        "http://localhost:7430/api/stock-prediction/AMZN"
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
    <StockDetailPage
      stockTitle="AMZN"
      prediction="Bullish"
      imageSrc={AmazonLogo}
      sentimentPercent={sentimentScore}
      tweetData={{
        username: "Jane Smith",
        handle: "janesmith",
        content:
          "Amazon's recent market strategy is impressive, expecting growth in the next quarter! #AMZN 📈",
        imageSrc: avatar,
        stockSymbol: "AMZN",
      }}
      explanation="AMZN sentiment is cautiously optimistic due to new market strategies and projected growth."
    />
  );
}

export default AmazonDetailPage;
