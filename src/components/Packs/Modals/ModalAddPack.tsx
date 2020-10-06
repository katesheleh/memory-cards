import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import classes from "../Packs.module.scss";
import {Input} from "../../common";
import React, {ChangeEvent, useState} from "react";
import {addPackTC} from "../../../reducers/pack-reducer";
import {useDispatch} from "react-redux";

const ModalAddPack = (props: ModalAddPackType) => {
    const [newPackModal, setNewPackModal] = useState(false);
    const closeNewPackModal = () => setNewPackModal(false);
    const [newPackName, setNewPackName] = useState('')
    const [privatePack, setPrivatePack] = useState(false)

    const dispatch = useDispatch();

    const addPack = (name: string, privatePack: boolean) => {
        dispatch(addPackTC(name, privatePack, props.userId))
        setNewPackName('')
        setPrivatePack(false)
        closeNewPackModal()
    }

    const cancelAddPack = () => {
        setNewPackName('')
        setPrivatePack(false)
        closeNewPackModal()
    }

    const onAddNewPackNameChange = (e: ChangeEvent<HTMLInputElement>) => setNewPackName(e.currentTarget.value)
    const onPackPrivacyChange = (e: ChangeEvent<HTMLInputElement>) => setPrivatePack(e.currentTarget.checked)

    return (
        <>
            <Button onClick={() => setNewPackModal(o => !o)} labelTitle='Add new Pack'/>
            <Modal header={'Add new Pack'} open={newPackModal} close={closeNewPackModal}>
                <div className={classes.modalInnerWrap}>
                    <Input labelTitle='New Pack Name' value={newPackName}
                           onChange={onAddNewPackNameChange}/>
                    <label className={classes.checkboxWrap}>
                        <input type='checkbox' checked={privatePack} onChange={onPackPrivacyChange}/>
                        This is my <strong>private</strong> pack
                    </label>
                    <div className={classes.modalBtns}>
                        <Button labelTitle={'Cancel'} onClick={cancelAddPack}/>
                        <Button labelTitle={'Confirm'} onClick={() => addPack(newPackName, privatePack)}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalAddPack;

type ModalAddPackType = {
    userId: string
}