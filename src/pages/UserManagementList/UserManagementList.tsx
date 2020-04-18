import React, {FunctionComponent,useEffect,useState,useContext} from "react";
import './UserManagementList.css';
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
import {FormattedMessage } from "react-intl";
import {TEXT_ID} from '../../res/languages/lang';
import networkUtils from "../../utils/network";
import {CustomContext} from "../../contexts/custom-context";
import {CircularProgress} from "@material-ui/core";
import convertUtils from '../../utils/converter';
type UserManagementProps = {
    onSetActivePage: Function,
    onSetUserToEdit: Function,
}

const connectionType = 'email';

enum USER_MANAGEMENT_TABS {
    ACTIVE_USERS,
    PENDING_USERS,
}

export const UserManagementList: FunctionComponent<UserManagementProps> = ({onSetActivePage,onSetUserToEdit}) =>{
    const customContext = useContext(CustomContext);
    const [loading,setLoading]=useState(true);
    const [activeUsers,setActiveUsers]=useState([]);
    const [pendingUsers,setPendingUsers]=useState([]);
    const [activeTab,setActiveTab]=useState(USER_MANAGEMENT_TABS.ACTIVE_USERS);

    const action=(index:string)=>{
        onSetActivePage(USER_MANAGEMENT_PAGES.EDIT_USER);
        const userToEdit=[...activeUsers,...pendingUsers].find((user:any)=> user.user_id === index);
        console.log(userToEdit);
        onSetUserToEdit(userToEdit);
    };
    console.log(customContext);
    useEffect(() => {
        setLoading(true);
        networkUtils
            .makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: `/user-mgmt/get-users`,
                    params: { q: `identities.connection:${connectionType}` }, // q params allow switching between email or db
                },
                customContext.user.carrier,
            )
            .then((response) => {
                if (response.status === 200) {
                    //TODO:camelize keys
                    const userData = response.data;
                    (userData as any[]).forEach(user=>user.last_login_date=convertUtils.dateFormatter(user.last_login));
                    (userData as any[]).forEach(user=>user.last_login_time=convertUtils.timeFormatter(user.last_login));
                    setActiveUsers(userData.filter((user:any) => user.email_verified).map((user:any)=>{Object.keys(user.user_metadata).forEach((key:any)=>user[key]=user.user_metadata[key]);return user;}));
                    setPendingUsers(userData.filter((user: any) => !user.email_verified).map((user:any)=>{Object.keys(user.user_metadata).forEach((key:any)=>user[key]=user.user_metadata[key]);return user;}));
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('getUsers error: ', error);
               setLoading(false);
            })},[]
    );
    return <div className='user-management'>
        <div className='user-management-title'>
            <text className='user-management-title-text' onClick={()=>console.log(activeUsers)}><b><FormattedMessage id={TEXT_ID.USER_MANAGEMENT}/></b></text>
            <button className='user-management-invite-btn' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.INVITE_USERS)}}>
                <FormattedMessage id={TEXT_ID.INVITE_NEW_USERS}/>
            </button>
        </div>
        <div className='user-management-content'>
            <div className='user-management-panel'>
                <Tab>
                    <TabItem textID={TEXT_ID.ACTIVE_USERS} selected={activeTab===USER_MANAGEMENT_TABS.ACTIVE_USERS} onClick={()=>setActiveTab(USER_MANAGEMENT_TABS.ACTIVE_USERS)} />
                    <TabItem textID={TEXT_ID.PENDING_USERS} selected={activeTab===USER_MANAGEMENT_TABS.PENDING_USERS} onClick={()=>setActiveTab(USER_MANAGEMENT_TABS.PENDING_USERS)}/>
                </Tab>
                {activeTab===USER_MANAGEMENT_TABS.ACTIVE_USERS?<Table indexed={true} IDs={(activeUsers as any[]).map(u=>u.user_id)} headerTextIDs={[TEXT_ID.FULL_NAME,TEXT_ID.EMAIL,TEXT_ID.ROLE,TEXT_ID.LAST_LOGIN,TEXT_ID.TIME]} rows={activeUsers.map(u=>convertUtils.getRowData(u,['name','email','primaryRole','last_login_date','last_login_time']))} actionTextID={TEXT_ID.EDIT} action={action}/>:
                <Table indexed={true} IDs={(pendingUsers as any[]).map(u=>u.user_id)} headerTextIDs={[TEXT_ID.FULL_NAME,TEXT_ID.EMAIL,TEXT_ID.ROLE]} rows={pendingUsers.map(u=>convertUtils.getRowData(u,['name','email','primaryRole']))} actionTextID={TEXT_ID.EDIT} action={action}/>}
                {loading && <CircularProgress className='user-management-loading' size={50}  />}
            </div>
        </div>
    </div>
}

