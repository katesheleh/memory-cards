import React from 'react';
import styles from './Registration.module.css';
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {LOGIN} from "../../route";
import Preloader from "../common/Preloader/Preloader";
import {registrationTC} from "../../reducers/registration-reducer";
import {useFormik} from "formik";
import {FormErrorType, RegistrationParamsType} from "../../api/api";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

const validate = (values: RegistrationParamsType) => {
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

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Required';
    } else if (values.repeatPassword.length < 8) {
        errors.repeatPassword = 'Must be more than 8 characters';
    } else if (values.repeatPassword !== values.password) {
        errors.repeatPassword = 'Incorrect repeated password';
    }

    return errors;
};


const Registration = () => {
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate,
        onSubmit: values => {
            const payload = {
                email: values.email,
                password: values.password
            }
            dispatch(registrationTC(payload))
        },
    });

    if (isRegistered) {
        return <Redirect to={LOGIN}/>
    }

    return (
        <div className={styles.registration}>
            <h1>Registration</h1>
            <form onSubmit={formik.handleSubmit}>

                {requestIsFetching && <Preloader/>}
                {errorMsg && <p><strong>{errorMsg}</strong></p>}
                <br/>
                <Input
                    labelTitle={'Email Address:'}
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <br/>
                <Input
                    labelTitle={'Password:'}
                    type='password'
                    {...formik.getFieldProps('password')}
                />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <br/>
                <Input
                    labelTitle={'Repeat Password:'}
                    type='password'
                    {...formik.getFieldProps('repeatPassword')}
                />
                {formik.errors.repeatPassword ? <div>{formik.errors.repeatPassword}</div> : null}
                <br/>
                <Button
                    labelTitle={'Submit'}
                    type="submit"
                    disabled={formik.values.password !== formik.values.repeatPassword}
                />
            </form>
        </div>
    );
};

export default Registration;