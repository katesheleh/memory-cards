import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import classes from "../Cards.module.scss";
import {Input} from "../../common";
import React, {ChangeEvent, useState} from "react";
import {EditCardModelType, editCardTC} from "../../../reducers/cards-reducer";
import {useDispatch} from "react-redux";

const ModalEditCard = (props: PropsType) => {
    const dispatch = useDispatch();

    const [editCardModal, setEditCardModal] = useState(false);
    const closeEditCardModal = () => setEditCardModal(false);
    const [editCardQuestion, setEditCardQuestion] = useState(props.question)
    const [editCardAnswer, setEditCardAnswer] = useState(props.answer)

    const editCard = (card_id: string, model: EditCardModelType) => {
        dispatch(editCardTC(card_id, model, props.packId))
        closeEditCardModal()
    }

    const cancelEditCard = () => {
        setEditCardQuestion(props.question)
        setEditCardAnswer(props.answer)
        closeEditCardModal()
    }

    const onEditCardQuestion = (e: ChangeEvent<HTMLInputElement>) => setEditCardQuestion(e.currentTarget.value)
    const onEditCardAnswer = (e: ChangeEvent<HTMLInputElement>) => setEditCardAnswer(e.currentTarget.value)

    return (
        <>
            <Button onClick={() => setEditCardModal(o => !o)} labelTitle='Edit a Card'/>
            <Modal header={'Edit the Card'} open={editCardModal} close={closeEditCardModal}>
                <div className={classes.modalInnerWrap}>
                    <Input labelTitle='Question' value={editCardQuestion} onChange={onEditCardQuestion}/>
                    <Input labelTitle='Answer' value={editCardAnswer} onChange={onEditCardAnswer}/>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'Cancel'} onClick={cancelEditCard}/>
                        <Button labelTitle={'Confirm'} onClick={() => editCard(props.cardId, {
                            question: editCardQuestion,
                            answer: editCardAnswer
                        })}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalEditCard;

type PropsType = {
    question: string
    answer: string
    packId: string
    cardId: string
}