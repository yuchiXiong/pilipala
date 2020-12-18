import request from '../request';

const userBlog = user_id => {
    return request.get(`/api/users/${user_id}/blogs`);
};

export {
    userBlog
};