import actionType from './actionType';
import { apiRegister, apiLogin } from '../../services/auth';
import { IUser } from '../../interface';
import { AuthAction } from '../interface';
import { Dispatch } from 'redux';

// TODO change interface dispatch later

export const register = (payload: IUser) => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const response = await apiRegister(payload);
    console.log(response);
    if (response?.data.success === true) {
      dispatch({
        type: actionType.REGISTER_SUCCESS,
        isLoggedIn: false,
        accessToken: response?.data.accessToken,
        message: response?.data.message,
      });
    } else {
      dispatch({
        type: actionType.REGISTER_FAIL,
        isLoggedIn: false,
        message: response?.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.REGISTER_FAIL,
      isLoggedIn: false,
      accessToken: null,
      message: error,
    });
  }
};

export const login = (payload: IUser) => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.success === true) {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        isLoggedIn: true,
        accessToken: response?.data.accessToken,
        message: response?.data.message,
      });
    } else {
      dispatch({
        type: actionType.LOGIN_FAIL,
        isLoggedIn: true,
        message: response?.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.LOGIN_FAIL,
      isLoggedIn: false,
      accessToken: null,
      message: error,
    });
  }
};

export const logout = () => ({
  type: actionType.LOGOUT,
});
