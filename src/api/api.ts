import axios from 'axios'


const settings = {
   withCredentials: true,
   headers: {
      'token': '3579de60-32da-11ea-b98b-2dd305a3a42a',
   },
}
const instance = axios.create({
   // baseURL: 'http://localhost:7542/2.0/',
   baseURL: 'https://neko-back.herokuapp.com/2.0/',
})


export const authAPI = {
   login(data: LoginParamsType) {
      return instance.post<any>('auth/login', {data})
   },
   forgot(data: { email: string, from: string, message: string }) {
      return instance.post<{ answer: boolean, html: boolean, info: string, success: boolean }>('auth/forgot', data)
   },
    sendNewPassword(data: { password: string, resetPasswordToken: string }) {
      return instance.post<any>('auth/set-new-password', data)
   },
}


export type LoginParamsType = {
   password: string,
   email: string,
   rememberMe: boolean
}
