import axios, { AxiosRequestConfig } from 'axios';

const apiConfig = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: import.meta.env.VITE_BASE_API_URI,
});

apiConfig.interceptors.request.use(
  (req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
  },
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);

export default apiConfig;
