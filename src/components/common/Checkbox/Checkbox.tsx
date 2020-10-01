import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import classes from './Checkbox.module.scss'

type CheckboxPropsType
   = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
   & {labelTitle?: string}

const Checkbox = (props: CheckboxPropsType) => {
   const {labelTitle, ...restProps} = props
   return (
      <label className={classes.label}>
         {labelTitle && <span className={classes.label}>{labelTitle}</span>}
         <input {...restProps}
                type="checkbox"
                className={classes.checkbox}/>
         <div className={classes.customCheckbox}></div>
      </label>
   )
}

export default React.memo(Checkbox)
