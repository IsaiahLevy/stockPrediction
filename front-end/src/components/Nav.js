import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  return (
    <div>
      <nav className="nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/info">
          Info
        </Link>
        <Link className="nav-link" to="/demeanor">
          Demeanor
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
