import {FETCH_BLOGS, TOGGLE_FETCH_BLOGS} from '../pages/home/store/types';

const defaultState = {};

const blogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_FETCH_BLOGS:
            return {
                ...state,
                blogsLoading: action.blogsLoading
            }
        case FETCH_BLOGS:
            return {
                ...state,
                blogs: [...state.blogs, ...action.blogs],
                pageNo: action.pageNo,
                noMore: action.noMore
            }
        default:
            return state;
    }
};

export default blogReducer;