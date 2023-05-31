import axios from 'axios';

const instance = axios.create({
  baseURL: `https://webservice-st47.onrender.com`,
  // paramsSerializer: {
  //   serialize: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  // },
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
