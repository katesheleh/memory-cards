import axios from 'axios'


const instance = axios.create({
    //baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', data)
    },
    authMe() {
        return instance.post<LoginResponseType>('auth/me')
    },
    logout() {
        return instance.delete<LoginResponseType>('auth/me')
    },
    forgot(data: ForgotParamsType) {
        return instance.post<ForgotResponseType>('auth/forgot', data)
    },
    sendNewPassword(data: NewPasswordParamsType) {
        return instance.post<any>('auth/set-new-password', data)
    },
    registration(data: RegistrationParamsType) {
        return instance.post<RegistrationResponseType>('auth/register', data)
    },
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

