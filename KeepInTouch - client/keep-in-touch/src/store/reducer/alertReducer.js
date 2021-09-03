import {
  HIDE_LOGIN_FAILED, HIDE_NEWS_ADDED,
  HIDE_REGISTER_COMPLETED,
  HIDE_REGISTER_FAILED,
  SHOW_LOGIN_FAILED, SHOW_NEWS_ADDED,
  SHOW_REGISTER_COMPLETED, SHOW_REGISTER_FAILED
} from "../types";

const initialState = {
  showRegisterFailed: false,
  showRegisterCompleted: false,
  showLoginFailed: false,
  showNewsAdded: false,
}


export default function alertReducer(state = initialState,
                                     action){
  switch(action.type){
    case HIDE_LOGIN_FAILED:
      return {...state, showLoginFailed: false}
    case HIDE_REGISTER_COMPLETED:
      return {...state, showRegisterCompleted: false}
    case HIDE_REGISTER_FAILED:
      return {...state, showRegisterFailed: false}
    case SHOW_LOGIN_FAILED:
      return {...state, showLoginFailed: true, failedMessage: action.payload}
    case SHOW_REGISTER_COMPLETED:
      return {...state, showRegisterCompleted: true}
    case SHOW_REGISTER_FAILED:
      return {...state, showRegisterFailed: true, failedMessage: action.payload}
    case SHOW_NEWS_ADDED:
      return {...state, showNewsAdded: true}
    case HIDE_NEWS_ADDED:
      return {...state, showNewsAdded: false}
    default: return state
  }
}