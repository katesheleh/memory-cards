import React, {Suspense} from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import * as paths from './route'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import Cards from "./components/Cards/Cards";
import Packs from "./components/Packs/Packs";
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from "./reducers/store";
import {authSucessTC} from './reducers/login-reducer'
import {Preloader} from './components/common'

const Registration = React.lazy(() => import('./components/Registration/Registration'))
const RestorePassword = React.lazy(() => import('./components/RestorePassword/RestorePassword'))
const NewPassword = React.lazy(() => import('./components/NewPassword/NewPassword'))
const NotFound = React.lazy(() => import('./components/NotFound/NotFound'))

function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(authSucessTC())
    }, [])

    return (
        <div className="App">
            {requestIsFetching && <Preloader/>}
            <Header/>
            <div className="content">
                <Suspense fallback={<Preloader/>}>
                    <Switch>
                        <Route exact path='/' render={() => isLoggedIn ? <Profile/> : <Login/>}/>
                        <Route path={paths.LOGIN} render={() => <Login/>}/>
                        <Route path={paths.PROFILE} render={() => <Profile/>}/>
                        <Route path={paths.PACKS} render={() => <Packs/>}/>
                        <Route path={paths.CARDS} render={() => <Cards/>}/>

                        <Route path={paths.REGISTRATION} render={() => <Registration/>}/>
                        <Route path={paths.RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
                        <Route path={paths.NEW_PASSWORD} render={() => <NewPassword/>}/>

                        <Route component={NotFound}/>
                    </Switch>
                </Suspense>
            </div>
        </div>
    )
}

export default App
