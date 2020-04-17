import React, {FunctionComponent} from "react";
import './UserManagementList.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
import {FormattedMessage } from "react-intl";
import {TEXT_ID} from '../../res/languages/lang'

type UserManagementProps = {
    onSetActivePage: Function,
}

export const UserManagementList: FunctionComponent<UserManagementProps> = ({onSetActivePage}) =>
    <div className='user-management'>
        <div className='user-management-title'>
            <text className='user-management-title-text'><b><FormattedMessage id={TEXT_ID.USER_MANAGEMENT}/></b></text>
            <button className='user-management-invite-btn' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.INVITE_USERS)}}>
                <FormattedMessage id={TEXT_ID.INVITE_NEW_USERS}/>
            </button>
        </div>
        <div className='user-management-content'>
            <div className='user-management-panel'>
                <Tab>
                    <TabItem textID={TEXT_ID.ACTIVE_USERS} selected={false}/>
                    <TabItem textID={TEXT_ID.PENDING_USERS} selected={true}/>
                </Tab>
                <Table indexed={true} headers={['FULL NAME','EMAIL','ROLE','LAST LOGIN','TIME']} rows={[['Admin ClaroChile','admin.clarochile.staging@juvo.com','Admin','04/16/2020','06:21']]} actionText={'EDIT'}/>
            </div>
        </div>
    </div>
