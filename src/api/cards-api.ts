import {instance} from "./api";


export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${cardsPack_id}&pageCount=20`)
    },
}


export type CardsResponseType = {
    getCards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}