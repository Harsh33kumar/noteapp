import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="logo">Notes App</div>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
           Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
