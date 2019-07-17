import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import UserAccesses from "../user/ViewAccesses";
import AccessLogger from "../access/AccessLogger";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {user && user.role === "admin" ? (
        <Fragment>
          <AccessLogger />
          <Link to="/access-report" className="btn btn-primary my-1">
            Access Report
          </Link>
        </Fragment>
      ) : profile !== null ? (
        <Fragment>
          <UserAccesses />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some information.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
