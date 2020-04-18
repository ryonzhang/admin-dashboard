import axios, { Method } from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';

// This piece is critical for the catch errors to work
axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (!error.response) {
        console.log("Please check your internet connection.");
      }
      return Promise.reject(error)
    }
);

/**
 * TODO:The following is a direct copy from the old repository for the compatibility of quasi-backend service , should be refactored once the backend is restructured
*/

interface APIDataProps {
  targetBackend: 'auth0' | 'juvoIq' | 'juvoAdminApis';
  url: string;
  method?: Method;
  data?: any;
  params?: any;
}

const getJuvoUpHeaders = () => {
  const authToken = Cookies.get('authToken');

  return {
    authorization: `Bearer ${authToken}`,
    'Auth-strategy': 'auth0',
    accept: 'application/json',
    'accept-Language': 'en',
  };
};

const getHostName = (carrier?: string) => {
  let hostname;
  switch (carrier) {
    case 'tuneTalk':
      hostname = process.env.REACT_APP_BACKEND_DOMAIN_NAME_TUNETALK;
      break;
    case 'uvatel':
      hostname = process.env.REACT_APP_BACKEND_DOMAIN_NAME_UVATEL;
      break;
    default:
      hostname = process.env.REACT_APP_AUTH0_DOMAIN_NAME;
      break;
  }
  return hostname;
};




const makeAPICall = (apiData: APIDataProps, carrier?: string) => {
  const { targetBackend, url: path, method, data, params } = apiData;
  let baseURL, headers;
  console.log('apiData: ', apiData);
  switch (targetBackend) {
    case 'auth0':
      baseURL = getHostName();
      headers = { 'content-type': 'application/x-www-form-urlencoded' };
      break;
    case 'juvoIq': // TODO: need to verify when working on iq pages
      baseURL = getHostName(carrier);
      headers = getJuvoUpHeaders();
      break;
    case 'juvoAdminApis':
      baseURL = process.env.REACT_APP_NODE_DOMAIN_NAME;
      headers = getJuvoUpHeaders();
      break;
  }
  const url = baseURL ? `${baseURL}${path}` : `${path}`;

  switch (method) {
    case 'POST':
      return axios.post(url, qs.stringify(data), {
        headers,
      });
    case 'DELETE':
      return axios.delete(url, { headers });
    case 'PATCH':
      return axios.patch(url, data);
    default:
      return axios.get(url, {
        headers,
        params: params,
      });
  }
};

export default {
  getHostName,
  makeAPICall,
};
