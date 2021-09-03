import {
  ADD_COMMENT,
  HIDE_COMMENTS_LOAD_MORE,
  LOAD_COMMENTS,
  RENDER_COMMENTS,
  SHOW_COMMENTS_LOAD_MORE,
  UPDATE_COMMENT_PAGE
} from "../types";

const initialState = {
  canLoadMore: false,
  comments: [],
  page: 0,
  size: 10,
}

export default function commentReducer(state = initialState, action) {
  switch(action.type) {
    case RENDER_COMMENTS:
      if(state.page == 0){
        return {...state, comments: action.payload}
      }
      return {...state, comments: [...state.comments, ...action.payload]};
    case UPDATE_COMMENT_PAGE:
      return {...state, page: action.payload}
    case SHOW_COMMENTS_LOAD_MORE:
      return {...state, canLoadMore: true}
    case HIDE_COMMENTS_LOAD_MORE:
      return {...state, canLoadMore: false}
    default:
      return state;
  }
}