import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import AppleDetailPage from "./AppleDetailPage";
import AmazonDetailPage from "./AmazonDetailPage";
import MicrosoftDetailPage from "./MicrosoftDetailPage";
import ProfilePage from "./ProfilePage";
import GoogleDetailPage from "./GoogleDetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/AAPL" element={<AppleDetailPage />} />
          <Route path="/AMZN" element={<AmazonDetailPage />} />
          <Route path="/TSLA" element={<MicrosoftDetailPage />} />
          <Route path="/GOOGL" element={<GoogleDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
