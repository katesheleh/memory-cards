import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    addCardTC,
    EditCardModelType,
    editCardTC,
    getCardsTC,
    removeCardTC,
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
import Button from "../common/Button/Button";
import classes from './Cards.module.scss';
import Modal from "../common/Modal/Modal";
import {Input} from "../common";
import {Search} from "../Search/Search";
import Paginator from "../common/Paginator/Paginator";
import SortButton from "../common/SortButton/SortButton";

const Cards = () => {

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const minGrade = useSelector<AppRootStateType, number>(state => state.cards.minGrade)
    const maxGrade = useSelector<AppRootStateType, number>(state => state.cards.maxGrade)
    const cardsAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardsAnswer)
    const cardsQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardsQuestion)
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)


    const {cardId} = useParams();
    const dispatch = useDispatch();

    const [newCardModal, setNewCardModal] = useState(false);
    const closeNewCardModal = () => setNewCardModal(false);
    const [newCardQuestion, setNewCardQuestion] = useState('')
    const [newCardAnswer, setNewCardAnswer] = useState('')

    const [editCardModal, setEditCardModal] = useState(false);
    const closeEditCardModal = () => setEditCardModal(false);
    const [editCardQuestion, setEditCardQuestion] = useState('')
    const [editCardAnswer, setEditCardAnswer] = useState('')

    const [deleteCardModal, setDeleteCardModal] = useState(false);
    const closeDeleteCardModal = () => setDeleteCardModal(false);

    useEffect(() => {
        dispatch(getCardsTC(cardId))
    }, [])

    const removeCard = (_id: string) => {
        debugger
        dispatch(removeCardTC(_id, cardId))
        closeDeleteCardModal()
    }

    const addCard = (question: string, answer: string) => {
        dispatch(addCardTC(cardId, question, answer))
        setNewCardQuestion('')
        setNewCardAnswer('')
        closeNewCardModal()
    }

    const cancelAddCard = () => {
        setNewCardQuestion('')
        setNewCardAnswer('')
        closeNewCardModal()
    }

    const editCard = (card_id: string, model: EditCardModelType) => {
        dispatch(editCardTC(card_id, model, cardId))
        closeEditCardModal()
    }

    const getCardsPage = (page: number, pageCount: number) => {
        dispatch(setCardsPageAC(page))
        dispatch(setCardsPageCountAC(pageCount))
        dispatch(searchCardsTC(cardId))
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
        dispatch(searchCardsTC(cardId))
    }

    const sortPacksUpdateTop = () => {
        dispatch(setSortCardsAC('1updated'))
        dispatch(searchCardsTC(cardId))
    }

    const sortPacksUpdateBottom = () => {
        dispatch(setSortCardsAC('0updated'))
        dispatch(searchCardsTC(cardId))
    }

    const onAddCardQuestion = (e: ChangeEvent<HTMLInputElement>) => setNewCardQuestion(e.currentTarget.value)
    const onAddCardAnswer = (e: ChangeEvent<HTMLInputElement>) => setNewCardAnswer(e.currentTarget.value)
    const onEditCardQuestion = (e: ChangeEvent<HTMLInputElement>) => setEditCardQuestion(e.currentTarget.value)
    const onEditCardAnswer = (e: ChangeEvent<HTMLInputElement>) => setEditCardAnswer(e.currentTarget.value)


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
            {/* start ADD NEW CARD */}
            <Button onClick={() => setNewCardModal(o => !o)} labelTitle='Add a Card'/>
            <Modal header={'Add new Card'} open={newCardModal} close={closeNewCardModal}>
                <div className={classes.modalInnerWrap}>
                    <Input labelTitle='Question' value={newCardQuestion} onChange={onAddCardQuestion}/>
                    <Input labelTitle='Answer' value={newCardAnswer} onChange={onAddCardAnswer}/>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'Cancel'} onClick={cancelAddCard}/>
                        <Button labelTitle={'Confirm'} onClick={() => addCard(newCardQuestion, newCardAnswer)}/>
                    </div>
                </div>
            </Modal>
            {/* end ADD NEW CARD */}

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
                                    {/* start EDIT NEW CARD */}
                                    <Button onClick={() => setEditCardModal(o => !o)} labelTitle='Edit a Card'/>
                                    <Modal header={'Edit the Card'} open={editCardModal} close={closeEditCardModal}>
                                        <div className={classes.modalInnerWrap}>
                                            <Input labelTitle='Question' value={editCardQuestion} onChange={onEditCardQuestion}/>
                                            <Input labelTitle='Answer' value={editCardAnswer} onChange={onEditCardAnswer}/>
                                            <div className={classes.modalBtns}>
                                                <Button labelTitle={'Cancel'} onClick={() => editCard(c._id, {
                                                    question: c.question,
                                                    answer: c.answer
                                                })}/>
                                                <Button labelTitle={'Confirm'} onClick={() => editCard(c._id, {
                                                    question: editCardQuestion,
                                                    answer: editCardAnswer
                                                })}/>
                                            </div>
                                        </div>
                                    </Modal>
                                    {/* end EDIT NEW CARD */}

                                    {/* start DELETE NEW CARD */}
                                    <Button onClick={() => setDeleteCardModal(o => !o)} labelTitle='Delete'/>
                                    <Modal header={'Delete the Card'} open={deleteCardModal} close={closeDeleteCardModal}>
                                        <div className={classes.modalInnerWrap}>
                                            <p>Are you sure you want to delete <strong>"{c.question}"?</strong></p>
                                            <div className={classes.modalBtns}>
                                                <Button labelTitle={'Cancel'} onClick={closeDeleteCardModal}/>
                                                <Button labelTitle={'Confirm'} onClick={() => removeCard(c._id)}/>
                                            </div>
                                        </div>
                                    </Modal>
                                    {/* end DELETE NEW CARD */}
                                    {/*<Button labelTitle={'Delete'} onClick={() => removeCard(c._id)}/>*/}
                                </div>
                            </div>
                        )
                    }
                )}
            </div>

            <Paginator page={page} pageCount={pageCount} cardPacksTotalCount={cardsTotalCount} getCardPacksPage={getCardsPage}/>
        </div>
    )
}

export default Cards;

