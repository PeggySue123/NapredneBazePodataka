import { FETCH_ALL_NEWS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS, END_LOADING_NEWS, START_LOADING_NEWS } from '../constants/actionTypes';

export default (state = { isLoading: true, news: [] }, action) => {
  switch (action.type) {
    case START_LOADING_NEWS:
      return { ...state, isLoading: true };
    case END_LOADING_NEWS:
      return { ...state, isLoading: false };
    case FETCH_ALL_NEWS:
        return {
            ...state,
            news: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
          };
    case CREATE_NEWS:
      return { ...state, news: [...state.news, action.payload] };
    case UPDATE_NEWS:
      return { ...state, news: state.news.map((singlenews) => (singlenews._id === action.payload._id ? action.payload : singlenews)) };
    case DELETE_NEWS:
      return { ...state, news: state.news.filter((singlenews) => singlenews._id !== action.payload) };
    default:
      return state;
  }
};