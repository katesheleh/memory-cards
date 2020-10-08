import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import classes from "../Cards.module.scss";
import {Input} from "../../common";
import React, {ChangeEvent, useState} from "react";
import {addCardTC} from "../../../reducers/cards-reducer";
import {useDispatch} from "react-redux";

const ModalAddCard = (props: PropsType) => {
    const dispatch = useDispatch();

    const [newCardModal, setNewCardModal] = useState(false);
    const closeNewCardModal = () => setNewCardModal(false);
    const [newCardQuestion, setNewCardQuestion] = useState('')
    const [newCardAnswer, setNewCardAnswer] = useState('')

    const addCard = (question: string, answer: string) => {
        dispatch(addCardTC(props.packId, question, answer))
        setNewCardQuestion('')
        setNewCardAnswer('')
        closeNewCardModal()
    }

    const cancelAddCard = () => {
        setNewCardQuestion('')
        setNewCardAnswer('')
        closeNewCardModal()
    }

    const onAddCardQuestion = (e: ChangeEvent<HTMLInputElement>) => setNewCardQuestion(e.currentTarget.value)
    const onAddCardAnswer = (e: ChangeEvent<HTMLInputElement>) => setNewCardAnswer(e.currentTarget.value)

    return (
        <>
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
            </>
    )
}

export default ModalAddCard;

type PropsType = {
    packId: string
}