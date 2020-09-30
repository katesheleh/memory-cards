import {instance} from "./api";


export const packAPI = {
    getCardPacksUser(user_id: string) {
        return instance.get<CardsPackResponseType>(`cards/pack?user_id=${user_id}&pageCount=20`)
    },
    getCardPacksAll() {
        return instance.get<CardsPackResponseType>(`cards/pack`)
    },
    addCardPack(name: string) {
        return instance.post<NewCardsPackResponseType>(`cards/pack`, {
            cardsPack: {
                name: name
            }
        })
    },
    removeCardPack(pack_id: string) {
        return instance.delete<CardsPackResponseType>(`cards/pack?id=${pack_id}`)
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

export type NewCardsPackResponseType = {
    newCardsPack: newCardsType
}

export type newCardsType = {
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    deckCover: string
    private: boolean
    type: string
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