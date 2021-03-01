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
    return request.get(`/api/u/${spaceName}/blogs/publications?page=${pageNo}`)
}

// * PUT/PATCH /api/u/:spaceName/avatar
const updateAvatar = (spaceName, formData) => {
    return request.put(`/api/u/${spaceName}/avatar`, formData);
}

export {
    popularBlogs,
    show,
    popular,
    publications,
    updateAvatar
};