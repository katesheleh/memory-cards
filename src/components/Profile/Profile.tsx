import React, {useEffect, useState} from 'react';
import styles from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {LoginResponseType} from "../../api/auth-api";
import {LOGIN, PACKS, PROFILE} from "../../route";
import {Link, Redirect} from "react-router-dom";
import {setIsLoggedInAC, logoutTC, authSucessTC} from "../../reducers/login-reducer";
import Button from "../common/Button/Button";

const Profile = () => {

    const userData = useSelector<AppRootStateType, LoginResponseType>(state => state.login.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            handleAuth()
        }
    }, [])

    const handleAuth = async () => {
        await dispatch(authSucessTC());
    }

    const setLogOut = () => {
        dispatch(logoutTC())
        dispatch(setIsLoggedInAC(false))
    }

    if (!isLoggedIn) {
        return <Redirect to={LOGIN}/>
    }

    return (
        <div>
            <h1>Profile</h1>
            <h3>name: {userData.name}</h3>
            <p>email: {userData.email}</p>
            <p>publicCardPacksCount: {userData.publicCardPacksCount}</p>
            <p><u><Link to={PACKS}>See my card packs</Link></u></p>
            <div><img src={userData.avatar} alt={userData.name} width={200}/></div>
            <Button onClick={setLogOut} labelTitle={'LogOut'}/>
        </div>
    )
}

export default React.memo(Profile)