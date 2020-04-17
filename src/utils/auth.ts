import Cookies from "js-cookie";

/**
 * TODO:This is a direct copy from the old repository for the compatibility of quasi-backend service , should be refactored once the backend is restructured
 */
const getTokenFromHash = (location: { hash: string }) => {
    console.log('ryon');
    console.log(location.hash);
    const positionOfToken = location.hash.search('#access_token=');
    const tokenFound = positionOfToken !== -1;
    console.log('tokenFound');

    if (tokenFound) {
        console.log('Token from hash is found');
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
    getTokenFromHash
};
