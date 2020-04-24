import {createContext} from 'react';

export const CustomContext = createContext({
    locale:'en',
    setLocale:(locale:string) => {console.log(locale);},
    validateFormHooks:[] as any[],
    setValidateFormHooks:(data:any[]) => {console.log(data);},
});
