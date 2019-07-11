import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Site security</h1>
            <p className="lead">Site employee entrace management and reports</p>
            <div className="buttons">
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
