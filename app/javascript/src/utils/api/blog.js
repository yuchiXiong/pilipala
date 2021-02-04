import request from '../request';

const index = page => {
    return request.get(`/api/blogs?page=${page}`)
};

const hots = () => {
    return request.get(`/api/blogs/hots`)
};

export {
    index,
    hots
};