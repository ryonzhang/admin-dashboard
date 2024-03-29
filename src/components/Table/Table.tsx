import React,{FunctionComponent} from 'react';
import './Table.css';
import Button from '@material-ui/core/Button';
import {FormattedMessage} from 'react-intl';

type TableProps = {
    indexed:boolean,
    headerTextIDs:Array<string>,
    rows: Array<Array<any>>
    actionTextID?:string,
    action?:(event:any)=>void,
    IDs:Array<any>,
}

export const Table: FunctionComponent<TableProps> = ({indexed,headerTextIDs,rows,actionTextID,action,IDs}) =>
    <table className='table'>
        <thead>
            <tr className='table-header'>
                {headerTextIDs.map((headerTextID,index)=><th key={index} className='table-header-cell'><FormattedMessage id={headerTextID}/></th>)}
                {actionTextID && <th className='table-header-cell'/>}
            </tr>
        </thead>
        <tbody>
            {rows.map((row,rowIndex) =>
                <tr key={rowIndex} className='table-row'>
                    {row.map((rd, index) => <td key={index}
                        className={`table-row-cell ${index == 0 && indexed && 'table-row-cell-indexed'}`}>{rd}</td>)}
                    {actionTextID && <td className='table-row-cell table-row-action'>
                        <Button  size="small" color="primary" className='table-row-action-text' onClick={()=>{action && action(IDs[rowIndex]);}}>
                            <FormattedMessage id={actionTextID}/>
                        </Button>
                    </td>}
                </tr>)}
        </tbody>
    </table>;






