import React from 'react';
import styles from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {LoginResponseType} from "../../api/auth-api";
import {LOGIN, PROFILE} from "../../route";
import {Redirect} from "react-router-dom";
import {setIsLoggedInAC} from "../../reducers/login-reducer";
import {logoutTC} from "../../reducers/profile-reducer";
import Pack from "../Pack/Pack";
import Button from "../common/Button/Button";

const Profile = () => {

    const userData = useSelector<AppRootStateType, LoginResponseType>(state => state.login.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

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
            <div><img src={userData.avatar} alt={userData.name} width={200}/></div>
            <Button onClick={setLogOut} labelTitle={'LogOut'}/>
            <Pack/>
        </div>
    )
}

export default Profile;