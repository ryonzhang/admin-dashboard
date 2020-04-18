import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent, useContext, useState} from "react";
import './CustomerSupport.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import backIcon from '../../res/images/ic-back.svg'
import {Form} from "react-bootstrap";
import noResultIcon from '../../res/images/illustration-no-results.svg'
import searchIcon from '../../res/images/illustration-search.svg'
import {Formik} from "formik";
import {FormattedMessage } from "react-intl";
import {TEXT_ID} from '../../res/languages/lang';
import networkUtils from "../../utils/network";
import {CustomContext} from "../../contexts/custom-context";
const camelcaseKeys = require('camelcase-keys');
type CustomerSupportProps = {
    className?:string
}
type CustomerInformationProps = {
    className?:string,
    customerInfo:customerInfo,
}
type NoResultProps = {
    className?:string
}
type ToSearchProps = {
    className?:string
}

let yup = require('yup');

const schema = yup.object({
    msisdn: yup.number().required(),
});

type history = {
    type: string,
    title: string,
    point_change: number,
    user_level: string,
    user_points: number,
    user_level_index: number,
    remaining_amount_due: number,
    loan_due_date: string,
    transaction_id: string,
    amount: string,
    datetime: string,
}
type customerInfo={
    msisdn?: string,
    level?: string,
    points?: number,
    airtimeBalance?:number,
    loanBalance?:number,
    balances?:object[],
    histories?:any[],
    repaidStatus?:string,
}


const CustomerInformation : FunctionComponent<CustomerInformationProps> = ({customerInfo}) =>
    <div>
        <div className='customer-support-panel'>
            <div className='customer-support-panel-title'>
                <text className='customer-support-title-text'><b><FormattedMessage id={TEXT_ID.CUSTOMER_ID}/></b></text>
            </div>
            <div className='customer-support-panel-container'>
                <text className='customer-support-panel-text'>{customerInfo.msisdn}</text>
                <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.MSISDN}/></text>
            </div>
        </div>
        <div className='customer-support-panel-level-balance'>
            <div className='customer-support-panel-level customer-support-panel'>
                <div className='customer-support-panel-title'>
                    <text className='customer-support-panel-title-text'><b><FormattedMessage id={TEXT_ID.LEVEL_INFORMATION}/></b></text>
                </div>
                <div className='customer-support-panel-container-balance'>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance customer-support-panel-right-bar'>
                        <text className='customer-support-panel-text'>{customerInfo.level}</text>
                        <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.LEVEL}/></text>
                    </div>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance'>
                        <text className='customer-support-panel-text'>{customerInfo.points} PTS</text>
                        <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.POINTS}/></text>
                    </div>
                </div>
            </div>
            <div className='customer-support-panel-balance customer-support-panel'>
                <div className='customer-support-panel-title'>
                    <text className='customer-support-panel-title-text'><b><FormattedMessage id={TEXT_ID.BALANCE_INFORMATION}/></b></text>
                </div>
                <div className='customer-support-panel-container-balance'>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance customer-support-panel-right-bar'>
                        <text className='customer-support-panel-text'>{customerInfo.airtimeBalance}</text>
                        <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.AIRTIME_BALANCE}/></text>
                    </div>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance'>
                        <text className='customer-support-panel-text'>{customerInfo.loanBalance}</text>
                        <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.LOAN_BALANCE}/></text>
                    </div>
                </div>
            </div>
        </div>
        <div className='customer-support-table-content'>
            <div className='customer-support-table-panel'>
                <Tab>
                    <TabItem textID={TEXT_ID.BALANCES} selected={false}/>
                    <TabItem textID={TEXT_ID.HISTORY} selected={true}/>
                </Tab>
                <Table indexed={true} idIndex={0} headerTextIDs={['FULL NAME','EMAIL','ROLE','LAST LOGIN','TIME']} rows={[['Admin ClaroChile','admin.clarochile.staging@juvo.com','Admin','04/16/2020','06:21']]} actionTextID={'EDIT'}/>
            </div>
        </div>
    </div>

const NoResult: FunctionComponent<NoResultProps> = () =>
    <div className='customer-support-no-result'>
        <img src={noResultIcon}/>
        <text><FormattedMessage id={TEXT_ID.ZERO_RESULTS_FOUND}/></text>
    </div>

const ToSearch: FunctionComponent<ToSearchProps> = () =>
    <div className='customer-support-to-search'>
        <img src={searchIcon}/>
        <text><FormattedMessage id={TEXT_ID.ENTER_CUSTOMER_MSISDN_OR_UUID_TO_START}/></text>
    </div>


enum CUSTOMER_SUPPORT_STATUS {
    INIT,
    NO_RESULT,
    SUCCESS
}

export const CustomerSupport: FunctionComponent<CustomerSupportProps> = ({className}) => {
    const customContext = useContext(CustomContext);
    const [customerInfo,setCustomerInfo]= useState({});
    const [customerSupportStatus,setCustomerSupportStatus] = useState(CUSTOMER_SUPPORT_STATUS.INIT);
    const assignCustomInfoProps = (props:customerInfo)=>{
        setCustomerInfo(Object.assign(customerInfo,props))
        console.log(props);
    };
    const onSearch=async (msisdn:string)=>{
        const tasks = [
            await networkUtils.makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${msisdn}`,
                },
                customContext.user.carrier,
            ).catch(err=>{console.log(err);setCustomerSupportStatus(CUSTOMER_SUPPORT_STATUS.NO_RESULT);}),
            await networkUtils.makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${msisdn}/history`,
                    params: {
                        page: 1, // TODO: set these in the UI
                        limit: 10,
                    },
                },
                customContext.user.carrier,
            ),
            await networkUtils.makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${msisdn}/repayments`,
                },
                customContext.user.carrier,
            ),
        ];
        Promise.all(tasks)
            .then(([customerDataResponse, historyResponse, repaymentStatusResponse]:any[])=>{

                const {balances,account} = camelcaseKeys(customerDataResponse.data,{deep: true});
                const histories = camelcaseKeys(historyResponse.data,{deep: true});
                const {status} = camelcaseKeys(repaymentStatusResponse.data,{deep: true});
                assignCustomInfoProps({msisdn,airtimeBalance:balances[0].amount,loanBalance:balances[1].amount,level:account.level,points:account.points,histories,repaidStatus:status});
                setCustomerSupportStatus(CUSTOMER_SUPPORT_STATUS.SUCCESS);
            });
    };
    return <div className={`customer-support ${className}`}>
        <div className='customer-support-title'>
            <text className='customer-support-title-text'><b><FormattedMessage id={TEXT_ID.CUSTOMER_SUPPORT}/></b>
            </text>
        </div>
        <div className='customer-support-content'>
            <div className='customer-support-panel'>
                <div className='customer-support-panel-title'>
                    <text className='customer-support-panel-title-text'><b><FormattedMessage
                        id={TEXT_ID.SEARCH_CUSTOMER}/></b></text>
                </div>
                <div>
                    <div>
                        <Formik
                            validationSchema={schema}
                            onSubmit={({msisdn})=>onSearch(msisdn)}
                            initialValues={{
                                msisdn: ''
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
                                        <Form.Label className='customer-support-form--input-label'><FormattedMessage
                                            id={TEXT_ID.CUSTOMER_MSISDN_OR_UUID}/></Form.Label>
                                        <Form.Control
                                            className='customer-support-form-input-content'
                                            type="text"
                                            placeholder="209847502"
                                            name="msisdn"
                                            //@ts-ignore
                                            value={values.msisdn}
                                            onChange={handleChange}
                                            isInvalid={!!errors.msisdn}
                                        />

                                        <Form.Control.Feedback className='customer-support-form-input-feedback'
                                                               type="invalid">
                                            {errors.msisdn}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <button className='customer-support-submit-btn' type='submit'>
                                        <FormattedMessage id={TEXT_ID.SEARCH}/>
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {customerSupportStatus===CUSTOMER_SUPPORT_STATUS.INIT && <ToSearch/>}
            {customerSupportStatus===CUSTOMER_SUPPORT_STATUS.NO_RESULT && <NoResult/>}
            {customerSupportStatus===CUSTOMER_SUPPORT_STATUS.SUCCESS && <CustomerInformation customerInfo={customerInfo}/>}
        </div>
    </div>
}
