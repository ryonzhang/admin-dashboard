import React, {FunctionComponent} from "react";
import './Login.css'
import signInIcon from '../../res/images/illustration-sign-in.svg'
import {Formik} from "formik";
import {Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {InfoModal} from "../../components/InfoModal/InfoModal";
import requestSuccessIcon from '../../res/images/ic-landing-success.svg'
type LoginProps = {
}
let yup = require('yup');

const schema = yup.object({
    email: yup.string().email().required(),
});

export const Login: FunctionComponent<LoginProps> = () =>
        <div className='login'>
            <InfoModal open={false} icon={requestSuccessIcon} title={'Successfully requested link'} subtitle={'We sent you the link via email. Please close this window and log in with the link. Please kindly check your Spam if the email doesn’t go in for a while. Thank you!'}/>
            <div className='login-container'>
                <div className='login-request-email'>
                    <text className='login-request-email-welcome'>Welcome!</text>
                    <text className='login-request-email-subtitle'>We will send you a login link to your email.</text>

                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            email:2323
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
                          }) => (
                            <Form noValidate onSubmit={handleSubmit} className='login-form'>
                                <Form.Group className='login-form-input'>
                                    <Form.Label className='login-form-input-label'>Enter your email address</Form.Label>
                                    <Form.Control
                                        className='login-form-input-content'
                                        type="text"
                                        placeholder="209847502"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />

                                    <Form.Control.Feedback className='login-form-input-feedback' type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <button className='login-submit-btn' type='submit' onClick={()=>console.log('ryon')}>
                                    <b>REQUEST LINK</b>
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className='login-language'>
                        <text className='login-language-option'>English</text>
                        <text className='login-language-option'>Espaniol</text>
                    </div>
                </div>
                <div className='login-email-image'>
                    <img className='login-request-icon' src={signInIcon} />
                </div>
            </div>
        </div>
