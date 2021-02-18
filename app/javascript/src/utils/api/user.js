import request from '../request';

const show = spaceName => {
    return request.get(`/api/u/${spaceName}`);
};

const hots = () => {
    return request.get('/api/u/hots');
};

const blogs = (spaceName, pageNo) => {
    return request.get(`/api/u/${spaceName}/blogs?page=${pageNo}`)
}

export {
    show,
    hots,
    blogs
};