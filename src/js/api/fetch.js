// import object "requestURLToAPI" which method "getRequestURL" create a full request url
import { requestURLToAPI } from './api'

import { message } from '../messages'

import {markupHandler} from '../gallary-markup'

// Axios is a promise-based HTTP Client for node.js and the browser.
const axios = require('axios');

export function requestDataHandler(searchFor, isNeedToSavePreviousSearchResult)  {
    const incrementPageNumber = increment(isNeedToSavePreviousSearchResult);
    //console.log(incrementPageNumber);
    request(searchFor, incrementPageNumber)
    .then((response) => {
        markupHandler(response.data, isNeedToSavePreviousSearchResult);
        if (response.data.totalHits <= 0) {
            throw new Error();
        }
        if (!isNeedToSavePreviousSearchResult) {
            const msg = `Hooray! We found ${response.data.totalHits} images.`
            message.info(msg);    
        }
        return response.data.hits;
    }).catch ((error) => {
        const msg = "Sorry, there are no images matching your search query. Please try again.";
        message.failure(msg);
        console.log(error);
        message.failure(error);

    })

}


function increment (bool) {
    if (bool) {
        return 1;
    } else {
        return 0;
    }

}
//request
//do:   - request on API
//in:   -a value for search
//out:  - if ok -> response type JSON
//           error -> error
async function request(searchFor, incrementPageNumber) {
    try {
        requestURLToAPI.parameters.page += incrementPageNumber;
        const response = await axios.get(requestURLToAPI.getRequestURL(searchFor));
        // console.log(response);
        return response;
    } catch (error) {
        // console.log(error);
        return error;
    }
}
