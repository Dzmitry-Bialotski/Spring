import React from "react";
import "./Navbar.css";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";

const NavBar = ({ setCategory }) => {
  return (
    <div className="nav">
      <div className="menu">
        <SwipeableTemporaryDrawer setCategory={setCategory} />
      </div>

      <img
        style={{ cursor: "pointer" }}
        src="./img/logo.jpg"
        height="90%"
        alt="logo"
      />
    </div>
  );
};

export default NavBar;