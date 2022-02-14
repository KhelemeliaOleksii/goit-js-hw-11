import { requestDataHandler } from './api/fetch'

class searchValue {
    constructor() {
        this.value = '';
    }
    static checkInputValue(data) {
        const tmpValue = data.replace(/^\s+|\s+$/gm, '');
        const arrayValue = [...tmpValue];
        const min = 1;
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
    loadMoreBtn;
    constructor() {
        super();
        this.form = document.querySelector('#search-form');
        this.form.addEventListener('submit', this.formSubmitListener);
        this.loadMoreBtn = document.querySelector('.load-more');
        //this.toggleVisibility(this.loadMoreBtn);
        searchForm.unvisible(this.loadMoreBtn);
        // this.loadMoreBtn.classList.toggle('unvisible')
        this.loadMoreBtn.addEventListener('click', this.loadmoreSubmitListener);
    }
    formSubmitListener(event) {
        const isNeedToSavePreviousSearchResult = false;
        event.preventDefault();
        const searchInput = event.currentTarget.querySelector("input");
        if (!searchValue.checkInputValue.call(searchValue, searchInput.value)) {
            return;
        }
        
        requestDataHandler(searchValue.getValue(), isNeedToSavePreviousSearchResult);
        //searchForm.visible(document.querySelector('.load-more'));

    }
    loadmoreSubmitListener() {
        const isNeedToSavePreviousSearchResult = true;
        requestDataHandler(searchValue.getValue(), isNeedToSavePreviousSearchResult);
    }
    static unvisible (elementDOM) {
        elementDOM.classList.add('unvisible');
    }
    static visible (elementDOM) {
        elementDOM.classList.remove('unvisible');
    }
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
