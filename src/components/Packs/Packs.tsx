import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {addPackTC, getPackTC, removePackTC} from "../../reducers/pack-reducer";
import Button from "../common/Button/Button";
import {CardsPackType} from "../../api/pack-api";
import {Link, Redirect} from 'react-router-dom'
import {LOGIN} from "../../route";
import classes from './Packs.module.scss'
import Preloader from "../common/Preloader/Preloader";
import {authSucessTC} from "../../reducers/login-reducer";

const Packs = () => {
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const cardPacks = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string>(state => state.login.profile._id)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPackTC(user_id))
        dispatch(authSucessTC())
    }, [isLoggedIn])

    const removePack = (_id: string) => {
        debugger
        dispatch(removePackTC(_id, user_id))
    }

    const addPack = (name: string) => {
        debugger
        dispatch(addPackTC(name, user_id))
    }

    if (!isLoggedIn) {
        return <Redirect to={LOGIN}/>
    }


    return (
        <div className={classes.container}>
            {requestIsFetching && <Preloader/>}
            <h1>Packs </h1>
            <Button
                labelTitle={'Add new Pack'}
                onClick={() => addPack('New super pack')}
            />
            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Name</strong></div>
                    <div><strong>Show pack cards</strong></div>
                    <div><strong>Actions</strong></div>
                </div>

                {cardPacks.map((pack) => {
                    return (
                        <div key={pack._id} className={classes.tableRow}>
                            <div>{pack.name}</div>
                            <div><Link to={`/cards/${pack._id}`}>Show cards</Link></div>
                            <div>
                                <Button labelTitle={'Edit'}/>
                                <Button labelTitle={'Delete'} onClick={() => removePack(pack._id)}/></div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Packs;








