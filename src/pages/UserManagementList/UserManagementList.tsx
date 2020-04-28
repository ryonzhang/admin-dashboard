import React, {FunctionComponent,useEffect,useState} from 'react';
import './UserManagementList.css';
import {TabItem} from '../../components/Tab/TabItem/TabItem';
import {Tab} from '../../components/Tab/Tab';
import {Table} from '../../components/Table/Table';
import {USER_MANAGEMENT_PAGES} from '../UserManagement/UserManagement';
import {FormattedMessage } from 'react-intl';
import {TEXT_ID} from '../../res/languages/lang';
import networkUtils from '../../utils/network';
import convertUtils from '../../utils/converter';
import authUtils from '../../utils/auth';
import {can} from "../../rbac/Can";
type UserManagementProps = {
    onSetActivePage: Function,
    onSetUserToEdit: Function,
    className?:string,
    refreshListTimestamp:Date|null,
}

const connectionType = 'email';

enum USER_MANAGEMENT_TABS {
    ACTIVE_USERS,
    PENDING_USERS,
}

export type UserToEdit = {
    userId:string,
    firstName:string,
    lastName:string,
    email:string,
    department:string,
}

export const UserManagementList: FunctionComponent<UserManagementProps> = ({onSetActivePage,onSetUserToEdit,className,refreshListTimestamp}) =>{
    const [loading,setLoading]=useState(true);
    const [activeUsers,setActiveUsers]=useState([]);
    const [pendingUsers,setPendingUsers]=useState([]);
    const [activeTab,setActiveTab]=useState(USER_MANAGEMENT_TABS.ACTIVE_USERS);

    const action=(index:string)=>{
        const userToEdit:any=[...activeUsers,...pendingUsers].find((user:any)=> user.user_id === index);
        const formattedUserToEdit: UserToEdit= userToEdit && {
            userId:userToEdit.user_id,
            firstName:userToEdit.given_name,
            lastName:userToEdit.family_name,
            email:userToEdit.email,
            department:userToEdit.department
        };
        console.log(formattedUserToEdit);
        onSetUserToEdit(formattedUserToEdit);
        onSetActivePage(USER_MANAGEMENT_PAGES.EDIT_USER);
    };
    useEffect(() => {
        setLoading(true);
        networkUtils
            .makeAPICall(
                {
                    targetBackend: 'juvoAdminApis',
                    url: '/user-mgmt/get-users',
                    params: { q: `identities.connection:${connectionType}` }, // q params allow switching between email or db
                },
                authUtils.getCarrier()
            )
            .then((response) => {
                if (response.status === 200) {
                    //TODO:camelize keys
                    let userData = response.data;
                    (userData as any[]).forEach(user=>{user.last_login_date=convertUtils.dateFormatter(user.last_login);user.last_login_time=convertUtils.timeFormatter(user.last_login);});
                    if(!can(authUtils.getRole(),'view:juvo-role')){
                        userData=userData.filter((user:any) => user.user_metadata.department!=='juvo');
                    }
                    setActiveUsers(userData.filter((user:any) => user.email_verified).map((user:any)=>{Object.keys(user.user_metadata).forEach((key:any)=>user[key]=user.user_metadata[key]);return user;}));
                    setPendingUsers(userData.filter((user: any) => !user.email_verified).map((user:any)=>{Object.keys(user.user_metadata).forEach((key:any)=>user[key]=user.user_metadata[key]);return user;}));
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('getUsers error: ', error);
                setLoading(false);
            });},[refreshListTimestamp]
    );
    return <div className={`user-management-list ${className}`}>
        <div className='user-management-list-title'>
            <text className='user-management-list-title-text' onClick={()=>console.log(activeUsers)}><b><FormattedMessage id={TEXT_ID.USER_MANAGEMENT}/></b></text>
            <button className='user-management-list-invite-btn' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.INVITE_USERS);}}>
                <FormattedMessage id={TEXT_ID.INVITE_NEW_USERS}/>
            </button>
        </div>
        <div className='user-management-list-content'>
            <div className='user-management-list-panel'>
                <Tab>
                    <TabItem textID={TEXT_ID.ACTIVE_USERS} selected={activeTab===USER_MANAGEMENT_TABS.ACTIVE_USERS} onClick={()=>setActiveTab(USER_MANAGEMENT_TABS.ACTIVE_USERS)} loading={loading}/>
                    <TabItem textID={TEXT_ID.PENDING_USERS} selected={activeTab===USER_MANAGEMENT_TABS.PENDING_USERS} onClick={()=>setActiveTab(USER_MANAGEMENT_TABS.PENDING_USERS)} loading={loading}/>
                </Tab>
                {activeTab===USER_MANAGEMENT_TABS.ACTIVE_USERS?<Table indexed={true} IDs={(activeUsers as any[]).map(u=>u.user_id)} headerTextIDs={[TEXT_ID.FULL_NAME,TEXT_ID.EMAIL,TEXT_ID.ROLE,TEXT_ID.LAST_LOGIN,TEXT_ID.TIME]} rows={activeUsers.map(u=>convertUtils.getRowData(u,['name','email','primaryRole','last_login_date','last_login_time']))} actionTextID={TEXT_ID.EDIT} action={action}/>:
                    <Table indexed={true} IDs={(pendingUsers as any[]).map(u=>u.user_id)} headerTextIDs={[TEXT_ID.FULL_NAME,TEXT_ID.EMAIL,TEXT_ID.ROLE]} rows={pendingUsers.map(u=>convertUtils.getRowData(u,['name','email','primaryRole']))} actionTextID={TEXT_ID.EDIT} action={action}/>}
            </div>
        </div>
    </div>;
};

