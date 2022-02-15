// import object "requestURLToAPI" which method "getRequestURL" create a full request url
import { requestURLToAPI } from './api'

import { message } from '../messages'

import { markupHandler } from '../gallary-markup'

import { searchMore } from '../search-moreBtn'

// Axios is a promise-based HTTP Client for node.js and the browser.
const axios = require('axios');
let current_page = 1;

export function requestDataHandler(searchFor, isNeedToSavePreviousSearchResult) {
    // const page = 1;
    const incrementPageNumber = increment(isNeedToSavePreviousSearchResult);
    //console.log(incrementPageNumber);
    request(searchFor, incrementPageNumber)
        .then((response) => {
            // console.log(response);
            markupHandler(response.data, isNeedToSavePreviousSearchResult);
            if (response.data.totalHits <= 0) {
                throw new Error();
            }

            if (!isNeedToSavePreviousSearchResult) {
                // requestURLToAPI.parameters.page = 1;
                const msg = `Hooray! We found ${response.data.totalHits} images.`
                message.success(msg);
            }
            const button = new searchMore(searchFor, requestDataHandler);
            if (response.data.hits.length < 40) {
                const msg = "We're sorry, but you've reached the end of search results."
                message.info(msg);
                // if (button) {
                    console.log(button);
                    button.doUnvisible(button.loadMoreBtn);
                // }
                return response.data.hits;
            }

            return response.data.hits;
        }).catch((error) => {
            // const msg = "Sorry, there are no images matching your search query. Please try again.";
            // message.failure(msg);
            console.log(error);
            message.failure(error);

        })

}


function increment(bool) {
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
        console.log("page:", requestURLToAPI.parameters.page);
        const response = await axios.get(requestURLToAPI.getRequestURL(searchFor));
        // console.log(response);
        return response;
    } catch (error) {
        // console.log(error);
        return error;
    }
}
