import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../api/api";

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


// thunks LoginParamsType
//ActionsType | SetAppStatusActionType | SetAppErrorActionType
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatchType) => authAPI.login(data)
    .then(res => {
        console.log(res)
        dispatch(setIsLoggedInAC(true))
    })
    .catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    })


//Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
type ThunkDispatchType = Dispatch<ActionsType>

// TYPES
type InitialStateType = {
    isLoggedIn: boolean
}

export type ActionsType = setIsLoggedInACType

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>