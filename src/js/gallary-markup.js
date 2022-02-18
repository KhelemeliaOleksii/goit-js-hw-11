//This part is predefined by GoIT
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// import a markup template of a gallery photo card
import photoCardTmpl from '../templates/photo-card.hbs'

/* 
markupHandler
do: -select "div.gallery"
    -create markup of "div.gallery" with "photoCardTmpl" template
    -format "div.gallery" with help of "simplelightbox" libruary
in: - object {} of elements:
        <> hits = []
        <> "isNeedToSavePreviousResult = false"
 */
export function markupHandler({ hits = [],  isNeedToSavePreviousResult = false,} ) {
    // pick out "div.gallery" where the gallery will be created
    const gallery = document.querySelector(".gallery");
  
    //-create markup with template "photoCardTmpl"
    //-add content to the end of "div.gallery"
    //-create "SimpleLightbox" gallary 
    const markup = hits
        .map((item) => photoCardTmpl(item))
        .join('');   
    
    // if we need to save previous markup of the part of document use 
    //     -insertAdjacentHTML
    // else 
    //     -innerHTML 
    if (isNeedToSavePreviousResult) {
        gallery.insertAdjacentHTML('beforeend', markup);
        return;
    }
    gallery.innerHTML = markup;
}
