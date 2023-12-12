import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import StockCard from "./StockCard";
import Apple from "./assets/apple-logo.svg";
import Tesla from "./assets/tesla.svg";
import Amazon from "./assets/amazon-logo.svg";
import Other from "./assets/other-logo.png";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div>
        <Header />
      </div>
      <div
        style={{
          marginTop: "100px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "20px",
          justifyContent: "center",
          flex: "1", // This makes the div take up available space
        }}
      >
        <Link to="/AAPL">
          <StockCard title="AAPL" imageSrc={Apple} />
        </Link>
        <Link to="/TSLA">
          <StockCard title="Tesla" imageSrc={Tesla} />
        </Link>
        <Link to="/AMZN">
          <StockCard title="Amazon" imageSrc={Amazon} />
        </Link>
        <Link to="/">
          <StockCard title="View More (Premium Only)" imageSrc={Other} />
        </Link>
      </div>
      <p
        style={{
          textAlign: "center",
          marginBottom: "0",
          backgroundColor: "blue",
          color: "white",
          fontSize: "20px",
        }}
      >
        Members: Isiah Levy, Kim Young, Omar Aly, Athena Leong, Kefan Xiao
      </p>
    </div>
  );
}
