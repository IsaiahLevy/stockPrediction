import React, { useState } from "react";
import SentimentBar from "./SentimentBar";
import Tweet from "./Tweet";
import "./StockDetailPage.css";
import Header from "./Header";
import SentimentGraph from "./SentimentGraph";

const StockDetailPage = ({
  stockTitle,
  imageSrc,
  prediction,
  sentimentPercent,
  tweetData,
  explanation,
}) => {
  const [isGraphVisible, setIsGraphVisible] = useState(false); // State to track visibility

  const toggleGraphVisibility = () => {
    setIsGraphVisible(!isGraphVisible);
  };

  return (
    <div>
      <Header />
      <div className="stock-detail-page">
        <div className="stock-header">
          <img src={imageSrc} alt={stockTitle} className="stock-logo" />
          <div className="stock-sentiment">
            <h1 style={{ color: "#4cdc2a" }}>{prediction}</h1>
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
        <div className="sentiment-analysis-section">
          <h1>Sentiment Analysis</h1>
          <p>(Premium Only)</p>
          <button onClick={toggleGraphVisibility} className="show-graph-btn">
            {isGraphVisible ? "Hide Graph" : "Show Graph"}
          </button>
          {isGraphVisible && <SentimentGraph company={stockTitle} />}
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;
