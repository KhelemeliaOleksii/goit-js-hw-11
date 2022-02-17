import './sass/main.scss';

import { searchFormClass } from './js/search-form'
import { loadMoreClass } from './js/load-moreBtn'
import { request } from './js/api/fetch'
import { markupHandler } from './js/gallary-markup'
/* Форма изначально есть в HTML документе. 
Пользователь будет вводить строку для поиска в текстовое поле, 
а при сабмите формы необходимо выполнять HTTP-запрос.
 */
/* 
В HTML документе уже есть разметка кнопки при клике по которой 
необходимо выполнять запрос за следующей группой изображений и 
добавлять разметку к уже существующим элементам галереи. 

    Изначально кнопка должна быть скрыта.
    После первого запроса кнопка появляется в интерфейсе под галереей.
    При повторном сабмите формы кнопка сначала прячется, а после запроса опять отображается.

В ответе бэкенд возвращает свойство totalHits - общее количество изображений,
которые подошли под критерий поиска (для бесплатного аккаунта). 
Если пользователь дошел до конца коллекции, пряч кнопку и 
выводи уведомление с текстом "We're sorry, but you've reached the end of search results.".*/

const PER_PAGE = 40;
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

        markupHandler({ totalHits, hits })

        if (checkIsThisLastPage(totalHits)) {
            return;
        }
        loadMore.searchValue = searchFor;
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
    console.log("hitsLeft", hitsLeft);
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
function loadMoreChangeHandler(searchValue, currentPage) {
    console.log("searchValue on load more", searchValue);
    console.log("current page is", currentPage);
    const isNeedToSavePreviousResult = true;
    // loadMore.increment();
    // try {
    //     // const currentPage = loadMore.
    //     const searchFor = loadMore.value;
    //     const result = await request({searchFor});   
    //     const {totalHits, hits} = result.data;
    //     markupHandler({ totalHits, hits }, isNeedToSavePreviousResult);
    //     if (!checkIsThisLastPage(totalHits)) {
    //         return;
    //     }
    //     console.log("It's over");
    //     loadMore.doUnvisibleRef(loadMore.refs.moreBtn);

    // } catch (error) {
    //     console.log(error);
    // }
}
