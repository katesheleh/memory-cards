import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import classes from './Button.module.scss'

type InputPropsType
    = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & { labelTitle?: string};

const Button = (props: InputPropsType) => {
    const {labelTitle, ...restProps} = props
    return (
        <button className={classes.btn} {...restProps}> {props.labelTitle}</button>
    )
}

export default React.memo(Button)
