import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import RENDER from './js/render';
import API from './js/requestBackEnd';

const refs = {
  form: document.forms[0],
  searchButtonEl: document.querySelector('.search-button'),
  loadMoreButtonEl: document.querySelector('.load-more-button'),
  galleryDiv: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmitButton);
refs.loadMoreButtonEl.addEventListener('click', onLoadMore);
refs.loadMoreButtonEl.style.visibility = 'hidden';

let searchQueryEl = refs.form.elements.searchQuery;
let searchInput = '';

function onSubmitButton(e) {
  e.preventDefault();
  searchInput = searchQueryEl.value.trim();
  if (searchInput === '') {
    Notify.info('Please fill the input for searching');
    return;
  }
  clearContainer();
  resetPage();
  API.fetchImages(searchInput)
    .then(RENDER.renderImg)
    .then(function () {
      refs.loadMoreButtonEl.style.visibility = 'visible';
    })
    .then(function () {
      let gallery = new SimpleLightbox('.gallery a');
      gallery.on('show.simplelightbox');
    });
}

function resetPage() {
  pageNumber = 1;
}

function onLoadMore() {
  API.fetchImages(searchInput)
    .then(RENDER.renderImg)
    .then(function () {
      let gallery = new SimpleLightbox('.gallery a');
      gallery.refresh('show.simplelightbox');
    });
}

function clearContainer() {
  refs.galleryDiv.innerHTML = '';
}
