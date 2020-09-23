import React, {ChangeEvent} from 'react'
import classes from '../NewPassword/NewPassword.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {getEmailConfirmation} from '../../reducers/restorePassword-reducer'
import {AppRootStateType} from '../../reducers/store'

const RestorePassword = () => {

   const dispatch = useDispatch()
   const success = useSelector<AppRootStateType, boolean>(state => state.restorePsw.success)
   const selectedEmail = useSelector<AppRootStateType, string>(state => state.restorePsw.selectedEmail)
   const [email, setEmail] = React.useState<string>('')

   const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)

   const onClickSend = () => dispatch(getEmailConfirmation(email))

   return (
      <div className={classes.restorePasswordWrapper}>
         <h1>Restore password</h1>
         {
            success &&
            <div style={{color: 'green'}}>
                Check your email: <a href={`mailto:${selectedEmail}`}>{selectedEmail}</a>
                and follow the link in there
            </div>
         }
         <label>
            <span>enter your email:</span>
            <input type="text" value={email} onChange={handleSetEmail}/>
         </label>
         <button onClick={onClickSend} disabled={!email.trim()}>send</button>
      </div>
   )
}

export default RestorePassword
