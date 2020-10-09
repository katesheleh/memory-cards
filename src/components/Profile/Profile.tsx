import React, {useEffect, useState} from 'react';
import classes from './Profile.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {LoginResponseType} from "../../api/auth-api";
import {LOGIN, PACKS} from "../../route";
import {Link, Redirect} from "react-router-dom";
import {setIsLoggedInAC, logoutTC, authSucessTC} from "../../reducers/login-reducer";
import Button from "../common/Button/Button";
import noUserImage from '../../assets/images/no_profile_image_placeholder.jpg';

const Profile = () => {

    const userData = useSelector<AppRootStateType, LoginResponseType>(state => state.login.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(authSucessTC())
        }
    }, [])

    const setLogOut = () => {
        dispatch(logoutTC())
        dispatch(setIsLoggedInAC(false))
    }

    if (!isLoggedIn) {
        return <Redirect to={LOGIN}/>
    }

    return (
        <>
            <div className={classes.container}>
                <h1>Profile</h1>
            </div>
            <div className={classes.container}>
                <div className={classes.colLeft}>
                    <div className={classes.banner}>
                        <img className={classes.img}
                             src={userData.avatar || noUserImage} alt={userData.name}
                             width={250}/>
                    </div>
                </div>
                <div className={classes.colRight}>
                    <h3>{userData.name}</h3>
                    <p><strong>Email: </strong> {userData.email}</p>
                    <p><strong>Card
                        Packs: </strong> {userData.publicCardPacksCount} {userData.publicCardPacksCount > 1 ? 'packs' : 'pack'}
                    </p>
                    <p><Link to={PACKS}><Button labelTitle={'See card packs'}/></Link></p>
                    <p onClick={setLogOut} className={classes.link}>Logout</p>
                </div>
            </div>
        </>
    )
}

export default React.memo(Profile)