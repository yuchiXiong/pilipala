import {UPDATE_USER_AVATAR, UPDATE_USER_INFO} from '../pages/store/types';

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_USER_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                ...action.info
            }
        default:
            return state;
    }
};