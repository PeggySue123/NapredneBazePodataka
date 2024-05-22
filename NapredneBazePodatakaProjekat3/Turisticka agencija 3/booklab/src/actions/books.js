import { START_LOADING_BOOKS, END_LOADING_BOOKS, FETCH_ALL_BOOKS, FETCH_BOOK, FETCH_BOOKS_BY_SEARCH, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK, COMMENTBOOK } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOKS });

    const { data } = await api.fetchBook(id);

    dispatch({ type: FETCH_BOOK, payload: { book: data } });
    dispatch({ type: END_LOADING_BOOKS });
  } catch (error) {
    console.log(error);
  }
};

export const getBooks = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOKS });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchBooks(page);

    dispatch({ type: FETCH_ALL_BOOKS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_BOOKS });
  } catch (error) {
    console.log(error);
  }
};

export const getBooksBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOKS });
    const { data: { data } } = await api.fetchBooksBySearch(searchQuery);

    dispatch({ type: FETCH_BOOKS_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_BOOKS });
  } catch (error) {
    console.log(error);
  }
};

export const commentBook = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentBook(value, id);

    dispatch({ type: COMMENTBOOK, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const createBook = (book, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOKS });
    const { data } = await api.createBook(book);

    dispatch({ type: CREATE_BOOK, payload: data });

    history.push(`/books/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = (id, book) => async (dispatch) => {
  try {
    const { data } = await api.updateBook(id, book);

    dispatch({ type: UPDATE_BOOK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await api.deleteBook(id);

    dispatch({ type: DELETE_BOOK, payload: id });
  } catch (error) {
    console.log(error);
  }
};