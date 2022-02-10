import {api} from './api'

export function print() {
    console.log('API url:', api.url);
    console.log('API key:', api.key); 
}
