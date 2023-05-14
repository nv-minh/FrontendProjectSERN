import axiosConfig from '../axiosConfig';

export const apiGetCurrent = async () => {
  try {
    return await axiosConfig({
      method: 'get',
      url: '/api/v1/user/get-current',
    });
  } catch (error) {
    return error;
  }
};
export const apiUpdateUser = async (payload: any) => {
  try {
    return await axiosConfig({
      method: 'post',
      url: '/api/v1/user/update-user',
      data: payload,
    });
  } catch (error) {
    return error;
  }
};
