import React, {FunctionComponent, useContext, useState} from 'react';
import './EditUser.css';
import backIcon from '../../res/images/ic-back.svg';
import {UserInputGroup} from '../../components/UserInputGroup/UserInputGroup';
import {USER_MANAGEMENT_PAGES} from '../UserManagement/UserManagement';
import {TEXT_ID} from '../../res/languages/lang';
import {FormattedMessage, IntlContext} from 'react-intl';
import {Formik} from 'formik';
import {Form} from 'react-bootstrap';
import {CircularProgress} from '@material-ui/core';
import successIcon from '../../res/images/illustration-success.svg';
import {UserToEdit} from '../UserManagementList/UserManagementList';
import networkUtils from '../../utils/network';
import {InfoModal} from '../../components/InfoModal/InfoModal';
import {InfoDialog} from '../../components/InfoDialog/InfoDialog';
import authUtils from '../../utils/auth';
import Can, {can} from '../../rbac/Can';
import {FIELDS} from '../../components/UserInputGroup/UserInputGroup';

type EditUserProps = {
    onSetActivePage: Function,
    setRefreshTimestamp:Function,
    userToEdit?:UserToEdit,
    className?:string,
}

enum OPERATION{
    EDIT,
    DELETE,
}

export const EditUser: FunctionComponent<EditUserProps> = ({onSetActivePage,userToEdit,className,setRefreshTimestamp}) =>{
    const [isModalOpen,setModalOpen]=useState(false);
    const [isDialogOpen,setDialogOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const [loadingForRemoval,setLoadingForRemoval]=useState(false);
    const [operation,setOperation]=useState(OPERATION.EDIT);
    const intlContext =useContext(IntlContext);
    const onRemove=async ()=>{
        console.log(authUtils.getUser());
        setLoadingForRemoval(true);
        setOperation(OPERATION.DELETE);
        await networkUtils
            .makeAPICall(
                {
                    method: 'DELETE',
                    targetBackend: 'juvoAdminApis',
                    url: `/user-mgmt/delete-user/${(userToEdit as any).userId}`,
                },
                authUtils.getCarrier()
            )
            .catch((error:any) => {
                console.log('deleteUser error', error);
            });
        setRefreshTimestamp(new Date());
        setModalOpen(true);
    };
    // validation texts
    let yup = require('yup');
    const schema = yup.object({
        firstName: yup.string().required(intlContext.formatMessage({id:TEXT_ID.FIRST_NAME_IS_A_REQUIRED_FIELD})),
        lastName: yup.string().required(intlContext.formatMessage({id:TEXT_ID.LAST_NAME_IS_A_REQUIRED_FIELD})),
        email: yup.string().email(intlContext.formatMessage({id:TEXT_ID.EMAIL_MUST_BE_A_VALID_EMAIL})).required(intlContext.formatMessage({id:TEXT_ID.EMAIL_IS_A_REQUIRED_FIELD})),
    });

    const getDisabledFields = ()=>{
        const data={
            userId: userToEdit && userToEdit.email,
            selfId: authUtils.getUsername(),
        };
        return [can(authUtils.getRole(),'edit:user-email',data) || FIELDS.EMAIL,can(authUtils.getRole(),'edit:user-role',data) || FIELDS.DEPARTMENT];
    };

    return <div className={`edit-user ${className}`} onClick={()=>{if(isModalOpen){setModalOpen(false);onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);}}}>
        <div className='edit-user-title' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);}}>
            <img className='edit-user-icon' src={backIcon}/>
            <text className='edit-user-title-text'><b><FormattedMessage id={TEXT_ID.RETURN_TO_USER_MANAGEMENT}/></b></text>
        </div>
        <div className='edit-user-content'>
            <Formik
                validationSchema={schema}
                onSubmit={async (values)=>{
                    setLoading(true);
                    setOperation(OPERATION.EDIT);
                    await networkUtils
                        .makeAPICall(
                            {
                                method: 'PATCH',
                                targetBackend: 'juvoAdminApis',
                                url: `/user-mgmt/update-user/${(values as any).userId}`,
                                data: values,
                            },
                            authUtils.getCarrier(),
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
                    values,
                    touched,
                    errors,
                }) => (

                    <Form noValidate onSubmit={handleSubmit}>
                        <div className='edit-user-panel' onClick={()=>{console.log(authUtils.getUser());}}>
                            <div className='edit-user-panel-title'>
                                <text className='edit-user-panel-title-text'><b><FormattedMessage id={TEXT_ID.EDIT_USER}/></b></text>
                                <Can
                                    role={authUtils.getRole()}
                                    perform="delete:users"
                                    data={{
                                        userId: userToEdit && userToEdit.email,
                                        selfId: authUtils.getUsername(),
                                    }}
                                    yes={() => (
                                        <button className='edit-user-remove-btn' type={'button'} onClick={()=>{setDialogOpen(true);}}>
                                            <FormattedMessage id={TEXT_ID.REMOVE}/>
                                        </button>
                                    )}
                                />
                                <button className={`${loading?'edit-user-save-btn-loading':'edit-user-save-btn'}`} type='submit'>
                                    <FormattedMessage id={TEXT_ID.SAVE}/>
                                </button>
                                {loading && <CircularProgress className='edit-user-submit-loading' size={24}  />}
                            </div>
                            <UserInputGroup values={values} errors={errors} touched={touched} deleteable={false} disabledFields={getDisabledFields()}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        <InfoDialog open={isDialogOpen} loading={loadingForRemoval} titleTextID={TEXT_ID.CONFIRM_REMOVE_USER} subtitleTextID={TEXT_ID.THIS_ACTION_IS_PERMANENT_AND_NOT_REVERSIBLE} confirmTextID={TEXT_ID.CONFIRM} cancelTextID={TEXT_ID.CANCEL} handleClose={()=>{setDialogOpen(false);}} handleConfirm={onRemove}/>
        <InfoModal open={isModalOpen} icon={successIcon} titleTextID={operation===OPERATION.EDIT?TEXT_ID.YOU_VE_SUCCESSFULLY_SAVED_USER:TEXT_ID.THE_USER_WAS_DELETED}/>
    </div>;
};
