import React, {FunctionComponent, useState, useContext} from "react";
import './UserManagement.css'
import {UserManagementList} from "../UserManagementList/UserManagementList";
import {InviteUsers} from "../InviteUsers/InviteUsers";
import {EditUser} from "../EditUser/EditUser";

type UserManagementProps = {
    className:string
}

export enum USER_MANAGEMENT_PAGES {
    USER_MANAGEMENT_LIST,
    INVITE_USERS,
    EDIT_USER
}


export const UserManagement: FunctionComponent<UserManagementProps> = ({className}) =>{
    const [activePage,setActivePage] = useState(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST);
    const [userToEdit,setUserToEdit] = useState({} as any);
    const [refreshListTimestamp,setRefreshListTimestamp] = useState(null);
    console.log(activePage)
    return <div className={className}>
        <UserManagementList className={(activePage === USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST || 'user-management-hidden') as string} refreshListTimestamp={refreshListTimestamp} onSetActivePage={setActivePage} onSetUserToEdit={setUserToEdit}/>
        <InviteUsers className={(activePage === USER_MANAGEMENT_PAGES.INVITE_USERS || 'user-management-hidden') as string} setRefreshTimestamp={setRefreshListTimestamp} onSetActivePage={setActivePage}/>
        {activePage === USER_MANAGEMENT_PAGES.EDIT_USER && <EditUser setRefreshTimestamp={setRefreshListTimestamp} onSetActivePage={setActivePage} userToEdit={userToEdit} />}
    </div>

}
