import {Dispatch} from 'redux'
import {authAPI} from '../api/api'

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
   async (dispatch: ThunkDispatchType) => {
      const res = await authAPI.sendNewPassword({
         password,
         resetPasswordToken: token,
      })
      try {
         if (res.status === 200) {
            dispatch(setResult(true))
         } else {
            dispatch(setResult(false))
         }
      } catch (error) {
         dispatch(setResult(false))
         throw error
      }
   }

// TYPES

type ActionsType = SetResultActionType
type ThunkDispatchType = Dispatch<ActionsType>
