const initialState: Array<InitialStateType> = []

export const restorePswReducer = (state: Array<InitialStateType> = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'EXAMPLE':
            return [...state]

        default:
            return state;
    }
}

export const exampleAC = (arrayData: InitialStateType[]) => ({type: 'EXAMPLE', arrayData} as const)

// TYPES
export type InitialStateType = {}

export type ActionsType = exampleACType

export type exampleACType = ReturnType<typeof exampleAC>
