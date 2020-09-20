import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import {LOGIN, NEW_PASSWORD, PROFILE, REGISTRATION, RESTORE_PASSWORD} from "./route";
import Login from "./components/Login/Login";
import NewPassword from "./components/NewPassword/NewPassword";
import Profile from "./components/Profile/Profile";
import Registration from "./components/Registration/Registration";

function App() {
    return (
        <div className="App">
            <Route path={LOGIN} render={() => <Login/>}/>
            <Route path={NEW_PASSWORD} render={() => <NewPassword/>}/>
            <Route path={PROFILE} render={() => <Profile/>}/>
            <Route path={REGISTRATION} render={() => <Registration/>}/>
            {/*<Route path={RESTORE_PASSWORD} render={() => </>}/>*/}
        </div>
    );
}

export default App;
