import {UPDATE_USER_AVATAR} from './types';

const updateAvatar = avatar => {
    return {
        type: UPDATE_USER_AVATAR,
        avatar
    };
}

export {
    updateAvatar
};