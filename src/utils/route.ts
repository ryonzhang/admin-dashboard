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
