import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_USER_ACCESSES,
  GET_ACCESSES,
  ACCESSES_ERROR,
  POST_ACCESS
} from "./types";

// get current user profile
export const getCurrentAccesses = () => async dispatch => {
  try {
    const res = await axios.get("/api/accesses/me");

    dispatch({
      type: GET_USER_ACCESSES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ACCESSES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// get all user acceses
export const getAccesses = () => async dispatch => {
  try {
    const res = await axios.get("/api/accesses");

    dispatch({
      type: GET_ACCESSES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ACCESSES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// create new user access (site in/out)
export const createAccess = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/accesses", formData, config);

    dispatch({
      type: POST_ACCESS,
      payload: res.data
    });

    dispatch(
      setAlert(
        formData.accesstype === "in"
          ? "user ARRIVE to site was registered"
          : "user LEFT to site, was registered"
      )
    );
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ACCESSES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
