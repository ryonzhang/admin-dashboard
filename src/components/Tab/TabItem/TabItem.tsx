import React, {Component, FunctionComponent} from 'react';
import './TabItem.css'
import {FormattedMessage } from "react-intl";

type SidebarItemProps = {
    textID:string,
    selected:boolean,
    onClick?:(event:any)=>void,
}

export const TabItem: FunctionComponent<SidebarItemProps> = ({textID,selected,onClick}) =>
    <div className={`tab-item ${selected ? 'tab-item-selected':'tab-item-unselected'}`} onClick={onClick}>
        <text className='tab-item-text'><FormattedMessage id={textID} /></text>
    </div>



