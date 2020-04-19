import React, {Component, FunctionComponent} from 'react';
import './TabItem.css'
import {FormattedMessage } from "react-intl";
import {CircularProgress} from "@material-ui/core";

type SidebarItemProps = {
    textID:string,
    selected:boolean,
    loading?:boolean,
    onClick?:(event:any)=>void,
}

export const TabItem: FunctionComponent<SidebarItemProps> = ({textID,selected,onClick,loading}) =>
    <div className={`tab-item ${selected ? 'tab-item-selected':'tab-item-unselected'}`} onClick={onClick}>
        <text className='tab-item-text'><FormattedMessage id={textID} /></text>
        {loading && <CircularProgress className='tab-item-loading' size={24}  />}
    </div>



