import {authAPI, RegistrationParamsType} from "../api/api";
import {Dispatch} from "redux";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";

const initialState: InitialStateType = {
    isRegistered: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REGISTRATION':
            return {
                ...state,
                isRegistered: action.payload
            }

        default:
            return state;
    }
}

// THUNK
export const registrationTC = (data: RegistrationParamsType) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    authAPI.registration(data)
        .then(res => {
            debugger
            dispatch(isFetchingAC(false))
            if (res.status === 201) {
                dispatch(registrationAC(true))
            } else {
                dispatch(errorAC('Oops...Something went wrong. Please try again later'))
            }
        })
        .catch((error) => {
            debugger
            dispatch(errorAC(error.message))
            dispatch(isFetchingAC(false))
        })
}

export const registrationAC = (payload: boolean) => ({type: 'REGISTRATION', payload} as const)

// TYPES
export type InitialStateType = {
    isRegistered: boolean
}

export type ActionsType = exampleACType

export type exampleACType = ReturnType<typeof registrationAC>
