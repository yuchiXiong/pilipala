import request from '../request';

const index = page => {
    return request.get(`/api/blogs?page=${page}`)
};

const popular = () => {
    return request.get(`/api/blogs/popular`)
};

const show = id => {
    return request.get(`/api/blogs/${id}`)
}

export {
    index,
    show,
    popular
};