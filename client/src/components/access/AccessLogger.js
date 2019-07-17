import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";

const AccessLogger = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const usersTableBody = users.map(row => (
    <tr key={row._id}>
      <td>
        {" "}
        <img class="round-img" src={row.avatar} alt="" />
      </td>
      <td>{row.name}</td>
      <td>
        <button type="button" class="btn btn-success btn-sm">
          <i className="fas fa-sign-in-alt" />
        </button>
        <button type="button" class="btn btn-danger btn-sm">
          <i className="fas fa-sign-out-alt" />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">
        <i className="fas fa-stopwatch text-primary" /> Access Control
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Employee</th>
            <th>Check in/out</th>
          </tr>
        </thead>
        <tbody>{usersTableBody}</tbody>
      </table>
      <Link className="btn btn-light my-1" to="/dashboard">
        Go Back
      </Link>
    </Fragment>
  );
};

AccessLogger.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(AccessLogger);
