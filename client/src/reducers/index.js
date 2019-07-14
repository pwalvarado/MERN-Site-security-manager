import { combineReducers } from "redux";
import alertReducer from "./alert";
import auth from "./auth";
import profile from "./profile";

export default combineReducers({
  alert: alertReducer,
  auth,
  profile
});
