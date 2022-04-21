import axios from 'axios'
import { store } from './reducers'


const api = axios.create({
    baseURL: 'http://172.18.0.1:5000',
    headers: {
        Authorization: `Bearer ${store.getState().token}`
    }
})

api.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
    throw error;
  });

export default api