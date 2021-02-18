import {FETCH_BE_VISITED_USER} from '../pages/user-show/store/types';

const defaultState = {
    beVisitedUser: {},
    userBlogs: [],
    currentUserLikeBlogIds: []
};
const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BE_VISITED_USER:
            return {
                ...state,
                beVisitedUser: action.user
            }
        default:
            return state;
    }
}

export default userReducer;