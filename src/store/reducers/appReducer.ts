import actionType from '../actions/actionType';
import { CategoriesAction, RootStateCategories } from '../interface';

const initState: RootStateCategories = {
  message: '',
  categories: [],
};

const appReducer = (state = initState, action: CategoriesAction) => {
  switch (action.type) {
    case actionType.GET_CATEGORIES:
      return {
        ...state,
        message: action.message || '',
        categories: action.categories || [],
      };
    case actionType.GET_PRICES:
      return {
        ...state,
        message: action.message || '',
        prices: action.prices || [],
      };
    case actionType.GET_AREAS:
      return {
        ...state,
        message: action.message || '',
        areas: action.areas || [],
      };
    case actionType.GET_PROVINCES:
      return {
        ...state,
        message: action.message || '',
        provinces: action.provinces || [],
      };
    default:
      return state;
  }
};

export default appReducer;
