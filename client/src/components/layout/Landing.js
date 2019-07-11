import React from "react";

const Landing = () => {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Site security</h1>
            <p className="lead">Site employee entrace management and reports</p>
            <div className="buttons">
              <a href="register.html" className="btn btn-primary">
                Sign Up
              </a>
              <a href="login.html" className="btn btn">
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
