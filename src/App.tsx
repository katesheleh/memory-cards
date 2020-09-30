import React from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import {CARDS, LOGIN, NEW_PASSWORD, PACKS, PROFILE, REGISTRATION, RESTORE_PASSWORD} from './route'
import Login from './components/Login/Login'
import NewPassword from './components/NewPassword/NewPassword'
import Profile from './components/Profile/Profile'
import Registration from './components/Registration/Registration'
import RestorePassword from './components/RestorePassword/RestorePassword'
import Header from './components/Header/Header'
import NotFound from './components/NotFound/NotFound'
import Cards from "./components/Cards/Cards";
import Packs from "./components/Packs/Packs";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
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
                    <Route path={PACKS} render={() => <Packs/>}/>
                    <Route path={CARDS} render={() => <Cards/>}/>
                    <Route path='/' render={() => isLoggedIn ? <Profile/> : <Login/>}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </div>
    )
}

export default App
