import request from '../request';

const show = spaceName => {
    return request.get(`/api/u/${spaceName}`);
};

const popular = () => {
    return request.get('/api/u/popular');
};

const blogs = (spaceName, pageNo) => {
    return request.get(`/api/u/${spaceName}/blogs?page=${pageNo}`)
}

export {
    show,
    popular,
    blogs
};