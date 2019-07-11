import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <a href="dashboard.html">
            {" "}
            <i className="fas fa-code" /> Site security{" "}
          </a>
        </h1>
        <ul>
          <li>
            <a href="profiles.html">Employees</a>
          </li>
          <li>
            <a href="register.html">Register</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
