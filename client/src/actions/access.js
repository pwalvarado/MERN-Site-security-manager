import axios from "axios";

import { GET_USER_ACCESSES, ACCESSES_ERROR } from "./types";

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
