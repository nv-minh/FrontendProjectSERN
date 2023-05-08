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