import './sass/main.scss';
//import { print } from './js/api/fetch';

import { searchForm } from './js/search-form'


const emptyRequestMessage = "Sorry, there are no images matching your search query. Please try again.";



searchForm.form.addEventListener('submit', searchForm.submitListener);


