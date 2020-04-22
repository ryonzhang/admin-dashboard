import {createContext} from 'react';

export const CustomContext = createContext({
    locale:'en',
    setLocale:(locale:string)=>{},
    validateFormHooks:[] as any[],
    setValidateFormHooks:(data:any[]) => {},
});
