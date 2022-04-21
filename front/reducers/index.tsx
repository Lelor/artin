import { configureStore } from '@reduxjs/toolkit'

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
            return {...state, token: action.token}
    }
    return state
}


export const store = configureStore({ reducer: rootReducer })
