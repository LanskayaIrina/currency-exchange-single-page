import { Link, NavLink, useLocation } from "react-router-dom";
import "./MainNavigation.scss";

export const MainNavigation = () => {
  return (
    <header className="header">
      <h2 className="logo">Currency exchange</h2>
      <nav className="nav">
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/"
            >
              Current rate
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/currency-converter"
            >
              Currency converter
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
