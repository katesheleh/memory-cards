const initialState: Array<InitialStateType> = []

export const profileReducer = (state: Array<InitialStateType> = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'GET_USER_DATA':
            return [...state]

        default:
            return state;
    }
}

export const exampleAC = (arrayData: InitialStateType[]) => ({type: 'GET_USER_DATA', arrayData} as const)

// TYPES
export type InitialStateType = {}

export type ActionsType = exampleACType

export type exampleACType = ReturnType<typeof exampleAC>
