import {applyMiddleware, combineReducers, createStore as _createStore} from 'redux';
import thunk from "redux-thunk";

import blogReducer from "./blog-page";
import blogShowReducer from "./blog-show-page";
import userReducer from "./user-page";
import currentUserReducer from './current-user';

export default initState => _createStore(combineReducers({
    blogPage: blogReducer,
    blogShowPage: blogShowReducer,
    userPage: userReducer,
    currentUser: currentUserReducer
}), initState, applyMiddleware(thunk));