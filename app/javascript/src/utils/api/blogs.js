import request from '../request';

const index = page => {
    return request.get(`/?page=${page}`)
}

const show = id => {
    return request.get(`/blogs/${id}`);
}

// const create = params => {
//     return request.post(`/api/blogs`, {
//         ...params
//     });
// };
//
// const update = (id, params) => {
//     return request.put(`/api/blogs/${id}`, {
//         ...params
//     });
// };
//
// const destroy = id => {
//     return request.delete(`/api/blogs/${id}`);
// };

export {
    index,
    show,
    // create,
    // update,
    // destroy
};