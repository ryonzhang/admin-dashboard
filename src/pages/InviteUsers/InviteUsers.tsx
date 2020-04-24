import axios from 'axios';
import React, {FunctionComponent, useContext, useState} from 'react';
import './InviteUsers.css';
import backIcon from '../../res/images/ic-back.svg';
import addIcon from '../../res/images/ic-add.svg';
import {USER_MANAGEMENT_PAGES} from '../UserManagement/UserManagement';
import {TEXT_ID} from '../../res/languages/lang';
import {FormattedMessage, IntlContext} from 'react-intl';
import networkUtils from '../../utils/network';
import {Form} from 'react-bootstrap';
import {CircularProgress} from '@material-ui/core';
import {UserInputGroup} from '../../components/UserInputGroup/UserInputGroup';
import {FieldArray, Formik} from 'formik';
import successIcon from '../../res/images/illustration-success.svg';
import errorIcon from '../../res/images/illustration-error.svg';
import {InfoModal} from '../../components/InfoModal/InfoModal';
import authUtils from '../../utils/auth';



type InviteUsersProps = {
    onSetActivePage: Function,
    setRefreshTimestamp:Function,
    className?:string,
}

let yup = require('yup');




export const InviteUsers: FunctionComponent<InviteUsersProps> = ({onSetActivePage,className,setRefreshTimestamp}) => {
    const [loading,setLoading]=useState(false);
    const [isSuccessModalOpen,setSuccessModalOpen]=useState(false);
    const [isErrorModalOpen,setErrorModalOpen]=useState(false);
    const [usersString,setUsersString]=useState([] as string[]);
    const intlContext =useContext(IntlContext);
    const closeAllModals=()=>{
        if(isSuccessModalOpen)setSuccessModalOpen(false);
        if(isErrorModalOpen)setErrorModalOpen(false);
    };
    const schema = yup.object().shape({
        users: yup.array()
            .of(
                yup.object({
                    firstName: yup.string().required(intlContext.formatMessage({id:TEXT_ID.FIRST_NAME_IS_A_REQUIRED_FIELD})),
                    lastName: yup.string().required(intlContext.formatMessage({id:TEXT_ID.LAST_NAME_IS_A_REQUIRED_FIELD})),
                    email: yup.string().email(intlContext.formatMessage({id:TEXT_ID.EMAIL_MUST_BE_A_VALID_EMAIL})).required(intlContext.formatMessage({id:TEXT_ID.EMAIL_IS_A_REQUIRED_FIELD})),
                    department: yup.string().required(intlContext.formatMessage({id:TEXT_ID.DEPARTMENT_IS_A_REQUIRED_FIELD})),
                })
            )
            .required('Must have users')
    });
    return <div className={`invite-users ${className}`} onClick={()=>{closeAllModals();if(isSuccessModalOpen)onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);}}>
        <div className='invite-users-title' onClick={() => {
            onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);
        }}>
            <img className='invite-users-icon' src={backIcon}/>
            <text className='invite-users-title-text'><b><FormattedMessage id={TEXT_ID.RETURN_TO_USER_MANAGEMENT}/></b>
            </text>
        </div>
        <div className='invite-users-content'>
            <Formik
                validationSchema={schema}
                initialValues={{ users: [{firstName:'',lastName:'',email:'',department:'' }]}}
                onSubmit={async(values: any) => {
                    setLoading(true);
                    let hasErrorOccurred = false;
                    let usersWithError: string[] = [];
                    await axios
                        .all(values.users.map((user:any)=>{return networkUtils
                            .makeAPICall({
                                targetBackend: 'juvoAdminApis',
                                url: '/user-mgmt/add-user',
                                method: 'POST',
                                data: {...user,carrier:authUtils.getCarrier()},
                            },
                            authUtils.getCarrier(),
                            )
                            .catch((error:any) => {
                                console.log('createUser error', error);
                                hasErrorOccurred = true;
                                usersWithError.push(user.email);
                                setErrorModalOpen(true);
                            });
                        }))
                        .then((res:any[]) => {
                            if(!usersWithError.length)setSuccessModalOpen(true);
                            return res;
                        })
                        .catch((e:any) => {
                            return e.response;
                        });
                    if(usersWithError.length){
                        setUsersString(usersWithError);
                        setErrorModalOpen(true);
                    }
                    setLoading(false);
                    setRefreshTimestamp(new Date());
                }
                }>
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
                    <div className='invite-users-panel'>
                        <Form>
                            <div className='invite-users-panel-title'>
                                <text className='invite-users-panel-title-text'><b><FormattedMessage id={TEXT_ID.INVITE_NEW_USERS}/></b>
                                </text>
                                <button className={(!loading && isValid)?'invite-users-invite-btn':'invite-users-invite-btn-disabled'} type="button" onClick={()=>handleSubmit()}>
                                    <FormattedMessage id={TEXT_ID.INVITE_USERS}/>
                                </button>
                                {loading && <CircularProgress className='invite-users-submit-loading' size={24}  />}
                            </div>
                            <FieldArray
                                name="users"
                                render={arrayHelpers => (
                                    <div>
                                        {values.users.map((user, index) => (
                                            <div key={index}>
                                                <UserInputGroup namePrefix={`users[${index}]`} values={user} errors={(errors.users||[])[index]} touched={(touched.users||[])[index]} deleteable={values.users.length>1} onDelete={()=>{arrayHelpers.remove(index);}}/>
                                            </div>
                                        ))}
                                        <div className='invite-users-add-more' onClick={() => {arrayHelpers.push({firstName:'',lastName:'',email:'',department:'' });}}>
                                            <img className='invite-users-add-more-icon' src={addIcon}/>
                                            <text className='invite-users-add-more-text'><FormattedMessage id={TEXT_ID.ADD_MORE}/></text>
                                        </div>
                                    </div>
                                )}
                            />
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
        <InfoModal open={isSuccessModalOpen} icon={successIcon} titleTextID={TEXT_ID.YOU_VE_SUCCESSFULLY_INVITED_NEW_USERS} />
        <InfoModal open={isErrorModalOpen} icon={errorIcon} titleTextID={TEXT_ID.THE_USERS_YOU_INTENDED_TO_ADD_ALREADY_EXIST_IN_THE_SYSTEM} values={usersString}/>
    </div>;
};
