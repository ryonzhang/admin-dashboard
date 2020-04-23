/**
 * This file includes some miscellaneous functions for potential reusability
 */
const isEmpty = (obj:any) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default{
    isEmpty
};

