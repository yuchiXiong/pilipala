import {FETCH_BLOGS} from './types';
import {Blog} from "../../../utils/api";

const fetchBlogs = (pageNo, callback) => {
    return dispatch => {
        Blog.index(pageNo).then(res => {
            dispatch({
                type: FETCH_BLOGS,
                blogs: res.data.blogs,
                pageNo: pageNo + 1,
                noMore: res.data.blogs.length > 0
            });
            callback();
        });
    }
};

export {
    fetchBlogs
};