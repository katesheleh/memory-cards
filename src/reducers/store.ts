import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "./login-reducer";
import {newPswReducer} from "./newPassword-reducer";
import {restorePswReducer} from "./restorePassword-reducer";
import {registrationReducer} from "./registration-reducer";
import {requestReducer} from "./request-reducer";
import {packReducer} from "./pack-reducer";
import {cardsReducer} from "./cards-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    newPsw: newPswReducer,
    restorePsw: restorePswReducer,
    registration: registrationReducer,
    request: requestReducer,
    packs: packReducer,
    cards: cardsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store;