import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducer/rootReducer"
import thunk from 'redux-thunk';
import {logger} from 'redux-logger'
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)