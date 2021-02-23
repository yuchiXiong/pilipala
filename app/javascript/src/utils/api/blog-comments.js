import request from '../request';

const index = blogId => {
    return request.get(`/api/blogs/${blogId}/comments`);
}

const create = (blogId, comment) => {
    return request.post(`/api/blogs/${blogId}/comments`, {comment: comment});
};

const destroy = (blogId, commentId) => {
    return request.delete(`/api/blogs/${blogId}/comments/${commentId}`);
};

export {
    index,
    create,
    destroy
};