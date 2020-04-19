import React, {FormEvent, FunctionComponent, useContext} from 'react';
import './InputField.css'
import { Form,Dropdown} from 'react-bootstrap';
import dropdownIcon from '../../res/images/dropdown/ic-dropdown.svg'
import {FormattedMessage, IntlContext} from "react-intl";
type InputFieldProps = {
    isDropdown?:boolean,
    labelTextID:string,
    error:string,
    value?:string|number,
    name:string,
    type:string|undefined,
    placeholderTextID:string,
    handleChange:(event:FormEvent)=>void,
    setFieldValues:Function,
    options?:Array<option>,
    className?:string
}
type option={
    key:string,
    value:string
}
type DropdownInputFieldProps = {
    value?:string|number,
    labelTextID:string,
    handleChange: (event:FormEvent)=>void,
    setFieldValues:Function,
    options:Array<option>,
    className?:string,
    placeholderTextID:string,
    name:string,
    error:string,
}
type BaseInputFieldProps = {
    error:string,
    labelTextID:string,
    value?:string|number,
    name:string,
    type:string|undefined,
    placeholderTextID:string,
    handleChange:(event:FormEvent)=>void,
    setFieldValues:Function,
    className?:string
}

const DropdownInputField:FunctionComponent<DropdownInputFieldProps> = ({value,labelTextID,options,handleChange,className,placeholderTextID,setFieldValues,name,error}) =>
    <Form.Group className={`input-field-dropdown ${className}`}>
        <Form.Label className='input-field-label'><FormattedMessage id={labelTextID}/></Form.Label>
        <Dropdown onSelect={ (eventKey:string,e:React.SyntheticEvent<unknown>) => {setFieldValues(name,eventKey)}}>
            <Dropdown.Toggle id={'dropdown'} className='input-field-content'>
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
            {error}
        </Form.Control.Feedback>
    </Form.Group>

const BaseInputFieldProps:FunctionComponent<BaseInputFieldProps> = ({labelTextID,name,type,value,placeholderTextID,error,handleChange,className,setFieldValues}) =>{
    const context = useContext(IntlContext);
    const placeholder=context.formatMessage({id:placeholderTextID});
    return     <Form.Group className={`input-field-base ${className}`}>
        <Form.Label className='input-field-label'><FormattedMessage id={labelTextID}/></Form.Label>
        <Form.Control
            className='input-field-content'
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e:any)=>{handleChange(e);console.log(handleChange)}}
            isInvalid={!!error}
        />
        <Form.Control.Feedback className='input-field-feedback' type="invalid">
            {error}
        </Form.Control.Feedback>
    </Form.Group>
}


export const InputField: FunctionComponent<InputFieldProps> = ({isDropdown,className,labelTextID,name,type,value,placeholderTextID,error,handleChange,options,setFieldValues}) =>
    isDropdown?<DropdownInputField className={className} error={error} placeholderTextID={placeholderTextID} labelTextID={labelTextID}  value={value} options={options||[]} handleChange={handleChange} setFieldValues={setFieldValues} name={name}/>:
        <BaseInputFieldProps className={className} labelTextID={labelTextID} error={error} value={value} type={type} placeholderTextID={placeholderTextID} name={name} handleChange={handleChange} setFieldValues={setFieldValues}/>








