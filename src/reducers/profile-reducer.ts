import {authAPI} from "../api/auth-api";
import {Dispatch} from "redux";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";


let initialState: InitialStateType = {
    success: false
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'AUTH_ME':
            return {...state, success: action.success}
        default:
            return state;
    }
}

export const authMeAC = (success: boolean) => ({type: 'AUTH_ME', success} as const)

// THUNK
export const authSucessTC = () => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType | authSucessACType>) => {
    dispatch(isFetchingAC(true))
    authAPI.authMe()
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(authMeAC(true))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType | authSucessACType>) => {
    dispatch(isFetchingAC(true))
    authAPI.logout()
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(authMeAC(false))
        })
        .catch((error) => {
            //dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

// TYPES
export type InitialStateType = {
    success: boolean
}

export type ActionsType = authSucessACType


export type authSucessACType = ReturnType<typeof authMeAC>
