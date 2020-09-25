import React, {ChangeEvent} from 'react'
import {useParams} from 'react-router-dom'
import classes from './NewPassword.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setNewPassword} from '../../reducers/newPassword-reducer'
import {AppRootStateType} from '../../reducers/store'
import {Redirect} from 'react-router-dom'
import {LOGIN} from '../../route'
import Input from '../common/Input/Input'
import Preloader from '../common/Preloader/Preloader'

const NewPassword = () => {

   const dispatch = useDispatch()
   const {token} = useParams()
   const success = useSelector<AppRootStateType, null | boolean>(state => state.newPsw.success)
   const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
   const errorMsg = useSelector<AppRootStateType, string>(state => state.request.error)

   const [firstNewPassword, setFirstNewPassword] = React.useState<string>('')
   const [secondNewPassword, setSecondNewPassword] = React.useState<string>('')
   const [error, setError] = React.useState<string>('')

   const handleSetFirstNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
      setError('')
      setFirstNewPassword(e.currentTarget.value)
   }
   const handleSetSecondNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
      setError('')
      setSecondNewPassword(e.currentTarget.value)
   }

   const onClickSend = () => {
      if (firstNewPassword.trim() === secondNewPassword.trim() && firstNewPassword.trim() !== '') {
         setFirstNewPassword('')
         setSecondNewPassword('')
         dispatch(setNewPassword(secondNewPassword.trim(), token))
      } else if (firstNewPassword.trim() !== '' && firstNewPassword.trim() !== secondNewPassword.trim()) {
         setError('Password mismatch')
      } else {
         setError('Check your new password')
      }
   }

   if (success) {
      return <Redirect to={LOGIN}/>
   }

   return (
      <div className={classes.container}>
         <h1>New password</h1>
         {requestIsFetching && <Preloader/>}
         {errorMsg && <p><strong>{errorMsg}</strong></p>}
         <div>
            <div>
               <Input type="password"
                      value={firstNewPassword}
                      labelTitle={'Enter a new password:'}
                      onChange={handleSetFirstNewPassword}/>
            </div>

            <div>
               <Input type="password" id="second_password"
                      value={secondNewPassword}
                      labelTitle={'Confirm password:'}
                      onChange={handleSetSecondNewPassword}/>
            </div>

            {error && <div className={classes.errorMsg}>{error}</div>}
            <button className={classes.btn}
                    onClick={onClickSend}
                    disabled={!firstNewPassword.trim() || !secondNewPassword.trim()}>send
            </button>
         </div>
      </div>
   )
}

export default NewPassword
