import { requestDataHandler } from './api/fetch'
import { searchValue } from './search-value'

/* class searchForm
 - extends searchValue
constrctor:   - hitch "form#search-form"
             - create "addEventListener" on "form#search-form"
methods:  -"formSubmitListener" is a callback function on "addEventListener"
             <>get "search value" from "input"
             <>check this "search value".
             <>create request on API
 */
export class searchForm extends searchValue {
    form;
    static isNeedToSavePreviousSearchResult = false;
    constructor() {
        super();
        this.form = document.querySelector('#search-form');
        this.form.addEventListener('submit', this.formSubmitListener);
    }
    formSubmitListener(event) {
        event.preventDefault();
        // get "search value" from "input"
        const searchInput = event.currentTarget.querySelector("input");
        //check this "search value".
        if (!searchValue.checkInputValue.call(searchValue, searchInput.value)) {
            return;
        }
        //create request on API    
        requestDataHandler(searchValue.getValue(), searchForm.isNeedToSavePreviousSearchResult);
    }
}