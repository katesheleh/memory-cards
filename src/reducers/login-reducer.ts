import {Dispatch} from 'redux'
import {authAPI, LoginParamsType, LoginResponseType} from '../api/auth-api'
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from './request-reducer'

const initialState = {
   isLoggedIn: false,
   profile: {} as LoginResponseType,
}

type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case 'LOGIN':
         return {...state, isLoggedIn: action.value}
      case 'GET_USER_DATA':
         return {...state, profile: action.profile}
      default:
         return state
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
export type ActionsType = setIsLoggedInACType | getUserDataACType
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type getUserDataACType = ReturnType<typeof getUserDataAC>
