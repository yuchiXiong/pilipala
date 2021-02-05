import request from '../request';

const show = spaceName => {
    return request.get(`/u/${spaceName}`);
};

const hots = () => {
    return request.get('/api/users/hots');
};

export {
    show,
    hots
};