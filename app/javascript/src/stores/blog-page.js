import {FETCH_BLOGS} from '../pages/home/store/types';

const defaultState = {
    pageNo: 1,
    noMore: true,
    blogs: [],
    currentUserLikeBlogIds: [],
    hotBlogs: [],
    hotAuthors: []
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
        default:
            return state;
    }
};

export default blogReducer;