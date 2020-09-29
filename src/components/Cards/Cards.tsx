import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {getCardsTC} from "../../reducers/cards-reducer";
import {CardsType} from "../../api/cards-api";
import {Link, useParams} from "react-router-dom";
import Button from "../common/Button/Button";
import {PACKS} from "../../route";
import classes from './Cards.module.scss';

const Cards = () => {

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.getCards)
    const {cardId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardsTC(cardId))
    }, [])

    return (
        <div className={classes.container}>
            <h1>Cards</h1>
            <Link to={PACKS}><Button labelTitle={'Back to Packs'}/></Link>
            <div className={classes.table}>
                <div className={`${classes.tableHeader} ${classes.tableRow}`}>
                    <div><strong>Question</strong></div>
                    <div><strong>Answer</strong></div>
                    <div><strong>Actions</strong></div>
                </div>

                {cards && cards.map(c => <div key={c._id} className={classes.tableRow}>
                        <div>{c.question}</div>
                        <div>{c.answer}</div>
                        <div><Button labelTitle={'Edit'}/><Button labelTitle={'Delete'}/></div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Cards;

