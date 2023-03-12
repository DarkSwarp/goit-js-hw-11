import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchPhoto from './fetchCards';

const formEl = document.querySelector('#search-form');
const galletyEl = document.querySelector('.gallery');
const loadMoreButtonEl = document.querySelector('.load-more');
const endOfElements = document.querySelector('.end-collection-text');
let inputText = '';
let page;

document.addEventListener('DOMContentLoaded', () => {
  loadMoreButtonEl.classList.add('is-hidden');
});

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  loadMoreButtonEl.classList.add('is-hidden');
  page = 1;
  inputText = e.currentTarget.elements.searchQuery.value.trim();
  galletyEl.innerHTML = '';
  if (inputText === '') {
    return;
  }
  const response = await fetchPhoto(inputText, page);
  createGalleryMarkup(response.hits);
  if (page === 1) {
    Notify.info(`Hooray! We found ${response.totalHits} images.`);
  }
  lockUnlockElements(response.totalHits);
});

loadMoreButtonEl.addEventListener('click', async () => {
  page += 1;
  const response = await fetchPhoto(inputText, page);
  createGalleryMarkup(response.hits);
  lockUnlockElements(response.totalHits);
});

function createGalleryMarkup(hits) {
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const galleryMarkup = hits
    .map(hit => {
      return `<div class="photo-card"><img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b> ${hit.likes}</p><p class="info-item"><b>Views</b> ${hit.views}</p><p class="info-item"><b>Comments</b> ${hit.comments}</p><p class="info-item"><b>Downloads</b> ${hit.downloads}</p></div></div>`;
    })
    .join('');
  galletyEl.insertAdjacentHTML('beforeend', galleryMarkup);
}

function lockUnlockElements(totalHits) {
  if (page * 40 >= totalHits) {
    loadMoreButtonEl.classList.add('is-hidden');
    endOfElements.classList.remove('is-hidden');
    return;
  }
  loadMoreButtonEl.classList.remove('is-hidden');
  endOfElements.classList.add('is-hidden');
}

