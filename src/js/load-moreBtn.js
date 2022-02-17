
export class loadMoreClass {
    #searchValue;
    #pageNumber;
    constructor({ observerChangeOnClick, initialPageNumber = 1}){
        this.pageNumber = initialPageNumber;
        // this.pageCount = totalPageCount;
        this.onClick = observerChangeOnClick;
        this.refs = {
            moreBtn : document.querySelector(".load-more"),
        };
    };
    get searchValue() {
        return this.#searchValue;
    };
    set searchValue(value) {
        this.#searchValue = value;
    };
    get pageNumber(){
        return this.#pageNumber;
    };
    set pageNumber(value) {
        this.#pageNumber = value;
        if (this.onClick) {
            this.onClick(this.searchValue, this.#pageNumber);
        }
    } 
    increment () {
        this.pageNumber += 1;
    }
    doVisibleRef(elementDOM) {
        if (!elementDOM.classList.contains("unvisible")) {
            return;
        }
        elementDOM.classList.remove("unvisible");
    };
    doUnvisibleRef(elementDOM) {
        if (elementDOM.classList.contains("unvisible")) {
            return;
        }
        elementDOM.classList.add("unvisible");
    };

}