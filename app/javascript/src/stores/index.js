import {applyMiddleware, combineReducers, createStore as _createStore} from 'redux';
import thunk from "redux-thunk";

import blogReducer from "./blog-page";

export default initState => _createStore(combineReducers({
    blogPage: blogReducer
}), initState, applyMiddleware(thunk));