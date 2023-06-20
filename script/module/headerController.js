import {main} from '../function/const.js';
import fetchRequest from '../function/fetchRequest.js';
import {preload} from '../function/preload.js';
import {renderLatestNews} from './render/renderLatestNews.js';
import {renderSearchNews} from './render/renderSearchNews.js';

export const headerController = (form) => {
  form.addEventListener('submit', (e) => {
    preload.show();
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);


    const data = Promise.all([
      fetchRequest(`everything?q=${search.search}`, {
        headers: {
          'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
        },
        callback: renderSearchNews,
      }),

      fetchRequest(`top-headlines?country=${search.country}`, {
        headers: {
          'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
        },
        callback: renderLatestNews,
      }),
    ]);

    data.then(data => {
      main.textContent = '';
      preload.remove();
      main.append(data[0]);
      main.append(data[1]);
    });
  });
};
