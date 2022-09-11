const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = '29789074-1225e0ee7727dd30a4d9fda5f';
const URL = 'https://pixabay.com/api/';
const loadMoreButtonEl = document.querySelector('.load-more-button');
let pageNumber = 1;

function fetchImages(searchName) {
  const findImage = axios
    .get(
      `${URL}/?key=${KEY}&q=${searchName}&orientation=horizontal&safesearch=true&image_type=photo&page=${pageNumber}&per_page=40`
    )
    .then(responseData)
    .catch(function (error) {
      console.log(error);
    });

  return findImage;
}

function responseData(response) {
  if (response.data.total === 0 || response.data.hits.length === 0) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreButtonEl.style.visibility = 'hidden';
    return;
  }
  if (response.data.hits.length < 40) {
    loadMoreButtonEl.style.visibility = 'hidden';
  } else {
    loadMoreButtonEl.style.visibility = 'visible';
  }
  console.log(response.data);
  pageNumber = pageNumber + 1;
  return response.data.hits;
}

export default { fetchImages };
