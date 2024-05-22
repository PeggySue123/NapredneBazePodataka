import { FETCH_ALL_BOOKS, FETCH_BOOKS_BY_SEARCH, FETCH_BOOK, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK, END_LOADING_BOOKS, START_LOADING_BOOKS, COMMENTBOOK } from '../constants/actionTypes';

export default (state = { isLoading: true, books: [] }, action) => {
  switch (action.type) {
    case START_LOADING_BOOKS:
      return { ...state, isLoading: true };
    case END_LOADING_BOOKS:
      return { ...state, isLoading: false };
    case FETCH_ALL_BOOKS:
      return {
        ...state,
        books: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BOOKS_BY_SEARCH:
      return { ...state, books: action.payload.data };
    case FETCH_BOOK:
      return { ...state, book: action.payload.book };
    case CREATE_BOOK:
      return { ...state, books: [...state.books, action.payload] };
    case UPDATE_BOOK:
      return { ...state, books: state.books.map((book) => (book._id === action.payload._id ? action.payload : book)) };
    case COMMENTBOOK:
      return {
        ...state,
        books: state.books.map((book) => {
          if (book._id === +action.payload._id) {
            return action.payload;
          }
          return book;
        }),
      };
    case DELETE_BOOK:
      return { ...state, books: state.books.filter((book) => book._id !== action.payload) };
    default:
      return state;
  }
};