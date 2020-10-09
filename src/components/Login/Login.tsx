import React from 'react'
import classes from './Login.module.scss'
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../reducers/store'
import {loginTC} from '../../reducers/login-reducer'
import {PROFILE, REGISTRATION, RESTORE_PASSWORD} from '../../route'
import Preloader from '../common/Preloader/Preloader'
import {useFormik} from 'formik'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'
import * as Yup from 'yup'

const validationSchema = () => Yup.object({
   email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
   password: Yup.string()
      .required('Required')
      .min(8, 'Must be 8 characters or less'),
})

const Login = () => {
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: 'vladzyaba@mail.ru',
         password: 'qwerty12345',
         rememberMe: false,
      },
      validationSchema,
      onSubmit: values => {
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

export default React.memo(Login)