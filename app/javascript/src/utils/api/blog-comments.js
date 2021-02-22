import request from '../request';

const create = (id, comment) => {
    return request.post(`/api/blogs/${id}/comments`, {comment: comment});
};

export {
    create
};