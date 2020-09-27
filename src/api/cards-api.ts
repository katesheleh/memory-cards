import {instance} from "./api";


export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<CardsType>(`cards/card?cardsPack_id=${cardsPack_id}`)
    },
}


export type CardsResponseType = {
    cards: Array<CardsType>
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


export type LoginParamsType = {
    password: string,
    email: string,
    rememberMe: boolean
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод

    created: string
    updated: string
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error: string;
}

export type AddedUserType = {
    email: string,
    isAdmin: boolean,
    __v: number,
    _id: string
}

export type RegistrationResponseType = {
    addedUser: AddedUserType,
    success: boolean
}

export type LoginResponseErrorType = {
    body: LoginParamsType
    error: string
    method: string
    query: {}
    url: string
}

export type ForgotParamsType = {
    email: string
    from: string
    message: string
}

export type ForgotResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

export type NewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export type RegistrationParamsType = {
    email: string
    password: string
    repeatPassword?: string
}

export type FormErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
    rememberMe?: boolean
}

