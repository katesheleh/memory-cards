import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    addPackTC, EditCardPackType, editPackTC, getPackTC, removePackTC, searchPackNameAC,
    searchPackTC, setMinMAxCardsCountAC, setMyPacksAC, setPageAC, setPageCountAC, setSortPacksAC
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
import Modal from "../common/Modal/Modal";
import {Input} from "../common";

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

    const [openDelModal, setOpenDelModal] = useState(false);
    const closeDelModal = () => setOpenDelModal(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const closeEditModal = () => setOpenEditModal(false);
    const [editPackName, setEditPackName] = useState('')
    const [privatePack, setPrivatePack] = useState(false)

    const [newPackModal, setNewPackModal] = useState(false);
    const closeNewPackModal = () => setNewPackModal(false);
    const [newPackName, setNewPackName] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPackTC())
    }, [])

    const removePack = (_id: string) => {
        dispatch(removePackTC(_id, user_id))
        closeDelModal()
    }

    const addPack = (name: string) => {
        dispatch(addPackTC(name, user_id))
        closeNewPackModal()
    }

    const editPack = (pack_id: string, model: EditCardPackType) => {
        dispatch(editPackTC(pack_id, model, user_id))
        closeEditModal()
    }

    const onPackNameChange = (e: ChangeEvent<HTMLInputElement>) => setEditPackName(e.currentTarget.value)
    const onPackPrivacyChange = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.currentTarget.checked)
    const onAddNewPackNameChange = (e: ChangeEvent<HTMLInputElement>) => setNewPackName(e.currentTarget.value)

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

    const sortPacksUpdateTop = () => {
        dispatch(setSortPacksAC('1updated'))
        dispatch(searchPackTC())
    }

    const sortPacksUpdateBottom = () => {
        dispatch(setSortPacksAC('0updated'))
        dispatch(searchPackTC())
    }

    const changeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchPackNameAC(e.currentTarget.value))
    }

    const setValuesRange = (newValuesRange: number[]) => {
        dispatch(setMinMAxCardsCountAC(newValuesRange))
    }

    const search = () => {
        dispatch(searchPackTC())
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
            {/* start ADD NEW PACK */}
            <Button onClick={() => setNewPackModal(o => !o)} labelTitle='Add new Pack'/>
            <Modal header={'Add new Pack'} open={newPackModal} close={closeNewPackModal}>
                <div className={classes.modalInnerWrap}>
                    <Input labelTitle='New Pack Name' value={newPackName}
                           onChange={onAddNewPackNameChange}/>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'Cancel'} onClick={closeNewPackModal}/>
                        <Button labelTitle={'Confirm'} onClick={() => addPack(newPackName)}/>
                    </div>
                </div>
            </Modal>
            {/* end ADD NEW PACK */}
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
                                    <>
                                        <Button onClick={() => setOpenEditModal(o => !o)} labelTitle='Edit'/>
                                        <Modal header={'Edit Pack Data'} open={openEditModal} close={closeEditModal}>
                                            <div className={classes.modalInnerWrap}>
                                                <Input labelTitle='Name' value={editPackName}
                                                       onChange={onPackNameChange}/>
                                                <label className={classes.checkboxWrap}> <input type='checkbox'
                                                                                                checked={privatePack}
                                                                                                onChange={onPackPrivacyChange}/>
                                                    This is my <strong>private</strong> pack
                                                </label>
                                                <div className={classes.modalBtns}>
                                                    <Button labelTitle={'Cancel'} onClick={() => editPack(pack._id, {
                                                        name: pack.name,
                                                        private: pack.private
                                                    })}/>
                                                    <Button labelTitle={'Confirm'} onClick={() => editPack(pack._id, {
                                                        name: editPackName,
                                                        private: privatePack
                                                    })}/>
                                                </div>
                                            </div>
                                        </Modal>
                                    </>

                                    <>
                                        <Button onClick={() => setOpenDelModal(o => !o)} labelTitle='Delete'/>
                                        <Modal header={'Delete Pack'} open={openDelModal} close={closeDelModal}>
                                            <div className={classes.modalInnerWrap}>
                                                <p>Are you sure you want to delete <strong>"{pack.name}"?</strong></p>
                                                <div className={classes.modalBtns}>
                                                    <Button labelTitle={'No'} onClick={closeDelModal}/>
                                                    <Button labelTitle={'Yes'} onClick={() => removePack(pack._id)}/>
                                                </div>
                                            </div>
                                        </Modal>
                                    </>
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