import React from "react";
import StockDetailPage from "./StockDetailPage";
import Apple from "./assets/apple-logo.svg";
import avatar from "./assets/AvatarPlaceholder.svg";

function AppleDetailPage() {
  return (
    <div style={{ height: "100vh" }}>
      <StockDetailPage
        stockTitle="AAPL"
        imageSrc={Apple}
        sentimentPercent={70}
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
