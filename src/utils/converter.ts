import jwtDecode from 'jwt-decode';

/**
 * TODO:This is a direct copy from the old repository for the compatibility of quasi-backend service , should be refactored once the backend is restructured
 */
export interface JWTTokenType {
  'https://juvoup.com/primary-role': string;
  'https://juvoup.com/carrier': string;
  'https://juvoup.com/ApplicationId': string;
  'https://juvoup.com/email': string;
  'https://juvoup.com/department': string;
}

export interface TokenDataType {
  username: string;
  primaryRole: string;
  carrier: string;
  department: string;
}

const pad = (n: number): string => {
    return n < 10 ? `0${n}` : `${n}`;
};

const dateFormatter = (isoDate?: string): string => {
    if (!isoDate) return 'N/A';

    const date = new Date(isoDate);
    return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
};

const dateTimeFormatter = (isoDate?: string): string => {
    if (!isoDate) return 'N/A';
    return `${dateFormatter(isoDate)} ${timeFormatter(isoDate)}`;
};

const timeFormatter = (isoDate?: string): string => {
    if (!isoDate) return 'N/A';

    const date = new Date(isoDate);
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const decodeToken = (token: string): TokenDataType => {
    const jwtTokenDecoded: JWTTokenType = jwtDecode(token);
    return {
        username: jwtTokenDecoded['https://juvoup.com/email'],
        primaryRole: jwtTokenDecoded['https://juvoup.com/primary-role'],
        carrier: jwtTokenDecoded['https://juvoup.com/carrier'],
        department: jwtTokenDecoded['https://juvoup.com/department'],
    };
};

const numberToFix=(value:number|string|undefined)=>{
    if(typeof value ==='string'){
        return parseFloat(value).toFixed(2);
    }else if(typeof value ==='number'){
        return value.toFixed(2);
    }else{
        return '0.00';
    }
};

const getRowData=(user:any,keys:string[])=>{
    return Object.values(keys.reduce(function(o:any, k) { o[k] = user[k]; return o; }, {}));
};
export default { dateFormatter, timeFormatter, decodeToken ,getRowData, dateTimeFormatter,numberToFix};
