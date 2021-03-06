import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { getCurrentAccesses } from "../../actions/access";

const ViewAccesses = ({ accesses, getCurrentAccesses }) => {
  useEffect(() => {
    getCurrentAccesses();
  }, [getCurrentAccesses]);

  const accessesHTML = accesses.map(row => (
    <tr key={row._id}>
      {row.accesstype === "in" ? (
        <Fragment>
          <td className="alert alert-success">
            <i className="fas fa-sign-in-alt" /> {row.accesstype}
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td className="alert alert-danger">
            <i className="fas fa-sign-out-alt" /> {row.accesstype}
          </td>
        </Fragment>
      )}
      <td>
        <Moment format="ddd, MMMM Do of YYYY, HH:mm">
          {moment.utc(row.date)}
        </Moment>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">
        <i className="fas fa-exchange-alt text-primary" /> Accesses to the site
        (30 last days)
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Access type</th>
            <th className="hide-sm">Date</th>
          </tr>
        </thead>
        <tbody>{accessesHTML}</tbody>
      </table>
    </Fragment>
  );
};

ViewAccesses.propTypes = {
  getCurrentAccesses: PropTypes.func.isRequired,
  accesses: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  accesses: state.access.accesses
});

export default connect(
  mapStateToProps,
  { getCurrentAccesses }
)(ViewAccesses);
