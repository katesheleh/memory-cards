import {Dispatch} from 'redux'
import {authAPI} from '../api/api'

const SET_CONFIRMING = 'SET_CONFIRMING'
const SET_SELECTED_EMAIL = 'SET_SELECTED_EMAIL'

const initialState = {
   selectedEmail: '' as string,
   success: false as boolean,
}

export type InitialStateType = typeof initialState

export const restorePswReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case 'SET_CONFIRMING':
         return {
            ...state,
            success: action.payload,
         }
      case 'SET_SELECTED_EMAIL':
         return {
            ...state,
            selectedEmail: action.payload,
         }
      default:
         return state
   }
}

// actions

const setConfirming = (value: boolean) => ({
   type: SET_CONFIRMING,
   payload: value,
} as const)
type SetConfirmingActionType = ReturnType<typeof setConfirming>

const setSelectedEmail = (email: string) => ({
   type: SET_SELECTED_EMAIL,
   payload: email,
} as const)
type SetSelectedEmail = ReturnType<typeof setSelectedEmail>

// thunks

export const getEmailConfirmation = (email: string) =>
   async (dispatch: ThunkDispatchType) => {
      const message = `
         <div style="background-color: lime; padding: 15px">	
            password recovery link:
            <a href='http://localhost:3000/memory-cards#/set-new-password'>
            link</a>
         </div>
      `
      const res = await authAPI.forgot({
         email, // кому восстанавливать пароль
         from: '<vladzyaba@mail.ru>', // можно указать разработчика фронта)
         message: message,
      })
      try {
         console.log(res)
         if (res.data.success) {
            dispatch(setConfirming(res.data.success))
            dispatch(setSelectedEmail(email))
         }
      } catch (error) {
         throw error
      }
   }

// TYPES

type ActionsType
   = SetConfirmingActionType
   | SetSelectedEmail
type ThunkDispatchType = Dispatch<ActionsType>
