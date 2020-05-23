import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "../Reducers/userReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      userReducer,
    }),
    composeEnhancer(applyMiddleware(thunk))
  );
  return store;
};
