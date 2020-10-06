import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {addCardTC, EditCardModelType, editCardTC, getCardsTC, removeCardTC} from "../../reducers/cards-reducer";
import {CardsType} from "../../api/cards-api";
import {useParams} from "react-router-dom";
import Button from "../common/Button/Button";
import classes from './Cards.module.scss';
import Modal from "../common/Modal/Modal";
import {Input} from "../common";
import ModalEditCard from "./Modals/ModalEditCard";
import ModalAddCard from "./Modals/ModalAddCard";
import ModalRemoveCard from "./Modals/ModalRemoveCard";

const Cards = () => {
    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const {packId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    return (
        <div className={classes.container}>
            <h1>Cards</h1>
            <ModalAddCard packId={packId}/>

            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Question</strong></div>
                    <div><strong>Answer</strong></div>
                    <div><strong>Last Update</strong></div>
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
        </div>
    )
}

export default Cards;

