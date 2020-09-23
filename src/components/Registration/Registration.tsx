import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './Registration.module.css';
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {LOGIN} from "../../route";
import Preloader from "../common/Preloader/Preloader";
import {registrationTC} from "../../reducers/registration-reducer";

const Registration = () => {
  const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
  const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
  const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")

  const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }, [email])

  const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }, [password])

  const onRepeatedPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRepeatedPassword(e.currentTarget.value)
  }, [repeatedPassword])


  const onSubmit = () => {
    dispatch(registrationTC({email, password}))
  }

  if (isRegistered) {
    return <Redirect to={LOGIN}/>
  }

  return (
      <div>
        {requestIsFetching && <Preloader/>}
        {errorMsg && <p><strong>{errorMsg}</strong></p>}
        <input type="text" value={email} onChange={onEmailChange}/>
        <input type="text" value={password} onChange={onPasswordChange}/>
        <input type="text" value={repeatedPassword} onChange={onRepeatedPasswordChange}/>
        <button type="submit" onClick={onSubmit} disabled={password !== repeatedPassword}>Registration</button>
        <a href={'memory-cards#/login'}>Sign in</a>
      </div>
  )
}

export default Registration;