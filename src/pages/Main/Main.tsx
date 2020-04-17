import React, {useState,FunctionComponent} from 'react';
import './Main.css'
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {SidebarItem} from "../../components/Sidebar/SidebarItem/SidebarItem";
import userManagementIcon from '../../res/images/sidebar/icon-white-user-management.svg'
import customerSupportIcon from '../../res/images/sidebar/icon-white-customer-support.svg'
import {UserManagement} from "../UserManagement/UserManagement";
import {CustomerSupport} from "../CustomerSupport/CustomerSupport";
import {TEXT_ID} from "../../res/languages/lang";
import {Login} from "../Login/Login";
import Cookies from 'js-cookie';
import authUtils from '../../utils/auth'
import convertUtils from '../../utils/converter'
import routeUtils from '../../utils/route'

enum SIDEBAR_TABS {
  USER_MANAGEMENT,
  CUSTOMER_SUPPORT,
}

export const Main: FunctionComponent = () => {
    const [activeTab,setActiveTab] = useState(SIDEBAR_TABS.USER_MANAGEMENT);
    const logout = (event:any)=>{
        Cookies.remove('authToken');
        routeUtils.reLogin();
    };


    // TODO: directly copy from the previous repo, the linting error should be fixed not repressed later and the util should be refactor, no setter should reside in getter function
    const hashToken = authUtils.getTokenFromHash();
    const cookieToken = Cookies.get('authToken');
    const isAuthenticated = hashToken || cookieToken;
    let tokenData;
    if(isAuthenticated) tokenData =convertUtils.decodeToken(hashToken || cookieToken as string);
    console.log(tokenData)
    routeUtils.refreshPage();

    return isAuthenticated?<div className='main-root'>
      <Sidebar logOut={logout}>
        <SidebarItem textID={TEXT_ID.USER_MANAGEMENT} icon={userManagementIcon} selected={activeTab===SIDEBAR_TABS.USER_MANAGEMENT} onClick={()=>{setActiveTab(SIDEBAR_TABS.USER_MANAGEMENT)}}/>
        <SidebarItem textID={TEXT_ID.CUSTOMER_SUPPORT} icon={customerSupportIcon} selected={activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT} onClick={()=>{setActiveTab(SIDEBAR_TABS.CUSTOMER_SUPPORT)}}/>
      </Sidebar>
      <div className='main-page'>
        {activeTab===SIDEBAR_TABS.USER_MANAGEMENT && <UserManagement/>}
        {activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT && <CustomerSupport/>}
      </div>
    </div>:<Login/>
}





