import request from '../request';

const index = page => {
    return request.get(`/?page=${page}`)
}

const show = id => {
    return request.get(`/blogs/${id}`);
}

export {
    index,
    show
};