import React,{FunctionComponent} from 'react';
import './UserInputGroup.css'
import {InputField} from "../InputField/InputField";
import closeIcon from '../../res/images/ic-close.svg'

export type userToEdit={
        given_name:string,
        family_name:string,
        email:string,
        department:string,
}

type UserInputGroupProps = {
        user?:userToEdit
}

export const UserInputGroup: FunctionComponent<UserInputGroupProps> = ({user}) =>
    <div className='user-input-group'>
        <InputField className='user-group-item' label={'FIRST NAME'} error={'The name is invalid'} handleChange={(e)=>{}} name={'firstName'}  placeholder={'Ryon'} type={'string'} value={user? user.given_name:''}/>
        <InputField className='user-group-item'label={'LAST NAME'} error={'The name is invalid'} handleChange={(e)=>{}} name={'lastName'}  placeholder={'Ryon'} type={'string'} value={user? user.family_name:''}/>
        <InputField className='user-group-item'label={'Email'} error={'The name is invalid'} handleChange={(e)=>{}} name={'lastName'}  placeholder={'Ryon'} type={'string'} value={user? user.email:''}/>
        <InputField className='user-group-item'options={[{key:'juvo',value:'Juvo'},{key:'admin',value:'Admin'},{key:'customerSupport',value:'Customer Support'}]} label={'hahaahah'} error={'weewewe'} handleChange={(e)=>{}} isDropdown name={'email'}  placeholder={'Avata'} type={'number'} value={user? user.department:''}/>
        <img className='user-group-close-icon' src={closeIcon}/>
    </div>
