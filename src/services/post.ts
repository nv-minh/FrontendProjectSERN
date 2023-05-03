import axiosConfig from '../axiosConfig';

export const apiGetAllPosts = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/post/all',
    });
  } catch (error) {
    return error;
  }
};

export interface props {
  queryPage: number;
  queryPrice?: string;
}

export const apiGetPostsLimit = async (props: props) => {
  try {
    return await axiosConfig({
      method: 'get',
      url: `/api/v1/post/limit`,
      params: props,
    });
  } catch (error) {
    return error;
  }
};

export const apiGetNewsPost = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/post/new-post',
    });
  } catch (error) {
    return error;
  }
};
