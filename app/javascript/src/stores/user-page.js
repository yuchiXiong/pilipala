import {FETCH_BE_VISITED_USER, FETCH_BE_VISITED_USER_BLOGS} from '../pages/user-show/store/types';

const defaultState = {
    beVisitedUser: {},
    userBlogs: [],
    userBlogsPageNo: 1,
    userBlogsNoMore: true,
    currentUserLikeBlogIds: []
};
const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BE_VISITED_USER:
            return {
                ...state,
                beVisitedUser: action.user
            };
        case FETCH_BE_VISITED_USER_BLOGS:
            return {
                ...state,
                userBlogs: [...state.userBlogs, ...action.blogs],
                userBlogsPageNo: action.pageNo,
                userBlogsNoMore: action.blogs.length > 0
            };
        default:
            return state;
    }
}

export default userReducer;