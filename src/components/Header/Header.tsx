import React from 'react'
import classes from './Header.module.scss'
import Navbar from '../Navbar/Navbar'

const Header = () => {
   return (
      <header className={classes.header}>
         <div className={classes.container}>
            <div>Logo</div>
            <Navbar/>
         </div>
      </header>
   )
}

export default React.memo(Header)
