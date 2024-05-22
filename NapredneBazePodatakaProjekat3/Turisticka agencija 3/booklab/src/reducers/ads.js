import { FETCH_ALL_ADS, FETCH_ADS_BY_SEARCH, FETCH_ADS, FETCH_AD, CREATE_AD, UPDATE_AD, DELETE_AD, END_LOADING_ADS, START_LOADING_ADS, FETCH_ADS_BY_USER } from '../constants/actionTypes';

export default (state = { isLoading: true, ads: [] }, action) => {
  switch (action.type) {
    case START_LOADING_ADS:
      return { ...state, isLoading: true };
    case END_LOADING_ADS:
      return { ...state, isLoading: false };
    case FETCH_ALL_ADS:
      return {
        ...state,
        ads: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_ADS:
      return { ...state, ads: action.payload.data };
    case FETCH_ADS_BY_SEARCH:
      return { ...state, ads: action.payload.data };
    case FETCH_ADS_BY_USER:
      return { ...state, ads: action.payload.data };
    case FETCH_AD:
      return { ...state, ad: action.payload.ad };
    case CREATE_AD:
      return { ...state, ads: [...state.ads, action.payload] };
    case UPDATE_AD:
      return { ...state, ads: state.ads.map((ad) => (ad._id === action.payload._id ? action.payload : ad)) };
    case DELETE_AD:
      return { ...state, ads: state.ads.filter((ad) => ad._id !== action.payload) };
    default:
      return state;
  }
};