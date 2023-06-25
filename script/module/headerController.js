import { navigator } from '../function/const.js';
import {getPromiseAll} from './getPromisAll.js';


export const headerController = (form, searchSelect) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    navigator.pageNewsSearch = 1;
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    getPromiseAll(search.search, search.country);
  });

  searchSelect.addEventListener('change', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    navigator.pageNews = 1;
    getPromiseAll(search.search, search.country);
  });
};
