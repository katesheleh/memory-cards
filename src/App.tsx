import React from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import {LOGIN, NEW_PASSWORD, PROFILE, REGISTRATION, RESTORE_PASSWORD} from './route'
import Login from './components/Login/Login'
import NewPassword from './components/NewPassword/NewPassword'
import Profile from './components/Profile/Profile'
import Registration from './components/Registration/Registration'
import RestorePassword from './components/RestorePassword/RestorePassword'
import Header from './components/Header/Header'
import NotFound from './components/NotFound/NotFound'

function App() {
   return (
      <div className="App">
         <Header/>
         <div className="content">
            <Switch>
               <Route path={LOGIN} render={() => <Login/>}/>
               <Route path={NEW_PASSWORD} render={() => <NewPassword/>}/>
               <Route path={PROFILE} render={() => <Profile/>}/>
               <Route path={REGISTRATION} render={() => <Registration/>}/>
               <Route path={RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
               <Route component={NotFound}/>
            </Switch>
         </div>
      </div>
   )
}

export default App
