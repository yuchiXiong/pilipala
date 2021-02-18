import {FETCH_BLOG} from './types';

const fetchBlog = id => {
    return dispatch => {
        dispatch({
            type: FETCH_BLOG,
            id
        });
    }
}

export {
    fetchBlog
};