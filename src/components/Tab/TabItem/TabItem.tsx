import React, {Component, FunctionComponent} from 'react';
import './TabItem.css'
import {FormattedMessage } from "react-intl";
import {TEXT_ID} from "../../../res/languages/lang";

type SidebarItemProps = {
    textID:string,
    selected:boolean,
}

export const TabItem: FunctionComponent<SidebarItemProps> = ({textID,selected}) =>
    <div className={`tab-item ${selected ? 'tab-item-selected':'tab-item-unselected'}`}>
        <text className='tab-item-text'><FormattedMessage id={textID} /></text>
    </div>



