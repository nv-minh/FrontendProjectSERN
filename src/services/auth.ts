import axiosConfig from '../axiosConfig';
import { IUser } from '../interface';

export const apiRegister = async (payload: IUser) => {
  try {
    return await axiosConfig({
      method: 'post',
      url: '/api/v1/auth/register',
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const apiLogin = async (payload: IUser) => {
  try {
    return await axiosConfig({
      method: 'post',
      url: '/api/v1/auth/login',
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
};
