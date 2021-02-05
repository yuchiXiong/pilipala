import request from '../request';

const userBlog = user_id => {
    return request.get(`/api/users/${user_id}/blogs`);
};

const hots = () => {
    return request.get('/api/users/hots');
};

export {
    userBlog,
    hots
};