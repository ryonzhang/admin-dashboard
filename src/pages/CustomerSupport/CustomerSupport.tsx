import React, {FunctionComponent, useContext, useState} from 'react';
import './CustomerSupport.css';
import {TabItem} from '../../components/Tab/TabItem/TabItem';
import {Tab} from '../../components/Tab/Tab';
import {Table} from '../../components/Table/Table';
import {Form} from 'react-bootstrap';
import noResultIcon from '../../res/images/illustration-no-results.svg';
import searchIcon from '../../res/images/illustration-search.svg';
import starLevelBeginner from '../../res/images/start-level/star-level-beginner.svg';
import starLevelBronze from '../../res/images/start-level/star-level-bronze.svg';
import starLevelDiamond from '../../res/images/start-level/star-level-diamond.svg';
import starLevelGold from '../../res/images/start-level/star-level-gold.svg';
import starLevelSilver from '../../res/images/start-level/star-level-silver.svg';
import {Formik} from 'formik';
import {FormattedMessage, IntlContext} from 'react-intl';
import {TEXT_ID} from '../../res/languages/lang';
import networkUtils from '../../utils/network';
import {CustomContext} from '../../contexts/custom-context';
import convertUtils from '../../utils/converter';
import {CircularProgress} from '@material-ui/core';
import authUtils from '../../utils/auth';
import {InfoDialog} from '../../components/InfoDialog/InfoDialog';
import {InfoModal} from '../../components/InfoModal/InfoModal';
import successIcon from '../../res/images/illustration-success.svg';
import errorIcon from '../../res/images/illustration-error.svg';
import formUtils from '../../utils/form';

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
    className?: string
}

type history = {
    type: string,
    title: string,
    pointChange: number,
    userLevel: string,
    userPoints: number,
    userLevelIndex: number,
    remainingAmountDue: number,
    loanDueDate: string,
    transactionId: string,
    amount: string,
    datetime: string,
}
type customerInfo={
    msisdn?: string,
    level?: string,
    currentLevel?: string,
    points?: number,
    airtimeBalance?:number,
    loanBalance?:number,
    balances?:object[],
    histories?:any[],
    repaidStatus?:string,
}
enum CUSTOMER_SUPPORT_TABS {
    BALANCES,
    HISTORY,
}
const starLevelIconMap:any={
    beginner: starLevelBeginner,
    bronze: starLevelBronze,
    diamond: starLevelDiamond,
    gold: starLevelGold,
    silver: starLevelSilver,
};

const CustomerInformation : FunctionComponent<CustomerInformationProps> = ({customerInfo}) =>{
    const [activeTab,setActiveTab]=useState(CUSTOMER_SUPPORT_TABS.HISTORY);
    const [isDialogOpen,setDialogOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const [isSuccessModalOpen,setSuccessModalOpen]=useState(false);
    const [isErrorModalOpen,setErrorModalOpen]=useState(false);
    const closeModals = ()=>{
        setSuccessModalOpen(false);
        setErrorModalOpen(false);
    };
    const onCancel=async ()=>{
        console.log(customerInfo);
        setLoading(true);
        return await networkUtils
            .makeAPICall(
                {
                    method: 'POST',
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${customerInfo.msisdn}/loans/terminate`,
                },
                authUtils.getCarrier(),
            )
            .then((response) => {
                console.log('CORRECT'+response);
                // @ts-ignore
                if (300 > response.status >= 200) {
                    return 0;
                }
                setSuccessModalOpen(true);
                setDialogOpen(false);
                setLoading(false);
            })
            .catch(() => {
                setErrorModalOpen(true);
                setDialogOpen(false);
                setLoading(false);
            });
    };
    return <div onClick={closeModals}>
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
                        <text className='customer-support-panel-text'>{customerInfo.level} <img className='customer-support-star-level-icon' src={starLevelIconMap[(customerInfo.currentLevel as string).toLowerCase()]}/></text>
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
                    <button className='customer-support-cancel-loan-btn' onClick={()=>{setDialogOpen(true);}}>
                        <FormattedMessage id={TEXT_ID.CANCEL_LOAN}/>
                    </button>
                </div>
                <div className='customer-support-panel-container-balance'>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance customer-support-panel-right-bar'>
                        <text className='customer-support-panel-text'>{'$ '+convertUtils.numberToFix(customerInfo.airtimeBalance)}</text>
                        <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.AIRTIME_BALANCE}/></text>
                    </div>
                    <div className='customer-support-panel-container customer-support-panel-subcontainer-balance'>
                        <text className='customer-support-panel-text'>{'$ '+convertUtils.numberToFix(customerInfo.loanBalance)}</text>
                        <text className='customer-support-panel-subtitle'><FormattedMessage id={TEXT_ID.LOAN_BALANCE}/></text>
                    </div>
                </div>
            </div>
        </div>
        <div className='customer-support-table-content'>
            <div className='customer-support-table-panel'>
                <Tab>
                    {false && <TabItem textID={TEXT_ID.BALANCES} selected={activeTab===CUSTOMER_SUPPORT_TABS.BALANCES} onClick={()=>setActiveTab(CUSTOMER_SUPPORT_TABS.BALANCES)} />}
                    <TabItem textID={TEXT_ID.HISTORY} selected={activeTab===CUSTOMER_SUPPORT_TABS.HISTORY} onClick={()=>setActiveTab(CUSTOMER_SUPPORT_TABS.HISTORY)}/>
                </Tab>
                {activeTab===CUSTOMER_SUPPORT_TABS.HISTORY?<Table IDs={(customerInfo.histories as any[]).map(u=>u.transactionId)} indexed={false}  headerTextIDs={[TEXT_ID.ACTIVITY,TEXT_ID.DATE,TEXT_ID.POINTS,TEXT_ID.ID]} rows={(customerInfo.histories as []).map(h=>convertUtils.getRowData(h,['title','datetime','pointChange','transactionId']))}/>:
                    <Table indexed={false} IDs={(customerInfo.histories as any[]).map(u=>u.transactionId)} headerTextIDs={[TEXT_ID.CATEGORY,TEXT_ID.PRODUCT_NAME,TEXT_ID.EXPIRATION_DATE,TEXT_ID.EXPIRATION_TIME,TEXT_ID.BALANCES]} rows={[].map(u=>convertUtils.getRowData(u,['title','datetime','pointChange','transactionId']))}/>}
            </div>
        </div>
        <InfoModal open={isSuccessModalOpen} icon={successIcon} titleTextID={TEXT_ID.YOU_HAVE_SUCCESSFULLY_CANCELLED_THIS_LOAN}/>
        <InfoModal open={isErrorModalOpen} icon={errorIcon} titleTextID={TEXT_ID.YOUR_CANCELLATION_IS_NOT_SUCCESSFUL}/>
        <InfoDialog open={isDialogOpen} loading={loading} titleTextID={TEXT_ID.CANCEL_LOAN} subtitleTextID={TEXT_ID.CANCEL_CONFIRM} confirmTextID={TEXT_ID.CONFIRM} cancelTextID={TEXT_ID.CANCEL} handleClose={()=>{setDialogOpen(false);}} handleConfirm={onCancel}/>
    </div>;
};


const NoResult: FunctionComponent<NoResultProps> = () =>
    <div className='customer-support-no-result'>
        <img src={noResultIcon}/>
        <text><FormattedMessage id={TEXT_ID.ZERO_RESULTS_FOUND}/></text>
    </div>;

const ToSearch: FunctionComponent<ToSearchProps> = () =>
    <div className='customer-support-to-search'>
        <img src={searchIcon}/>
        <text><FormattedMessage id={TEXT_ID.ENTER_CUSTOMER_MSISDN_OR_UUID_TO_START}/></text>
    </div>;


enum CUSTOMER_SUPPORT_STATUS {
    INIT,
    NO_RESULT,
    SUCCESS
}

export const CustomerSupport: FunctionComponent<CustomerSupportProps> = ({className}) => {
    const [customerInfo,setCustomerInfo]= useState({});
    const [customerSupportStatus,setCustomerSupportStatus] = useState(CUSTOMER_SUPPORT_STATUS.INIT);
    const context=useContext(CustomContext);
    const [loading,setLoading]=useState(false);
    const assignCustomInfoProps = (props:customerInfo)=>{
        setCustomerInfo(Object.assign(customerInfo,props));
        console.log(props);
    };
    const onSearch=async (msisdn:string)=>{
        setLoading(true);
        let hasErrorOccurred = false;
        const tasks = [
            await networkUtils.makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${msisdn}`,
                },
                authUtils.getCarrier(),context.locale
            ).catch(()=>{
                hasErrorOccurred = true;
                setCustomerSupportStatus(CUSTOMER_SUPPORT_STATUS.NO_RESULT);
                setLoading(false);
            }),
            await networkUtils.makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${msisdn}/history`,
                    params: {
                        page: 1, // TODO: set these in the UI
                        limit: 10,
                    },
                },
                authUtils.getCarrier(),context.locale
            ),
            await networkUtils.makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/customers/${msisdn}/repayments`,
                },
                authUtils.getCarrier(),context.locale
            ),
        ];
        Promise.all(tasks)
            .then(([customerDataResponse, historyResponse, repaymentStatusResponse]:any[])=>{
                if(!hasErrorOccurred){
                    const {balances,account} = camelcaseKeys(customerDataResponse.data,{deep: true});
                    const histories = camelcaseKeys(historyResponse.data,{deep: true});
                    (histories as history[]).forEach(history=>history.datetime=convertUtils.dateTimeFormatter(history.datetime));
                    const {status} = camelcaseKeys(repaymentStatusResponse.data,{deep: true});
                    assignCustomInfoProps({msisdn,airtimeBalance:balances[0].amount,loanBalance:balances[1].amount,level:account.level,currentLevel:account.currentLevel,points:account.points,histories,repaidStatus:status});
                    setCustomerSupportStatus(CUSTOMER_SUPPORT_STATUS.SUCCESS);
                }
                setLoading(false);
            });
    };
    const intlContext =useContext(IntlContext);
    let yup = require('yup');
    const schema = yup.object({
        msisdn: yup.number().typeError(intlContext.formatMessage({id:TEXT_ID.MSISDN_MUST_BE_A_NUMBER_TYPE})).required(intlContext.formatMessage({id:TEXT_ID.MSISDN_IS_A_REQUIRED_FIELD})),
    });
    const {validateFormHooks,setValidateFormHooks} = useContext(CustomContext);
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
                                touched,
                                errors,
                                setFieldTouched,
                                validateForm,
                                values,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit} className='customer-support-form'>
                                    <Form.Group className='customer-support-form-input'>
                                        <Form.Label className='customer-support-form--input-label'><FormattedMessage
                                            id={TEXT_ID.CUSTOMER_MSISDN_OR_UUID}/></Form.Label>
                                        <Form.Control
                                            className='customer-support-form-input-content'
                                            placeholder="209847502"
                                            name="msisdn"
                                            value={values.msisdn}
                                            onChange={(e:any)=>{handleChange(e);if(!validateFormHooks.includes(validateForm))setValidateFormHooks([...validateFormHooks,validateForm]);setFieldTouched('msisdn',true);formUtils.revalidateLogin(validateForm);}}
                                            isInvalid={!!errors.msisdn}
                                        />

                                        <Form.Control.Feedback className='customer-support-form-input-feedback'
                                            type="invalid">
                                            {touched.msisdn && errors.msisdn}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <button className={`${loading?'customer-support-submit-btn-loading':'customer-support-submit-btn'}`} type='submit'>
                                        <FormattedMessage id={TEXT_ID.SEARCH}/>
                                    </button>
                                    {loading && <CircularProgress className='customer-support-loading' size={24}  />}
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
    </div>;
};
