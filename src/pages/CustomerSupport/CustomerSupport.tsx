import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent} from "react";
import './CustomerSupport.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import backIcon from '../../res/images/ic-back.svg'
import {Form} from "react-bootstrap";
import noResultIcon from '../../res/images/illustration-no-results.svg'
import {Formik} from "formik";
type UserManagementProps = {
}
let yup = require('yup');

const schema = yup.object({
    msisdn: yup.number().required(),
});

const CustomerInformation : FunctionComponent<UserManagementProps> = () =>
    <div>
        <div className='customer-support-panel'>
            <div className='customer-support-panel-title'>
                <text className='customer-support-panel-title-text'><b>Customer ID</b></text>
            </div>
            <div className='customer-support-panel-container'>
                <text className='customer-support-panel-text'>+1 1233247680</text>
                <text className='customer-support-panel-subtitle'>MSISDN</text>
            </div>
        </div>
        <div className='customer-support-panel-level-balance'>
            <div className='customer-support-panel-level customer-support-panel'>
                <div className='customer-support-panel-title'>
                    <text className='customer-support-panel-title-text'><b>Level Information</b></text>
                </div>
                <div className='customer-support-panel-container-balance'>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance customer-support-panel-right-bar'>
                        <text className='customer-support-panel-text'>BRONZE</text>
                        <text className='customer-support-panel-subtitle'>LEVEL</text>
                    </div>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance'>
                        <text className='customer-support-panel-text'>42 PTS</text>
                        <text className='customer-support-panel-subtitle'>POINTS</text>
                    </div>
                </div>
            </div>
            <div className='customer-support-panel-balance customer-support-panel'>
                <div className='customer-support-panel-title'>
                    <text className='customer-support-panel-title-text'><b>Level Information</b></text>
                </div>
                <div className='customer-support-panel-container-balance'>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance customer-support-panel-right-bar'>
                        <text className='customer-support-panel-text'>BRONZE</text>
                        <text className='customer-support-panel-subtitle'>LEVEL</text>
                    </div>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance'>
                        <text className='customer-support-panel-text'>42 PTS</text>
                        <text className='customer-support-panel-subtitle'>POINTS</text>
                    </div>
                </div>
            </div>
        </div>
        <div className='customer-support-table-content'>
            <div className='customer-support-table-panel'>
                <Tab>
                    <TabItem text='Balances' selected={false}/>
                    <TabItem text='History' selected={true}/>
                </Tab>
                <Table indexed={true} headers={['FULL NAME','EMAIL','ROLE','LAST LOGIN','TIME']} rows={[['Admin ClaroChile','admin.clarochile.staging@juvo.com','Admin','04/16/2020','06:21']]} actionText={'EDIT'}/>
            </div>
        </div>
    </div>

const NoResult: FunctionComponent<UserManagementProps> = () =>
    <div className='customer-support-no-result'>
        <img src={noResultIcon}/>
        <text>0 Results Found!</text>
    </div>

export const CustomerSupport: FunctionComponent<UserManagementProps> = () =>
        <div className='customer-support'>
            <div className='customer-support-title'>
                <text className='customer-support-title-text'><b>Customer Support</b></text>
            </div>
            <div className='customer-support-content'>
                <div className='customer-support-panel'>
                    <div className='customer-support-panel-title'>
                        <text className='customer-support-panel-title-text'><b>Search Customer</b></text>
                    </div>
                    <div>
                        <div>
                            <Formik
                                validationSchema={schema}
                                onSubmit={console.log}
                                initialValues={{
                                    msisdn:2323
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
                                    <Form noValidate onSubmit={handleSubmit} className='customer-support-form'>
                                        <Form.Group className='customer-support-form-input'>
                                            <Form.Label className='customer-support-form--input-label'>Customer MSISDN OR UUID</Form.Label>
                                            <Form.Control
                                                className='customer-support-form-input-content'
                                                type="text"
                                                placeholder="209847502"
                                                name="msisdn"
                                                //@ts-ignore
                                                value={values.msisdn}
                                                onChange={handleChange}
                                                //@ts-ignore
                                                isInvalid={!!errors.msisdn}
                                            />

                                            <Form.Control.Feedback className='customer-support-form-input-feedback' type="invalid">
                                                {errors.msisdn}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <button className='customer-support-submit-btn' type='submit' onClick={()=>console.log('ryon')}>
                                            SEARCH
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <NoResult/>
            </div>
        </div>
