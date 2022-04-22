import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { store } from './reducers'




const api = axios.create({
    baseURL: 'http://172.18.0.1:5000',
})

api.interceptors.request.use(
    async (config: any) => {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token) {
        config.headers.Authorization = "Bearer " + token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  );

api.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
    throw error;
});


export default api