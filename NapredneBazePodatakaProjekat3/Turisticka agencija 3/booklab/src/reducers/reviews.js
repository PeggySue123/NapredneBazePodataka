import { FETCH_ALL_REVIEWS, CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, END_LOADING_REVIEWS, START_LOADING_REVIEWS } from '../constants/actionTypes';

export default (state = { isLoading: true, reviews: [] }, action) => {
  switch (action.type) {
    case START_LOADING_REVIEWS:
      return { ...state, isLoading: true };
    case END_LOADING_REVIEWS:
      return { ...state, isLoading: false };
    case FETCH_ALL_REVIEWS:
        return {
            ...state,
            reviews: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
          };
    case CREATE_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case UPDATE_REVIEW:
      return { ...state, reviews: state.reviews.map((review) => (review._id === action.payload._id ? action.payload : review)) };
    case DELETE_REVIEW:
      return { ...state, reviews: state.reviews.filter((review) => review._id !== action.payload) };
    default:
      return state;
  }
};