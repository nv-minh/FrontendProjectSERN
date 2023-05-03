import axiosConfig from '../axiosConfig';

export const apiGetCategories = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/category/all',
    });
  } catch (error) {
    return error;
  }
};
export const apiGetPrices = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/price/all',
    });
  } catch (error) {
    return error;
  }
};

export const apiGetAreas = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/area/all',
    });
  } catch (error) {
    return error;
  }
};
export const apiGetProvinces = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/province/all',
    });
  } catch (error) {
    return error;
  }
};
