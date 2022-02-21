//////////////////////////////////////
/* to perfome intersection observer 
uncomment  strings:
31-37
185-188
244-247
*/

import './sass/main.scss';

//This part is predefined by GoIT
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchFormClass } from './js/search-form'

import { loadMoreClass } from './js/load-moreBtn'

import { request } from './js/api/fetch'

import { markupHandler } from './js/gallary-markup'

import { message } from './js/messages'

// intersection observer
// First we select the element we want to target
const gallaryItems = document.getElementsByClassName('photo-link');

/* //intersection observer
const options = {
    threshold: 1,
}

const observer = new IntersectionObserver(handleGalleryIntersection, options);
 */

//parameter of searching
const PER_PAGE = 40;

// gallery
const lightbox = new SimpleLightbox('.gallery a', { close: true });

// search form
const searchForm = new searchFormClass({ observerChangeOnSubmit: searchFormChangeHanler });

// additional button load more
const loadMore = new loadMoreClass({ loadMoreChangeObserver: loadMoreChangeHandler });


searchForm.refs.form.addEventListener('submit', submitSearchFormListener);

loadMore.refs.moreBtn.addEventListener('click', clickLoadMoreListener);

/* 
submitSearchFormListener is callback function
in: -"event" = submit
do: - prevent default behaviour (post datas and reload page)
    - define target of "event"
    - create body obj to search datas likes "name of input + value of input"
    - verify validation of an inputed search value
        false:  - clear an input of the search form
                - send message
        true: set inputed value to searchForm
 */
function submitSearchFormListener(event) {
    //prevent default behaviour (post datas and reload page)
    event.preventDefault();
    // observer.unobserve(loadMore.refs.moreBtn);
    loadMore.doUnvisibleRef(loadMore.refs.moreBtn);

    // define target of "event"
    const { target } = event;

    // create body obj to search datas name of input + value of input
    const { searchQuery: searchFor } = createObjInputedData(target);

    //verify validation of an inputed search value
    if (!searchForm.checkInputedDatas(searchFor)) {
        clearSearcher(target);
        // loadMore.doUnvisibleRef(loadMore.refs.moreBtn);
        const msg = "Search field is empty. Input some value!"
        message.info(msg);
    }
}

/* 
clickLoadMoreListener - callback function
do: - increase by 1 value of search page
*/
function clickLoadMoreListener(event) {
    loadMore.increment();
}

/* 
clearSearcher
do: - reset income elementDOM
    - clear results of searching
in: - elementDOM is a search input field
*/
function clearSearcher(elementDOM) {
    markupHandler({});
    elementDOM.reset();
}

/* 
checkOnItem
do: - check if income parameter more then 0;
out:- if no items return false
        else true
*/
function checkOnItem(totalItems) {
    if (totalItems <= 0) {
        return false;
    }
    return true;
}

/* 
checkIsThisLastPage
do: - check if "page" is last in list
in: - "totalItems" is quantity of all searching items
    - "page = 1" is where searching is performing
    - "perPage = PER_PAGE" is quantity of posibility items on a one page
out:- "true" if left items is less or equal to quantity of posibility items on a one page
    - "false" if left items is more than quantity of posibility items on a one page      
*/
function checkIsThisLastPage(totalItems, page = 1, perPage = PER_PAGE) {
    const hitsLeft = totalItems - perPage * (page - 1);
    if (hitsLeft <= perPage) {
        return true;
    }
    return false;
}

// create and return body obj to search datas
// name of input + value of input
function createObjInputedData(target) {
    const bodySearchData = {};
    const formData = new FormData(target);
    formData.forEach((value, key) => {
        bodySearchData[key] = value;
    })
    return bodySearchData;
}

/* 
searchFormChangeHanler is callback function
in: -"searchValue" is what we are looking for
 */
async function searchFormChangeHanler(searchFor) {
    console.log('searchFormChangeHanler. Look for: ', searchFor);
    try {

        const result = await request({ searchFor })

        const { totalHits, hits } = result.data;

        if (!checkOnItem(totalHits)) {
            clearSearcher(searchForm.refs.form);
            const msg = "Sorry, there are no images matching your search query. Please try again."
            message.failure(msg);
            return;
        }

        const msg = `Hooray! We found ${totalHits} images.`;
        message.success(msg);
        markupHandler({ hits })
        lightbox.refresh();
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
        if (checkIsThisLastPage(totalHits)) {
            const msg = "We're sorry, but you've reached the end of search results.";
            message.info(msg);
            return;
        }

        loadMore.searchValue = searchFor;
        loadMore.pageNumber = 1;
        loadMore.doVisibleRef(loadMore.refs.moreBtn);

/*         const lastItem = gallaryItems.item(gallaryItems.length - 1);
        if (lastItem) {
            observer.observe(lastItem);
        } */

    } catch (error) {
        console.log(error);
    }

}

/* 
loadMoreChangeHandler is callback function
in: -"searchValue" is what we are looking for
    -"currentPage" is where we are looking for
do: - create flag "isNeedToSavePreviousResult"
    - provide get request to search "searchValue" on "currentPage" page
    - rendering results of searching
    - check "IsThisLastPage"
        true:   do button.load-more unvisible
                send message
        false: -
 */
async function loadMoreChangeHandler(searchValue, currentPage) {
    // create flag "isNeedToSavePreviousResult"
    const isNeedToSavePreviousResult = true;
    try {
        // btn load more is disabled until body of this function will be done 
        loadMore.refs.moreBtn.disabled = true;

        // provide get request to search "searchValue" on "currentPage" page
        const result = await request({ searchFor: searchValue, page: currentPage });

        // rendering results of searching
        //destruction of searching results
        const { totalHits, hits } = result.data;
        //perfome markup of searching results
        markupHandler({ hits, isNeedToSavePreviousResult });
        //refresh lightbox gallary 
        lightbox.refresh();
        //shift window view on a new position
        const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
        // do btn load more disabled = false as body of this function have already be done 
        loadMore.refs.moreBtn.disabled = false;

        // check "IsThisLastPage"
        if (checkIsThisLastPage(totalHits, currentPage)) {
            const msg = "We're sorry, but you've reached the end of search results.";
            message.info(msg);
            loadMore.doUnvisibleRef(loadMore.refs.moreBtn);
            return;
        }

/*         const lastItem = gallaryItems.item(gallaryItems.length - 1);
        if (lastItem) {
            observer.observe(lastItem);
        } */

    } catch (error) {
        console.log(error);
    }
}

/* 
handleGalleryIntersection
do: -if entry.isIntersecting 
        true:   <>stop observe (current target)
                <>go to next page
*/
function handleGalleryIntersection([entry], observer) {
    if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadMore.increment();
    }
}
