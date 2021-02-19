import {FETCH_BLOGS, FETCH_POPULAR_AUTHORS} from '../pages/home/store/types';

const defaultState = {
    pageNo: 1,
    noMore: true,
    blogs: [],
    currentUserLikeBlogIds: [],
    hotBlogs: [],
    popularAuthors: []
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
        default:
            return state;
    }
};

export default blogReducer;