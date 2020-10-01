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
        case 'REMOVE_PACK':
            let newPack = {} as CardsPackType
            return {...state, cardPacks: state.cardPacks.filter((pack) => pack._id != action._id)}
        case 'ADD_PACK':
            return {...state, cardPacks: [action.newPack, ...state.cardPacks]}
        default:
            return state;
    }
}
// AC
export const setPacksAC = (cardPacks: CardsPackType[]) => ({type: 'SET_PACKS', cardPacks} as const)
export const removePackAC = (_id: string) => ({type: 'REMOVE_PACK', _id} as const)
export const addPackAC = (newPack: CardsPackType) => ({type: 'ADD_PACK', newPack} as const)

// thunks
export const getPackTC = (user_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.getCardPacksUser(user_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(setPacksAC(res.data.cardPacks))
        })
        .catch((error) => {
            //dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

export const removePackTC = (_id: string, user_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.removeCardPack(_id)
        .then(res => {
            debugger
            dispatch(isFetchingAC(false))
            dispatch(removePackAC(_id))
            dispatch(getPackTC(user_id))
        })
        .catch((error) => {
            //dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

export const addPackTC = (name: string, user_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.addCardPack(name)
        .then(res => {
            debugger
            dispatch(isFetchingAC(false))
            dispatch(getPackTC(user_id))
        })
        .catch((error) => {
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

type ActionsType = setPacksACType | removePackACType | addPackACType | any


export type setPacksACType = ReturnType<typeof setPacksAC>
export type removePackACType = ReturnType<typeof removePackAC>
export type addPackACType = ReturnType<typeof addPackAC>


