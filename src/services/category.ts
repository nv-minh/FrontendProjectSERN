import axiosConfig from '../axiosConfig';
import axiosDefault from 'axios';

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
export const apiGetPublicProvinces = async () => {
  try {
    return await axiosDefault({
      method: 'get',
      url: 'https://vapi.vnappmob.com/api/province',
    });
  } catch (error) {
    return error;
  }
};
export const apiGetPublicDistricts = async (provinceCode: string) => {
  try {
    return await axiosDefault({
      method: 'get',
      url: `https://vapi.vnappmob.com/api/province/district/${provinceCode}`,
    });
  } catch (error) {
    return error;
  }
};
export const apiGetPublicWards = async (districtCode: string) => {
  try {
    return await axiosDefault({
      method: 'get',
      url: `https://vapi.vnappmob.com/api/province/ward/${districtCode}`,
    });
  } catch (error) {
    return error;
  }
};
