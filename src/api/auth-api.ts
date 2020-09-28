import {instance} from './api'


export const authAPI = {
   login: (data: LoginParamsType) =>
      instance.post<LoginResponseType>('auth/login', data),
   authMe: () =>
      instance.post<LoginResponseType>('auth/me'),
   logout: () =>
      instance.delete<LoginResponseType>('auth/me'),
   forgot: (data: ForgotParamsType) =>
      instance.post<ForgotResponseType>('auth/forgot', data),
   sendNewPassword: (data: NewPasswordParamsType) =>
      instance.post<NewPasswordResponseType>('auth/set-new-password', data),
   registration: (data: RegistrationParamsType) =>
      instance.post<RegistrationResponseType>('auth/register', data),
}

// TYPES

export type LoginParamsType = {
   password: string,
   email: string,
   rememberMe: boolean,
}

export type LoginResponseType = {
   _id: string,
   email: string,
   name: string,
   avatar?: string,
   publicCardPacksCount: number, // количество колод

   created: string,
   updated: string,
   isAdmin: boolean,
   verified: boolean, // подтвердил ли почту
   rememberMe: boolean,

   error: string,
}

export type AddedUserType = {
   email: string,
   isAdmin: boolean,
   __v: number,
   _id: string,
}

export type RegistrationResponseType = {
   addedUser: AddedUserType,
   success: boolean,
}

// export type LoginResponseErrorType = {
//    body: LoginParamsType,
//    error: string,
//    method: string,
//    query: {},
//    url: string,
// }

export type ForgotParamsType = {
   email: string,
   from: string,
   message: string,
}

export type ForgotResponseType = {
   answer: boolean,
   html: boolean,
   info: string,
   success: boolean,
}

export type NewPasswordParamsType = {
   password: string,
   resetPasswordToken: string,
}

export type NewPasswordResponseType = {
   info: string,
}

export type RegistrationParamsType = {
   email: string,
   password: string,
   repeatPassword?: string,
}

export type FormErrorType = {
   email?: string,
   password?: string,
   repeatPassword?: string,
   rememberMe?: boolean,
}

