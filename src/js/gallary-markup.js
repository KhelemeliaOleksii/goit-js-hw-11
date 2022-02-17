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
export function markupHandler({totalHits = 0, hits = []}, isNeedToSavePreviousResult = false) {
    // pick out "div.gallery" where the gallery will be created
    const gallery = document.querySelector(".gallery");
    //if data to markup is empty(data.totalHits === 0)
    //-clear previous "div.gallery" content
    if (!totalHits) {
        gallery.innerHTML = "";
        return
    }
    //else data to markup is present (data.totalHits > 0)
    //-create markup with template "photoCardTmpl"
    //-add content to the end of "div.gallery"
    //-create "SimpleLightbox" gallary 
    const markup = hits
        .map((item) => photoCardTmpl(item))
        .join('');
        // console.log(markup);
    if (isNeedToSavePreviousResult) {
        gallery.insertAdjacentHTML('beforeend', markup);
    } else {
        gallery.innerHTML = markup;
        //const lightbox = new SimpleLightbox('.gallery a', { close: true });
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }
}
