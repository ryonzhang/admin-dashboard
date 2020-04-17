import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent} from "react";
import './InviteUsers.css'
import {TabItem} from "../../components/Tab/TabItem/TabItem";
import {Tab} from "../../components/Tab/Tab";
import {Table} from "../../components/Table/Table";
import backIcon from '../../res/images/ic-back.svg'
import {FormExample} from "../form";
import {UserInputGroup} from "../../components/UserInputGroup/UserInputGroup";
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
type InviteUsersProps = {
    onSetActivePage: Function,
}

export const InviteUsers: FunctionComponent<InviteUsersProps> = ({onSetActivePage}) =>
        <div className='invite-users'>
            <div className='invite-users-title' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST)}}>
                <img className='invite-users-icon' src={backIcon}/>
                <text className='invite-users-title-text'><b>Return to User Management</b></text>
            </div>
            <div className='invite-users-content'>

                <div className='invite-users-panel'>
                    <div className='invite-users-panel-title'>
                        <text className='invite-users-panel-title-text'><b>Invite New Users</b></text>
                        <button className='invite-users-invite-btn' >
                            INVITE USERS
                        </button>
                    </div>
                    <UserInputGroup/>
                    <UserInputGroup/>
                </div>
            </div>
        </div>
