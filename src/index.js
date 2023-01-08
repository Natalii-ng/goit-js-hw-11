import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


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
  if (value.length !== 0) {
    return axios
      .get(urlAPI)
      .then(res => res.data)
      .then(({ hits }) => {
        render(hits);
      })

      .catch(function (error) {
       
      });
  }
}

function render(hits) {
  galleryImage.innerHTML = '';
  if (hits.length === 0)
   
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

  const hitsElements = hits.map(
    ({
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
<a class="gallery__item" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <div class="info-item">
      <p><b>Likes: </b></p> <p>${likes}</p>
    </div>
    <div class="info-item">
      <p><b>Views: </b></p> <p>${views}</p>
    </div>
    <div class="info-item">
      <p><b>Comments: </b></p> <p>${comments}</p>
    </div>
    <div class="info-item">
      <p><b>Downloads: </b></p> <p>${downloads}</p>
    </div>
  </div>
</div>`;
    }
  );

  galleryImage.insertAdjacentHTML('beforeend', hitsElements.join(''));
  let gallery = new SimpleLightbox('.gallery a');
  gallery.on('show.simplelightbox');
}
