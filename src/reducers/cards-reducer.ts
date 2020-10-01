import {Dispatch} from "redux";
import {ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {cardsAPI, CardsType, NewCardType} from "../api/cards-api";

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
        case 'ADD_CARD':
            return {...state, getCards: [action.newCard, ...state.getCards]}
        case 'REMOVE_CARD':
            return {...state, getCards: state.getCards.filter((c) => c._id != action._id)}
        case 'EDIT_CARD':
            return {
                ...state,
                getCards: state.getCards.map(p => p._id === action.card_id ? {...p, ...action.model} : p)
            }
        default:
            return state;
    }
}

// AC
export const setCardsAC = (getCards: CardsType[]) => ({type: 'SET_CARDS', getCards} as const)
export const addCardAC = (newCard: NewCardType) => ({type: 'ADD_PACK', newCard} as const)
export const removeCardAC = (_id: string) => ({type: 'REMOVE_CARD', _id} as const)
export const editCardAC = (card_id: string, model: EditCardModelType) => ({type: 'EDIT_CARD', card_id, model} as const)

// thunks
export const getCardsTC = (cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    cardsAPI.getCards(cardsPack_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(setCardsAC(res.data.getCards))
        })
        .catch((error) => {
            //dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

export const addCardTC = (cardsPack_id: string, question: string, answer: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    cardsAPI.addCard(cardsPack_id, question, answer)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(addCardAC(res.data.newCard))
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(isFetchingAC(false))
        })
}

export const removeCardTC = (_id: string, cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    cardsAPI.removeCard(_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(removeCardAC(_id))
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(isFetchingAC(false))
        })
}

export const editCardTC = (card_id: string, model: EditCardModelType, cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    cardsAPI.editCard(card_id, model)
        .then(res => {
            dispatch(isFetchingAC(false))
            editCardAC(card_id, model)
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((error) => {
            console.log(error.response.data.error)
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

type ActionsType = setCardsACType | addCardACType | RemoveCardType | any


export type setCardsACType = ReturnType<typeof setCardsAC>
export type addCardACType = ReturnType<typeof addCardAC>
export type RemoveCardType = ReturnType<typeof removeCardAC>


export type EditCardModelType = {
    question?: string
    answer?: string
}


