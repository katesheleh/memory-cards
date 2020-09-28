import React from 'react'
import classes from './Login.module.scss'
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../reducers/store'
import {loginTC} from '../../reducers/login-reducer'
import {PROFILE, REGISTRATION, RESTORE_PASSWORD} from '../../route'
import Preloader from '../common/Preloader/Preloader'
import {useFormik} from 'formik'
import {FormErrorType, LoginParamsType} from '../../api/auth-api'
import {emptyField, validateEmail, checkNumberSymbols} from '../../utlis/validates'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'

const validate = (values: LoginParamsType) => {
   const errors: FormErrorType = {}
   errors.email = emptyField(values.email)
   errors.email = validateEmail(values.email)
   errors.password = emptyField(values.password)
   errors.password = checkNumberSymbols(values.password, 8)
   return errors
}

const Login = () => {
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
   const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
      validate,
      onSubmit: (values: LoginParamsType) => {
         dispatch(loginTC(values))
      },
   })

   if (isLoggedIn) {
      return <Redirect to={PROFILE}/>
   }

   return (
      <div className={classes.container}>
         <h1>Login</h1>
         <form onSubmit={formik.handleSubmit}>

            {requestIsFetching && <Preloader/>}
            {errorMsg && <p><strong>{errorMsg}</strong></p>}

            <div className={classes.formItem}>
               <Input labelTitle={'Email'}
                      error={formik.errors.email}
                      {...formik.getFieldProps('email')}/>
            </div>

            <div className={classes.formItem}>
               <Input type='password'
                      labelTitle={'Password'}
                      error={formik.errors.password}
                      {...formik.getFieldProps('password')}/>
            </div>

            <div className={classes.formItem}>
               <label htmlFor="password">remember me</label>
               <input
                  type='checkbox'
                  {...formik.getFieldProps('rememberMe')}/>
            </div>

            <Button type="submit" labelTitle={'Send'}/>
         </form>

         <div className={classes.subLinks}>
            <NavLink to={RESTORE_PASSWORD}>Forgot Password?</NavLink>
            <NavLink to={REGISTRATION}>Registration</NavLink>
         </div>

      </div>
   )
}

export default Login