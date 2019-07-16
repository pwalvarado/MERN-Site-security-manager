import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import StateLoader from "./utils/stateLoader";

const stateLoader = new StateLoader();

const initialState = stateLoader.loadState();

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});
export default store;
