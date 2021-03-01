import {UPDATE_USER_AVATAR} from '../pages/store/types';

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_USER_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            }
        default:
            return state;
    }
};