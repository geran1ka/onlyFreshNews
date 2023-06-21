import {main} from '../function/const.js';
import {preload} from '../function/preload.js';
import {rLatestNews} from './render/renderLatestNews.js';
import {rSearchNews} from './render/renderSearchNews.js';


export const headerController = (form) => {
  form.addEventListener('submit', (e) => {
    preload.show();
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);

    if (search.search) {
      main.textContent = '';
      Promise.all([
        fetch(`https://newsapi.org/v2/everything?q=${search.search ? search.search : ''}`, {
          headers: {
            'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
          },
        })
            .then(response => response.json())
            .then(data => rSearchNews(data.articles)),

        fetch(`https://newsapi.org/v2/top-headlines?country=${search.country}`, {
          headers: {
            'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
          },
        })
            .then(response => response.json())
            .then(data => rLatestNews(data.articles, 4)),

      ]).then(data => {
        main.append(data[0]);
        main.append(data[1]);
        preload.remove();
      });
    } else {
      console.log('не туда');
    }
  });
};
