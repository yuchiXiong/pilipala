import {FETCH_AUTHORS_OTHER_BLOGS, FETCH_BLOG} from './types';
import {Blog, User} from '../../../utils/api';

const fetchBlog = (id, callback) => {
    return dispatch => {
        Blog.show(id).then(res => {
            dispatch({
                type: FETCH_BLOG,
                blog: res.data.blog
            });
            callback();
        });
    }
};

const fetchAuthorsOtherBlogs = (spaceName, callback) => {
    return dispatch => {
        User.popularBlogs(spaceName).then(res => {
            dispatch({
                type: FETCH_AUTHORS_OTHER_BLOGS,
                otherBlogs: res.data.blogs
            });
            callback();
        })
    }
}

const fetchBlogComments = (id, callback) => {
    return dispatch => {

    }
};

const replyComments = (comments, callback) => {
    return dispatch => {

    }
}

export {
    fetchBlog,
    fetchAuthorsOtherBlogs,
    fetchBlogComments,
    replyComments
};