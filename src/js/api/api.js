const searchValue = "cat";
//const requestURL = "";
export const requestToAPI = {
    requestURL: '',
    url: "https://pixabay.com/api/",
    key: "25644315-7f91ee10a75849531df6442ba",
    parameters: {
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    },
    // filterFields : ["webformatURL", "largeImageURL", "tags",
    // "likes", "views", "comments", "downloads"],
    getRequestURL(value) {
        this.requestURL += `${this.url}?key=${this.key}&q=${value}`;
        for (const property in this.parameters) {
            this.requestURL += `&${property}=${this.parameters[property]}`
        }
        //this.requestURL += `&fields=${this.filterFields.join()}`
        return this.requestURL;
    },

}