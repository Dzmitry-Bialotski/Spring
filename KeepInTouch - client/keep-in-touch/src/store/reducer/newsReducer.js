import {
  ADD_NEWS,
  CHANGE_TITLE, DELETE_NEWS,
  HIDE_NEWS_LOAD_MORE,
  LOAD_NEWS, LOAD_NEWS_BY_ID, PLACE_LIKE, PLACE_LIKE_TO_CURRENT_NEWS,
  RENDER_NEWS,
  SHOW_NEWS_LOAD_MORE,
  UPDATE_PAGE
} from "../types";

const initialState = {
  title: '',
  news: [],
  page: 0,
  size: 10,
  canLoadMore: false
}

export default function newsReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_TITLE:
      return {...state, title: action.payload};
    case RENDER_NEWS:
      return {...state, news: [...state.news, ...action.payload]};
    case ADD_NEWS:
      return {...state, title: action.payload.title};
    case DELETE_NEWS:
      return initialState
    case SHOW_NEWS_LOAD_MORE:
      return {...state, canLoadMore: true}
    case HIDE_NEWS_LOAD_MORE:
      return {...state, canLoadMore: false}
    case UPDATE_PAGE:
      return {...state, page: action.payload}
    case LOAD_NEWS_BY_ID:
        return {...state, currentNews: action.payload}
    case PLACE_LIKE:
      return {
        ...state,
        news: state.news.map(item => {
          if(item.id === action.payload.newsId) {
            return {
              ...item,
              liked: action.payload.liked,
              likesCount: action.payload.liked ? item.likesCount + 1 : item.likesCount - 1
            }
          }
          return item
        })
      }
    case PLACE_LIKE_TO_CURRENT_NEWS:
    return {
      ...state,
      currentNews: {
        ...state.currentNews,
        liked: action.payload.liked,
        likesCount: action.payload.liked ? state.currentNews.likesCount + 1 : state.currentNews.likesCount - 1
      }
    }
    default:
      return state
  }
}