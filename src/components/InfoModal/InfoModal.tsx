import React,{FunctionComponent} from 'react';
import Modal from '@material-ui/core/Modal';
import './InfoModal.css'
import {Fade} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
type ModalProps = {
    open:boolean,
    icon:string,
    titleTextID:string,
    subtitleTextID?:string,
}

export const InfoModal: FunctionComponent<ModalProps> = ({open,icon,titleTextID,subtitleTextID}) =>
    <Modal
        className='info-modal'
        open={open}
        closeAfterTransition
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={open}>
            <div className='info-modal-container'>
                <img className='info-modal-icon' src={icon}/>
                <text className='info-modal-title'><FormattedMessage id={titleTextID}/></text>
                {subtitleTextID && <text className='info-modal-subtitle'><FormattedMessage id={subtitleTextID}/></text>}
            </div>
        </Fade>
    </Modal>






