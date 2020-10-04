import React, {ReactNode, useState} from 'react'
import styles from './Modal.module.scss';
import {StyledModal} from "./StyledModal";

const Modal = (props: ModalPropsType) => {
    return (
        <StyledModal open={props.open} onClose={props.close} modal nested>
            <div className={styles.modal}>
                <button className={styles.close} onClick={props.close}>&times;</button>
                <h3 className={styles.header}>{props.header}</h3>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </StyledModal>
    )
}

export default Modal;

type ModalPropsType = {
    header: string
    children: ReactNode
    open: any
    close: any
}