// Header.jsx
import React from "react";
import "../src/index.css"; // Assuming all your CSS is in index.css

const Header = () => {
  return (
    <header className="header">
      <img
        src="3cd9b9cb7b9740d9b47a1fb8fdf733c0.png" // Update the path if necessary
        alt="News Flash Logo"
        className="header-logo"
      />
    </header>
  );
};

export default Header;
