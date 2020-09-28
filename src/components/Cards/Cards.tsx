import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {getCardsTC} from "../../reducers/cards-reducer";
import {CardsType} from "../../api/cards-api";
import {Link, useParams} from "react-router-dom";
import Button from "../common/Button/Button";
import {PROFILE} from "../../route";

const Cards = () => {

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.getCards)
    const {cardId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardsTC(cardId))
    }, [])

    return (
        <div>
            <h1>Cards</h1>
            <Link to={PROFILE}><Button labelTitle={'Go to Profile'}/></Link>
            <table>
                <tr>
                    <td><b>Question</b></td>
                    <td><b>Answer</b></td>
                    <td><b>Edit</b></td>
                    <td><b>Delete</b></td>
                </tr>
                {cards && cards.map(c => <tr key={c._id}>
                    <td>{c.question}</td>
                    <td>{c.answer}</td>
                    <td><Button labelTitle={'Edit'}/></td>
                    <td><Button labelTitle={'Delete'}/></td>
                </tr>)}
            </table>


        </div>
    )
}

export default Cards;

