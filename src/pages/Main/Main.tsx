import React, {useState,FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import './Main.css'
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {SidebarItem} from "../../components/Sidebar/SidebarItem/SidebarItem";
import userManagementIcon from '../../res/images/sidebar/icon-white-user-management.svg'
import customerSupportIcon from '../../res/images/sidebar/icon-white-customer-support.svg'
import {UserManagement} from "../UserManagement/UserManagement";
import {InviteUsers} from "../InviteUsers/InviteUsers";
import {CustomerSupport} from "../CustomerSupport/CustomerSupport";
import {Login} from "../Login/Login";
import {InputField} from "../../components/InputField/InputField";
import {UserInputGroup} from "../../components/UserInputGroup/UserInputGroup";

enum SIDEBAR_TABS {
  USER_MANAGEMENT,
  CUSTOMER_SUPPORT,
}

export const Main: FunctionComponent = () => {
  const [activeTab,setActiveTab] = useState(SIDEBAR_TABS.USER_MANAGEMENT);
  const onClick = (event:any)=>{
    console.log(event)
  };

  return  <div className='main-root'>
      <Sidebar logOut={onClick}>
        <SidebarItem text={'User Management'} icon={userManagementIcon} selected={activeTab===SIDEBAR_TABS.USER_MANAGEMENT} onClick={()=>{setActiveTab(SIDEBAR_TABS.USER_MANAGEMENT)}}/>
        <SidebarItem text={'Customer Support'} icon={customerSupportIcon} selected={activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT} onClick={()=>{setActiveTab(SIDEBAR_TABS.CUSTOMER_SUPPORT)}}/>
      </Sidebar>
      <div className='main-page'>
        {activeTab===SIDEBAR_TABS.USER_MANAGEMENT && <UserManagement/>}
        {activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT && <CustomerSupport/>}
      </div>
    </div>
}





