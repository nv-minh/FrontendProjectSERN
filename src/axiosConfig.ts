import axios from 'axios';
// require("dotenv").config();
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});
// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    let accessToken = '';
    const persistedAuth = localStorage.getItem('persist:auth');
    if (persistedAuth) {
      const authData = JSON.parse(persistedAuth);
      if (authData.accessToken) {
        accessToken = authData.accessToken.slice(1, -1);
      }
    }
    config.headers = {
      authorization: 'Bearer ' + accessToken,
    };

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
