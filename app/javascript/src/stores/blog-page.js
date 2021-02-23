import {FETCH_BLOGS, FETCH_POPULAR_AUTHORS, FETCH_POPULAR_BLOGS} from '../pages/home/store/types';

const defaultState = {
    pageNo: 1,
    noMore: true,
    blogs: [],
    currentUserLikeBlogIds: [],
    popularBlogs: [],
    popularAuthors: [],
    currentUser: null
};

const blogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BLOGS:
            return {
                ...state,
                blogs: [...state.blogs, ...action.blogs],
                pageNo: action.pageNo,
                noMore: action.noMore
            }
        case FETCH_POPULAR_AUTHORS:
            return {
                ...state,
                popularAuthors: action.popularAuthors
            }
        case FETCH_POPULAR_BLOGS:
            return {
                ...state,
                popularBlogs: action.popularBlogs
            }
        default:
            return state;
    }
};

export default blogReducer;