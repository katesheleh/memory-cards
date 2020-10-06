import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    getCardsTC,
    searchCardsTC,
    setAnswerCardsAC,
    setCardsPageAC,
    setCardsPageCountAC,
    setMinMaxCardsGradsAC,
    setQuestionCardsAC,
    setSortCardsAC
} from "../../reducers/cards-reducer";
import {CardsType} from "../../api/cards-api";
import {useParams} from "react-router-dom";
import classes from './Cards.module.scss';
import {Search} from "../Search/Search";
import Paginator from "../common/Paginator/Paginator";
import SortButton from "../common/SortButton/SortButton";
import ModalEditCard from "./Modals/ModalEditCard";
import ModalRemoveCard from "./Modals/ModalRemoveCard";
import ModalAddCard from "./Modals/ModalAddCard";

const Cards = () => {

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const minGrade = useSelector<AppRootStateType, number>(state => state.cards.minGrade)
    const maxGrade = useSelector<AppRootStateType, number>(state => state.cards.maxGrade)
    const cardsAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardsAnswer)
    const cardsQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardsQuestion)
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)


    const {packId} = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    const getCardsPage = (page: number, pageCount: number) => {
        dispatch(setCardsPageAC(page))
        dispatch(setCardsPageCountAC(pageCount))
        dispatch(searchCardsTC(packId))
    }

    const changeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAnswerCardsAC(e.currentTarget.value))
    }

    const changeSecondInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuestionCardsAC(e.currentTarget.value))
    }

    const setValuesRange = (newValuesRange: number[]) => {
        dispatch(setMinMaxCardsGradsAC(newValuesRange))
    }

    const search = () => {
        dispatch(searchCardsTC(packId))
    }

    const sortPacksUpdateTop = () => {
        dispatch(setSortCardsAC('1updated'))
        dispatch(searchCardsTC(packId))
    }

    const sortPacksUpdateBottom = () => {
        dispatch(setSortCardsAC('0updated'))
        dispatch(searchCardsTC(packId))
    }

    return (
        <div className={classes.container}>
            <Search
                inputLabel={'Answer'}
                setValuesRange={setValuesRange}
                minValuesRange={minGrade}
                maxValuesRange={maxGrade}
                valueSearchName={cardsAnswer}
                changeInputSearch={changeInputSearch}
                search={search}
                secondInput={true}
                secondInputLabel={'Question'}
                changeSecondInputSearch={changeSecondInputSearch}
                valueSecondSearchName={cardsQuestion}
            />
            <h1>Cards</h1>
            <ModalAddCard packId={packId}/>

            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Question</strong></div>
                    <div><strong>Answer</strong></div>
                    <div>
                        <strong>Last Update</strong>
                        <SortButton onClickOne={sortPacksUpdateTop} onClickTwo={sortPacksUpdateBottom}/>
                    </div>
                    <div><strong>Actions</strong></div>
                </div>

                {cards && cards.map(c => {
                        const cardUpdateDate = new Date(c.updated)
                        return (
                            <div key={c._id} className={classes.tableRow}>
                                <div>{c.question}</div>
                                <div>{c.answer}</div>
                                <div>{cardUpdateDate.toLocaleString()}</div>
                                <div>
                                    <ModalEditCard question={c.question} answer={c.answer} packId={packId} cardId={c._id}/>
                                    <ModalRemoveCard question={c.question} packId={packId} cardId={c._id}/>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>

            <Paginator page={page} pageCount={pageCount} cardPacksTotalCount={cardsTotalCount}
                       getCardPacksPage={getCardsPage}/>
        </div>
    )
}

export default Cards;
