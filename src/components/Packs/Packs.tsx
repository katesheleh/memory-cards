import React, {ChangeEvent, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    getPackTC,
    searchPackNameAC,
    setMinMAxCardsCountAC,
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
import {authSucessTC} from "../../reducers/login-reducer";

const Packs = () => {
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const cardPacks = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const myPacks = useSelector<AppRootStateType, boolean>(state => state.packs.myPacks)
    const minCardsCount = useSelector((state: AppRootStateType) => state.packs.minCardsCount)
    const maxCardsCount = useSelector((state: AppRootStateType) => state.packs.maxCardsCount)
    const valueSearchName = useSelector((state: AppRootStateType) => state.packs.packName)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPackTC())
        if (!isLoggedIn) {
            dispatch(authSucessTC())
        }
    }, [])


    const getCardPacksPage = (page: number, pageCount: number) => {
        dispatch(setPageAC(page))
        dispatch(setPageCountAC(pageCount))
        dispatch(getPackTC())
    }

    const changedMyPack = () => {
        dispatch(setMyPacksAC(!myPacks))
        dispatch(getPackTC())
    }

    const sortPacksNameTop = () => {
        dispatch(setSortPacksAC('1name'))
        dispatch(getPackTC())
    }

    const sortPacksNameBottom = () => {
        dispatch(setSortPacksAC('0name'))
        dispatch(getPackTC())
    }

    const sortPacksUpdateTop = () => {
        dispatch(setSortPacksAC('1updated'))
        dispatch(getPackTC())
    }

    const sortPacksUpdateBottom = () => {
        dispatch(setSortPacksAC('0updated'))
        dispatch(getPackTC())
    }

    const changeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchPackNameAC(e.currentTarget.value))
    }

    const setValuesRange = (newValuesRange: number[]) => {
        dispatch(setMinMAxCardsCountAC(newValuesRange))
    }

    const search = () => {
        dispatch(getPackTC())
    }

    if (!isLoggedIn) {
        return <Redirect to={LOGIN}/>
    }

    return (
        <div className={classes.container}>
            {requestIsFetching && <Preloader/>}
            <Search
                inputLabel={'Search'}
                setValuesRange={setValuesRange}
                minValuesRange={minCardsCount}
                maxValuesRange={maxCardsCount}
                valueSearchName={valueSearchName}
                changeInputSearch={changeInputSearch}
                search={search}
                secondInput={false}
            />
            <h1>Packs </h1>
            <Checkbox onChange={changedMyPack} labelTitle={'My packs'}/>
            <ModalAddPack userId={user_id}/>
            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div>
                        <strong>Name</strong>
                        <SortButton onClickOne={sortPacksNameTop} onClickTwo={sortPacksNameBottom}/>
                    </div>
                    <div><strong>Cards Count</strong></div>
                    <div>
                        <strong>Last Update</strong>
                        <SortButton onClickOne={sortPacksUpdateTop} onClickTwo={sortPacksUpdateBottom}/>
                    </div>
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
                                    <ModalEditPack currentName={pack.name} currentPrivacyStatus={pack.private}
                                                   packId={pack._id} userId={user_id}/>
                                    <ModalRemovePack packName={pack.name} packId={pack._id} userId={user_id}/>

                                </>}
                                <Link to={`/cards/${pack._id}`}><Button labelTitle={'Show cards'}/></Link>
                                <Link to={`/train/${pack._id}`}><Button labelTitle={'Start train'}/></Link>
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