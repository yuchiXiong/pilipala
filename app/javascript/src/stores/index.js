import {applyMiddleware, combineReducers, createStore as _createStore} from 'redux';
import thunk from "redux-thunk";

import blogReducer from "./blog-page";
import blogShowReducer from "./blog-show-page";
import userReducer from "./user-page";

export default initState => _createStore(combineReducers({
    blogPage: blogReducer,
    blogShowPage: blogShowReducer,
    userPage: userReducer
}), initState, applyMiddleware(thunk));