import React, { useState, useEffect } from "react";
import StockDetailPage from "./StockDetailPage";
import GoogleLogo from "./assets/google-logo.svg"; // Make sure to add the Google logo SVG file in your assets
import avatar from "./assets/AvatarPlaceholder.svg";

function GoogleDetailPage() {
  const [sentimentScore, setSentimentScore] = useState(0); // Initialize to 0 or a default value

  const fetchSentimentData = async () => {
    try {
      const response = await fetch(
        "http://localhost:7430/api/stock-prediction/GOOGL"
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
        stockTitle="GOOGL"
        imageSrc={GoogleLogo}
        prediction="Bullish"
        sentimentPercent={sentimentScore}
        tweetData={{
          username: "Alex Johnson",
          handle: "alexjohnson",
          content:
            "Google's advancements in AI and cloud computing are impressive. Bullish on #GOOGL for the long term! 💻🌐",
          imageSrc: avatar,
          stockSymbol: "GOOGL",
        }}
        explanation="Google has a high sentiment score due to innovative AI and cloud solutions and strong market presence."
      />
    </>
  );
}

export default GoogleDetailPage;
