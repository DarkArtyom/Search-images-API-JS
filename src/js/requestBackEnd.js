const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = '29789074-1225e0ee7727dd30a4d9fda5f';
const URL = 'https://pixabay.com/api/';
const loadMoreButtonEl = document.querySelector('.load-more-button');

async function fetchImages(searchName, pageNumber) {
  console.log(pageNumber);
  try {
    const findImage = await axios.get(
      `${URL}/?key=${KEY}&q=${searchName}&orientation=horizontal&safesearch=true&image_type=photo&page=${pageNumber}&per_page=40`
    );
    const responsing = await responseData(findImage);
    return responsing;
  } catch (error) {
    console.log(error);
  }
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
  return response.data.hits;
}

export default { fetchImages };
