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
export class searchFormClass{
    #searchValue
    constructor({observerChangeOnSubmit}) {
        this.refs = {
            form : document.querySelector('#search-form'),
        }
        
        this.onSubmit = observerChangeOnSubmit;
    }
    get searchValue () {
        return this.#searchValue;
    }
    set searchValue (value) {
        if (!this.checkInputValue(value)) {
            return;
        }
        this.#searchValue = value;
    }
    checkInputedDatas(data) {
        const tmpValue = data.replace(/^\s+|\s+$/gm, '');
        const arrayValue = [...tmpValue];
        const min = 0;
        const max = 100;
        if (arrayValue.length <= min || arrayValue.length > max) {
            return false;
        }
        this.#searchValue = tmpValue;
        if (this.onSubmit) {
            this.onSubmit(this.searchValue);
        }
        return true;
    }   
}