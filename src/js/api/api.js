//  requestToAPI
//  details see on: https://pixabay.com/api/docs/
//have: -properties:
//          >requestFullUrl
//          >url
//          >key
//          >parameters{}
//              <>image_type
//              <>orientation
//              <>safesearch
//              <>page
//              <>per_page              
//      -methods:
//          >getRequestURL
//          income: search value
export const requestURLToAPI = {
    requestFullUrl: '',
    url: "https://pixabay.com/api/",
    key: "25644315-7f91ee10a75849531df6442ba",
    parameters: {
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: 1,
        per_page: 40,
    },
    //create string request type:
    //https://pixabay.com/api/?key=25644315-7f91ee10a75849531df6442ba&q=yellow+flowers&image_type=photo
    //q - search value
    getRequestURL(value) {
        //console.log(this.parameters.page);
        this.requestFullUrl += `${this.url}?key=${this.key}&q=${value}`;
        for (const property in this.parameters) {
            this.requestFullUrl += `&${property}=${this.parameters[property]}`
        }
        // console.log(this.requestFullUrl);
        return this.requestFullUrl;
    },
}