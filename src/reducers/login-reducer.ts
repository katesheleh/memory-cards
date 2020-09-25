import {Dispatch} from "redux";
import {authAPI, LoginParamsType, LoginResponseType} from "../api/api";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false,
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

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'GET_USER_DATA':
            return {...state, profile: action.profile}
        default:
            return state;
    }
}

// action creators
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN', value} as const)
export const getUserDataAC = (profile: LoginResponseType) => ({type: 'GET_USER_DATA', profile} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType | any>) => {
    dispatch(isFetchingAC(true))
    authAPI.login(data)
        .then(res => {
            dispatch(isFetchingAC(false))
            if (res.status === 200) {
                dispatch(setIsLoggedInAC(true))
                dispatch(getUserDataAC(res.data))
            } else {
                dispatch(errorAC('Oops...Something went wrong. Please try again later'))
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}


// TYPES
type InitialStateType = {
    isLoggedIn: boolean
    profile: LoginResponseType
}

export type ActionsType = setIsLoggedInACType | getUserDataACType

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type getUserDataACType = ReturnType<typeof getUserDataAC>

