import {DELETE_COMMENT, FETCH_AUTHORS_OTHER_BLOGS, FETCH_BLOG, REPLY_COMMENT} from './types';
import {Blog, BlogComment, User} from '../../../utils/api';
import ReturnCode from '../../../utils/return-code';

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
        BlogComment.index(id).then(res => {
            dispatch({
                type: REPLY_COMMENT,
                comments: [...res.data.comments]
            });
            callback();
        })
    }
};

const replyComments = (id, comments, callback) => {
    return dispatch => {
        BlogComment.create(id, comments).then(res => {
            if (res.code === ReturnCode.SUCCESS) {
                dispatch({
                    type: REPLY_COMMENT,
                    comments: [...res.data.comments]
                });
                callback();
            }
        })
    }
};

const deleteComment = (blogId, id, callback) => {
    return dispatch => {
        BlogComment.destroy(blogId, id).then(res => {
            if (res.code === ReturnCode.SUCCESS) {
                dispatch({
                    type: DELETE_COMMENT,
                    id
                });
                callback();
            }
        });
    }
};

export {
    fetchBlog,
    fetchAuthorsOtherBlogs,
    fetchBlogComments,
    replyComments,
    deleteComment
};