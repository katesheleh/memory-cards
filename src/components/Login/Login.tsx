import React from 'react';
import styles from './Login.module.css';
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {loginTC} from "../../reducers/login-reducer";
import {LOGIN, PROFILE, REGISTRATION, RESTORE_PASSWORD} from "../../route";
import Preloader from "../common/Preloader/Preloader";
import {useFormik} from "formik";
import {FormErrorType, LoginParamsType} from "../../api/api";

const validate = (values: LoginParamsType) => {
    const errors: FormErrorType = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be more than 8 characters';
    }
    return errors;
};

const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: (values: LoginParamsType) => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Redirect to={PROFILE}/>
    }

    return (
<div>
    <h1>Login</h1>
    <form onSubmit={formik.handleSubmit}>

        {requestIsFetching && <Preloader/>}
        {errorMsg && <p><strong>{errorMsg}</strong></p>}

        <label htmlFor="email">Email Address</label>
        <input
            {...formik.getFieldProps('email')}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <br/>
        <label htmlFor="password">Password</label>
        <input
            type='password'
            {...formik.getFieldProps('password')}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <br/>
        <label htmlFor="password">remember me</label>
        <input
            type='checkbox'
            {...formik.getFieldProps('rememberMe')}
        />
        <br/>
        <button type="submit">Submit</button>
    </form>
    <br/>

    <NavLink to={RESTORE_PASSWORD}>Forgot Password?</NavLink>
    <br/>
    <NavLink to={REGISTRATION}>Registration</NavLink>
</div>
    );
};

export default Login;