import React, {Component, FunctionComponent} from 'react';
import ListItem from '@material-ui/core/ListItem';
import './TabItem.css'

type SidebarItemProps = {
    text:string,
    selected:boolean,
}

export const TabItem: FunctionComponent<SidebarItemProps> = ({text,selected}) =>
    <div className={`tab-item ${selected ? 'tab-item-selected':'tab-item-unselected'}`}>
        <text className='tab-item-text'>{text}</text>
    </div>



