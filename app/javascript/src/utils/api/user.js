import request from '../request';

const popularBlogs = spaceName => {
    return request.get(`/api/u/${spaceName}/blogs/popular`);
}

const show = spaceName => {
    return request.get(`/api/u/${spaceName}`);
};

const popular = () => {
    return request.get('/api/u/popular');
};

const publications = (spaceName, pageNo) => {
    return request.get(`/api/u/${spaceName}/publications?page=${pageNo}`)
}

export {
    popularBlogs,
    show,
    popular,
    publications
};