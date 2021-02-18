import {FETCH_BE_VISITED_USER} from './types';
import {User} from '../../../utils/api';

const fetchBeVisitedUser = (spaceName, callback) => {
    return dispatch => {
        User.show(spaceName).then(res => {
            dispatch({
                type: FETCH_BE_VISITED_USER,
                user: res.data.user
            });
            callback();
        });
    }
};

export {
    fetchBeVisitedUser
};