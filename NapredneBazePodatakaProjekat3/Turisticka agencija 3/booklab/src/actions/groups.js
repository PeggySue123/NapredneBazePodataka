import { START_LOADING_GROUPS, END_LOADING_GROUPS, COMMENT, FETCH_ALL_GROUPS, FETCH_GROUP, FETCH_GROUPS_BY_USER, FETCH_GROUPS_BY_SEARCH, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getGroup = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_GROUPS });

    const { data } = await api.fetchGroup(id);

    dispatch({ type: FETCH_GROUP, payload: { group: data } });
    dispatch({ type: END_LOADING_GROUPS });
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_GROUPS });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchGroups(page);

    dispatch({ type: FETCH_ALL_GROUPS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_GROUPS });
  } catch (error) {
    console.log(error);
  }
};

export const getGroupsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_GROUPS });
    const { data: { data } } = await api.fetchGroupsBySearch(searchQuery);

    dispatch({ type: FETCH_GROUPS_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_GROUPS });
  } catch (error) {
    console.log(error);
  }
};

export const getGroupsByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_GROUPS });
    const { data: { data } } = await api.fetchGroupsByUser(userId);

    dispatch({ type: FETCH_GROUPS_BY_USER, payload: { data } });
    dispatch({ type: END_LOADING_GROUPS });
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = (group, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_GROUPS });
    const { data } = await api.createGroup(group);

    dispatch({ type: CREATE_GROUP, payload: data });

    history.push(`/groups/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateGroup = (id, ad) => async (dispatch) => {
  try {
    const { data } = await api.updateGroup(id, ad);

    dispatch({ type: UPDATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentGroup = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = (id) => async (dispatch) => {
  try {
    await api.deleteGroup(id);

    dispatch({ type: DELETE_GROUP, payload: id });
  } catch (error) {
    console.log(error);
  }
};