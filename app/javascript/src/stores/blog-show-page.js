import {FETCH_AUTHORS_OTHER_BLOGS, FETCH_BLOG} from '../pages/blog-show/store/types';

const defaultState = {
    blog: {
        id: -1,
        title: 'title',
        description: '',
        readsCount: 0,
        likesCount: 0,
        commentsCount: 0,
        createdAt: '',
        content: '',
        cover: '',
        user: {
            id: -1,
            nickName: '',
            email: '',
            sex: '',
            description: '',
            isAdmin: false,
            blogsCount: 0,
            followersCount: 0,
            followingCount: 0,
            spaceName: '',
            avatar: ''
        }
    },
    otherBlogs: [],
    comments: []
};

const blogShowPage = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BLOG:
            return {
                ...state,
                blog: action.blog
            }
        case FETCH_AUTHORS_OTHER_BLOGS:
            return {
                ...state,
                otherBlogs: action.otherBlogs
            }
        default:
            return state;
    }
};

export default blogShowPage;