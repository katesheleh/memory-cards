import React from 'react'
import {useParams} from 'react-router-dom'
import classes from './NewPassword.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setNewPassword} from '../../reducers/newPassword-reducer'
import {AppRootStateType} from '../../reducers/store'
import {Redirect} from 'react-router-dom'
import {LOGIN} from '../../route'
import Input from '../common/Input/Input'
import Preloader from '../common/Preloader/Preloader'
import Button from '../common/Button/Button'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const validationSchema = () => Yup.object({
   firstNewPassword: Yup.string()
      .required('Required')
      .min(8, 'Must be 8 characters or less'),
   secondNewPassword: Yup.string()
      .required('Required')
      .min(8, 'Must be 8 characters or less'),
})

const NewPassword = () => {

   const dispatch = useDispatch()
   const {token} = useParams()
   const success = useSelector<AppRootStateType, null | boolean>(state => state.newPsw.success)
   const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)

   const formik = useFormik({
      initialValues: {
         firstNewPassword: '',
         secondNewPassword: '',
      },
      validationSchema,
      onSubmit: values => {
         dispatch(setNewPassword(values.firstNewPassword.trim(), token))
      },
   })

   if (success) {
      return <Redirect to={LOGIN}/>
   }

   return (
      <div className={classes.container}>
         <h1>New password</h1>

         {requestIsFetching && <Preloader/>}
         {errorMsg && <p><strong>{errorMsg}</strong></p>}

         <form onSubmit={formik.handleSubmit}>

            <div className={classes.inputWrapper}>
               <Input type="password"
                      labelTitle={'Enter a new password:'}
                      error={formik.errors.firstNewPassword}
                      {...formik.getFieldProps('firstNewPassword')}/>
            </div>

            <div className={classes.inputWrapper}>
               <Input type="password"
                      labelTitle={'Confirm password:'}
                      error={formik.errors.secondNewPassword}
                      {...formik.getFieldProps('secondNewPassword')}/>
            </div>

            <Button labelTitle={'Send'}
                    type="submit"
                    disabled={
                       formik.values.firstNewPassword !== formik.values.secondNewPassword
                       || !!formik.errors.firstNewPassword
                       || !!formik.errors.secondNewPassword
                    }>Send
            </Button>
         </form>
      </div>
   )
}

export default NewPassword
