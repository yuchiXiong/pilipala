import {UPDATE_USER_AVATAR, UPDATE_USER_INFO} from './types';

const updateAvatar = avatar => {
    return {
        type: UPDATE_USER_AVATAR,
        avatar
    };
}

const updateInfo = info => {
    return {
        type: UPDATE_USER_INFO,
        info
    };
}

export {
    updateAvatar,
    updateInfo
};