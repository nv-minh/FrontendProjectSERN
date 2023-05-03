import { apiGetAllPosts, apiGetNewsPost, apiGetPostsLimit } from '../../services/post';
import actionType from './actionType';
import { PostsAction } from '../interface';
import { Dispatch } from 'redux';

export const getPosts = () => async (dispatch: Dispatch<PostsAction>) => {
  try {
    const response = await apiGetAllPosts();

    if (response?.data.success) {
      dispatch({
        type: actionType.GET_POSTS,
        posts: response?.data.posts,
        message: response?.data.message,
        count: response?.data.count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

interface QueryFilter {
  queryPrice?: string;
  queryArea?: string;
  queryFilter?: string;
  categoryCode?: string;
}

export const getPostsLimit =
  (queryPage: number, { queryPrice, queryArea, categoryCode }: QueryFilter) =>
  async (dispatch: Dispatch<PostsAction>) => {
    try {
      const props = { queryPage, queryPrice, queryArea, categoryCode };
      const response = await apiGetPostsLimit(props);
      if (response?.data.success) {
        dispatch({
          type: actionType.GET_POSTS_LIMIT,
          posts: response?.data.response.rows,
          count: response?.data.response.count,
          message: response?.data.message,
          queryFilter: { queryPrice, queryArea, categoryCode },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getNewsPost = () => async (dispatch: Dispatch<PostsAction>) => {
  try {
    const response = await apiGetNewsPost();
    if (response?.data.success) {
      dispatch({
        type: actionType.GET_NEWSPOST,
        newsPost: response.data.newsPost,
        count: response.data.posts.length,
        message: response.data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
