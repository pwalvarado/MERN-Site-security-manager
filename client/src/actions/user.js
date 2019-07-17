import axios from "axios";

import { GET_USERS, USERS_ERROR } from "./types";

// get all users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
