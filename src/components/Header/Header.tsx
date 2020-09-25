import React from 'react'
import classes from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import * as LINKS from '../../route'

const Header = () => {
   return (
      <header className={classes.header}>
         <div className={classes.container}>
            <div>Logo</div>
            <nav>
               <NavLink to={LINKS.LOGIN}>login</NavLink>
               <NavLink to={LINKS.PROFILE}>profile</NavLink>
               <NavLink to={LINKS.REGISTRATION}>registration</NavLink>
               <NavLink to={LINKS.RESTORE_PASSWORD}>restore password</NavLink>
            </nav>
         </div>
      </header>
   )
}

export default Header
