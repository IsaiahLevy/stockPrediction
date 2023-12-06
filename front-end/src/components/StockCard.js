import React from "react";
import "./StockCard.css";

const StockCard = ({ title = "", imageSrc = "" }) => {
  return (
    <div className="card">
      {imageSrc && <img src={imageSrc} alt="Card" className="card-image" />}
      <div className="card-title">{title}</div>
    </div>
  );
};

export default StockCard;
