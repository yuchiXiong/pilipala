import {FETCH_BLOGS, FETCH_POPULAR_AUTHORS} from './types';
import {Blog, User} from "../../../utils/api";

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

const fetchPopularAuthors = () => {
    return dispatch => {
        User.popular().then(res => {
            dispatch({
                type: FETCH_POPULAR_AUTHORS,
                popularAuthors: res.data.authors
            });
        });
    }
};

export {
    fetchBlogs,
    fetchPopularAuthors
};