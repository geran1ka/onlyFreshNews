import {getPromiseAll} from './getPromisAll.js';


export const headerController = (form, searchSelect) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    getPromiseAll(search.search, search.country);
  });

  searchSelect.addEventListener('change', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    getPromiseAll(search.search, search.country);
  });
};
