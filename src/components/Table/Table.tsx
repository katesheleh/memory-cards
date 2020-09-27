import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {getCardsTC} from "../../reducers/table-reducer";
import {CardsType} from "../../api/cards-api";
import {useParams} from 'react-router-dom';

const Table = () => {
    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.table.cards)
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [])

    return (
        <table>table</table>
    )
}

export default Table;