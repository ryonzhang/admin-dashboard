import React,{FunctionComponent} from 'react';
import Modal from '@material-ui/core/Modal';
import './InfoModal.css'
import {Fade} from "@material-ui/core";
type ModalProps = {
    open:boolean,
    icon:string,
    title:string,
    subtitle:string,
}


export const InfoModal: FunctionComponent<ModalProps> = ({open,icon,title,subtitle}) =>
    <Modal
        className='info-modal'
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={open}>
            <div className='info-modal-container'>
                <img className='info-modal-icon' src={icon}/>
                <text className='info-modal-title'>{title}</text>
                <text className='info-modal-subtitle'>{subtitle}</text>
            </div>
        </Fade>
    </Modal>






