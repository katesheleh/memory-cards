import {authAPI, LoginResponseType} from "../api/api";
import {Dispatch} from "redux";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {getCookie} from "../utils/cookies";

let initialState: InitialStateType = {
    success: false,
    profile: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
    }
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'GET_USER_DATA':
            return {...state, profile: action.profile}
        case 'AUTH_SUCCESS':
            return {...state, success: action.success}
        default:
            return state;
    }
}

export const getUserDataAC = (profile: LoginResponseType) => ({type: 'GET_USER_DATA', profile} as const)
export const authSucessAC = (success: boolean) => ({type: 'AUTH_SUCCESS', success} as const)

// THUNK
export const getUserDataTC = () => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType | authSucessACType>) => {
    dispatch(isFetchingAC(true))
    authAPI.me()
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(getUserDataAC(res.data))
            dispatch(authSucessAC(true))
            const cookie = getCookie('user_id')

        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

// TYPES
export type InitialStateType = {
    success: boolean
    profile: LoginResponseType
}

export type ActionsType = getUserDataACType | authSucessACType

export type getUserDataACType = ReturnType<typeof getUserDataAC>
export type authSucessACType = ReturnType<typeof authSucessAC>
