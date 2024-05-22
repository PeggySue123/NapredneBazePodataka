import { START_LOADING_REVIEWS, END_LOADING_REVIEWS, FETCH_ALL_REVIEWS, CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getReviews = (page, book_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_REVIEWS });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchReviews(page, book_id);
  
    dispatch({ type: FETCH_ALL_REVIEWS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_REVIEWS });
  } catch (error) {
    console.log(error);
  }
};

export const createReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_REVIEWS });
    const { data } = await api.createReview(review);

    dispatch({ type: CREATE_REVIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = (id, review) => async (dispatch) => {
  try {
    const { data } = await api.updateReview(id, review);

    dispatch({ type: UPDATE_REVIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    await api.deleteReview(id);

    dispatch({ type: DELETE_REVIEW, payload: id });
  } catch (error) {
    console.log(error);
  }
};