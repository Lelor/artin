import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { store } from './reducers'

const fetcher = () => {
  const api = axios.create({
      baseURL: 'http://172.18.0.1:5000',
  })
  
  api.interceptors.request.use(
      async (config) => {
        const storageToken = await AsyncStorage.getItem('TOKEN')
        const sessionToken = store.getState().token
        const token = sessionToken || storageToken
        if (token) {
          config.headers.Authorization = "Bearer " + token
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    );
  
  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if(error.response.status > 400 && error.response.status < 500){
        await AsyncStorage.setItem('TOKEN', '')
        store.dispatch({type: 'LOGOUT'})
      }
      else throw error
    }
  );
  return api
}

export const formatDate = date => {
  if(typeof(date) === 'string')
    date = new Date(Date.parse(date))
  const day = date.getDate()
  const month = date.getMonth()+1
  const year = date.getFullYear()
  return `${day<10? `0${day}`: day}/${month<10? `0${month}`: month}/${year}`
}

export default fetcher