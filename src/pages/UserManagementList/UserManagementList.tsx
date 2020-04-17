import React, {FunctionComponent,useEffect,useState,useContext} from "react";
import './UserManagementList.css';
import axios from 'axios';
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
import {FormattedMessage } from "react-intl";
import {TEXT_ID} from '../../res/languages/lang';
import networkUtils from "../../utils/network";
import {CustomContext} from "../../contexts/custom-context";
type UserManagementProps = {
    onSetActivePage: Function,
}

const connectionType = 'email';

enum USER_MANAGEMENT_TABS {
    ACTIVE_USERS,
    PENDING_USERS,
}

export const UserManagementList: FunctionComponent<UserManagementProps> = ({onSetActivePage}) =>{
    const customContext = useContext(CustomContext);
    const [activeUsers,setActiveUsers]=useState([]);
    const [activeTab,setActiveTab]=useState(USER_MANAGEMENT_TABS.ACTIVE_USERS);
    const [pendingUsers,setPendingUsers]=useState([]);
    console.log(customContext);
    useEffect(() => {
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
                    const userData = response.data;//camelizeKeys(response.data);
                    setActiveUsers(userData.filter((user:any) => user.email_verified).map((user:any)=>[user.name,user.email,user.user_metadata.primaryRole,user.last_login,user.created_at]));
                    setPendingUsers(userData.filter((user: any) => !user.email_verified).map((user:any)=>[user.name,user.email,user.user_metadata.primaryRole,user.created_at]));
                    console.log(activeUsers);
                }
            })
            .catch((error) => {
                console.error('getUsers error: ', error);
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
                {activeTab===USER_MANAGEMENT_TABS.ACTIVE_USERS?<Table indexed={true} headerTextIDs={[TEXT_ID.FULL_NAME,TEXT_ID.EMAIL,TEXT_ID.ROLE,TEXT_ID.LAST_LOGIN,TEXT_ID.TIME]} rows={activeUsers} actionTextID={TEXT_ID.EDIT}/>:
                <Table indexed={true} headerTextIDs={[TEXT_ID.FULL_NAME,TEXT_ID.EMAIL,TEXT_ID.ROLE,TEXT_ID.TIME]} rows={pendingUsers} actionTextID={TEXT_ID.EDIT}/>}
            </div>
        </div>
    </div>
}

