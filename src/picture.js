import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API = 'key=32602005-90d975b9811b1acb6e8234db3';
const loadBtn = document.querySelector('.load-more');

export default class PicturesAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const options = {
      params: {
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${URL}?${API}`, options).then(res => {
      return res.data;
    });
  }


  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  showLoadMoreBtn() {
    loadBtn.classList.add('is-active');
  }

  hideLoadMoreBtn() {
    loadBtn.classList.remove('is-active');
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
