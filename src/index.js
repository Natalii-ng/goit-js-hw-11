import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

import axios from 'axios';

const API_KEY = '32602005-90d975b9811b1acb6e8234db3';

const inputField = document.querySelector('input');
const inputButton = document.querySelector('button');
const galleryImage = document.querySelector('.gallery');

inputButton.addEventListener('click', e => {
  e.preventDefault();
  getCards({
    value: inputField.value,
  });
});

function getCards({ value }) {
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`;
if(value.length !== 0) {
  return (
    axios
      .get(urlAPI)
      .then(res => res.data)
      .then(({ hits }) => {
        render(hits);
      })

      .catch(function (error) {
     
           })
  )};
}

function render(hits) {
  galleryImage.innerHTML = '';
   if(hits.length === 0)
      
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

 const hitsElements = hits.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => {
return `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
  });

  galleryImage.insertAdjacentHTML('beforeend', hitsElements.join(''));
}