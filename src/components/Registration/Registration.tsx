import React from 'react'
import classes from './Registration.module.scss'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../reducers/store'
import {LOGIN} from '../../route'
import Preloader from '../common/Preloader/Preloader'
import {registrationTC} from '../../reducers/registration-reducer'
import {useFormik} from 'formik'
import {FormErrorType, RegistrationParamsType} from '../../api/auth-api'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'
import {checkNumberSymbols, emptyField, validateEmail} from '../../utlis/validates'

const validate = (values: RegistrationParamsType) => {
   const errors: FormErrorType = {}

   errors.email = emptyField(values.email)
   errors.email = validateEmail(values.email)

   errors.password = emptyField(values.password)
   errors.password = checkNumberSymbols(values.password, 8)

   if (values.repeatPassword) {
      errors.repeatPassword = emptyField(values.repeatPassword)
      errors.repeatPassword = checkNumberSymbols(values.repeatPassword, 8)
   }

   if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'Incorrect repeated password'
   }

   return errors
}


const Registration = () => {
   const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
   const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         repeatPassword: '',
      },
      validate,
      onSubmit: values => {
         const payload = {
            email: values.email,
            password: values.password,
         }
         dispatch(registrationTC(payload))
      },
   })

   if (isRegistered) {
      return <Redirect to={LOGIN}/>
   }

   return (
      <div className={classes.container}>

         {requestIsFetching && <Preloader/>}
         {errorMsg && <p><strong>{errorMsg}</strong></p>}

         <h1>Registration</h1>

         <form onSubmit={formik.handleSubmit}>

            <div className={classes.formItem}>
               <Input labelTitle={'Email address'}
                      error={formik.errors.email}
                      {...formik.getFieldProps('email')}/>
            </div>

            <div className={classes.formItem}>
               <Input
                  labelTitle={'Password'}
                  type='password'
                  error={formik.errors.password}
                  {...formik.getFieldProps('password')}/>
            </div>

            <div className={classes.formItem}>
               <Input labelTitle={'Repeat Password'}
                      type='password'
                      error={formik.errors.repeatPassword}
                      {...formik.getFieldProps('repeatPassword')}/>
            </div>

            <Button
               labelTitle={'Submit'}
               type="submit"
               disabled={formik.values.password !== formik.values.repeatPassword}/>
         </form>
      </div>
   )
}

export default Registration
