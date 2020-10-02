import React from 'react'
import classes from './Registration.module.scss'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../reducers/store'
import {LOGIN} from '../../route'
import Preloader from '../common/Preloader/Preloader'
import {registrationTC} from '../../reducers/registration-reducer'
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
   repeatPassword: Yup.string()
      .required('Required')
      .min(8, 'Must be 8 characters or less'),
})

const Registration = () => {
   const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         repeatPassword: '',
      },
      validationSchema,
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

export default React.memo(Registration)
