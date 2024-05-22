import { START_LOADING_NEWS, END_LOADING_NEWS, FETCH_ALL_NEWS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getNews = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_NEWS });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchNews(page);
  
      dispatch({ type: FETCH_ALL_NEWS, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: END_LOADING_NEWS });
    } catch (error) {
      console.log(error);
    }
  };

export const createNews = (news, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_NEWS });
    const { data } = await api.createNews(news);

    dispatch({ type: CREATE_NEWS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateNews = (id, news) => async (dispatch) => {
  try {
    const { data } = await api.updateNews(id, news);

    dispatch({ type: UPDATE_NEWS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNews = (id) => async (dispatch) => {
  try {
    await api.deleteNews(id);

    dispatch({ type: DELETE_NEWS, payload: id });
  } catch (error) {
    console.log(error);
  }
};