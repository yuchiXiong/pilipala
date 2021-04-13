import request from '../request';

// * GET /api/u/:spaceName/blogs
const userBlogs = spaceName => {
    return request.get(`/api/u/${spaceName}/blogs`);
}

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

// * PUT/PATCH /api/u/:spaceName/info
const updateInfo = (spaceName, userInfo) => {
    return request.put(`/api/u/${spaceName}/info`, userInfo);
}

// * PUT/PATCH /api/u/:spaceName/password
const updatePassword = (spaceName, passwordObj) => {
    return request.put(`/api/u/${spaceName}/password`, passwordObj);
}


export {
    userBlogs,
    popularBlogs,
    show,
    popular,
    publications,
    updateAvatar,
    updateInfo,
    updatePassword
};