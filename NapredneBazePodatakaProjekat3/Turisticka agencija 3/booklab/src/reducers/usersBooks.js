import { FETCH_ALL_USERS_BOOKS, CREATE_USERS_BOOK, UPDATE_USERS_BOOK, DELETE_USERS_BOOK, END_LOADING_USERS_BOOKS, START_LOADING_USERS_BOOKS } from '../constants/actionTypes';

export default (state = { isLoading: true, usersBooks: [] }, action) => {
  switch (action.type) {
    case START_LOADING_USERS_BOOKS:
      return { ...state, isLoading: true };
    case END_LOADING_USERS_BOOKS:
      return { ...state, isLoading: false };
    case FETCH_ALL_USERS_BOOKS:
        return { ...state, usersBooks: action.payload.data };
    case CREATE_USERS_BOOK:
      return { ...state, usersBooks: [...state.usersBooks, action.payload] };
    case UPDATE_USERS_BOOK:
      return { ...state, usersBooks: state.usersBooks.map((users_book) => (users_book._id === action.payload._id ? action.payload : users_book)) };
    case DELETE_USERS_BOOK:
      return { ...state, usersBooks: state.usersBooks.filter((users_books) => users_books._id !== action.payload) };
    default:
      return state;
  }
};