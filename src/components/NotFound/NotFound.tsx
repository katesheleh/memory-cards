import React from 'react'
import {NavLink} from 'react-router-dom'
import {PROFILE} from '../../route'
import classes from './NotFound.module.scss'
import Icons from '../common/Icons/Icons'

const NotFound = ({location}: any) => {
   return (
      <div className={classes.notFound}>
         <div className={classes.container}>
            <h1>404 page '{location.pathname}' not found</h1>
            <div className={classes.icon}>{Icons.SearchLocation()}</div>
            <NavLink to={PROFILE} className={classes.link}>Home</NavLink>
         </div>
      </div>
   )
}

export default NotFound
