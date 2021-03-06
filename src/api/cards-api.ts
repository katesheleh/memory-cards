import {instance} from "./api";
import {EditCardModelType} from "../reducers/cards-reducer";
import {CardsPackResponseType} from "./pack-api";


export const cardsAPI = {
    getCards(cardsPack_id: string, pageCount?:number) {
        return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${cardsPack_id}${pageCount ? '&pageCount=' + pageCount : ''}`)
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post<AddCardResponseType>(`cards/card`, {
            card: {cardsPack_id, question, answer}
        })
    },

    editCard(_id: string, model: EditCardModelType) {
        return instance.put<CardsResponseType>(`cards/card`, {
            card: {
                _id: _id,
                question: model.question,
                answer: model.answer
            }
        })
    },
    removeCard(_id: string) {
        return instance.delete<CardsResponseType>(`cards/card?id=${_id}`)
    },
    searchCards(cardsPack_id: string, cardsAnswer?: string, cardsQuestion?: string, min?: number, max?: number, sortCards?: string, page?: number, pageCount?: number) {
        return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${cardsPack_id}`
            + (cardsAnswer ? `&cardAnswer=${cardsAnswer}` : '')
            + (cardsQuestion ? `&cardQuestion=${cardsQuestion}` : '')
            + (max ? `&min=${min}&max=${max}` : '')
            + (sortCards ? `&sortCards=${sortCards}` : '')
            + (page ? `&page=${page}` : '')
            + (pageCount ? `&pageCount=${pageCount}` : '')
        )
    },

    putGrade(data: PutGradeParamsType) {
        return instance.put<PutGradeResponseType>(`cards/grade`, data)
    }
}

export type CardsResponseType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}

export type AddCardResponseType = {
    newCard: NewCardType
    token: string
    tokenDeathTime: number
}

export type NewCardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
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

export type PutGradeParamsType = {
    grade: number
    card_id: string
}

export type PutGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}
