import React,{FunctionComponent} from 'react';
import List from '@material-ui/core/List';
import './Sidebar.css'

import logOutIcon from '../../res/images/sidebar/logout.svg'

import logoIcon from '../../res/images/sidebar/ic-logo.svg'
import {SidebarItem} from "./SidebarItem/SidebarItem";


type SidebarProps = {
    logOut:(event:any)=>void
}

export const Sidebar: FunctionComponent<SidebarProps> = ({logOut,children}) =>
    <div className='sidebar-backdrop'>
        <div className='sidebar-logo'>
            <img src={logoIcon}/>
            <text className='sidebar-logo-text'><b>Juvo</b> Dashboard</text>
        </div>
        <text className='sidebar-subtitle'>MENU</text>
        <List className='sidebar-menu'>
            {children}
        </List>
        <div className='sidebar-logout'>
            <SidebarItem text='Log Out' icon={logOutIcon} selected={false} onClick={logOut}/>
        </div>
        <div className='sidebar-language'>
            <text className='sidebar-language-option'>English</text>
            <text className='sidebar-language-option'>Espaniol</text>
        </div>
    </div>






