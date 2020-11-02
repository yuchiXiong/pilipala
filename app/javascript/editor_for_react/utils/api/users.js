import request from '../request';

const userBlogs = user_id => {
    return request.get(`/api/users/${user_id}/blogs`);
};

export {
    userBlogs
};