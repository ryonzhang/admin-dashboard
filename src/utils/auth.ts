import Cookies from "js-cookie";

const setUser=(user:any)=>{
    Cookies.set('user', user);
};

const getUser=()=>{
    return JSON.parse(Cookies.get('user') as string)
};

const getCarrier=()=>{
    return (getUser() as any)['carrier'];
}

const getRole=()=>{
    return (getUser() as any)['primaryRole'];
}

/**
 * TODO:This is a direct copy from the old repository for the compatibility of quasi-backend service , should be refactored once the backend is restructured
 */
const getTokenFromHash = () => {
    // eslint-disable-next-line no-restricted-globals
    console.log(location.hash);
    // eslint-disable-next-line no-restricted-globals
    const positionOfToken = location.hash.search('#access_token=');
    const tokenFound = positionOfToken !== -1;
    if (tokenFound) {
        // eslint-disable-next-line no-restricted-globals
        const authToken = location.hash.split('&')[0].substring(positionOfToken + 14);
        Cookies.set('authToken', authToken, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        });
        return authToken;
    }
    return false;
};

export default {
    getTokenFromHash,
    setUser,
    getUser,
    getCarrier,
    getRole,
};
