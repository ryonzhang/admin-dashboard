import React, {FunctionComponent, useContext, useState} from "react";
import './EditUser.css'
import backIcon from '../../res/images/ic-back.svg'
import {UserInputGroup} from "../../components/UserInputGroup/UserInputGroup";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
import {TEXT_ID} from "../../res/languages/lang";
import {FormattedMessage } from "react-intl";
import {Formik} from "formik";
import {Form} from "react-bootstrap";
import {CircularProgress} from "@material-ui/core";
import successIcon from "../../res/images/illustration-success.svg";
import {UserToEdit} from "../UserManagementList/UserManagementList";
import networkUtils from "../../utils/network";
import {CustomContext} from "../../contexts/custom-context";
import {InfoModal} from "../../components/InfoModal/InfoModal";
import {InfoDialog} from "../../components/InfoDialog/InfoDialog";
type EditUserProps = {
    onSetActivePage: Function,
    setRefreshTimestamp:Function,
    userToEdit?:UserToEdit,
    className?:string,
}

let yup = require('yup');
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
});



export const EditUser: FunctionComponent<EditUserProps> = ({onSetActivePage,userToEdit,className,setRefreshTimestamp}) =>{
    const customContext = useContext(CustomContext);
    const [isModalOpen,setModalOpen]=useState(false);
    const [isDialogOpen,setDialogOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const [loadingForRemoval,setLoadingForRemoval]=useState(false);
    const onRemove=async ()=>{
        setLoadingForRemoval(true);
        await networkUtils
            .makeAPICall(
                {
                    method: 'DELETE',
                    targetBackend: 'juvoAdminApis',
                    url: `/user-mgmt/delete-user/${(userToEdit as any).userId}`,
                },
                customContext.user.carrier,
            )
            .catch((error:any) => {
                console.log('deleteUser error', error);
            });
        setRefreshTimestamp(new Date());
        onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);
    };
    return <div className={`edit-user ${className}`} onClick={()=>setModalOpen(false)}>
            <div className='edit-user-title' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST)}}>
                <img className='edit-user-icon' src={backIcon}/>
                <text className='edit-user-title-text'><b><FormattedMessage id={TEXT_ID.RETURN_TO_USER_MANAGEMENT}/></b></text>
            </div>
            <div className='edit-user-content'>
                    <Formik
                        validationSchema={schema}
                        onSubmit={async (values)=>{
                            setLoading(true);
                            await networkUtils
                                .makeAPICall(
                                    {
                                        method: 'PATCH',
                                        targetBackend: 'juvoAdminApis',
                                        url: `/user-mgmt/update-user/${(values as any).userId}`,
                                        data: values,
                                    },
                                    customContext.user.carrier,
                                )
                                .catch((error) => {
                                    setLoading(false);
                                    console.error('updateUser error:', error);
                                });
                            setRefreshTimestamp(new Date());
                            setLoading(false);
                            setModalOpen(true);
                        }}
                        initialValues={{
                            ...userToEdit
                        }}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              values,
                              setFieldValue,
                              touched,
                              isValid,
                              errors,
                          }) => (

                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='edit-user-panel'>
                                    <div className='edit-user-panel-title'>
                                        <text className='edit-user-panel-title-text'><b><FormattedMessage id={TEXT_ID.EDIT_USER}/></b></text>
                                        <button className='edit-user-remove-btn' type={'button'} onClick={()=>{setDialogOpen(true);}}>
                                            <FormattedMessage id={TEXT_ID.REMOVE}/>
                                        </button>
                                        <button className={`${loading?'edit-user-save-btn-loading':'edit-user-save-btn'}`} type='submit'>
                                            <FormattedMessage id={TEXT_ID.SAVE}/>
                                        </button>
                                        {loading && <CircularProgress className='edit-user-submit-loading' size={24}  />}
                                    </div>
                                    <UserInputGroup handleChange={handleChange} values={values} errors={errors} setFieldValues={setFieldValue} deleteable={false}/>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <InfoDialog open={isDialogOpen} loading={loadingForRemoval} titleTextID={TEXT_ID.CONFIRM_REMOVE_USER} subtitleTextID={TEXT_ID.THIS_ACTION_IS_PERMANENT_AND_NOT_REVERSIBLE} confirmTextID={TEXT_ID.CONFIRM} cancelTextID={TEXT_ID.CANCEL} handleClose={()=>{setDialogOpen(false)}} handleConfirm={onRemove}/>
                <InfoModal open={isModalOpen} icon={successIcon} titleTextID={TEXT_ID.YOU_VE_SUCCESSFULLY_SAVED_USER}/>
            </div>
}
