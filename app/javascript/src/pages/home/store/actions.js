import {FETCH_BLOGS, TOGGLE_FETCH_BLOGS} from './types';
import {Blog} from "../../../utils/api";

const fetchBlogs = pageNo => {
    return dispatch => {
        dispatch({
            type: TOGGLE_FETCH_BLOGS,
            blogsLoading: true
        });
        Blog.index(pageNo).then(res => {
            dispatch({
                type: FETCH_BLOGS,
                blogs: res.data.blogs,
                pageNo: pageNo + 1,
                noMore: res.data.blogs.length > 0
            });
            dispatch({
                type: TOGGLE_FETCH_BLOGS,
                blogsLoading: false
            });
        });
    }
};

export {
    fetchBlogs
};