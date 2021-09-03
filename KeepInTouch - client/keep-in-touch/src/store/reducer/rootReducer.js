import {combineReducers} from "redux";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import newsReducer from "./newsReducer";
import commentReducer from "./commentReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  news: newsReducer,
  comment: commentReducer,
})