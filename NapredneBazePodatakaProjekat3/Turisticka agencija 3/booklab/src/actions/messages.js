import { START_LOADING_MESSAGES, END_LOADING_MESSAGES, FETCH_ALL_MESSAGES, FETCH_MESSAGE, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_MESSAGES });

    const { data } = await api.fetchMessage(id);

    dispatch({ type: FETCH_MESSAGE, payload: { message: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = (group_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_MESSAGES });
    const { data } = await api.fetchMessages(group_id);

    dispatch({ type: FETCH_ALL_MESSAGES, payload: { data } });
    dispatch({ type: END_LOADING_MESSAGES });
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = (message, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_MESSAGES });
    const { data } = await api.createMessage(message);

    dispatch({ type: CREATE_MESSAGE, payload: data });

    history.push(`/messages/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateMessage = (id, message) => async (dispatch) => {
  try {
    const { data } = await api.updateMessage(id, message);

    dispatch({ type: UPDATE_MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    await api.deleteMessage(id);

    dispatch({ type: DELETE_MESSAGE, payload: id });
  } catch (error) {
    console.log(error);
  }
};