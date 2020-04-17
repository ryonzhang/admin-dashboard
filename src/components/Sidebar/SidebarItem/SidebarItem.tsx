import React, {FunctionComponent} from 'react';
import ListItem from '@material-ui/core/ListItem';
import './SidebarItem.css'

type SidebarItemProps = {
    text:string,
    icon:string,
    selected:boolean,
    onClick:(event:any)=>void,
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = ({text,icon,selected,onClick}) =>
      <ListItem className={`sidebar-item-container ${selected && 'sidebar-item-selected'}`} button key={text} onClick={onClick}>
          <img className='sidebar-item-icon' src={icon}/>
          <text className='sidebar-item-text'>{text}</text>
      </ListItem>



