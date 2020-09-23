import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../api/api";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLoggedIn: action.value}

        default:
            return state;
    }
}

// action creators
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    authAPI.login(data)
        .then(res => {
            debugger
            dispatch(isFetchingAC(false))
            if (res.status === 200) {
                dispatch(setIsLoggedInAC(true))
            } else {
                dispatch(errorAC('Oops...Something went wrong. Please try again later'))
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch((error) => {
            dispatch(errorAC(error.message))
            dispatch(isFetchingAC(false))
        })
}


// TYPES
type InitialStateType = {
    isLoggedIn: boolean
}

export type ActionsType = setIsLoggedInACType

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

