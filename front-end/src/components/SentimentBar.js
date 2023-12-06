import React from "react";

const SentimentBar = ({ bullishPercent = 50 }) => {
  const bearishPercent = 100 - bullishPercent;

  const bullishStyle = {
    width: `${bullishPercent}%`,
    backgroundColor: "#32CD32", // Lime Green for bullish
    backgroundImage: "linear-gradient(45deg, #32CD32, #7CFC00)", // Bright gradient
    color: "white",
    textAlign: "center",
    lineHeight: "40px",
    height: "40px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: bullishPercent === 100 ? "10px" : "0",
  };

  const bearishStyle = {
    width: `${bearishPercent}%`,
    backgroundColor: "#FF4500", // Orange Red for bearish
    backgroundImage: "linear-gradient(45deg, #FF4500, #FF6347)", // Bright gradient
    color: "white",
    textAlign: "center",
    lineHeight: "40px",
    height: "40px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: bearishPercent === 100 ? "10px" : "0",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
      }}
    >
      <div style={bullishStyle}>
        {bullishPercent > 0 ? `${bullishPercent}% Bullish` : ""}
      </div>
      <div style={bearishStyle}>
        {bearishPercent > 0 ? `${bearishPercent}% Bearish` : ""}
      </div>
    </div>
  );
};

export default SentimentBar;
