import { AUTH, FETCH_USERS, FETCH_USER, UPDATE_USER, DELETE_USER, START_LOADING_USERS, END_LOADING_USERS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_USERS });
  
      const { data } = await api.fetchUser(id);
  
      dispatch({ type: FETCH_USER, payload: { user: data } });
      dispatch({ type: END_LOADING_USERS });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getUsers = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_USERS });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchUsers(page);
  
      dispatch({ type: FETCH_USERS, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: END_LOADING_USERS });
    } catch (error) {
      console.log(error);
    }
  };

  export const updateUser = (id, user) => async (dispatch) => {
    try {
      const { data } = await api.updateUser(id, user);
  
      dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      await api.deleteUser(id);
  
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      console.log(error);
    }
  };