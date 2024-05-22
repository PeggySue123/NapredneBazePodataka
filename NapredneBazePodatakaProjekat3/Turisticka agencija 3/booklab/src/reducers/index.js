import { combineReducers } from 'redux';

import ads from './ads';
import auth from './auth';
import books from './books';
import groups from './groups';
import messages from './messages';
import news from './news';
import reviews from './reviews';
import usersBooks from './usersBooks';

export const reducers = combineReducers({ ads, auth, books, groups, messages, news, reviews, usersBooks });