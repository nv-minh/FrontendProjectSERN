import actionTypes from '../actions/actionType';
import { CurrentUserAction, RootCurrentUser } from '../interface';

const initState: RootCurrentUser = {
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
};

const userReducer = (state = initState, action: CurrentUserAction) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        currentData: action.currentData || {},
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentData: {},
      };

    default:
      return state;
  }
};

export default userReducer;
