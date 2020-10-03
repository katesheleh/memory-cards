import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import classes from './SortButton.module.scss'

type InputPropsType
    = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & {onClickOne: () => void, onClickTwo: () => void}

const SortButton = (props: InputPropsType) => {
    return (
        <span>
            <button className={classes.btn} {...props} onClick={props.onClickOne}> {'h'}</button>
            <button className={classes.btn} {...props} onClick={props.onClickTwo}> {'k'}</button>
        </span>

    )
}

export default React.memo(SortButton)
