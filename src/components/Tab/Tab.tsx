import React,{FunctionComponent} from 'react';
import './Tab.css';



type TabProps = {
}

export const Tab: FunctionComponent<TabProps> = ({children}) =>
    <div className='tab'>
        {children}
    </div>;






