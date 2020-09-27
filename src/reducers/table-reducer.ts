import {cardsAPI, CardsType} from "../api/cards-api";
import {Dispatch} from "redux";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";

let initialState = {
    cards: [
        {
            answer: '',
            question: '',
            cardsPack_id: '',
            grade: 0,
            rating: 0,
            shots: 0,
            type: '',
            user_id: '',
            created: '',
            updated: '',
            __v: 0,
            _id: '',
        }
    ]
}


export const tableReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, cards: action.cards}
        case 'GET_CARDS':
            //return {...state, cards: action.cardsPack_id}
        default:
            return state;
    }
}
// AC
export const setCardsAC = (cards: CardsType[]) => ({type: 'SET_CARDS', cards} as const)
export const getCardsAC = (cardsPack_id: string) => ({type: 'GET_CARDS', cardsPack_id} as const)
// thunks
export const getCardsTC = (cardsPack_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    cardsAPI.getCards(cardsPack_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            console.log(res)
            dispatch(getCardsAC(res.data.cardsPack_id))
            //dispatch(setCardsAC(res.data.cards))

        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}


type InitialStateType = {
    cards: Array<CardsType>
}

type ActionsType = getCardsACType | setCardsACType

export type getCardsACType = ReturnType<typeof getCardsAC>
export type setCardsACType = ReturnType<typeof setCardsAC>

