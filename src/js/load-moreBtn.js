/* 
loadMoreClass 
private properties(their getters and setters):
    - #searchValue is what looking for
    - #pageNumber is where looking for
 */

export class loadMoreClass {
    #searchValue;
    #pageNumber;
    constructor({loadMoreChangeObserver, initialPageNumber = 1}){
        
        this.onClick = loadMoreChangeObserver;
        this.pageNumber = initialPageNumber;
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
    } 
    increment () {
        this.pageNumber += 1;
        if (this.onClick) {
            this.onClick(this.searchValue, this.#pageNumber);
        }
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