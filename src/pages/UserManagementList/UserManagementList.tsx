import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent} from "react";
import './UserManagementList.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";

type UserManagementProps = {
    onSetActivePage: Function,
}

export const UserManagementList: FunctionComponent<UserManagementProps> = ({onSetActivePage}) =>
        <div className='user-management'>
            <div className='user-management-title'>
                <text className='user-management-title-text'><b>User Management</b></text>
                <button className='user-management-invite-btn' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.INVITE_USERS)}}>
                    INVITE NEW USERS
                </button>
            </div>
            <div className='user-management-content'>
                <div className='user-management-panel'>
                    <Tab>
                        <TabItem text='Active Users' selected={false}/>
                        <TabItem text='Pending Users' selected={true}/>
                    </Tab>
                    <Table indexed={true} headers={['FULL NAME','EMAIL','ROLE','LAST LOGIN','TIME']} rows={[['Admin ClaroChile','admin.clarochile.staging@juvo.com','Admin','04/16/2020','06:21']]} actionText={'EDIT'}/>
                </div>
            </div>
        </div>
