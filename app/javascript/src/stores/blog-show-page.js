import {DELETE_COMMENT, FETCH_AUTHORS_OTHER_BLOGS, FETCH_BLOG, REPLY_COMMENT} from '../pages/blog-show/store/types';

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
    comments: [],
    currentUser: null
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
        case REPLY_COMMENT:
            return {
                ...state,
                comments: action.comments
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: [...state.comments.filter(item => item.id !== action.id)]
            }
        default:
            return state;
    }
};

export default blogShowPage;