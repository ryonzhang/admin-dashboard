import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent, useContext} from "react";
import './EditUser.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import backIcon from '../../res/images/ic-back.svg'
import {UserInputGroup} from "../../components/UserInputGroup/UserInputGroup";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
import {TEXT_ID} from "../../res/languages/lang";
import {FormattedMessage } from "react-intl";
import {Formik} from "formik";
import {Form} from "react-bootstrap";
import {CircularProgress} from "@material-ui/core";
import signInIcon from "../../res/images/illustration-sign-in.svg";
import {UserToEdit} from "../UserManagementList/UserManagementList";
import networkUtils from "../../utils/network";
import {CustomContext} from "../../contexts/custom-context";
type EditUserProps = {
    onSetActivePage: Function,
    userToEdit?:UserToEdit
}

let yup = require('yup');
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
});


export const EditUser: FunctionComponent<EditUserProps> = ({onSetActivePage,userToEdit}) =>{
    const customContext = useContext(CustomContext);
    return <div className='edit-user'>
            <div className='edit-user-title' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST)}}>
                <img className='edit-user-icon' src={backIcon}/>
                <text className='edit-user-title-text'><b><FormattedMessage id={TEXT_ID.RETURN_TO_USER_MANAGEMENT}/></b></text>
            </div>
            <div className='edit-user-content'>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values)=>{
                            networkUtils
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
                                    console.error('updateUser error:', error);
                                })
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

                            <Form noValidate onSubmit={handleSubmit} className='login-form'>
                                <div className='edit-user-panel'>
                                    <div className='edit-user-panel-title'>
                                        <text className='edit-user-panel-title-text'><b><FormattedMessage id={TEXT_ID.INVITE_NEW_USERS}/></b></text>
                                        <button className='edit-user-invite-btn' >
                                            <FormattedMessage id={TEXT_ID.REMOVE}/>
                                        </button>
                                        <button className='edit-user-invite-btn' type='submit'>
                                            <FormattedMessage id={TEXT_ID.SAVE}/>
                                        </button>
                                    </div>
                                </div>
                                <UserInputGroup handleChange={handleChange} values={values} errors={errors} setFieldValues={setFieldValue}/>
                                {/*{loading && <CircularProgress className='login-submit-loading' size={24}  />}*/}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
}
