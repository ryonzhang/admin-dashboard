import React, {FunctionComponent} from 'react';
import ListItem from '@material-ui/core/ListItem';
import './SidebarItem.css';
import {FormattedMessage} from 'react-intl';

type SidebarItemProps = {
    textID:string,
    icon:string,
    selected:boolean,
    onClick:(event:any)=>void,
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = ({textID,icon,selected,onClick}) =>
    <ListItem className={`sidebar-item-container ${selected && 'sidebar-item-selected'}`} button key={textID} onClick={onClick}>
        <img className='sidebar-item-icon' src={icon}/>
        <text className='sidebar-item-text'><FormattedMessage id={textID}/></text>
    </ListItem>;



