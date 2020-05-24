import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "../Reducers/userReducer";
import courseReducer from "../Reducers/courseReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      userReducer,
      courseReducer,
    }),
    composeEnhancer(applyMiddleware(thunk))
  );
  return store;
};
