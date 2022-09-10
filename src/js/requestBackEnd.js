const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = '29789074-1225e0ee7727dd30a4d9fda5f';
const URL = 'https://pixabay.com/api/';

let pageNumber = 1;

function fetchImages(searchName) {
  const findImage = axios
    .get(
      `${URL}/?key=${KEY}&q=${searchName}&orientation=horizontal&safesearch=true&image_type=photo&page=${pageNumber}&per_page=40`
    )
    .then(function (response) {
      if (response.data.total === 0) {
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      console.log(response.data.hits);
      pageNumber = pageNumber + 1;
      return response.data.hits;
    })
    .catch(function (error) {
      console.log(error);
    });

  return findImage;
}

export default { fetchImages };
