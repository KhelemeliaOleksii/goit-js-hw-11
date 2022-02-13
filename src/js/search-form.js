import {request} from './api/fetch'
import photoCardTmpl from '../templates/photo-card.hbs'
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

class searchValue {
    constructor() {
        this.value = '';        
    }
    static checkInputValue(data) {
        const tmpValue = data.replace(/^\s+|\s+$/gm, '');
        const arrayValue = [...tmpValue];
        const min = 2;
        const max = 100;
        if (arrayValue.length <= min || arrayValue.length > max) {
            return false;
        }
        this.setValue(tmpValue);
        return true;
    }
    setValue(incomValue) {
        this.value = incomValue;
        return;
    }
    static setValue(incomValue) {
        this.value = incomValue;
        return;
    }
    static getValue() {
        return this.value;
    }
}

export class searchForm extends searchValue {
    form;
    constructor() {
        super();
        this.form = document.querySelector('#search-form');
        this.form.addEventListener('submit', this.submitListener);
    }
    submitListener(event) {
        event.preventDefault();
        const searchInput = event.currentTarget.querySelector("input"); 
        if (!searchValue.checkInputValue.call(searchValue, searchInput.value)) {
            return;
        }
        request(searchValue.getValue())
        .then( (response) => {
            markupHandler(response.data);
            return response.data.hits;}
        )
    }
}
//const form = new searchForm(); 
function markupHandler(data) {
    const gallery = document.querySelector(".gallery");
    console.log(data.totalHits);
    
    if (!data.totalHits) {
        return
    }
    const markup = data.hits
        .map((item)=> photoCardTmpl(item))
        .join('');
    console.log(markup);
    gallery.innerHTML=markup;
    var lightbox = new SimpleLightbox('.gallery a', {close:true});

}

// export const searchForm = {
//     form: document.querySelector('#search-form'),
//     inputedValue: '',
//     checkInputValue(data) {
//         this.inputedValue = data.replace(/^\s+|\s+$/gm, '');
//         const arrayValue = [...this.inputedValue];
//         const min = 2;
//         const max = 100  ;
//         if (arrayValue.length <= min || arrayValue.length > max) {
//             return false;
//         }
//         return true;
//     },
//     submitListener(event) {
//         event.preventDefault();
//         const str = event.srcElement[0].value;
//         if (!searchForm.checkInputValue.apply(searchForm, [str])) {
//             return;
//         }
//         // searchForm.getValue.apply(searchForm,null);    
//         //console.log(searchForm.getValue.apply(searchForm,null));
//         request(searchForm.getValue());

//         console.log(searchForm.getValue());
//     },
//     getValue() {
//         return this.inputedValue;
//     },
// }
