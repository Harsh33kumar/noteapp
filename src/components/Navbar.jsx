import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <ul className="navbar nav-flex">
        <li className="navbar">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navbar">
          <NavLink to="/pastes">Pastes all</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
