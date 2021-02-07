import {combineReducers, createStore as _createStore} from 'redux';

import blogReducer from "./blog-page";

export default initState => _createStore(combineReducers({
    blogPage: blogReducer
}), initState);