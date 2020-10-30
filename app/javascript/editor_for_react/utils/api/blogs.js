import request from '../request';

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

const destroy = id => {
    return request.delete(`/blogs/${id}`);
};

export {
    create,
    update,
    destroy
};