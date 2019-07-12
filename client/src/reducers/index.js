import { combineReducers } from "redux";
import alertReducer from "./alert";
import register from "./auth";

export default combineReducers({
  alert: alertReducer,
  register
});
