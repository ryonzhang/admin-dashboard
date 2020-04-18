import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent} from "react";
import './InviteUsers.css'
import backIcon from '../../res/images/ic-back.svg'
import {USER_MANAGEMENT_PAGES} from "../UserManagement/UserManagement";
import {TEXT_ID} from "../../res/languages/lang";
import {FormattedMessage } from "react-intl";
type InviteUsersProps = {
    onSetActivePage: Function,
}

export const InviteUsers: FunctionComponent<InviteUsersProps> = ({onSetActivePage}) =>
        <div className='invite-users'>
            <div className='invite-users-title' onClick={()=>{onSetActivePage(USER_MANAGEMENT_PAGES.USER_MANAGEMENT_LIST)}}>
                <img className='invite-users-icon' src={backIcon}/>
                <text className='invite-users-title-text'><b><FormattedMessage id={TEXT_ID.RETURN_TO_USER_MANAGEMENT}/></b></text>
            </div>
            <div className='invite-users-content'>

                <div className='invite-users-panel'>
                    <div className='invite-users-panel-title'>
                        <text className='invite-users-panel-title-text'><b><FormattedMessage id={TEXT_ID.INVITE_NEW_USERS}/></b></text>
                        <button className='invite-users-invite-btn' >
                            <FormattedMessage id={TEXT_ID.INVITE_USERS}/>
                        </button>
                    </div>
                    {/*<UserInputGroup/>*/}
                    {/*<UserInputGroup/>*/}
                </div>
            </div>
        </div>
