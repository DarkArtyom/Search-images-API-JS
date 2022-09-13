import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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

let pageNumber = 1;

function onSubmitButton(e) {
  e.preventDefault();
  searchInput = searchQueryEl.value.trim();
  if (searchInput === '') {
    Notify.info('Please fill the input for searching');
    return;
  }
  clearContainer();
  resetPage();
  API.fetchImages(searchInput, pageNumber)
    .then(RENDER.renderImg)
    .then(simpleLightBox)
    .then(lightScroll)
    .catch(function (error) {
      console.log(error);
    });
}

function onLoadMore() {
  API.fetchImages(searchInput, (pageNumber += 1))
    .then(RENDER.renderImg)
    .then(simpleLightBox)
    .then(lightScroll)
    .catch(function (error) {
      console.log(error);
    });
}

function resetPage() {
  pageNumber = 1;
}

function clearContainer() {
  refs.galleryDiv.innerHTML = '';
}

function lightScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 6,
    behavior: 'smooth',
  });
}

function simpleLightBox() {
  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh('show.simplelightbox');
}
