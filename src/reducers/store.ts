import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "./login-reducer";
import {newPswReducer} from "./newPassword-reducer";
import {restorePswReducer} from "./restorePassword-reducer";
import {profileReducer} from "./profile-reducer";
import {registrationReducer} from "./registration-reducer";
import {requestReducer} from "./request-reducer";
import {tableReducer} from "./table-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    newPsw: newPswReducer,
    restorePsw: restorePswReducer,
    profile: profileReducer,
    registration: registrationReducer,
    request: requestReducer,
    table: tableReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store;