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
    return <div className={className}>
        {activePage === USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST && <UserManagementList onSetActivePage={setActivePage} onSetUserToEdit={setUserToEdit}/>}
        {activePage === USER_MANAGEMENT_PAGES.INVITE_USERS && <InviteUsers onSetActivePage={setActivePage} />}
        {activePage === USER_MANAGEMENT_PAGES.EDIT_USER && <EditUser onSetActivePage={setActivePage} userToEdit={userToEdit}/>}
    </div>

}
