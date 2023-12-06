import React from "react";
import StockDetailPage from "./StockDetailPage";
import AmazonLogo from "./assets/amazon-logo.svg";
import avatar from "./assets/AvatarPlaceholder.svg";

function AmazonDetailPage() {
  return (
    <StockDetailPage
      stockTitle="AMZN"
      imageSrc={AmazonLogo}
      sentimentPercent={60}
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
