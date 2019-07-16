import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <i className="fas fa-user text-primary" /> {user && user.name}
      </li>
      <li>
        <Link to="/edit-profile">
          <i className="fas fa-user-circle text-primary" /> Edit Profile
        </Link>
      </li>

      {user && user.role === "admin" && (
        <Fragment>
          <li>
            <Link to="/Dashboard">
              <i className="fas fa-stopwatch text-primary" />{" "}
              <span className="hide-sm">Access control</span>
            </Link>
          </li>
          <li>
            <Link to="/access-report">
              <i className="fas fa-exchange-alt text-primary" /> Access Report
            </Link>
          </li>
        </Fragment>
      )}

      <li>
        <a href="#!" onClick={logout}>
          <i className="fa fa-sign-out-alt text-primary" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          {" "}
          <i className="fas fa-code" /> Site security{" "}
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
