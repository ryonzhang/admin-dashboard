import React, {FormEvent, FunctionComponent} from 'react';
import './UserInputGroup.css'
import {InputField} from "../InputField/InputField";
import closeIcon from '../../res/images/ic-close.svg'
import {TEXT_ID} from "../../res/languages/lang";
import Can from "../../rbac/Can";
import authUtils from "../../utils/auth";

type UserInputGroupProps = {
        values:any,
        errors:any,
        handleChange:(event:FormEvent)=>void,
        setFieldValues:Function,
        deleteable:boolean,
        namePrefix?:string,
        onDelete?:()=>void,
}

export const departmentOptionArrayForJuvo:option[] = [{key:'juvo',value:'Juvo'},{key:'admin',value:'Admin'},{key:'customerSupport',value:'Customer Support'}];
export const departmentOptionArrayForCarrier:option[] = [{key:'admin',value:'Admin'},{key:'customerSupport',value:'Customer Support'}];

const getPrefixedName=(namePrefix:string|undefined|null,name:string)=>{
        return namePrefix?namePrefix+'.'+name:name;
};

type option = {
        key:string,
        value:string,
}

const getOption=(options:option[],key:string)=>{
        const option=options.find(op=>op.key===key);
        return option && option.value;
}

export const UserInputGroup: FunctionComponent<UserInputGroupProps> = ({values,errors,handleChange,setFieldValues,deleteable,namePrefix,onDelete}) =>
    <div className='user-input-group'>
        <InputField className='user-group-item' labelTextID={TEXT_ID.FIRST_NAME} error={errors && errors.firstName} handleChange={handleChange} name={getPrefixedName(namePrefix,'firstName')}  placeholderTextID={TEXT_ID.FIRST_NAME} type={'string'} value={values.firstName} setFieldValues={setFieldValues}/>
        <InputField className='user-group-item' labelTextID={TEXT_ID.LAST_NAME} error={errors && errors.lastName} handleChange={handleChange} name={getPrefixedName(namePrefix,'lastName')}  placeholderTextID={TEXT_ID.LAST_NAME} type={'string'} value={values.lastName} setFieldValues={setFieldValues}/>
        <InputField className='user-group-item' labelTextID={TEXT_ID.EMAIL} error={errors && errors.email} handleChange={handleChange} name={getPrefixedName(namePrefix,'email')}  placeholderTextID={TEXT_ID.EMAIL} type={'string'} value={values.email} setFieldValues={setFieldValues}/>
        <Can
            role={authUtils.getRole()}
            perform='assign:juvo-role'
            yes={()=>(
                <InputField className='user-group-item' options={departmentOptionArrayForJuvo} labelTextID={TEXT_ID.DEPARTMENT} error={errors && errors.department} handleChange={handleChange} isDropdown name={getPrefixedName(namePrefix,'department')}  placeholderTextID={TEXT_ID.PLEASE_SELECT_AN_OPTION} type={'number'} value={values.department && getOption(departmentOptionArrayForJuvo,values.department)} setFieldValues={setFieldValues}/>
            )}
            no={()=>(
                <InputField className='user-group-item' options={departmentOptionArrayForCarrier} labelTextID={TEXT_ID.DEPARTMENT} error={errors && errors.department} handleChange={handleChange} isDropdown name={getPrefixedName(namePrefix,'department')}  placeholderTextID={TEXT_ID.PLEASE_SELECT_AN_OPTION} type={'number'} value={values.department && getOption(departmentOptionArrayForCarrier,values.department)} setFieldValues={setFieldValues}/>
            )}
        />
        {deleteable && <img className='user-group-close-icon' src={closeIcon} onClick={onDelete}/>}
    </div>
