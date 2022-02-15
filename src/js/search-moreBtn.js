// import { requestDataHandler } from './api/fetch'
import { searchValue } from './search-value'
import { requestDataHandler } from './api/fetch'

/* class searchMore
 - extends searchValue
constructor: - set research value
             - hitch "button#.load-more"
             - do "button#.load-more" visible
             - create "addEventListener" on "button#.load-more"
methods: -"doUnvisible" add class "unvisible" if it is not exist
         -"doVisible" remove class "unvisible" if it is exist
 */
export class searchMore extends searchValue {
    loadMoreBtn;
    static isNeedToSavePreviousSearchResult = true;
    constructor(value, requestDataHandler) {
        super();
        //set research value
        searchValue.setValue(value);
        // hitch "button#.load-more"
        this.loadMoreBtn = document.querySelector('.load-more');
        //do "button#.load-more" visible
        this.doVisible(this.loadMoreBtn);
        // create "addEventListener" on "button#.load-more"
        this.loadMoreBtn.addEventListener('click', () => {
            requestDataHandler(searchValue.getValue(), searchMore.isNeedToSavePreviousSearchResult);
        })
    }
    //"doUnvisible" add class "unvisible" if it is not exist
    doUnvisible(elementDOM) {
        if (elementDOM.classList.contains("unvisible")) {
            return;
        }
        elementDOM.classList.add("unvisible");
    }
    //"doVisible" remove class "unvisible" if it is exist
    doVisible(elementDOM) {
        if (!elementDOM.classList.contains("unvisible")) {
            return;
        }
        elementDOM.classList.remove("unvisible");
    }
}