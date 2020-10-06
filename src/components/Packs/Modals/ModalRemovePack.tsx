import Modal from "../../common/Modal/Modal";
import classes from "../Packs.module.scss";
import Button from "../../common/Button/Button";
import React, {useState} from "react";
import {removePackTC} from "../../../reducers/pack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../reducers/store";

const ModalRemovePack = (props: ModalTypeProps) => {

    const dispatch = useDispatch();

    const [openDelModal, setOpenDelModal] = useState(false);
    const closeDelModal = () => setOpenDelModal(false);

    const confirmActionCallback = (_id: string) => {
        dispatch(removePackTC(_id, props.userId))
        closeDelModal()
    }

    return (
        <>
            <Button onClick={() => setOpenDelModal(o => !o)} labelTitle='Delete'/>
            <Modal header={'Delete Pack'} open={openDelModal} close={closeDelModal}>
                <div className={classes.modalInnerWrap}>
                    <p>Are you sure you want to delete <strong>"{props.packName}"?</strong></p>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'No'} onClick={closeDelModal}/>
                        <Button labelTitle={'Yes'} onClick={() => confirmActionCallback(props.packId)}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

type ModalTypeProps = {
    packName: string
    packId: string
    userId: string
}

export default ModalRemovePack;