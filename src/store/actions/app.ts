import {
    apiGetAreas,
    apiGetCategories,
    apiGetPrices,
    apiGetProvinces,
} from '../../services/category';
import actionType from './actionType';
import {Dispatch} from 'redux';
import {CategoriesAction} from '../interface';

export const getCategories = () => async (dispatch: Dispatch<CategoriesAction>) => {
    try {
        const response = await apiGetCategories();
        if (response?.data.success) {
            dispatch({
                type: actionType.GET_CATEGORIES,
                categories: response?.data.categories,
                message: response?.data.message,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const getPrice = () => async (dispatch: Dispatch<CategoriesAction>) => {
    try {
        const response = await apiGetPrices();
        if (response?.data.success) {
            dispatch({
                type: actionType.GET_PRICES,
                prices: response?.data.prices.sort((a: any, b: any) => {
                    return +a.order - +b.order;
                }),
                message: response?.data.message,
            });
        } else {
            dispatch({
                type: actionType.GET_PRICES,
                message: response?.data.message,
                prices: null,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAreas = () => async (dispatch: Dispatch<CategoriesAction>) => {
    try {
        const response = await apiGetAreas();
        if (response?.data.success) {
            dispatch({
                type: actionType.GET_AREAS,
                areas: response?.data.areas.sort((a: any, b: any) => {
                    return a.order - b.order;
                }),
                message: response?.data.message,
            });
        } else {
            dispatch({
                type: actionType.GET_AREAS,
                areas: null,
                message: response?.data.message,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const getProvinces = () => async (dispatch: Dispatch<CategoriesAction>) => {
    try {
        const response = await apiGetProvinces();
        if (response?.data.success) {
            dispatch({
                type: actionType.GET_PROVINCES,
                provinces: response?.data.provinces,
                message: response?.data.message,
            });
        } else {
            dispatch({
                type: actionType.GET_PROVINCES,
                provinces: null,
                message: response?.data.message,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
