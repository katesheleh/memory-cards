import {Dispatch} from 'redux'
import {authAPI} from '../api/api'
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from './request-reducer'

const SET_RESULT = 'SET_RESULT'

const initialState = {
   success: null as null | boolean,
}

export type InitialStateType = typeof initialState

export const newPswReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case 'SET_RESULT':
         return {
            ...state,
            success: action.payload,
         }
      default:
         return state
   }
}

// actions

export const setResult = (value: boolean) => ({
   type: SET_RESULT,
   payload: value,
} as const)
type SetResultActionType = ReturnType<typeof setResult>

// thunks

export const setNewPassword = (password: string, token: string) =>
   (dispatch: ThunkDispatchType) => {
      dispatch(isFetchingAC(true))
      authAPI.sendNewPassword({
         password,
         resetPasswordToken: token,
      }).then(res => {
         if (res.status === 200) {
            dispatch(setResult(true))
         } else {
            dispatch(setResult(false))
            dispatch(errorAC('Oops...Something went wrong. Please try again later'))
         }
      }).catch(error => {
         dispatch(setResult(false))
         dispatch(errorAC(error.message))
      }).finally(() => {
         dispatch(isFetchingAC(false))
      })
   }

// TYPES

type ActionsType = SetResultActionType
type ThunkDispatchType = Dispatch<ActionsType | isFetchingACType | ErrorACType>
