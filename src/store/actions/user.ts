import { Dispatch } from 'redux';
import { CurrentUserAction } from '../interface';

import actionType from './actionType';
import { apiGetCurrent } from '../../services/user';

export const getCurrent = () => async (dispatch: Dispatch<CurrentUserAction>) => {
  try {
    const response = await apiGetCurrent();
    if (response?.data.success) {
      dispatch({
        type: actionType.GET_CURRENT,
        currentData: response?.data.user,
      });
    } else {
      dispatch({
        type: actionType.GET_CURRENT,
        currentData: {
          avatar: null,
          createdAt: '',
          fbUrl: '',
          id: '',
          name: '',
          phone: '',
          updatedAt: '',
          zalo: '',
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
