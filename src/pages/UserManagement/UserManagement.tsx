import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent, useState} from "react";
import './UserManagement.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import {UserManagementList} from "../UserManagementList/UserManagementList";
import {InviteUsers} from "../InviteUsers/InviteUsers";
type UserManagementProps = {
}

export enum USER_MANAGEMENT_PAGES {
    USER_MANAGEMENT_LIST,
    INVITE_USERS,
}

export const UserManagement: FunctionComponent<UserManagementProps> = () =>{
    const [activePage,setActivePage] = useState(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);
    return <div>
        {activePage === USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST && <UserManagementList onSetActivePage={setActivePage}/>}
        {activePage === USER_MANAGEMENT_PAGES.INVITE_USERS && <InviteUsers onSetActivePage={setActivePage}/>}
    </div>

}
