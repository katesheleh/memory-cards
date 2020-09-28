import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {getPackTC} from "../../reducers/pack-reducer";
import Button from "../common/Button/Button";
import {CardsPackType} from "../../api/pack-api";
import {Link} from 'react-router-dom'


const Pack = () => {
    const cardPacks = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string>(state => state.login.profile._id)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPackTC(user_id))
    }, [user_id])

    return (
        <div>
            <h2>Choose a pack you want to see: </h2>
            {cardPacks.map((pack) => {
                return (<Link to={`/cards/${pack._id}`} key={pack.created}><Button labelTitle={pack.name}/></Link>)
            })}
        </div>
    )
}

export default Pack;