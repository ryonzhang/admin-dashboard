import React, {FormEvent, FunctionComponent} from 'react';
import './UserInputGroup.css'
import {InputField} from "../InputField/InputField";
import closeIcon from '../../res/images/ic-close.svg'
import {TEXT_ID} from "../../res/languages/lang";

type UserInputGroupProps = {
        values:any,
        errors:any,
        handleChange:(event:FormEvent)=>void,
        setFieldValues:Function,
}

export const departmentOptionArray = [{key:'juvo',value:'Juvo'},{key:'admin',value:'Admin'},{key:'customerSupport',value:'Customer Support'}];

export const UserInputGroup: FunctionComponent<UserInputGroupProps> = ({values,errors,handleChange,setFieldValues}) =>
    <div className='user-input-group'>
        <InputField className='user-group-item' labelTextID={TEXT_ID.FIRST_NAME} error={errors.firstName} handleChange={handleChange} name={'firstName'}  placeholderTextID={TEXT_ID.FIRST_NAME} type={'string'} value={values.firstName} setFieldValues={setFieldValues}/>
        <InputField className='user-group-item'labelTextID={TEXT_ID.LAST_NAME} error={errors.lastName} handleChange={handleChange} name={'lastName'}  placeholderTextID={TEXT_ID.LAST_NAME} type={'string'} value={values.lastName} setFieldValues={setFieldValues}/>
        <InputField className='user-group-item'labelTextID={TEXT_ID.EMAIL} error={errors.email} handleChange={handleChange} name={'email'}  placeholderTextID={TEXT_ID.EMAIL} type={'string'} value={values.email} setFieldValues={setFieldValues}/>
        <InputField className='user-group-item'options={departmentOptionArray} labelTextID={TEXT_ID.DEPARTMENT} error={errors.department} handleChange={handleChange} isDropdown name={'department'}  placeholderTextID={TEXT_ID.PLEASE_SELECT_AN_OPTION} type={'number'} value={(departmentOptionArray.find(department=>department.key===values.department) as any).value} setFieldValues={setFieldValues}/>
        <img className='user-group-close-icon' src={closeIcon}/>
    </div>
