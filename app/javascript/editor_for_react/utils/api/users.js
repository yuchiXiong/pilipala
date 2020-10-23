import request from '../request';

const userBlogs = id => {
    return request.get(`/users/${id}/blogs`);
};

export {
    userBlogs
};