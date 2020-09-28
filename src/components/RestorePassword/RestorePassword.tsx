import React from 'react'
import classes from './RestorePassword.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getEmailConfirmation} from '../../reducers/restorePassword-reducer'
import {AppRootStateType} from '../../reducers/store'
import {useFormik} from 'formik'
import Input from '../common/Input/Input'
import Preloader from '../common/Preloader/Preloader'
import Button from '../common/Button/Button'
import * as Yup from 'yup';

const validationSchema = (values: { email: string }) => Yup.object({
   email: Yup.string().email('Invalid email address').required('Required'),
})

const RestorePassword = () => {

   const dispatch = useDispatch()
   const success = useSelector<AppRootStateType, boolean>(state => state.restorePsw.success)
   const selectedEmail = useSelector<AppRootStateType, string>(state => state.restorePsw.selectedEmail)
   const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)

   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema,
      onSubmit: values => {
         dispatch(getEmailConfirmation(values.email))
      },
   })

   return (
      <div className={classes.container}>
         <h1>Restore password</h1>
         {requestIsFetching && <Preloader/>}
         {errorMsg && <p><strong>{errorMsg}</strong></p>}
         {
            success &&
            <div style={{color: 'green', marginBottom: '10px'}}>
                Check your email:{' '}<a href={`mailto:${selectedEmail}`}>{selectedEmail}</a>{' '}
                and follow the link in there
            </div>
         }

         <form onSubmit={formik.handleSubmit}>
            <div className={classes.inputWrapper}>
               <Input labelTitle={'Email:'}
                      error={formik.errors.email}
                      {...formik.getFieldProps('email')}/>
            </div>

            <Button type="submit" labelTitle={'send'} disabled={!!formik.errors.email}/>
         </form>
      </div>
   )
}

export default RestorePassword
