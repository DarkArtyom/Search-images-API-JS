const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import RENDER from './js/render';
import API from './js/requestBackEnd';

// const key = '29789074-1225e0ee7727dd30a4d9fda5f';

// const url = 'https://pixabay.com/api/';

const refs = {
  form: document.forms[0],
  searchButtonEl: document.querySelector('.search-button'),
  loadMoreButtonEl: document.querySelector('.load-more-button'),
  galleryDiv: document.querySelector('.gallery'),
};

let searchQueryEl = refs.form.elements.searchQuery;

let searchInput = '';

refs.form.addEventListener('submit', onSubmitButton);
refs.loadMoreButtonEl.addEventListener('click', onLoadMore);

refs.loadMoreButtonEl.disabled = true;

function onSubmitButton(e) {
  e.preventDefault();

  searchInput = searchQueryEl.value.trim();
  if (searchInput === '') {
    Notify.info('Please fill the input for searching');
    return;
  }
  clearContainer();
  resetPage();
  API.fetchImages(searchInput).then(RENDER.renderImg);
  refs.loadMoreButtonEl.disabled = false;
}

// let pageNumber = 1;

function resetPage() {
  pageNumber = 1;
}

function onLoadMore() {
  API.fetchImages(searchInput).then(RENDER.renderImg);
}

function clearContainer() {
  refs.galleryDiv.innerHTML = '';
}
// ------------------------fetch-------------
// function fetchImages(searchName) {
//   const findImage = axios
//     .get(
//       `${url}/?key=${key}&q=${searchName}&orientation=horizontal&safesearch=true&image_type=photo&page=${pageNumber}&per_page=40`
//     )
//     .then(function (response) {
//       if (response.data.total === 0) {
//         Notify.info(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       console.log(response.data);
//       pageNumber = pageNumber + 1;
//       return response.data.hits;
//     })
//     .then(renderImg)
//     .catch(function (error) {
//       console.log(error);
//     });

//   return findImage;
// }
// fetch-------------------------------------------

// function renderImg(data) {
//   console.log(data);
//   const dataArr = [];
//   for (const {
//     largeImageURL,
//     webformatURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   } of data) {
//     const photoCards = `<div class="photo-card"><img src="${webformatURL}" width="300" height="200" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes: ${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>Views: ${views}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments: ${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads:${downloads}</b>
//           </p>
//         </div>
//       </div>`;
//     dataArr.push(photoCards);
//   }
//   refs.galleryDiv.insertAdjacentHTML('beforeend', dataArr);
//   refs.galleryDiv.style.display = 'flex';
//   refs.galleryDiv.style.justifyContent = 'center';
//   refs.galleryDiv.style.flexWrap = 'wrap';
// }
