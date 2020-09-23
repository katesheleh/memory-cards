import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './Login.module.css';
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {loginTC} from "../../reducers/login-reducer";
import {PROFILE} from "../../route";
import Preloader from "../common/Preloader/Preloader";

const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
    const dispatch = useDispatch();

    const [email, setEmail] = useState("nya-admin@nya.nya")
    const [password, setPassword] = useState("1qazxcvBG")
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [email])

    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [password])

    const onCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }, [rememberMe])

    const onSubmit = () => {
        dispatch(loginTC({email, password, rememberMe}))
    }

    if (isLoggedIn) {
        return <Redirect to={PROFILE}/>
    }

    return (
        <div>
            {requestIsFetching && <Preloader/>}
            {errorMsg && <p><strong>{errorMsg}</strong></p>}
            <input type="text" value={email} onChange={onEmailChange}/>
            <input type="text" value={password} onChange={onPasswordChange}/>
            <input type="checkbox" checked={rememberMe} onChange={onCheckboxChange}/>
            <button type="submit" onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login;