import {
  ADD_COMMENT,
  ADD_NEWS,
  CHANGE_TITLE,
  DELETE_NEWS,
  DELETE_USER, HIDE_COMMENTS_LOAD_MORE,
  HIDE_LOGIN_FAILED,
  HIDE_NEWS_ADDED,
  HIDE_NEWS_LOAD_MORE,
  HIDE_REGISTER_COMPLETED,
  HIDE_REGISTER_FAILED,
  LOAD_COMMENTS,
  LOAD_NEWS, LOAD_NEWS_BY_ID,
  PLACE_LIKE, PLACE_LIKE_TO_CURRENT_NEWS,
  REMOVE_LIKE,
  RENDER_COMMENTS,
  RENDER_NEWS,
  SAVE_USER, SHOW_COMMENTS_LOAD_MORE,
  SHOW_LOGIN_FAILED,
  SHOW_NEWS_ADDED,
  SHOW_NEWS_LOAD_MORE,
  SHOW_REGISTER_COMPLETED,
  SHOW_REGISTER_FAILED, UPDATE_COMMENT_PAGE,
  UPDATE_PAGE
} from "./types";
import {requestSender} from "../fetch/RequestSender";

export function saveUserToStore(login, token, role){
  return {
    type: SAVE_USER,
    payload: {
      login: login,
      token: token,
      role: role
    }
  }
}

export function deleteUserFromStore(){
  return (dispatch) => {
    dispatch({ type: DELETE_USER})
    dispatch(deleteNews())
  }
}

export function showRegisterFailed(text){
  return {
    type: SHOW_REGISTER_FAILED,
    payload: text
  }
}

export function hideRegisterFailed(){
  return {
    type: HIDE_REGISTER_FAILED
  }
}
export function showRegisterCompleted(){
  return {
    type: SHOW_REGISTER_COMPLETED
  }
}
export function hideRegisterCompleted(){
  return {
    type: HIDE_REGISTER_COMPLETED
  }
}
export function showLoginFailed(text){
  return {
    type: SHOW_LOGIN_FAILED,
    payload: text
  }
}
export function hideLoginFailed(){
  return {
    type: HIDE_LOGIN_FAILED
  }
}
export function showNewsAdded(){
  return {
    type: SHOW_NEWS_ADDED
  }
}

export function hideNewsAdded(){
  return {
    type: HIDE_NEWS_ADDED
  }
}
export function changeTitle(title){
  return {
    type: CHANGE_TITLE,
    payload: title
  }
}
export function renderNews(news) {
  return {
    type: RENDER_NEWS,
    payload: news
  }
}
export function renderComments(comments) {
  console.log('comments', comments)
  return {
    type: RENDER_COMMENTS,
    payload: comments
  }
}

export function loadNews(title, page, size){
  return function(dispatch) {
    requestSender.getNews(title, page, size).then(
      response => {
        dispatch(updatePage(page))
        dispatch(renderNews(response.items))
        response.items.length < size ?  dispatch(hideNewsLoadMore()) :  dispatch(showNewsLoadMore())
      }
    )
  }
}
export function loadComments(newsId, page, size){
  return function(dispatch) {
    requestSender.getCommentsByNewsId(newsId, page, size).then(
      response => {
        console.log(response)
        dispatch(updateCommentsPage(page))
        dispatch(renderComments(response.items))
        response.items.length < size ?  dispatch(hideCommentsLoadMore()) :  dispatch(showCommentsLoadMore())
      }
    )
  }
}

export function loadNewsById(id){
  return function(dispatch) {
    requestSender.getNewsById(id).then(
      response => {
        dispatch({
          type: LOAD_NEWS_BY_ID,
          payload: response
        })
      }
    )
  }
}
export function addNews(){
  return {
    type: ADD_NEWS
  }
}

export function deleteNews(){
  return {
    type: DELETE_NEWS
  }
}

export function addComment(){
  return {
    type: ADD_COMMENT
  }
}
export function placeLike(newsId, liked){
  return {
    type: PLACE_LIKE,
    payload: {newsId, liked}
  }
}
export function placeLikeToCurrentNews(liked){
  return {
    type: PLACE_LIKE_TO_CURRENT_NEWS,
    payload: {liked}
  }
}
export function showNewsLoadMore(){
  return {
    type: SHOW_NEWS_LOAD_MORE
  }
}

export function hideNewsLoadMore(){
  return {
    type: HIDE_NEWS_LOAD_MORE
  }
}

export function showCommentsLoadMore(){
  return {
    type: SHOW_COMMENTS_LOAD_MORE
  }
}

export function hideCommentsLoadMore(){
  return {
    type: HIDE_COMMENTS_LOAD_MORE
  }
}

export function updatePage(page) {
  return {
    type: UPDATE_PAGE,
    payload: page
  }
}

export function updateCommentsPage(page) {
  return {
    type: UPDATE_COMMENT_PAGE,
    payload: page
  }
}
