## Juvo Admin Dashboard

This project is designed to provide up-to-date clients-related information to the admin staff who handles the daily business operations for our tel-com partners. Currently supported modules encompass `User Management` and `Customer Support`. `User Management` function enables platform admin users to add/edit/remove existing staff members with required access right meanwhile `Customer Support` will empower the customer service staff with latest data.

## Table of Contents
- [Juvo Admin Dashboard](#juvo-admin-dashboard)
  * [Design Page](#design-page)
  * [Jira board](#jira-board)
  * [Demo Page](#demo-page)
  * [How to Run this Project](#how-to-run-this-project)
  * [Folder structure](#folder-structure)
  * [Key File Structure](#key-file-structure)
  * [Naming Convention](#naming-convention)
    + [Folder Naming](#folder-naming)
    + [File Naming](#file-naming)
    + [Variable Naming](#variable-naming)
  * [Role Based Access Control](#role-based-access-control)
    + [rules.ts](#rulests)
  * [Internationalization or i18n orLocalization](#internationalization-or-i18n-orlocalization)
    + [Skeleton of Internationalization](#skeleton-of-internationalization)
    + [How we can change locale or language](#how-we-can-change-locale-or-language)
    + [How we can deploy a text of the selected locale](#how-we-can-deploy-a-text-of-the-selected-locale)
  * [Form](#form)
    + [Array of Input Groups](#array-of-input-groups)
    + [Validation with Customized Localized Messages](#validation-with-customized-localized-messages)
    + [Adapt Customized Input Component to Formik](#adapt-customized-input-component-to-formik)
    + [Only Touched Input Components Get Validated](#only-touched-input-components-get-validated)
  * [Auth Solution-Need to revise](#auth-solution-need-to-revise)
  * [Some Tricks or Hacks](#some-tricks-or-hacks)
    + [CSS-Important](#css-important)
    + [Redirection Trap](#redirection-trap)
    + [Custom Context](#custom-context)
    + [Refreshing of Validation Error upon Language Switching](#refreshing-of-validation-error-upon-language-switching)
  * [Maintenance Team](#maintenance-team)
    + [Point of contact in Slack](#point-of-contact-in-slack)
  * [Thank You](#thank-you)

### Design Page
https://app.zeplin.io/project/5c659a2ba981283c0b88f669

### Jira board
https://juvomobile.atlassian.net/jira/software/projects/BO/boards/193

### Demo Page
Staging Environment is CICD ready for demo at https://staging-dashboard.juvo.com/ ,Please contact Ruiyang Zhang(Slack ID) to invite you for testing.

### How to Run this Project

Download this project and run `npm install` and `npm start`
> Bear in mind that this project has to run in conjunction with https://github.com/juvoinc/juvo-admin-panel-services

### Folder structure
    .
    ├── public                  # static page resources
    ├── src                     # source folder as major code base
    │   ├── components          # reusable parts for presentation layer
    │   ├── contexts            # customized context(react jargon)
    │   ├── pages               # irreusable parts for presentation layer, normally occupy the entire screen
    │   ├── rbac                # role based access control related file, including config defining roles and permissions 
    │   ├── utils               # reusable functions for convenience
    │   ├── index.css           # entry css
    │   ├── index.js            # entry file
    │   ├── App.js              # global scale js file
    │   └── App.css             # global scale css 
    ├── .env                    # used for dot-env package to translate to process environment variable upon start
    ├── webpack.config.js       # webpack configuration for compiling bundled js
    ├── tsconfig.json           # ts restraints
    └── README.md               # This is ME!
    
> Advise for future owner: 
* Please refrain from modifying index.css,App.css  as their scope is global, it is very easy to lose track
* For presentation layer, keep the files inside pages and components folder, additional folder won't be neccessary
* Try to reuse components before creating new ones if the appeareace matches the design requirement majorly, this will help to build a consistent outlook for the entire project and easy to themize the application later

### Key File Structure

The component structure is designed with efficiency and maintenability in mind as below:

```ts
import React, {Component, FunctionComponent} from 'react';
import './TabItem.css'
import {FormattedMessage } from "react-intl";
import {CircularProgress} from "@material-ui/core";

type SidebarItemProps = {
    textID:string,
    selected:boolean,
    loading?:boolean,
    onClick?:(event:any)=>void,
}

export const TabItem: FunctionComponent<SidebarItemProps> = ({textID,selected,onClick,loading}) =>
    <div className={`tab-item ${selected ? 'tab-item-selected':'tab-item-unselected'}`} onClick={onClick}>
        <text className='tab-item-text'><FormattedMessage id={textID} /></text>
        {loading && <CircularProgress className='tab-item-loading' size={24}  />}
    </div>
```
A few things to notice:
* Define the props types at the start of the file and make sure we utilize the features of typescript of assigning meaningful types thus we can catch the error in compile time instead of runtime (this is the essence of using typescript, if you consider this not important, please use js to reduce confusion), thus please be very stingy when defining type as `any`,`object` which is just a shortcut to convert ts to js from the backdoor.
* Destructuring in parameters in functional component signature, aka this part `({textID,selected,onClick,loading})`, saves the headache in redefining props inside the function body and the generics in `FunctionComponent<SidebarItemProps>` helps you do the type check, which kills two birds with one stone.
* For pure functional components(without state, context, effect in function body), use => directly followed by the tsx for component, otherwise use =>{ function body; return <component>}
  
> Advise for future owner: It is respectful if better structure can be deployed across the project with some thoughtful benefits

### Naming Convention

For better maintenability, the code base should honor the best practices and also some customized practices in this repo.

#### Folder Naming
1. Component and pages should each have a separate folder with Capitalized Camel naming such as `TabItem`, `UserManagement`
2. Other folder names should be better restrained to one word in lower case, if composed of more than one word, use dash-case.

#### File Naming
* Component and pages should each have two files, `tsx` and `css` with Capitalized Camel naming such as `TabItem.css`, `TabItem.tsx`
* Other file names should be better restrained to one word in lower case, if composed of more than one word, use dash-case.

#### Variable Naming
* constants which will never be changed or used for exports should be in uppercase, such as `SELECTED_SIDEBAR_TAB`
* enums use UPPER_SNAKE_CASE like `TEXT_ID`
* other functions and variables are named with lowerCamelCase 
* css classes should be name-spaced with the component name, e.g.  `TabItem.js` and`TabItem.css` should contain only classes prefixed with `tab-item-` and  
* css classes use lower-dash-case

>Advise for future owner: 
* currently there are not very stringent rules with respect to variable naming, however some suggests to name boolean variable starting with is/has/should/can... for example `isOpen`
* some commonsense like method starting with `get` should not perform mutation secretly and function should start with verb

### Role Based Access Control
Although currently it is rather a small project, it is better to keep the future in mind and seriously consider extensibility.
As the top philosophy as programming is to decouple, Role based access control concerns four entities `user`, `role`, `permission` and `component`.<br/>
The entire flow goes like this: user of certain role will have a certain permission in accessing certain component. With this in mind, a configuration file and a component are designed to cater this need.

#### rules.ts
```ts
const userCheck = ({ userId, ownerId }) => {
  if (!userId || !ownerId) return false
  return userId === ownerId
}
const rules = {
    juvo: {
        static: [
            'view:user-management',
            'view:customer-support'
        ],
        dynamic: {
            'edit:users': userCheck,
            'delete:users': userCheck,
        },
    },
    admin: {
        static: [
            'view:user-management',
            'view:customer-support'
        ],
    },
}
```
As the code piece has configured, it has defined two roles, `juvo` and `admin`, for `juvo` role, it has two static permissions, `view:user-management`,`view:customer-support` which means that users of this role will always be allowed to view User Management board and Customer Support Board without question. At the same time, this role is also assigned with some dynamic permissions like `edit:users`. Dynamic permissions are conditional, only by fulfilling the userCheck function condition, the permission can be granted, in this case, the `userId` must be equal ot the `ownerId`.<br/>

Then it comes with the next question, how should we define the visibility or accessibility of certain component in the presentation layer?<br/>
It will be solved by the following component called `Can` as the permission related packages always use this word, some package is even named as `cancancan` because there is already a package called `cancan`.<br/>

```ts
import rules from './rules'

const check = (rules:any, role:any, action:any, data:any) => {
    const permissions:any = rules[role];
    if (!permissions) {
        return false
    }

    const staticPermissions = permissions.static;

    if (staticPermissions && staticPermissions.includes(action)) {
        return true
    }

    const dynamicPermissions = permissions.dynamic;

    if (dynamicPermissions) {
        const permissionCondition = dynamicPermissions[action]
        if (!permissionCondition) {
            return false
        }

        return permissionCondition(data)
    }
    return false
}

const Can = (props:any) =>
    check(rules, props.role, props.perform, props.data) ? props.yes() : props.no()

Can.defaultProps = {
    yes: () => null,
    no: () => null,
};

export default Can;
```
The component can be simply read like this. It takes the rules.ts which we previously defined and takes in the role of the user and check the static permission of the user, if found inside the static permissions, permission granted by returning `true` in function `const check = (rules:any, role:any, action:any, data:any)=>{...}`, if not found, continue to check the dynamic permissions by validating the dynamic permissions inside the role,if present, further checking the `data` parameters provided through the user-defined function in the `rules.ts`, as for this example, `const userCheck = ({ userId, ownerId }) => {...}`.If either of the static or dynamic permissions filter passes, it will render the `yes` component, otherwise the `no` component`.<br/>

After knowing the mechanism of the architecture, let's dive in one use case, see below:
```ts
<Can
    role={user.role}
    perform="edit:restaurants"
    data={{
      userId: user.id,
      ownerId: restaurant.owner_id,
    }}
    yes={() => (
      <CreateOrEditRestaurantModal
        user={user}
        restaurant={restaurant}
        button={
          <Button color="white" icon={'edit'} />
        }
      />
    )}
    no={() => (
        <div/>
    )}
  />
  ```
In the component page, pass role parameters in `role` and permission requested in `perform`, if you also need some dynamic permissions check, put them in side `data` and make sure the keys match with the user-defined function paramters in `rules.ts`, and add the `yes` component and `no` component which will correspondingly rendered when the permission is granted and not. Specific to this case, the user who have been granted a role with either static permission `edit:restaurants` or dynamic permission `edit:restaurants` who passes userCheck function with parameters `userId: user.id,ownerId:restaurant.owner_id`, will have their page rendered with `yes` component, and `no` component otherwise.

### Internationalization or i18n orLocalization

The package in use is https://github.com/formatjs/react-intl because of its flexibility. Here I will list down the skeleton of how to start with this package and two use case to configure the localized texts.

#### Skeleton of Internationalization

The package requires a locale-keyed text-id-to-localized-string map. Text-id-to-localized-string map means each string in every language should be assigned a text-id like below:
```ts
const en={
  "TEXT_ID_CONFIRM": "Confirm",
  "TEXT_ID_CANCEL": "Cancel",
  "TEXT_ID_EDIT": "Edit",
  "TEXT_ID_CLOSE": "Close",
 }
 ```
which should be assigned with a locale key to this map like below in `lang.ts`:
```ts
export const textPool = {en:en,'es-CL':es_CL}
 ```
After that the package pretty much will handle the internal logic of finding the right map to use when you want to request a text.<br/>

This only works within the package context called `IntlContext`, thus I have put the context across the entire project by wrapping the <App/> component like below:
```ts
import React,{useState} from 'react';
import {Main} from "./pages/Main/Main";
import { IntlProvider, FormattedMessage } from "react-intl";
import {textPool} from "./res/languages/lang";
import {CustomContext} from "./contexts/custom-context";

export default function App(props) {
  const [locale,setLocale]=useState('es-CL');
  const value ={locale,setLocale}
  return (
      <CustomContext.Provider value={value}>
        <IntlProvider locale={locale} messages={textPool[locale]}>
          <Main/>
        </IntlProvider>
      </CustomContext.Provider>
  );
}
```
#### How we can change locale or language
We normally change based on user trigger like clicking button or selecting dropdown options. In presentation layer, we can add our context consumer to provide the functionality of the package like below:
```ts
<CustomContext.Consumer>
    {({setLocale})=>
        <div className='login-language'>
            <text className='login-language-option' onClick={()=>setLocale('en')}>English</text>
            <text className='login-language-option' onClick={()=>setLocale('es-CL')}>Español</text>
        </div> 
    }
</CustomContext.Consumer>
 ```
#### How we can deploy a text of the selected locale
The locale is in the backdrop as the user also selected or by system default. Thus finding the string should only be a matter of the right text-id.
1. Deploy string using component<br/>
Use the following component provided by this package to get the text of the selected locale
```ts
<FormattedMessage id={TEXT_ID.WELCOME}/>
```
2. Get string in the preprocessing phase<br/>
Sometimes, we use other people's component which we cannot pass in the text-id or pass in the `<FormattedMessage id={TEXT_ID.WELCOME}/>` componnet, so we need to preprocess the text-id to obtain the corresponding text of given locale. We need to get the context in the js code and using the context functions to make it like below:
```ts
const intlContext =useContext(IntlContext);
const editUserText=intlContext.formatMessage({id:TEXT_ID.EDIT_USER});
```
> Note to future owner: it is a best practice to define an enum in `lang.ts` to host all the text-ids as it would be super efficient to benefit from the auto-complete functions in IDE with it

### Form 
Handling forms is made very simple with the help of `formik`, please refer to https://github.com/jaredpalmer/formik for more information about general usage. I just would like to list down some important special usage of the library inside this repo, being array of input groups, validation with customized localized messages, using adapt customized input component to the library.

#### Array of Input Groups
As in <InviteUsers/> component, it is required to add/remove a group of input boxes, `arrayHelper` comes as a rescue in this case. It will link up with the `values` and fill the input components.
```ts
<FieldArray
    name="users"
    render={arrayHelpers => (
        <div>
            {values.users.map((user, index) => (
                <div key={index}>
                    <UserInputGroup namePrefix={`users[${index}]`} values={user} errors={(errors.users||[])[index]} handleChange={handleChange} setFieldValues={setFieldValue} deleteable={values.users.length>1} onDelete={()=>{arrayHelpers.remove(index)}}/>
                </div>
            ))}
            <div className='invite-users-add-more' onClick={() => {arrayHelpers.push({firstName:'',lastName:'',email:'',department:'' });}}>
                <img className='invite-users-add-more-icon' src={addIcon}/>
                <text className='invite-users-add-more-text'><FormattedMessage id={TEXT_ID.ADD_MORE}/></text>
            </div>
        </div>
    )}
/>
```
It is worth mentioning the validation piece in this case, `yup` is used for validation and to configure that for array, it is done like below:
```
const schema = yup.object().shape({
    users: yup.array()
        .of(
            yup.object({
                firstName: yup.string().required(),
                lastName: yup.string().required(),
                email: yup.string().email().required(),
                department: yup.string().required(),
            })
        )
        .required('Must have users')
});
```
#### Validation with Customized Localized Messages
By adding the error text in the restraint function parameter in `yup` object, we can achieve this, see below with i18n:
```ts
let yup = require('yup');
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(intlContext.formatMessage({id:TEXT_ID.EDIT_USER})),
});
```
#### Adapt Customized Input Component to Formik
If we use Formik official component, the pain is pretty much released because of native support of all the functionalities like `handleChange`, however if we would like to augment our user scenarios most of the time with other user-defined components or input components from other library. the `onChange` method may come in various flavors, some is called `onSelect`,some `onDropdown` with very different function signatures. Definitely those function hooks will not automatically linked with `values`, the central state of formik, which means without proper customized data binding, `values` will not be changed, thus the input box will always hold the stale value for the user no matter what he has input.<br/>
Thus here we have to use some less commonly used function called `setFieldValue`, with the properly passed name, the value can be set by this method, but keep in mind to pass down this function in the properties to your customized input or input components in other library. Below is an example of customized component used inside formik:
```ts
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
 ```
#### Only Touched Input Components Get Validated
From user experience point of view, if the user has input something in one input box, however all the input boxed get validated with error message, it delivers unwanted surprise. To mitigate this issue where the framework has some predefined functions that we have to use like `arrayHelper.push` which always perform form-wide validation, we need to condition the visibility of the error message. To be clear, error message will be generated on each input box once that field is validated, however without being touched, the input box shall not show the error message. In this case, we can exploit the feature of `touched` property offered by the framework like below:
```ts
const BaseInputFieldProps:FunctionComponent<BaseInputFieldProps> = ({labelTextID,name,type,value,placeholderTextID,error,className,touched}) =>{
    const context = useContext(IntlContext);
    const { setFieldTouched,handleChange} = useFormikContext();
    const placeholder=context.formatMessage({id:placeholderTextID});
    return     <Form.Group className={`input-field-base ${className}`}>
        <Form.Label className='input-field-label'><FormattedMessage id={labelTextID}/></Form.Label>
        <Form.Control
            className='input-field-content'
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e:any)=>{handleChange(e);setFieldTouched(name,true)}}
            isInvalid={!!error}
        />
        <Form.Control.Feedback className='input-field-feedback' type="invalid">
            { touched && error}
        </Form.Control.Feedback>
    </Form.Group>
}
```
Notice ` { touched && error} `, error message will only be presented given `touched` is true and `touched` is set true by `setFieldTouched(name,true)` provided by the framework and elegantly positioned inside `onChange` hook.
 
### Auth Solution-Need to revise
Currently the repo relies on Auth0 to handle the authentication and authorization which makes use of user-management APIs. These APIs are notoriously slow, probably as a hindrance for users actually calling them in order to promote their delegated user management page:https://auth0.com/blog/delegated-admin-v2/. The strategy deployed in this repo is passwordless login specified in https://auth0.com/passwordless where the user is sent an email to login upon request from the portal, and from that Auth0 login link, we are able to extract the auth token bearing the key information including the user's role, carrier,etc. We have put the auth related information in the Cookies and upon logout, we delete from the cookies.<br/>
The reason for a second look into this solution is because of the super slow API, unneccessary cost attached to Auth0 and a separate database to hold essencial information for security concern.

### Some Tricks or Hacks 
#### CSS-Important
As a common knowledge that css !important is an ugly hack in most cases, as it overwrites the other styles dominantly but hard to trace back the culprit. The reason this is used in a couple of places in the repo is try to overwrite the styles in other libraries, as the other library sometimes attach many css styles to a single element which makes it almost impossible to overwrite unless with more customized classes attached to it(even uglier) or an `!important` annotator.<br/>
To ease the situation, the css files in the repo is consistently namespaced to avoid the situation of possible conflict.
#### Redirection Trap
As noted, this project will persistently show window.location as the host without query or path. As a simple application it is actually plausible as we don't want to land a user at a url linking to a page where the user does not have authority to view. However we do need the `window.location` to present us with some information(like the auth token of the Auth0 passwordless link) or for refresh the page. Thus the dirty hack comes to the stage:
```ts
/**
 * TODO:This file is an expediency for this small Single Page Application, if the project expands , recommend to change to react-router
 */
const refreshPage = () => {
    if(window.location.href!==window.location.origin+'/') window.location.href = window.location.origin;
};
const reLogin = () => {
    window.location.href = window.location.origin+'/login';
};

// @ts-ignore
export default {refreshPage, reLogin};
```
Once the authToken is retrieved from `window.location`, it is parsed and stored in the cookies then directly we call refreshPage to reset the `window.location` in a prehistoric javascript way which should be later adapted to `react-router`.
Also, by calling `reLogin` it effectively refresh the page as the page sticks to `window.location.origin` if `window.location` is never touched.

#### Custom Context
You would already notice some special code in the entry point of the application <App/> below:
```ts
import React,{useState} from 'react';
import {Main} from "./pages/Main/Main";
import { IntlProvider, FormattedMessage } from "react-intl";
import {textPool} from "./res/languages/lang";
import {CustomContext} from "./contexts/custom-context";

export default function App(props) {
  const [locale,setLocale]=useState('es-CL');
  const value ={locale,setLocale}
  return (
      <CustomContext.Provider value={value}>
        <IntlProvider locale={locale} messages={textPool[locale]}>
          <Main/>
        </IntlProvider>
      </CustomContext.Provider>
  );
}
```
It appears that using two context providers `CustomContext.Provider` and `IntlProvider` is redundant since both of them handle the locale and language switching. The reason for this trick is simple: For libraries like `IntlProvider` may not grant us the properties or functions we desire sometimes. Such as this case, `IntlContext` does not offer a method to change the locale, therefore we have to strike out for new approach. Adding a globally scoped context which provides desired methods whenever neccessary, in this case, a way to `setLocale`, would be a suitable solution, thus for any newly lashed-out functionalities, they could safely and easily handled by the customized context. 

#### Refreshing of Validation Error upon Language Switching
Language Switching is depicted in chapter [How we can deploy a text of the selected locale](#how-we-can-deploy-a-text-of-the-selected-locale). The methodology deployed for the validation is using `yup` package like below.
```ts
    let yup = require('yup');
    const schema = yup.object({
        firstName: yup.string().required(intlContext.formatMessage({id:TEXT_ID.FIRST_NAME_IS_A_REQUIRED_FIELD})),
        lastName: yup.string().required(intlContext.formatMessage({id:TEXT_ID.LAST_NAME_IS_A_REQUIRED_FIELD})),
        email: yup.string().email(intlContext.formatMessage({id:TEXT_ID.EMAIL_MUST_BE_A_VALID_EMAIL})).required(intlContext.formatMessage({id:TEXT_ID.EMAIL_IS_A_REQUIRED_FIELD})),
    });
```
The text will be fixed in the render time. Upon language switching, the validation message is already computed by the text-id and the locale, since it is not in the presentation layer(represented by <FormattedMessage/>), it will not be re-rendered. In order to trigger re-rendering so that the new language will be shown for the validation text, we have to manually force the validation of form, which further requires us to possess the form handles outside formik component or having the function hooks of `validateForm` outside. In here, I select the latter approach like the following in `UserInputGroup.ts`:
```ts
export const UserInputGroup: FunctionComponent<UserInputGroupProps> = ({values,errors,deleteable,namePrefix,onDelete,touched}) =>{
    const { validateForm} = useFormikContext();
    const {validateFormHooks,setValidateFormHooks} = useContext(CustomContext);
    if(!validateFormHooks.includes(validateForm))setValidateFormHooks([...validateFormHooks,validateForm]);
    return ...
};
```
By defining and filling in the context variable `validateFormHooks` with the function `validateForm` from formik context, it is guaranteed we could perform validation of forms wherever we want in the project. As the language switching is normally carried out as global operation thus the location of the component is unpredictable(maybe of uncertain relationship with the form).<br/>
After that we could actually call the function to validate in the language switching component like below:
```ts
<div className='sidebar-language'>
                <text className='sidebar-language-option' onClick={()=>{setLocale('en');formUtils.revalidateForms(validateFormHooks)}}>English</text>
                <text className='sidebar-language-option' onClick={()=>{setLocale('es-CL');formUtils.revalidateForms(validateFormHooks)}}>Español</text>
            </div>
```
The trick deployed over here is that, you could note that `setLocale('es-CL')` is followed by `formUtils.revalidateForms(validateFormHooks)}` which supposably validate the forms and generate the error message based on the correct `locale` information which has been called earlier. However react framework does not work in that way, `setLocale` will only kick in and mutate `locale` variable in the context in the next rendering cycle however at that moment, the validation is already done which still performed based on the previous locale thus we have to delay the validation of forms a little bit by doing the following in `form.ts`:
```ts
const revalidateForms=(validateFormHooks:(()=>{})[])=>{
    setTimeout(()=>{validateFormHooks.forEach(submit=>submit())},50)
};
```
In a nutshell, to defer the validation by 50ms, which is sufficient for the next rendering cycle to take place based on the CPU speed in the market.
> Note to future owner: This may be considered a dirty hack, as there is some magic number coming from nowhere (50), bad dirty hacks stem from ignorance of the capacity of the language, library and framework and enforce ancient ways of doing things with the new tools. Howver good dirty hacks exploit the frontier of the language, library and framework and overcome the restrictions of their original authors' hypothesis to perform tasks beyond the imagination of the language/library/frameworks' initial intention. Which category these hacks belong to, the ball is in your court.

### Maintenance Team
Juvo Singapore Team takes charge of the life cycle of this project. 
#### Point of contact in Slack
* Development related issue: Ruiyang Zhang
* Test/QA: Artur Mirzakhanyan
* Product/Translation: Raul Gonzalez
* Backend Support: Namrata Honnavar
* Designer: Melissa Issorat

### Thank You
I am cordially grateful for your visit, for any questions or concerns, please do not hesitate to raise issue or contact me through slack(id:Ruiyang Zhang), Hope you have a rocking day ahead!
