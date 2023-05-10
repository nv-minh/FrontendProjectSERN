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
  queryPrice?: Number[];
  queryArea?: Number[];
  categoryCode?: string;
  provinceCode?: string;
  priceCode?: string;
  areaCode?: string;
}

interface props extends QueryFilter {
  queryPage: number;
}

export const getPostsLimit =
  (
    queryPage: number,
    {
      queryPrice,
      queryArea,
      categoryCode,
      provinceCode,
      priceCode,
      areaCode,
    }: QueryFilter,
  ) =>
  async (dispatch: Dispatch<PostsAction>) => {
    try {
      const props: props = {
        queryPage,
        queryPrice,
        queryArea,
        categoryCode,
        provinceCode,
        priceCode,
        areaCode,
      };
      const response = await apiGetPostsLimit(props);
      if (response?.data.success) {
        dispatch({
          type: actionType.GET_POSTS_LIMIT,
          posts: response?.data.response.rows,
          count: response?.data.response.count,
          message: response?.data.message,
          queryFilter: {
            queryPrice,
            queryArea,
            categoryCode,
            provinceCode,
            areaCode,
            priceCode,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getNewsPost = () => async (dispatch: Dispatch<PostsAction>) => {
  try {
    const response = await apiGetNewsPost();
    console.log(response);
    if (response?.data.success) {
      dispatch({
        type: actionType.GET_NEWSPOST,
        newsPost: response.data.posts,
        message: response.data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
