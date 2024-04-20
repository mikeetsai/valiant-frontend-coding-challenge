import axios from 'axios';

export function useAxios (): any {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  return axios;
}
