import {applyMiddleware, combineReducers, createStore as _createStore} from 'redux';
import thunk from "redux-thunk";

import blogReducer from "./blog-page";
import userReducer from "./user-page";

export default initState => _createStore(combineReducers({
    blogPage: blogReducer,
    userPage: userReducer
}), initState, applyMiddleware(thunk));