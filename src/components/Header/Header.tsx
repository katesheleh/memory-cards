import React from 'react'
import classes from './Header.module.scss'
import Navbar from '../Navbar/Navbar'
import logoPNG from '../../assets/images/logo.png'

const Header = () => {
   return (
      <header className={classes.header}>
         <div className={classes.container}>
            <div><img src={logoPNG} alt="logo" width={60}/></div>
            <Navbar/>
         </div>
      </header>
   )
}

export default React.memo(Header)
