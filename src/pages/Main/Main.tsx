import React, {useState, FunctionComponent, useContext} from 'react';
import './Main.css';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import {SidebarItem} from '../../components/Sidebar/SidebarItem/SidebarItem';
import userManagementIcon from '../../res/images/sidebar/icon-white-user-management.svg';
import customerSupportIcon from '../../res/images/sidebar/icon-white-customer-support.svg';
import {UserManagement} from '../UserManagement/UserManagement';
import {CustomerSupport} from '../CustomerSupport/CustomerSupport';
import {TEXT_ID} from '../../res/languages/lang';
import {Login} from '../Login/Login';
import Cookies from 'js-cookie';
import authUtils from '../../utils/auth';
import convertUtils from '../../utils/converter';
import routeUtils from '../../utils/route';
import Can from '../../rbac/Can';

enum SIDEBAR_TABS {
  USER_MANAGEMENT,
  CUSTOMER_SUPPORT,
}
const SELECTED_SIDEBAR_TAB={
    juvo: SIDEBAR_TABS.USER_MANAGEMENT,
    admin: SIDEBAR_TABS.USER_MANAGEMENT,
    customerSupport: SIDEBAR_TABS.CUSTOMER_SUPPORT,
};

export const Main: FunctionComponent = () => {
    const logout = (event:any)=>{
        Cookies.remove('authToken');
        routeUtils.reLogin();
    };

    // TODO: directly copy from the previous repo, the linting error should be fixed not repressed later and the util should be refactor, no setter should reside in getter function
    const hashToken = authUtils.getTokenFromHash();
    const cookieToken = Cookies.get('authToken');
    const isAuthenticated = hashToken || cookieToken;
    let user:any;
    if(isAuthenticated) user =convertUtils.decodeToken(hashToken || cookieToken as string);
    // TODO: copy ended here

    authUtils.setUser(user);
    const [activeTab,setActiveTab] = useState((SELECTED_SIDEBAR_TAB as any)[user && user.department]);

    routeUtils.refreshPage();

    return isAuthenticated?<div className='main-root'>
        <Sidebar logOut={logout}>
            <Can
                role={user.department}
                perform='view:user-management'
                yes={()=>(
                    <SidebarItem textID={TEXT_ID.USER_MANAGEMENT} icon={userManagementIcon} selected={activeTab===SIDEBAR_TABS.USER_MANAGEMENT} onClick={()=>{setActiveTab(SIDEBAR_TABS.USER_MANAGEMENT);}}/>
                )}
            />
            <Can
                role={user.department}
                perform='view:customer-support'
                yes={()=>(
                    <SidebarItem textID={TEXT_ID.CUSTOMER_SUPPORT} icon={customerSupportIcon} selected={activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT} onClick={()=>{setActiveTab(SIDEBAR_TABS.CUSTOMER_SUPPORT);}}/>
                )}
            />
        </Sidebar>
        <div className='main-page'>
            <Can
                role={user.department}
                perform='view:user-management'
                yes={()=>(
                    <UserManagement className={(activeTab===SIDEBAR_TABS.USER_MANAGEMENT ? '':'main-hidden') as string}/>
                )}
            />
            <Can
                role={user.department}
                perform='view:customer-support'
                yes={()=>(
                    <CustomerSupport className={(activeTab===SIDEBAR_TABS.CUSTOMER_SUPPORT ? '':'main-hidden') as string}/>
                )}
            />
        </div>
    </div>:<Login/>;
};





