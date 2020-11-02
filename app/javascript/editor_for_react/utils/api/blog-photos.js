import request from '../request';

const create = formData => {
    return request.post('/api/blog_photos', formData);
};

export {
    create
};