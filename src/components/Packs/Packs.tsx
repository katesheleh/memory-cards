import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    addPackTC,
    EditCardPackType,
    editPackTC,
    getPackTC,
    removePackTC,
    searchPackTC, setMyPacksAC, setPageAC, setPageCountAC, setSortPacksAC
} from "../../reducers/pack-reducer";
import Button from "../common/Button/Button";
import {CardsPackType} from "../../api/pack-api";
import {Link, Redirect} from 'react-router-dom'
import {LOGIN} from "../../route";
import classes from './Packs.module.scss'
import Preloader from "../common/Preloader/Preloader";
import {Search} from "../Search/Search";
import {authSucessTC} from "../../reducers/login-reducer";
import Paginator from "../common/Paginator/Paginator";
import Checkbox from "../common/Checkbox/Checkbox";
import SortButton from "../common/SortButton/SortButton";

const Packs = () => {
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const cardPacks = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const myPacks = useSelector<AppRootStateType, boolean>(state => state.packs.myPacks)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPackTC())
    }, [])

    const removePack = (_id: string) => {
        dispatch(removePackTC(_id, user_id))
    }

    const addPack = (name: string) => {
        dispatch(addPackTC(name, user_id))
    }

    const editPack = (pack_id: string, model: EditCardPackType) => {
        dispatch(editPackTC(pack_id, model, user_id))
    }

    const getCardPacksPage = (page: number, pageCount: number) => {
        dispatch(setPageAC(page))
        dispatch(setPageCountAC(pageCount))
        dispatch(searchPackTC())
    }

    const changedMyPack = () => {
        dispatch(setMyPacksAC(!myPacks))
        dispatch(searchPackTC())
    }

    const sortPacksNameTop = () => {
        dispatch(setSortPacksAC('1name'))
        dispatch(searchPackTC())
    }

    const sortPacksNameBottom = () => {
        dispatch(setSortPacksAC('0name'))
        dispatch(searchPackTC())
    }

    if (!isLoggedIn) {
        return <Redirect to={LOGIN}/>
    }


    return (
        <div className={classes.container}>
            {requestIsFetching && <Preloader/>}
            <Search/>
            <h1>Packs </h1>
            <Checkbox onChange={changedMyPack} labelTitle={'My packs'}/>
            <Button
                labelTitle={'Add new Pack'}
                onClick={() => addPack('New super pack')}
            />
            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Name</strong><SortButton onClickOne={sortPacksNameTop} onClickTwo={sortPacksNameBottom}/></div>
                    <div><strong>Show pack cards</strong></div>
                    <div><strong>Actions</strong></div>
                </div>

                {cardPacks.map((pack) => {
                    return (
                        <div key={pack._id} className={classes.tableRow}>
                            <div>{pack.name}</div>
                            <div><Link to={`/cards/${pack._id}`}><Button labelTitle={'Show cards'}/></Link></div>
                            <div>
                                <Button labelTitle={'Edit'}
                                        onClick={() => editPack(pack._id, {name: 'new mane', private: true})}/>
                                <Button labelTitle={'Delete'} onClick={() => removePack(pack._id)}/></div>
                        </div>
                    )
                })}
            </div>
            <Paginator
                page={page}
                pageCount={pageCount}
                cardPacksTotalCount={cardPacksTotalCount}
                getCardPacksPage={getCardPacksPage}
            />
        </div>
    )
}

export default Packs;








