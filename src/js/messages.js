import Notiflix from 'notiflix';

// object message 
// - methods info, warning, failure, success
// - use external libruary Notiflix
export const message ={
    info(str) {
        Notiflix.Notify.info(str);
    },
    warning(str) {
        Notiflix.Notify.warning(str);
    },
    failure(str) {
        Notiflix.Notify.failure(str);
    },
    success(str) {
        Notiflix.Notify.success(str);
    },
}
