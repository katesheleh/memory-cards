import {Dispatch} from "redux";
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {CardsPackType, packAPI} from "../api/pack-api";

let initialState = {
    cardPacks: [] as CardsPackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0
}


export const packReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS':
            return {...state, cardPacks: action.cardPacks}
        default:
            return state;
    }
}
// AC
export const setPacksAC = (cardPacks: CardsPackType[]) => ({type: 'SET_PACKS', cardPacks} as const)


// thunks
export const getPackTC = (user_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.getCardPacksUser(user_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(setPacksAC(res.data.cardPacks))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}


type InitialStateType = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type ActionsType = setPacksACType


export type setPacksACType = ReturnType<typeof setPacksAC>


