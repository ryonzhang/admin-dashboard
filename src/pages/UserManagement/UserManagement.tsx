import React, {FunctionComponent, useState} from "react";
import './UserManagement.css'
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
