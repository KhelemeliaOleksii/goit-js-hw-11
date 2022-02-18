import './sass/main.scss';

//This part is predefined by GoIT
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';


import { searchFormClass } from './js/search-form'
import { loadMoreClass } from './js/load-moreBtn'

// import {_} from 'lodash';

import { request } from './js/api/fetch'
import { markupHandler } from './js/gallary-markup'

const PER_PAGE = 40;
// let isAvailable = true;

// const container = document.querySelector('.container');

const lightbox = new SimpleLightbox('.gallery a', { close: true });

const searchForm = new searchFormClass({ observerChangeOnSubmit: searchFormChangeHanler })

const loadMore = new loadMoreClass({ observerChangeOnClick: loadMoreChangeHandler });

loadMore.refs.moreBtn.addEventListener('click', clickLoadMoreListener);
function clickLoadMoreListener(event) {
    loadMore.increment();
}

searchForm.refs.form.addEventListener('submit', submitSearchFormListener);
//console.log('name', searchForm.refs);

async function submitSearchFormListener(event) {
    event.preventDefault();

    loadMore.doUnvisibleRef(loadMore.refs.moreBtn);

    const { target } = event;

    // create body obj to search datas
    // name of input + value of input
    const { searchQuery: searchFor } = createObjInputedData(target);

    if (!searchForm.checkInputedDatas(searchFor)) {
        clearSearcher(target);
        console.log("input some value!");
        return;
    }
    try {

        const result = await request({ searchFor });

        const { totalHits, hits } = result.data;

        if (!checkOnItem(totalHits, target)) {
            clearSearcher(target);
            console.log("Unfortunately! We find no hits!");
            return;
        }

        markupHandler({hits})
        lightbox.refresh();
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

        if (checkIsThisLastPage(totalHits)) {
            return;
        }
        loadMore.searchValue = searchFor;
        loadMore.pageNumber = 1;
        loadMore.doVisibleRef(loadMore.refs.moreBtn);

    } catch (error) {
        console.log(error);
    }
}

function clearSearcher(elementDOM) {
    markupHandler({});
    elementDOM.reset();
}
function checkOnItem(totalItems, elementDOM) {
    if (totalItems <= 0) {
        return false;
    }
    return true;
}
function checkIsThisLastPage(all, page = 1, perPage = PER_PAGE) {
    const hitsLeft = all - perPage * (page - 1);
    if (hitsLeft <= perPage) {
        return true;
    }
    return false;
}
// create body obj to search datas
// name of input + value of input
function createObjInputedData(target) {
    const bodySearchData = {};
    const formData = new FormData(target);
    formData.forEach((value, key) => {
        bodySearchData[key] = value;
    })
    return bodySearchData;
}

function searchFormChangeHanler(searchValue) {
    console.log('searchFormChangeHanler. Look for: ', searchValue);
}
async function loadMoreChangeHandler(searchValue, currentPage) {
    console.log("searchValue on load more", searchValue);
    console.log("current page is", currentPage);
    const isNeedToSavePreviousResult = true;
    try {
        const result = await request({ searchFor: searchValue, page: currentPage });
        
        const { totalHits, hits } = result.data;
        
        markupHandler({hits, isNeedToSavePreviousResult});
        
        lightbox.refresh();
        
        const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });


        if (!checkIsThisLastPage(totalHits, currentPage)) {
            console.log("It's not over");
            return;
        }

        console.log("It's over");
        
        loadMore.doUnvisibleRef(loadMore.refs.moreBtn);

    } catch (error) {
        console.log(error);
    }
}
