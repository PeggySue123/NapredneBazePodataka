import { FETCH_ALL_MESSAGES, FETCH_MESSAGE, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, END_LOADING_MESSAGES, START_LOADING_MESSAGES } from '../constants/actionTypes';

export default (state = { isLoading: true, messages: [] }, action) => {
  switch (action.type) {
    case START_LOADING_MESSAGES:
      return { ...state, isLoading: true };
    case END_LOADING_MESSAGES:
      return { ...state, isLoading: false };
    case FETCH_ALL_MESSAGES:
      return { ...state, messages: action.payload.data };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload.messages };
    case CREATE_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case UPDATE_MESSAGE:
      return { ...state, messages: state.messages.map((message) => (message._id === action.payload._id ? action.payload : message)) };
    case DELETE_MESSAGE:
      return { ...state, messages: state.messages.filter((message) => message._id !== action.payload) };
    default:
      return state;
  }
};