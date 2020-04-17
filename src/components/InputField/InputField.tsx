import React, {FormEvent, FunctionComponent} from 'react';
import './InputField.css'
import { Form,Dropdown} from 'react-bootstrap';
import dropdownIcon from '../../res/images/dropdown/ic-dropdown.svg'
type InputFieldProps = {
    isDropdown?:boolean,
    label:string,
    error:string,
    value:string|number,
    name:string,
    type:string|undefined,
    placeholder:string|undefined,
    handleChange:(event:FormEvent)=>void,
    options?:Array<option>,
    className?:string
}
type option={
    key:string,
    value:string
}
type DropdownInputFieldProps = {
    value:string|number,
    label:string,
    handleChange: (event:FormEvent)=>void,
    options:Array<option>,
    className?:string
}
type BaseInputFieldProps = {
    error:string,
    label:string,
    value:string|number,
    name:string,
    type:string|undefined,
    placeholder:string|undefined,
    handleChange:(event:FormEvent)=>void,
    className?:string
}

const DropdownInputField:FunctionComponent<DropdownInputFieldProps> = ({value,label,options,handleChange,className}) =>
    <Form.Group className={`input-field-dropdown ${className}`}>
        <Form.Label className='input-field-label'>{label}</Form.Label>
        <Dropdown onSelect={ (eventKey:string,e:React.SyntheticEvent<unknown>) => {}}>
            <Dropdown.Toggle id={'dropdown'} className='input-field-content'>
                {value}
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
    </Form.Group>

const BaseInputFieldProps:FunctionComponent<BaseInputFieldProps> = ({label,name,type,value,placeholder,error,handleChange,className}) =>
    <Form.Group className={`input-field-base ${className}`}>
        <Form.Label className='input-field-label'>{label}</Form.Label>
        <Form.Control
            className='input-field-content'
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange}
            isInvalid={!!error}
        />
        <Form.Control.Feedback className='input-field-feedback' type="invalid">
            {error}
        </Form.Control.Feedback>
    </Form.Group>


export const InputField: FunctionComponent<InputFieldProps> = ({isDropdown,className,label,name,type,value,placeholder,error,handleChange,options}) =>
    isDropdown?<DropdownInputField className={className} label={label}  value={value} options={options||[]} handleChange={handleChange}/>:
        <BaseInputFieldProps className={className} label={label} error={error} value={value} type={type} placeholder={placeholder} name={name} handleChange={handleChange}/>








