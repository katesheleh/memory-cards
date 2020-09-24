import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../api/api";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {getUserDataAC} from "./profile-reducer";
import {setCookie} from "../utils/cookies";

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
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType | any>) => {
    dispatch(isFetchingAC(true))
    authAPI.login(data)
        .then(res => {
            dispatch(isFetchingAC(false))
            if (res.status === 200) {
                dispatch(setIsLoggedInAC(true))
                dispatch(getUserDataAC(res.data))
                setCookie('user_id', res.data._id)
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
}

export type ActionsType = setIsLoggedInACType

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

