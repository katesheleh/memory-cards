import {Dispatch} from "redux";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {cardsAPI, CardsType} from "../api/cards-api";

let initialState = {
    getCards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, getCards: action.getCards}
        default:
            return state;
    }
}

// AC
export const setCardsAC = (getCards: CardsType[]) => ({type: 'SET_CARDS', getCards} as const)


// thunks
export const getCardsTC = (cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    cardsAPI.getCards(cardsPack_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(setCardsAC(res.data.getCards))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}


type InitialStateType = {
    getCards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}

type ActionsType = setCardsACType


export type setCardsACType = ReturnType<typeof setCardsAC>


