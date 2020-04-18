import React,{FunctionComponent} from 'react';
import './UserInputGroup.css'
import {InputField} from "../InputField/InputField";
import closeIcon from '../../res/images/ic-close.svg'
import {TEXT_ID} from "../../res/languages/lang";

export type userToEdit={
        given_name:string,
        family_name:string,
        email:string,
        department:string,
}

type UserInputGroupProps = {
        user?:userToEdit
}

const departmentOptionArray = [{key:'juvo',value:'Juvo'},{key:'admin',value:'Admin'},{key:'customerSupport',value:'Customer Support'}];

export const UserInputGroup: FunctionComponent<UserInputGroupProps> = ({user}) =>
    <div className='user-input-group'>
        <InputField className='user-group-item' labelTextID={TEXT_ID.FIRST_NAME} error={'The name is invalid'} handleChange={(e)=>{}} name={'firstName'}  placeholderTextID={TEXT_ID.FIRST_NAME} type={'string'} value={user? user.given_name:''}/>
        <InputField className='user-group-item'labelTextID={TEXT_ID.LAST_NAME} error={'The name is invalid'} handleChange={(e)=>{}} name={'lastName'}  placeholderTextID={TEXT_ID.LAST_NAME} type={'string'} value={user? user.family_name:''}/>
        <InputField className='user-group-item'labelTextID={TEXT_ID.EMAIL} error={'The name is invalid'} handleChange={(e)=>{}} name={'lastName'}  placeholderTextID={TEXT_ID.EMAIL} type={'string'} value={user? user.email:''}/>
        <InputField className='user-group-item'options={departmentOptionArray} labelTextID={TEXT_ID.DEPARTMENT} error={'weewewe'} handleChange={(e)=>{}} isDropdown name={'email'}  placeholderTextID={TEXT_ID.PLEASE_SELECT_AN_OPTION} type={'number'} value={user? user.department:''}/>
        <img className='user-group-close-icon' src={closeIcon}/>
    </div>
