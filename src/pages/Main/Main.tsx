import React, {useState,FunctionComponent} from 'react';
import './Main.css'
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {SidebarItem} from "../../components/Sidebar/SidebarItem/SidebarItem";
import userManagementIcon from '../../res/images/sidebar/icon-white-user-management.svg'
import customerSupportIcon from '../../res/images/sidebar/icon-white-customer-support.svg'
import {UserManagement} from "../UserManagement/UserManagement";
import {CustomerSupport} from "../CustomerSupport/CustomerSupport";
import {TEXT_ID} from "../../res/languages/lang";

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
        <SidebarItem textID={TEXT_ID.USER_MANAGEMENT} icon={userManagementIcon} selected={activeTab===SIDEBAR_TABS.USER_MANAGEMENT} onClick={()=>{setActiveTab(SIDEBAR_TABS.USER_MANAGEMENT)}}/>
        <SidebarItem textID={TEXT_ID.CUSTOMER_SUPPORT} icon={customerSupportIcon} selected={activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT} onClick={()=>{setActiveTab(SIDEBAR_TABS.CUSTOMER_SUPPORT)}}/>
      </Sidebar>
      <div className='main-page'>
        {activeTab===SIDEBAR_TABS.USER_MANAGEMENT && <UserManagement/>}
        {activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT && <CustomerSupport/>}
      </div>
    </div>
}





