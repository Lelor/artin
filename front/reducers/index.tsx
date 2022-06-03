import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = (token: any) => ({
    type: 'LOGIN',
    token
})


const initialState = {
    token: ''
}

function rootReducer(state: any = initialState, action: any) {
    switch(action.type) {
        case 'LOGIN':
            return {...state, token: action.token};
        case 'LOGOUT':
            AsyncStorage.setItem('TOKEN', '')
            return {...state, token: ''};
    }
    return state
}


export const store = configureStore({ reducer: rootReducer })
