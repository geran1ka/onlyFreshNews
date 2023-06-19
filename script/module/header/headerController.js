import fetchRequest from '../../function/fetchRequest.js';
import {preload} from '../../function/preload.js';
import {renderSearchNews} from '../searchNews/renderSearchNews.js';

export const headerController = (form) => {
  form.addEventListener('submit', (e) => {
    preload.show();
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);

    const searchNewsPromise = fetchRequest(`everything?q=${search.search}`, {
      headers: {
        'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
      },
      callback: renderSearchNews,
    });

    const latestNewsRegionPromise = fetchRequest(`everything?q=${search.search}`, {
      headers: {
        'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
      },
      callback: renderSearchNews,
    });

    return Promise.all([
      searchNewsPromise,
      latestNewsRegionPromise,
    ]);
  });
  
};
