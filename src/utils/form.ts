/**
 * This is the hack done for form validation error update during language switch, it collects all the function hooks of validateForms and call it after the page successfully re-render around 50ms after the state update by the framework hook
 */
const revalidateForms=(validateFormHooks:(()=>{})[])=>{
    setTimeout(()=>{validateFormHooks.forEach(submit=>submit())},50)
};

const revalidateLogin=(validateFormHook:()=>{})=>{
    setTimeout(()=>{validateFormHook()},50)
};

export default {
    revalidateForms,
    revalidateLogin,
}

