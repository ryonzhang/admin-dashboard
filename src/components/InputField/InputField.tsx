import React, {FormEvent, FunctionComponent, useContext} from 'react';
import './InputField.css'
import { Form,Dropdown} from 'react-bootstrap';
import dropdownIcon from '../../res/images/dropdown/ic-dropdown.svg'
import {FormattedMessage, IntlContext} from "react-intl";
import {useFormikContext} from "formik";
import formUtils from "../../utils/form";
type InputFieldProps = {
    isDropdown?:boolean,
    labelTextID:string,
    error:string,
    value?:string|number,
    name:string,
    type:string|undefined,
    placeholderTextID:string,
    options?:Array<option>,
    className?:string,
    touched:boolean,
}
type option={
    key:string,
    value:string
}
type DropdownInputFieldProps = {
    value?:string|number,
    labelTextID:string,
    options:Array<option>,
    className?:string,
    placeholderTextID:string,
    name:string,
    error:string,
    touched:boolean,
}
type BaseInputFieldProps = {
    error:string,
    labelTextID:string,
    value?:string|number,
    name:string,
    type:string|undefined,
    placeholderTextID:string,
    className?:string,
    touched:boolean,
}

const DropdownInputField:FunctionComponent<DropdownInputFieldProps> = ({value,labelTextID,options,className,placeholderTextID,name,error,touched}) =>{
    const { setFieldTouched,setFieldValue} = useFormikContext();
    return <Form.Group className={`input-field-dropdown ${className}`}>
        <Form.Label className='input-field-label'><FormattedMessage id={labelTextID}/></Form.Label>
        <Dropdown onSelect={ (eventKey:string,e:React.SyntheticEvent<unknown>) => {setFieldValue(name,eventKey);setFieldTouched(name,true)}}>
            <Dropdown.Toggle id={'dropdown'} className={touched && error?'input-field-content-error':'input-field-content'}>
                {value || <FormattedMessage id={placeholderTextID}/>}
                <img className='input-field-dropdown-icon' src={dropdownIcon}/>
            </Dropdown.Toggle>

            <Dropdown.Menu className='input-field-dropdown-menu'>
                {options.map((option) => (
                    <Dropdown.Item className='input-field-dropdown-menu-item' key={option.key} active={value === option.value} eventKey={option.key}>
                        {option.value}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control.Feedback className='input-field-feedback' type="invalid">
            { touched && error}
        </Form.Control.Feedback>
    </Form.Group>
}


const BaseInputFieldProps:FunctionComponent<BaseInputFieldProps> = ({labelTextID,name,type,value,placeholderTextID,error,className,touched}) =>{
    const context = useContext(IntlContext);
    const { setFieldTouched,handleChange,validateForm} = useFormikContext();
    const placeholder=context.formatMessage({id:placeholderTextID});
    return     <Form.Group className={`input-field-base ${className}`}>
        <Form.Label className='input-field-label'><FormattedMessage id={labelTextID}/></Form.Label>
        <Form.Control
            className={touched && error?'input-field-content-error':'input-field-content'}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e:any)=>{handleChange(e);setFieldTouched(name,true);formUtils.revalidateForms([validateForm]);}}
            isInvalid={!!error}
        />
        <Form.Control.Feedback className='input-field-feedback' type="invalid">
            { touched && error}
        </Form.Control.Feedback>
    </Form.Group>
}


export const InputField: FunctionComponent<InputFieldProps> = ({isDropdown,className,labelTextID,name,type,value,placeholderTextID,error,options,touched}) =>
    isDropdown?<DropdownInputField className={className} error={error} touched={touched} placeholderTextID={placeholderTextID} labelTextID={labelTextID}  value={value} options={options||[]}  name={name}/>:
        <BaseInputFieldProps className={className} labelTextID={labelTextID} error={error} touched={touched} value={value} type={type} placeholderTextID={placeholderTextID} name={name} />








