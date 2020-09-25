import React from 'react'
import classes from './RestorePassword.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getEmailConfirmation} from '../../reducers/restorePassword-reducer'
import {AppRootStateType} from '../../reducers/store'
import {useFormik} from 'formik'
import Input from '../common/Input/Input'
import Preloader from '../common/Preloader/Preloader'

const validate = (values: {email: string}) => {
   const errors = {} as any

   if (!values.email) {
      errors.email = 'Required'
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
   }

   return errors
}

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
      validate,
      onSubmit: values => {
         dispatch(getEmailConfirmation(values.email))
      },
   })

   return (
      <div className={classes.container}>
         <h1>Restore password</h1>
         {requestIsFetching && <Preloader/>}
         {errorMsg && <p><strong>{errorMsg}</strong></p>}
         {formik.errors.email ? <div>{formik.errors.email}</div> : null}
         {
            success &&
            <div style={{color: 'green'}}>
                Check your email: <a href={`mailto:${selectedEmail}`}>{selectedEmail}</a>
                and follow the link in there
            </div>
         }
         <form onSubmit={formik.handleSubmit}>
            <Input labelTitle={'Email:'} {...formik.getFieldProps('email')}/>
            <button type="submit">send</button>
         </form>
      </div>
   )
}

export default RestorePassword
