import {instance} from "./api";


export const packAPI = {
    getCardPacksUser(user_id: string) {
        return instance.get<CardsPackResponseType>(`cards/pack?user_id=${user_id}`)
    },
    getCardPacksAll() {
        return instance.get<CardsPackResponseType>(`cards/pack`)
    },
}


export type CardsPackResponseType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardsPackType = {
    cardsCount: number
    created: string
    deckCover: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}