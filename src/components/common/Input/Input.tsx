import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import classes from './Input.module.scss'
import Icons from '../Icons/Icons'

type InputPropsType
   = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
   & { labelTitle?: string, error?: string }

const Input = (props: InputPropsType) => {

   const [showPassword, setShowPassword] = React.useState<boolean>(false)

   const handleShowPassword = () => {
      setShowPassword(prevState => !prevState)
   }

   const {labelTitle, error, ...restProps} = props
   const type = props.type === 'password' && !showPassword ? 'password' : 'text'

   return (
      <label className={classes.label}>
         {labelTitle && <span className={classes.label}>{labelTitle}</span>}
         <input {...restProps} type={type} className={`${classes.input} ${props.className}`}/>
         {
            type === 'password' &&
               <div className={classes.showPassword} onClick={handleShowPassword}>
                  {Icons.Eye()}
               </div>
         }
         {
            showPassword &&
            <div className={classes.showPassword} onClick={handleShowPassword}>
               {Icons.EyeSlash()}
            </div>
         }
         {
            error &&
               <div className={classes.error}>
                  {Icons.Error()}
                  <div className={classes.errorMessage}>{error}</div>
               </div>
         }
      </label>
   )
}

export default React.memo(Input)
