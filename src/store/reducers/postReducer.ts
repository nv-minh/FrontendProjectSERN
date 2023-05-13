import actionType from '../actions/actionType';
import { PostsAction, RootStatePosts } from '../interface';

const initState: RootStatePosts = {
  posts: [],
  newsPost: [],
  message: '',
  count: 0,
  yourPosts: [],
};

const postReducer = (state = initState, action: PostsAction) => {
  switch (action.type) {
    case actionType.GET_POSTS:
    case actionType.GET_POSTS_LIMIT:
      return {
        ...state,
        type: actionType.GET_POSTS_LIMIT,
        posts: action.posts || [],
        message: action.message || '',
        count: action.count || 0,
        queryFilter: action.queryFilter || {},
      };
    case actionType.GET_NEWSPOST:
      return {
        ...state,
        type: actionType.GET_NEWSPOST,
        newsPost: action.newsPost || [],
        message: action.message || '',
      };
    case actionType.GET_POSTS_ADMIN:
      return {
        ...state,
        type: actionType.GET_POSTS_ADMIN,
        yourPosts: action.yourPosts || [],
        count: action.count || 0,
        message: action.message || '',
      };
    default:
      return state;
  }
};

export default postReducer;
