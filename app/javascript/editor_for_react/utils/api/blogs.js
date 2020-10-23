import request from '../request';

const index = page => {
    return request.get(`/blogs`, {
        params: {
            page
        }
    });
};

const show = id => {
    return request.get(`/blogs/${id}`);
};

const create = params => {
    return request.post(`/blogs`, {
        ...params
    });
};

const update = (id, params) => {
    return request.put(`/blogs/${id}`, {
        ...params
    });
};

const destory = id => {
    return request.delete(`/blogs/${id}`);
};

export {
    index,
    show,
    create,
    update,
    destory
};