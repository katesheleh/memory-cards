import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    getPackTC,
    searchPackTC,
    setMyPacksAC,
    setPageAC,
    setPageCountAC,
    setSortPacksAC
} from "../../reducers/pack-reducer";
import Button from "../common/Button/Button";
import {CardsPackType} from "../../api/pack-api";
import {Link, Redirect} from 'react-router-dom'
import {LOGIN} from "../../route";
import classes from './Packs.module.scss'
import Preloader from "../common/Preloader/Preloader";
import {Search} from "../Search/Search";
import Paginator from "../common/Paginator/Paginator";
import Checkbox from "../common/Checkbox/Checkbox";
import SortButton from "../common/SortButton/SortButton";
import ModalRemovePack from "./Modals/ModalRemovePack";
import ModalEditPack from "./Modals/ModalEditPack";
import ModalAddPack from "./Modals/ModalAddPack";

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
            <ModalAddPack userId={user_id}/>
            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Name</strong><SortButton onClickOne={sortPacksNameTop}
                                                          onClickTwo={sortPacksNameBottom}/></div>
                    <div><strong>Cards Count</strong></div>
                    <div><strong>Last Update</strong></div>
                    <div><strong>Actions</strong></div>
                </div>

                {cardPacks.map((pack) => {
                    const packUpdateDate = new Date(pack.updated)
                    return (
                        <div key={pack._id} className={classes.tableRow}>
                            <div><strong>{pack.name}</strong> <small> ({pack.private ? 'private' : 'public'}) </small>
                            </div>
                            <div>{pack.cardsCount}</div>
                            <div>{packUpdateDate.toLocaleString()}</div>
                            <div>
                                {pack.user_id === user_id &&
                                <>
                                    <ModalEditPack userId={user_id}
                                                   currentName={pack.name}
                                                   currentPrivacyStatus={pack.private}
                                                   packId={pack._id}/>

                                    <ModalRemovePack packName={pack.name}
                                                     packId={pack._id}
                                                     userId={user_id}/>
                                </>}
                                <Link to={`/cards/${pack._id}`}><Button labelTitle={'Show cards'}/></Link>
                            </div>
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








