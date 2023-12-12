import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import $ from "jquery";

function Header() {
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        !menuButtonRef.current.contains(e.target) &&
        $(window).width() < 750
      ) {
        $("li").slideUp(); // Collapse the header
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
  }, []);

  $(document).ready(function () {
    $("li").slideDown();
    $(".menu")
      .off("click")
      .on("click", function () {
        if ($(window).width() < 750) {
          $("li").slideToggle("50");
        }
      });
  });

  $(window)
    .off("resize")
    .on("resize", function () {
      if ($(window).width() > 750) {
        $(document).ready(function () {
          $("li").slideDown();
        });
      }
    });

  return (
    <>
      <div className="navbar" ref={navbarRef}>
        <Link to="/" className="logo">
          SP
        </Link>
        <div className="active">
          <ul className="defaultFont">
            <li>
              <Link className="header-routing" to="/AAPL">
                APPLE
              </Link>
            </li>
            <li>
              <Link className="header-routing" to="/TSLA">
                Microsoft
              </Link>
            </li>
            <li>
              <Link className="header-routing" to="/GOOGL">
                Google
              </Link>
            </li>
            <li>
              <a className="header-routing" href="/AMZN">
                AMAZON
              </a>
            </li>
            <li>
              <Link className="header-routing" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <button className="menu" id="toggleButton" ref={menuButtonRef}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>
    </>
  );
}

export default Header;
