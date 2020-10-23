import request from '../request';

const create = formData => {
    return request.post('/blog_photos', formData);
};

export {
    create
};