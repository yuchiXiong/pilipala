import {FETCH_BLOGS} from './types';

const fetchBlogs = blogs => {
    return {
        action: FETCH_BLOGS,
        blogs
    }
};

export {
    fetchBlogs
};