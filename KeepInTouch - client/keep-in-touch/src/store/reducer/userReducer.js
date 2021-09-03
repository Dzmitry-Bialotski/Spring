import {DELETE_USER, SAVE_USER} from "../types";

const initialState = {
  login: localStorage.getItem('login') || null,
  token: localStorage.getItem('token') || '',
  role: localStorage.getItem('role') || ''
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_USER:
      return {...state, login: action.payload.login, token: action.payload.token, role: action.payload.role};
    case DELETE_USER:
      return {...state, login: null, token: null, role: null};
    default:
      return state;
  }
}