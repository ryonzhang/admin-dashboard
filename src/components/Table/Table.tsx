import React,{FunctionComponent} from 'react';
import './Table.css'
import Button from "@material-ui/core/Button";

type TableProps = {
    indexed:boolean,
    headers:Array<string>,
    rows: Array<Array<string|number>>
    actionText?:string,
    action?:Function,
}

export const Table: FunctionComponent<TableProps> = ({indexed,headers,rows,actionText,action}) =>
    <table className='table'>
        <tr className='table-header'>
            {headers.map(header=><th className='table-header-cell'>{header}</th>)}
            {actionText && <th className='table-header-cell'/>}
        </tr>
        {rows.map(row =>
            <tr className='table-row'>
                {row.map((rd, index) => <td
                    className={`table-row-cell ${index == 0 && indexed && 'table-row-cell-indexed'}`}>{rd}</td>)}
                {actionText && <td className='table-row-cell table-row-action'>
                    <Button  size="small" color="primary" className='table-row-action-text'>
                        {actionText}
                    </Button>
                </td>}
            </tr>)}
    </table>






