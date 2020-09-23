let initialState: RequestReducerStateType = {
    error: '',
    isFetching: false
}

export const requestReducer = (state: RequestReducerStateType = initialState, action: InitReducerActionsType) => {
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
export type RequestReducerStateType = {
    error: string
    isFetching: boolean
}

export type ErrorACType = ReturnType<typeof errorAC>
export type isFetchingACType = ReturnType<typeof isFetchingAC>

type InitReducerActionsType = ErrorACType | isFetchingACType







