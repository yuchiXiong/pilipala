import request from '../request';

const index = page => {
    return request.get(`/api/blogs?page=${page}`)
};

const popular = () => {
    return request.get(`/api/blogs/popular`)
};

export {
    index,
    popular
};