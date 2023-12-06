import React from "react";
import SentimentBar from "./SentimentBar";
import Tweet from "./Tweet";
import "./StockDetailPage.css";

const StockDetailPage = ({
  stockTitle,
  imageSrc,
  sentimentPercent,
  tweetData,
  explanation,
}) => {
  return (
    <div className="stock-detail-page">
      <div className="stock-header">
        <img src={imageSrc} alt={stockTitle} className="stock-logo" />
        <div className="stock-sentiment">
          <h2>{stockTitle} Market Sentiment</h2>
          <SentimentBar bullishPercent={sentimentPercent} />
        </div>
      </div>
      <div className="stock-tweet">
        <Tweet {...tweetData} />
      </div>
      <div className="stock-explanation">
        <h3>Why this Sentiment?</h3>
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default StockDetailPage;
