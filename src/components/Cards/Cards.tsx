import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {addCardTC, EditCardModelType, editCardTC, getCardsTC, removeCardTC} from "../../reducers/cards-reducer";
import {CardsType} from "../../api/cards-api";
import {useParams} from "react-router-dom";
import Button from "../common/Button/Button";
import classes from './Cards.module.scss';

const Cards = () => {

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const {cardId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardsTC(cardId))
    }, [])

    const removeCard = (_id: string) => {
        dispatch(removeCardTC(_id, cardId))
    }

    const addCard = (question: string, answer: string) => {
        dispatch(addCardTC(cardId, question, answer))
    }

    const editCard = (card_id: string, model: EditCardModelType) => {
        dispatch(editCardTC(card_id, model, cardId))
    }

    return (
        <div className={classes.container}>
            <h1>Cards</h1>
            <Button
                labelTitle={'Add a Card'}
                onClick={() => addCard('???', '!!!')}
            />
            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Question</strong></div>
                    <div><strong>Answer</strong></div>
                    <div><strong>Actions</strong></div>
                </div>

                {cards && cards.map(c => <div key={c._id} className={classes.tableRow}>
                        <div>{c.question}</div>
                        <div>{c.answer}</div>
                        <div>
                            <Button labelTitle={'Edit'}
                                    onClick={() => editCard(c._id, {question: 'New Question', answer: 'New Answer'})}/>
                            <Button labelTitle={'Delete'} onClick={() => removeCard(c._id)}/></div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Cards;

