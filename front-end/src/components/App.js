import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import AppleDetailPage from "./AppleDetailPage";
import AmazonDetailPage from "./AmazonDetailPage";
import TeslaDetailPage from "./TeslaDetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/AAPL" element={<AppleDetailPage />} />
          <Route path="/AMZN" element={<AmazonDetailPage />} />
          <Route path="/TSLA" element={<TeslaDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
