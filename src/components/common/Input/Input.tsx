import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import classes from './Input.module.scss'

type InputPropsType
   = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
   & { labelTitle?: string };

const Input = (props: InputPropsType) => {
   const {labelTitle, ...restProps} = props
   const type = props.type === 'password' ? 'password' : 'text'
   return (
      <label className={classes.label}>
         {labelTitle && <span className={classes.label}>{labelTitle}</span>}
         <input {...restProps} type={type} className={`${classes.input} ${props.className}`}/>
      </label>
   )
}

export default Input
