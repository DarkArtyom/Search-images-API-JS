const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const key = '29789074-1225e0ee7727dd30a4d9fda5f';

const url = 'https://pixabay.com/api/';

const refs = {
  form: document.forms[0],
  searchButton: document.querySelector('.search-button'),
};

const searchQuery = refs.form.elements.searchQuery;

refs.form.addEventListener('submit', onSubmitButton);

function onSubmitButton(e) {
  e.preventDefault();
  let searchQueryEl = searchQuery.value.trim();

  fetchImages(searchQueryEl);
  console.log(fetchImages(searchQueryEl));
}

function fetchImages(searchName) {
  let pageNumber = 1;
  const findImage = axios
    .get(
      `${url}/?key=${key}&q=${searchName}&orientation=horizontal&safesearch=true&image_type=photo&page=${pageNumber}&per_page=40`
    )
    .then(function (response) {
      console.log(response);
      return response;
    });
  // .then(renderImg);

  return findImage;
}
// console.log(fetchImg(onSubmitButton));

// Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло. В таком случае показывай уведомление с текстом "Sorry, there are no images matching your search query. Please try again.". Для уведомлений используй библиотеку notiflix.

// function renderImg() {
//   // метод for
//   const photoCards = `<div class="photo-card"><img src="" alt="" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes</b>
//           </p>
//           <p class="info-item">
//             <b>Views</b>
//           </p>
//           <p class="info-item">
//             <b>Comments</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads</b>
//           </p>
//         </div>
//       </div>`;
// }
