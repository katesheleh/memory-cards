import React, {useEffect} from 'react';
import styles from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {LoginResponseType} from "../../api/api";
import {getUserDataTC} from "../../reducers/profile-reducer";
import {LOGIN, PROFILE} from "../../route";
import {Redirect} from "react-router-dom";
import {setIsLoggedInAC} from "../../reducers/login-reducer";

const Profile = () => {

    const userData = useSelector<AppRootStateType, LoginResponseType>(state => state.profile.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
    const dispatch = useDispatch()

    const setLogOut = () => {
        dispatch(setIsLoggedInAC(false))
    }

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])


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
            <button onClick={setLogOut}>LogOut</button>
        </div>
    )
}

export default Profile;