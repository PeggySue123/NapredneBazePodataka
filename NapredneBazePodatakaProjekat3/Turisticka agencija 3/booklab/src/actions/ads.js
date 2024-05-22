import { START_LOADING_ADS, END_LOADING_ADS, FETCH_ALL_ADS, FETCH_AD, FETCH_ADS_BY_SEARCH, CREATE_AD, UPDATE_AD, DELETE_AD } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAd = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ADS });

    const { data } = await api.fetchAd(id);

    dispatch({ type: FETCH_AD, payload: { ad: data } });
    dispatch({ type: END_LOADING_ADS });
  } catch (error) {
    console.log(error);
  }
};

export const getAds = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ADS });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchAds(page);

    dispatch({ type: FETCH_ALL_ADS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_ADS });
  } catch (error) {
    console.log(error);
  }
};

/*export const getAllAds = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ADS });
    const { data: { data } } = await api.fetchAllAds();

    dispatch({ type: FETCH_ADS, payload: { data } });
    dispatch({ type: END_LOADING_ADS });
  } catch (error) {
    console.log(error);
  }
};*/

export const getAdsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ADS });
    const { data: { data } } = await api.fetchAdsBySearch(searchQuery);

    dispatch({ type: FETCH_ADS_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_ADS });
  } catch (error) {
    console.log(error);
  }
};

/*export const getAdsByUser = (user_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ADS });
    const { data } = await api.fetchAdsByUser(user_id);

    dispatch({ type: FETCH_ADS_BY_USER, payload: { data } });
    dispatch({ type: END_LOADING_ADS });
  } catch (error) {
    console.log(error);
  }
};*/

export const createAd = (ad, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ADS });
    const { data } = await api.createAd(ad);

    dispatch({ type: CREATE_AD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateAd = (id, ad) => async (dispatch) => {
  try {
    const { data } = await api.updateAd(id, ad);

    dispatch({ type: UPDATE_AD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAd = (id) => async (dispatch) => {
  try {
    await api.deleteAd(id);

    dispatch({ type: DELETE_AD, payload: id });
  } catch (error) {
    console.log(error);
  }
};