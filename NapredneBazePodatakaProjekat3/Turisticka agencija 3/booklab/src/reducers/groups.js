import { FETCH_ALL_GROUPS, FETCH_GROUPS_BY_SEARCH, FETCH_GROUPS_BY_USER, COMMENT, FETCH_GROUP, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP, END_LOADING_GROUPS, START_LOADING_GROUPS } from '../constants/actionTypes';

export default (state = { isLoading: true, groups: [] }, action) => {
  switch (action.type) {
    case START_LOADING_GROUPS:
      return { ...state, isLoading: true };
    case END_LOADING_GROUPS:
      return { ...state, isLoading: false };
    case FETCH_ALL_GROUPS:
      return {
        ...state,
        groups: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_GROUPS_BY_SEARCH:
      return { ...state, groups: action.payload.data };
    case FETCH_GROUPS_BY_USER:
      return { ...state, groups: action.payload.data };
    case FETCH_GROUP:
      return { ...state, group: action.payload.group };
    case CREATE_GROUP:
      return { ...state, groups: [...state.groups, action.payload] };
    case UPDATE_GROUP:
      return { ...state, groups: state.groups.map((group) => (group._id === action.payload._id ? action.payload : group)) };
    case COMMENT:
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group._id === +action.payload._id) {
            return action.payload;
          }
          return group;
        }),
      };
    case DELETE_GROUP:
      return { ...state, groups: state.groups.filter((group) => group._id !== action.payload) };
    default:
      return state;
  }
};