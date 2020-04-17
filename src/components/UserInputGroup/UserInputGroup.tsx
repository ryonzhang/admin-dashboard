import React,{FunctionComponent} from 'react';
import './UserInputGroup.css'
import {InputField} from "../InputField/InputField";
import closeIcon from '../../res/images/ic-close.svg'

export const UserInputGroup: FunctionComponent = ({}) =>
    <div className='user-input-group'>
        <InputField className='user-group-item' label={'FIRST NAME'} error={'The name is invalid'} handleChange={(e)=>{}} name={'firstName'}  placeholder={'Ryon'} type={'string'} value={'Ruiyang'}/>
        <InputField className='user-group-item'label={'LAST NAME'} error={'The name is invalid'} handleChange={(e)=>{}} name={'lastName'}  placeholder={'Ryon'} type={'string'} value={'Zhang'}/>
        <InputField className='user-group-item'label={'LAST NAME'} error={'The name is invalid'} handleChange={(e)=>{}} name={'lastName'}  placeholder={'Ryon'} type={'string'} value={'Zhang'}/>
        <InputField className='user-group-item'options={[{key:'as',value:'value'},{key:'ds',value:'vadsdlue'}]} label={'hahaahah'} error={'weewewe'} handleChange={(e)=>{}} isDropdown name={'email'}  placeholder={'Avata'} type={'number'} value={'value'}/>
        <img className='user-group-close-icon' src={closeIcon}/>
    </div>






