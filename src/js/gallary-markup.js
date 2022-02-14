//This part is predefined by GoIT
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// import a markup template of a gallery photo card
import photoCardTmpl from '../templates/photo-card.hbs'

//markupHandler
//do:   -select "div.gallery"
//      -create markup of "div.gallery" with "photoCardTmpl" template
//      -format "div.gallery" with help of "simplelightbox" libruary
//incom:-object data 
export function markupHandler(data, isNeedToSavePreviousResult) {
    // pick out "div.gallery" where the gallery will be created
    const gallery = document.querySelector(".gallery");
    //if data to markup is empty(data.totalHits === 0)
    //-clear previous "div.gallery" content
    if (!data.totalHits) {
        gallery.innerHTML = "";
        return
    }
    //else data to markup is present (data.totalHits > 0)
    //-create markup with template "photoCardTmpl"
    //-add content to the end of "div.gallery"
    //-create "SimpleLightbox" gallary 
    const markup = data.hits
        .map((item) => photoCardTmpl(item))
        .join('');
    //console.log("isNeedToSavePreviousResult", isNeedToSavePreviousResult );
    if (isNeedToSavePreviousResult) {
        gallery.insertAdjacentHTML('beforeend', markup);
    } else {
        gallery.innerHTML = markup;
        const lightbox = new SimpleLightbox('.gallery a', { close: true });
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }
}

//scroll is predefinition procedure by GoIT
//do:   - measure height of gallery element "cardHeight"
//      - start position of view (and scroll) from "nRows"*"cardHeight"
//incom:- "nRows" is a number of gallery rows  
function scroll(nRows) {
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