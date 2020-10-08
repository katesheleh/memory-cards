import {instance} from "./api";
import {EditCardPackType} from "../reducers/pack-reducer";


export const packAPI = {
    addCardPack(name: string, privatePack: boolean) {
        return instance.post<NewCardsPackResponseType>(`cards/pack`, {
            cardsPack: {
                name: name,
                private: privatePack
            }
        })
    },
    editCardPack(_id: string, model: EditCardPackType) {
        return instance.put<NewCardsPackResponseType>(`cards/pack`, {
            cardsPack: {
                _id: _id,
                name: model.name,
                private: model.private,
                rating: model.rating
            }
        })
    },
    removeCardPack(pack_id: string) {
        return instance.delete<CardsPackResponseType>(`cards/pack?id=${pack_id}`)
    },
    getCardPacks(user_id?: string, searchName?: string, min?: number, max?: number, sortPacks?: string, page?: number, pageCount?: number) {
        return instance.get<CardsPackResponseType>(`cards/pack`
            + (user_id? `?user_id=${user_id}` : '')
            + (searchName? `?packName=${searchName}` : '?')
            + (max ? `&min=${min}&max=${max}` : '')
            + (sortPacks ? `&sortPacks=${sortPacks}` : '')
            + (page ? `&page=${page}` : '')
            + (pageCount ? `&pageCount=${pageCount}` : '')
        )
    }
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
    cardsCount: number
    created: string
    //deckCover: string
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

export type CardsPackType = {
    cardsCount: number
    created: string
    //deckCover: string
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