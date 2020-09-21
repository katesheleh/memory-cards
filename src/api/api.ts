import axios from 'axios'


const settings = {
    withCredentials: true,
    headers: {
        'token': '3579de60-32da-11ea-b98b-2dd305a3a42a'
    }
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/'
})


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<any>('auth/login', {data})
    }
}


export type LoginParamsType = {
    password: string,
    email: string,
    rememberMe: boolean
}

