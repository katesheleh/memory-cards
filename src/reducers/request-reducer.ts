let initialState = {
   error: '',
   isFetching: false,
}

export type InitialState = typeof initialState

export const requestReducer = (state: InitialState = initialState, action: InitReducerActionsType) => {
   switch (action.type) {
      case 'REQUEST_ERROR':
         return {...state, error: action.error}
      case 'REQUEST_IS_FETCHING':
         return {...state, isFetching: action.isFetching}
      default:
         return state
   }
}

export const errorAC = (error: string) => ({type: 'REQUEST_ERROR', error} as const)
export const isFetchingAC = (isFetching: boolean) => ({type: 'REQUEST_IS_FETCHING', isFetching} as const)


// TYPES
export type ErrorACType = ReturnType<typeof errorAC>
export type isFetchingACType = ReturnType<typeof isFetchingAC>
type InitReducerActionsType = ErrorACType | isFetchingACType
