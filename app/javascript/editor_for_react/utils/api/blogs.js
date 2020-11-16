import request from '../request';

const create = params => {
    return request.post(`/api/blogs`, {
        ...params
    });
};

const update = (id, params) => {
    return request.put(`/api/blogs/${id}`, {
        ...params
    });
};

const destroy = id => {
    return request.delete(`/api/blogs/${id}`);
};

export {
    create,
    update,
    destroy
};