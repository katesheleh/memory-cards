import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const setCookie = (name: string, value: string) => {
    return cookies.set(name, value, {path: '/'});
}

export const getCookie = (name: string) => {
    return cookies.get(name)
}

