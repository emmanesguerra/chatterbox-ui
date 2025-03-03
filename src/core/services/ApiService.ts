import axios from 'axios';
import handleApiError from '@/utils/handleApiError'; 

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
});

ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default ApiService;
