import React, { useState, useEffect } from "react";
import StockDetailPage from "./StockDetailPage";
import Apple from "./assets/apple-logo.svg";
import avatar from "./assets/AvatarPlaceholder.svg";

function AppleDetailPage() {
  const [sentimentScore, setSentimentScore] = useState(0);

  const fetchSentimentData = async () => {
    try {
      const response = await fetch(
        "http://localhost:7430/api/stock-prediction/AAPL"
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
    <div style={{ height: "100vh" }}>
      <StockDetailPage
        stockTitle="AAPL"
        prediction="Bullish"
        imageSrc={Apple}
        sentimentPercent={sentimentScore}
        tweetData={{
          username: "John Doe",
          handle: "johndoe",
          content:
            "Exciting times for $AAPL investors. The new product launch is a game changer! 🚀",
          imageSrc: avatar,
          stockSymbol: "AAPL",
        }}
        explanation="The sentiment score is high due to the recent successful product launch and positive market response."
      />
    </div>
  );
}

export default AppleDetailPage;
