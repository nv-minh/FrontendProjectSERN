import {IAuth} from '../../interface';
import actionType from '../actions/actionType';
import {AuthAction} from '../interface';

const initState: AuthAction = {
    isLoggedIn: false,
    accessToken: null,
    type: ""
};

const authReducer = (state = initState, action: AuthAction) => {
    switch (action.type) {
        case actionType.REGISTER_SUCCESS:
            return {
                ...(state as object),
                type: action.type,
                isLoggedIn: false,
                accessToken: action.accessToken,
            };
        case actionType.REGISTER_FAIL:
            return {
                ...(state as object),
                type: action.type,
                isLoggedIn: false,
                accessToken: null,
            };
        case actionType.LOGIN_SUCCESS:
            console.log("login success");
            return {
                ...(state as object),
                type: action.type,
                isLoggedIn: true,
                accessToken: action.accessToken,
            };
        case actionType.LOGIN_FAIL:
            return {
                ...(state as object),
                type: action.type,
                isLoggedIn: false,
                accessToken: null,
            };
        case actionType.LOGOUT:
            console.log("logout")
            return {
                ...(state as object),
                type: action.type,
                isLoggedIn: false,
                accessToken: null,
            };
        default:
            return state;
    }
};

export default authReducer;
