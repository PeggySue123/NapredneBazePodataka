import { START_LOADING_USERS_BOOKS, END_LOADING_USERS_BOOKS, FETCH_ALL_USERS_BOOKS, CREATE_USERS_BOOK, UPDATE_USERS_BOOK, DELETE_USERS_BOOK } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUsersBooks = (users_id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_USERS_BOOKS });
      const { data } = await api.fetchUsersBooks(users_id);
  
      dispatch({ type: FETCH_ALL_USERS_BOOKS, payload: data });
      dispatch({ type: END_LOADING_USERS_BOOKS });
    } catch (error) {
      console.log(error);
    }
};

export const createUsersBook = (usersBook) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS_BOOKS });
    const { data } = await api.createUsersBook(usersBook);

    dispatch({ type: CREATE_USERS_BOOK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUsersBook = (id, usersBook) => async (dispatch) => {
  try {
    const { data } = await api.updateUsersBook(id, usersBook);

    dispatch({ type: UPDATE_USERS_BOOK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsersBook = (id) => async (dispatch) => {
  try {
    await api.deleteUsersBook(id);

    dispatch({ type: DELETE_USERS_BOOK, payload: id });
  } catch (error) {
    console.log(error);
  }
};