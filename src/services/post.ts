import axiosConfig from '../axiosConfig';
import axiosDefault from 'axios';

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
  queryPrice?: Number[];
  queryArea?: Number[];
  categoryCode?: string;
  provinceCode?: string;
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
export const apiCreatePost = async (payload: any) => {
  try {
    return await axiosConfig({
      method: 'post',
      url: '/api/v1/post/create-post',
      data: payload,
    });
  } catch (error) {
    return error;
  }
};
export const apiUploadImages = async (images: any) => {
  try {
    return await axiosDefault({
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/dxtxvzvcw/image/upload/`,
      data: images,
    });
  } catch (error) {
    return error;
  }
};
