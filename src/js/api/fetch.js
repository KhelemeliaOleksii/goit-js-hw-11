// import object "requestURLToAPI" which method "getRequestURL" create a full request url
import { requestURLToAPI } from './api'

// Axios is a promise-based HTTP Client for node.js and the browser.
const axios = require('axios');

/* request
do: - modify request parameters
    - perfom request on API
in: - object{
        <>searchFor is a value for search
        <>page  is a  search page on
        <>per_page is a count of search item on a page
      }
out:  - promise with result of axios.get request */
export function request({ searchFor, page = 1, per_page = 40 }) {
    // modify parameters of searching
    requestURLToAPI.parameters.page = page;
    requestURLToAPI.parameters.per_page = per_page;
    
    //perfom request on API 
    return axios.get(requestURLToAPI.getRequestURL(searchFor));
}
