import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <Router>
        {<Nav />}
        <Routes>
          <Route path="/" element={Homepage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;