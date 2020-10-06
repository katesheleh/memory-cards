import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import classes from "../Cards.module.scss";
import React, {useState} from "react";
import {removeCardTC} from "../../../reducers/cards-reducer";
import {useDispatch} from "react-redux";

const ModalRemoveCard = (props: PropsType) => {
    const dispatch = useDispatch();

    const [deleteCardModal, setDeleteCardModal] = useState(false);
    const closeDeleteCardModal = () => setDeleteCardModal(false);

    const removeCard = (_id: string) => {
        dispatch(removeCardTC(_id, props.packId))
        closeDeleteCardModal()
    }

    return (
        <>
            <Button onClick={() => setDeleteCardModal(o => !o)} labelTitle='Delete'/>
            <Modal header={'Delete the Card'} open={deleteCardModal} close={closeDeleteCardModal}>
                <div className={classes.modalInnerWrap}>
                    <p>Are you sure you want to delete <strong>"{props.question}"?</strong></p>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'Cancel'} onClick={closeDeleteCardModal}/>
                        <Button labelTitle={'Confirm'} onClick={() => removeCard(props.cardId)}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

type PropsType = {
    question: string
    packId: string
    cardId: string
}

export default ModalRemoveCard;