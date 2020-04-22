import React,{FunctionComponent} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress
} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import './InfoDialog.css';

type InfoDialogProps = {
    open:boolean,
    titleTextID:string,
    subtitleTextID?:string,
    confirmTextID:string,
    cancelTextID:string,
    handleClose:(event:any)=>void,
    handleConfirm:(event:any)=>void,
    loading?:boolean,
}


export const InfoDialog: FunctionComponent<InfoDialogProps> = ({open,titleTextID,subtitleTextID,confirmTextID,cancelTextID,handleClose,handleConfirm,loading}) =>
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle >
            <FormattedMessage id={titleTextID}/>
            {loading && <CircularProgress size={24} className='info-dialog-loading' />}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <FormattedMessage id={subtitleTextID}/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                <FormattedMessage id={cancelTextID}/>
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                <FormattedMessage id={confirmTextID}/>
            </Button>
        </DialogActions>
    </Dialog>
