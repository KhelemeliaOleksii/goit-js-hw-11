// import object "requestURLToAPI" which method "getRequestURL" create a full request url
import { requestURLToAPI } from './api'

// Axios is a promise-based HTTP Client for node.js and the browser.
const axios = require('axios');

// }
//request
//do:   - request on API
//in:   -a value for search
//out:  - if ok -> response type JSON
//           error -> error
export function request({ searchFor, page = 1, per_page = 40 }) {
    requestURLToAPI.parameters.page = page;
    requestURLToAPI.parameters.per_page = per_page;

    console.log("search for:", searchFor);
//    console.log("search on: ", page,"page");

    // console.log(requestURLToAPI.getRequestURL(searchFor));
    return axios.get(requestURLToAPI.getRequestURL(searchFor));
}
