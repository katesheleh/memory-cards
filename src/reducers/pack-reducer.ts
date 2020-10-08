import {Dispatch} from "redux";
import {ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {CardsPackType, packAPI} from "../api/pack-api";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";

let initialState = {
    cardPacks: [] as CardsPackType[],
    cardPacksTotalCount: 0,
    packName: '',
    myPacks: false,
    min: 0,
    max: 100,
    sortPacks: '',
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
    token: '',
    tokenDeathTime: 0
}


export const packReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS':
            return {...state, cardPacks: action.cardPacks}
        case 'REMOVE_PACK':
            return {...state, cardPacks: state.cardPacks.filter((pack) => pack._id != action._id)}
        case 'ADD_PACK':
            return {...state, cardPacks: [action.newPack, ...state.cardPacks]}
        case 'SEARCH_PACK_NAME':
            return {...state, packName: action.packName}
        case 'SET_MIN_MAX_CARDS_COUNT':
            return {...state, min: action.newValues[0], max: action.newValues[1]}
        case 'SET_PAGE_COUNT':
            return {...state, pageCount: action.pageCount}
        case 'SET_PAGE':
            return {...state, page: action.page}
        case 'SET_MY_PACKS':
            return {...state, myPacks: action.myPacks}
        case 'SET_SORT_PACKS':
            return {...state, sortPacks: action.sortPacks}
        case 'SET_CARD_PACKS_TOTAL_COUNT':
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case 'EDIT_PACK':
            return {
                ...state,
                cardPacks: state.cardPacks.map(p => p._id === action.pack_id ? {...p, ...action.model} : p)
            }
        default:
            return state;
    }
}


// AC
export const setPacksAC = (cardPacks: CardsPackType[]) => ({type: 'SET_PACKS', cardPacks} as const)
export const removePackAC = (_id: string) => ({type: 'REMOVE_PACK', _id} as const)
export const addPackAC = (newPack: CardsPackType) => ({type: 'ADD_PACK', newPack} as const)
export const searchPackNameAC = (packName: string) => ({type: 'SEARCH_PACK_NAME', packName} as const)
export const setMinMAxCardsCountAC = (newValues: number[]) => ({type: 'SET_MIN_MAX_CARDS_COUNT', newValues} as const)
export const editPackAC = (pack_id: string, model: EditCardPackType) => ({type: 'EDIT_PACK', pack_id, model} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'SET_PAGE_COUNT', pageCount} as const)
export const setPageAC = (page: number) => ({type: 'SET_PAGE', page} as const)
export const setMyPacksAC = (myPacks: boolean) => ({type: 'SET_MY_PACKS', myPacks} as const)
export const setSortPacksAC = (sortPacks: string) => ({type: 'SET_SORT_PACKS', sortPacks} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'SET_CARD_PACKS_TOTAL_COUNT',
    cardPacksTotalCount
} as const)

// thunks

export const removePackTC = (_id: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.removeCardPack(_id)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(removePackAC(_id))
            dispatch(getPackTC())
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(isFetchingAC(false))
        })
}

export const addPackTC = (name: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.addCardPack(name)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(addPackAC(res.data.newCardsPack))
            dispatch(getPackTC())
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(isFetchingAC(false))
        })
}

export const editPackTC = (pack_id: string, model: EditCardPackType) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    packAPI.editCardPack(pack_id, model)
        .then(res => {
            dispatch(isFetchingAC(false))
            editPackAC(pack_id, model)
            dispatch(getPackTC())
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(isFetchingAC(false))
        })
}

export const getPackTC = () => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>, getState: () => AppRootStateType) => {
    const {packName, myPacks, min, max, sortPacks, page, pageCount} = getState().packs
    const user_id = myPacks ? getState().login.profile._id : undefined
    dispatch(isFetchingAC(true))
    packAPI.getCardPacks(user_id ,packName, min, max, sortPacks, page, pageCount)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(setPacksAC(res.data.cardPacks))
        })
        .catch((error) => {
            //dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

type InitialStateType = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number
    packName: string
    myPacks: boolean
    min: number
    max: number
    sortPacks: string
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type ActionsType =
    setPacksACType
    | removePackACType
    | addPackACType
    | editPackACType
    | searchPackNameACType
    | setMinMAxCardsCountACType
    | setPageCountACType
    | setPageACType
    | setSortPacksACType
    | setMyPacksACType
    | setCardPacksTotalCountACType
    | any


export type EditCardPackType = {
    name?: string
    private?: boolean
    rating?: number
}


export type setPacksACType = ReturnType<typeof setPacksAC>
export type removePackACType = ReturnType<typeof removePackAC>
export type addPackACType = ReturnType<typeof addPackAC>
export type searchPackNameACType = ReturnType<typeof searchPackNameAC>
export type setMinMAxCardsCountACType = ReturnType<typeof setMinMAxCardsCountAC>
export type editPackACType = ReturnType<typeof editPackAC>
export type setPageCountACType = ReturnType<typeof setPageCountAC>
export type setPageACType = ReturnType<typeof setPageAC>
export type setSortPacksACType = ReturnType<typeof setSortPacksAC>
export type setMyPacksACType = ReturnType<typeof setMyPacksAC>
export type setCardPacksTotalCountACType = ReturnType<typeof setCardPacksTotalCountAC>



