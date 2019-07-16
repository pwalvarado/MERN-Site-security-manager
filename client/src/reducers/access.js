import {
  GET_ACCESSES,
  GET_USER_ACCESSES,
  ACCESSES_ERROR
} from "../actions/types";

const initialState = {
  accesses: [],
  loading: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_ACCESSES:
    case GET_ACCESSES:
      return {
        ...state,
        accesses: payload,
        loading: false
      };
    case ACCESSES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
