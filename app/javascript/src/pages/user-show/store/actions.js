import {FETCH_BE_VISITED_USER, FETCH_BE_VISITED_USER_BLOGS} from './types';
import {User} from '../../../utils/api';

// * 从服务器拉取被访问用户的个人信息
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

// * 从服务器拉取被访问用户的博客列表
const fetchBeVisitedUserBlogs = (spaceName, pageNo, callback) => {
    return dispatch => {
        User.publications(spaceName, pageNo).then(res => {
            dispatch({
                type: FETCH_BE_VISITED_USER_BLOGS,
                blogs: res.data.blogs,
                pageNo: pageNo + 1
            });
            callback();
        })
    }
}

export {
    fetchBeVisitedUser,
    fetchBeVisitedUserBlogs
};