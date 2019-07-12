import { combineReducers } from "redux";
import alertReducer from "./alert";

export default combineReducers({
  alert: alertReducer
});
