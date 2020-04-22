import React, {FormEvent, FunctionComponent, useContext} from 'react';
import './UserInputGroup.css'
import {InputField} from "../InputField/InputField";
import closeIcon from '../../res/images/ic-close.svg'
import {TEXT_ID} from "../../res/languages/lang";
import Can from "../../rbac/Can";
import authUtils from "../../utils/auth";
import {useFormikContext} from "formik";
import {CustomContext} from "../../contexts/custom-context";

type UserInputGroupProps = {
        values:any,
        errors:any,
        touched:any,
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
};

export const UserInputGroup: FunctionComponent<UserInputGroupProps> = ({values,errors,deleteable,namePrefix,onDelete,touched}) =>{
    const { validateForm} = useFormikContext();
    const {validateFormHooks,setValidateFormHooks} = useContext(CustomContext);
    if(!validateFormHooks.includes(validateForm))setValidateFormHooks([...validateFormHooks,validateForm]);
    return <div className='user-input-group'>
        <InputField className='user-group-item' labelTextID={TEXT_ID.FIRST_NAME} error={errors && errors.firstName} touched={touched && touched.firstName}  name={getPrefixedName(namePrefix,'firstName')}  placeholderTextID={TEXT_ID.FIRST_NAME} type={'string'} value={values.firstName} />
        <InputField className='user-group-item' labelTextID={TEXT_ID.LAST_NAME} error={errors && errors.lastName} touched={touched && touched.lastName}  name={getPrefixedName(namePrefix,'lastName')}  placeholderTextID={TEXT_ID.LAST_NAME} type={'string'} value={values.lastName} />
        <InputField className='user-group-item' labelTextID={TEXT_ID.EMAIL} error={errors && errors.email} touched={touched && touched.email}  name={getPrefixedName(namePrefix,'email')}  placeholderTextID={TEXT_ID.EMAIL} type={'string'} value={values.email} />
        <Can
            role={authUtils.getRole()}
            perform='assign:juvo-role'
            yes={()=>(
                <InputField className='user-group-item' options={departmentOptionArrayForJuvo} labelTextID={TEXT_ID.DEPARTMENT} error={errors && errors.department} touched={touched && touched.department}  isDropdown name={getPrefixedName(namePrefix,'department')}  placeholderTextID={TEXT_ID.PLEASE_SELECT_AN_OPTION} type={'number'} value={values.department && getOption(departmentOptionArrayForJuvo,values.department)} />
            )}
            no={()=>(
                <InputField className='user-group-item' options={departmentOptionArrayForCarrier} labelTextID={TEXT_ID.DEPARTMENT} error={errors && errors.department} touched={touched && touched.department}  isDropdown name={getPrefixedName(namePrefix,'department')}  placeholderTextID={TEXT_ID.PLEASE_SELECT_AN_OPTION} type={'number'} value={values.department && getOption(departmentOptionArrayForCarrier,values.department)} />
            )}
        />
        {deleteable && <img className='user-group-close-icon' src={closeIcon} onClick={onDelete}/>}
    </div>
};
