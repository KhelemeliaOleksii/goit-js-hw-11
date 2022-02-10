import './sass/main.scss';
import { print } from './js/api/fetch';

print();

const searchForm = {
    form : document.querySelector('#search-form'),
    inputedValue : '',
    checkInputValue (data) {
        this.inputedValue = data.replace(/^\s+|\s+$/gm,'');
        const arrayValue = [...this.inputedValue];
        const min = 0;
        const max = 100;
        if (arrayValue.length <= min || arrayValue.length > max) {
            return false;
        }
        return true;
    },    
    submitListener (event) {
        event.preventDefault();
        const str = event.srcElement[0].value;    
        if (!searchForm.checkInputValue.apply(searchForm, [str])) {
            return;
        }
        // searchForm.getValue.apply(searchForm,null);    
        // console.log(searchForm.getValue.apply(searchForm,null));
        console.log(searchForm.getValue());
    },
    getValue(){
        return this.inputedValue;
    },
}

searchForm.form.addEventListener('submit', searchForm.submitListener);


