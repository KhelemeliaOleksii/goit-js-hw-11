import './sass/main.scss';
//import { print } from './js/api/fetch';

import {searchForm, searchValue} from './js/search-form'


const emptyRequestMessage = "Sorry, there are no images matching your search query. Please try again.";


const searchPhoto = new searchForm();

//scroll is predefinition procedure by GoIT
//do:   - measure height of gallery element "cardHeight"
//      - start position of view (and scroll) from "nRows"*"cardHeight"
//incom:- "nRows" is a number of gallery rows  
function scroll (nRows) {
    //- measure height of gallery element "cardHeight"
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
    //- start position of view (and scroll) from n*"cardHeight"
    window.scrollBy({
        top: cardHeight * nRows,
        behavior: 'smooth',
    });
}

