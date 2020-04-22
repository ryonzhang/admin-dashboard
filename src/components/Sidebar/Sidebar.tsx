import React,{FunctionComponent} from 'react';
import List from '@material-ui/core/List';
import './Sidebar.css'
import {CustomContext} from "../../contexts/custom-context";
import logOutIcon from '../../res/images/sidebar/logout.svg'
import logoIcon from '../../res/images/sidebar/ic-logo.svg'
import {SidebarItem} from "./SidebarItem/SidebarItem";
import {TEXT_ID} from "../../res/languages/lang";
import {FormattedMessage} from "react-intl";
import formUtils from "../../utils/form";


type SidebarProps = {
    logOut:(event:any)=>void
}

export const Sidebar: FunctionComponent<SidebarProps> = ({logOut,children}) =>{
    return <CustomContext.Consumer>
        {({setLocale,validateFormHooks})=>
        <div className='sidebar-backdrop'>
            <div className='sidebar-logo'>
                <img src={logoIcon}/>
                <text className='sidebar-logo-text'><b><FormattedMessage id={TEXT_ID.JUVO}/></b> <FormattedMessage id={TEXT_ID.DASHBOARD}/></text>
            </div>
            <text className='sidebar-subtitle'><FormattedMessage id={TEXT_ID.MENU}/></text>
            <List className='sidebar-menu'>
                {children}
            </List>
            <div className='sidebar-logout'>
                <SidebarItem textID={TEXT_ID.LOGOUT} icon={logOutIcon} selected={false} onClick={logOut}/>
            </div>
            <div className='sidebar-language'>
                <text className='sidebar-language-option' onClick={()=>{setLocale('en');formUtils.revalidateForms(validateFormHooks)}}>English</text>
                <text className='sidebar-language-option' onClick={()=>{setLocale('es-CL');formUtils.revalidateForms(validateFormHooks)}}>Español</text>
            </div>
        </div>}
    </CustomContext.Consumer>
}







