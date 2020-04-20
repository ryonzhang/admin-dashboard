## Juvo Admin Dashboard

This project is designed to provide up-to-date clients-related information to the admin staff who handles the daily business operations for our tel-com partners. Currently supported modules encompass `User Management` and `Customer Support`. `User Management` function enables platform admin users to add/edit/remove existing staff members with required access right meanwhile `Customer Support` will empower the customer service staff with latest data.

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
