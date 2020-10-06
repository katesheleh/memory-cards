import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import classes from "../Packs.module.scss";
import {Input} from "../../common";
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {EditCardPackType, editPackTC} from "../../../reducers/pack-reducer";

const ModalEditPack = (props: ModalEditPackType) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const closeEditModal = () => setOpenEditModal(false);
    const [editPackName, setEditPackName] = useState(props.currentName)
    const [privatePack, setPrivatePack] = useState(props.currentPrivacyStatus)

    const dispatch = useDispatch();

    const editPack = (pack_id: string, model: EditCardPackType) => {
        dispatch(editPackTC(pack_id, model, props.userId))
        closeEditModal()
    }

    const cancelEditPack = () => {
        setEditPackName(props.currentName)
        setPrivatePack(props.currentPrivacyStatus)
        closeEditModal()
    }

    const onPackNameChange = (e: ChangeEvent<HTMLInputElement>) => setEditPackName(e.currentTarget.value)
    const onPackPrivacyChange = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.currentTarget.checked)

    return (
        <>
            <Button onClick={() => setOpenEditModal(o => !o)} labelTitle='Edit'/>
            <Modal header={'Edit Pack Data'} open={openEditModal} close={closeEditModal}>
                <div className={classes.modalInnerWrap}>
                    <Input labelTitle='Name' value={editPackName}
                           onChange={onPackNameChange}/>
                    <label className={classes.checkboxWrap}>
                        <input type='checkbox' checked={privatePack} onChange={onPackPrivacyChange}/>
                        This is my <strong>private</strong> pack
                    </label>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'Cancel'} onClick={cancelEditPack}/>
                        <Button labelTitle={'Confirm'} onClick={() => editPack(props.packId, {
                            name: editPackName,
                            private: privatePack
                        })}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalEditPack;

type ModalEditPackType = {
    currentName: string
    currentPrivacyStatus: boolean
    packId: string
    userId: string
}