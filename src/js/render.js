import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryDiv = document.querySelector('.gallery');

function renderImg(data) {
  console.log(data);
  const dataArr = [];
  for (const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } of data) {
    const photoCards = `<div class="photo-card"><a href="${largeImageURL}"><img src="${webformatURL}" width="300" height="200" alt="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:${downloads}</b>
          </p>
        </div>
      </div>`;
    dataArr.push(photoCards);
  }
  galleryDiv.insertAdjacentHTML('beforeend', dataArr);
  galleryDiv.style.display = 'flex';
  galleryDiv.style.justifyContent = 'center';
  galleryDiv.style.flexWrap = 'wrap';
}
export default { renderImg };
