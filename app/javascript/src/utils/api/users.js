import request from '../request';

const show = spaceName => {
    return request.get(`/u/${spaceName}`);
};

export {
    show
};