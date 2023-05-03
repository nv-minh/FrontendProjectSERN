import axios from 'axios';
// require("dotenv").config();
const instance = axios.create({
    baseURL: 'https://api-projectsern.onrender.com',
});
// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('persist:auth');

        // Do something before request is sent
        return config;
    },
    async (error) => {
        // Do something with request error
        console.log(error);
        return await Promise.reject(error);
    },
);
export default instance;
