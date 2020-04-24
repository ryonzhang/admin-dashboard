import React, {FunctionComponent, useContext, useState} from 'react';
import './Login.css';
import signInIcon from '../../res/images/illustration-sign-in.svg';
import {Formik, useFormik} from 'formik';
import {Form} from 'react-bootstrap';
import {InfoModal} from '../../components/InfoModal/InfoModal';
import requestSuccessIcon from '../../res/images/ic-landing-success.svg';
import {TEXT_ID} from '../../res/languages/lang';
import {FormattedMessage, IntlContext} from 'react-intl';
import {CustomContext} from '../../contexts/custom-context';
import {AxiosResponse} from 'axios';
import networkUtils from '../../utils/network';
import {CircularProgress} from '@material-ui/core';
import formUtils from '../../utils/form';

type LoginProps = {
}



export const Login: FunctionComponent<LoginProps> = () =>{
    const [isModalOpen,setModalOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const requestToken= async(email:string)=>{
        setLoading(true);
        return networkUtils.makeAPICall({
            targetBackend: 'juvoAdminApis',
            url: '/user-mgmt/getTokenizedUrl',
            method: 'POST',
            data: { email },
        })
            .then((response:AxiosResponse) => {
                console.log(response);
                setModalOpen(true);
                setLoading(false);
                return { status: response.status };
            })
            .catch((e:any) => {
                setLoading(false);
                console.log(e);
            });
    };
    const intlContext =useContext(IntlContext);
    let yup = require('yup');
    const schema = yup.object({
        email: yup.string().email(intlContext.formatMessage({id:TEXT_ID.EMAIL_MUST_BE_A_VALID_EMAIL})).required(intlContext.formatMessage({id:TEXT_ID.EMAIL_IS_A_REQUIRED_FIELD})),
    });
    return <CustomContext.Consumer>
        {({setLocale,validateFormHooks,setValidateFormHooks})=>
            <div className='login' onClick={()=>setModalOpen(false)}>
                <div className='login-container'>
                    <div className='login-request-email'>
                        <text className='login-request-email-welcome'><FormattedMessage id={TEXT_ID.WELCOME}/></text>
                        <text className='login-request-email-subtitle'><FormattedMessage id={TEXT_ID.WE_SENT_YOU_THE_LINK_VIA_EMAIL}/></text>

                        <Formik
                            validationSchema={schema}
                            onSubmit={console.log}
                            initialValues={{
                                email:''
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                                validateForm,
                                setFieldTouched,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit} className='login-form'>
                                    <Form.Group className='login-form-input'>
                                        <Form.Label className='login-form-input-label'><FormattedMessage id={TEXT_ID.ENTER_YOUR_EMAIL_ADDRESS}/></Form.Label>
                                        <Form.Control
                                            className='login-form-input-content'
                                            type="text"
                                            placeholder="your-email@your-domain.com"
                                            name="email"
                                            value={values.email}
                                            onChange={(e:any)=>{handleChange(e);setFieldTouched('email',true);formUtils.revalidateLogin(validateForm);}}
                                            isInvalid={!!errors.email}
                                        />

                                        <Form.Control.Feedback className='login-form-input-feedback' type="invalid">
                                            {touched.email && errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <button className={(isValid && !loading)?'login-submit-btn':'login-submit-btn-disabled'} disabled={!isValid} type='submit' onClick={()=>requestToken(values.email)}>
                                        <b><FormattedMessage id={TEXT_ID.REQUEST_LINK}/></b>

                                    </button>
                                    {loading && <CircularProgress className='login-submit-loading' size={24}  />}
                                    <div className='login-language'>
                                        <text className='login-language-option' onClick={()=>{setLocale('en');formUtils.revalidateLogin(validateForm);}}>English</text>
                                        <text className='login-language-option' onClick={()=>{setLocale('es-CL');formUtils.revalidateLogin(validateForm);}}>Español</text>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className='login-email-image'>
                        <img className='login-request-icon' src={signInIcon} />
                    </div>
                </div>
                <InfoModal open={isModalOpen} icon={requestSuccessIcon} titleTextID={TEXT_ID.SUCCESSFULLY_REQUESTED_LINK} subtitleTextID={TEXT_ID.WE_SENT_YOU_THE_LINK_VIA_EMAIL}/>
            </div>
        }
    </CustomContext.Consumer>;
};

