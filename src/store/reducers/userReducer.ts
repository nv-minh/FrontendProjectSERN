import actionTypes from '../actions/actionType';
import { CurrentUserAction, ICurrentData, RootCurrentUser } from '../interface';

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
      console.log(action.currentData);
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
