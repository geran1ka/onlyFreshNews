const API = '5aeb6f997b174e06b6b958e60d09fcca';
//72293b7bac104a43a1b886e742588fd6

export const body = document.querySelector('.page');
export const page = document.querySelector('.page__wrapper');
export const main = document.querySelector('.main');
export const navigator = {
  _pageNews: 1,
  get pageNews() {
    return this._pageNews;
  },
  set pageNews(value) {
    this._pageNews = value;
  },
  pageSizeNews: 10,
  _pageNewsSearch: 1,
  get pageNewsSearch() {
    return this._pageNewsSearch;
  },
  set pageNewsSearch(value) {
    this._pageNewsSearch = value;
  },
  pageSizeNewsSearch: 10,
};