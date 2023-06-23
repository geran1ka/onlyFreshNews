import {main} from '../function/const.js';
import {fetchRequestAlt} from '../function/fetch.js';
import {preload} from '../function/preload.js';
import {showError} from '../function/showError.js';
import {rLatestNews} from './render/renderLatestNews.js';
import {rSearchNews} from './render/renderSearchNews.js';


export const headerController = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    if (search.search) {
      try {
        Promise.all([
          fetch(`https://newsapi.org/v2/everything?q=${search.search ? search.search : ''}&pageSize=9&page=1`, {
            headers: {
              'X-Api-Key': '72293b7bac104a43a1b886e742588fd6',
            },
          })
              .then(response => response.json())
              .then(data => rSearchNews(data))
              .catch(err => showError(err)),
          // fetchRequestAlt('top-headlines?country=', search.country, rLatestNews, 4),

          fetch(`https://newsapi.org/v2/top-headlines?country=${search.country}&pageSize=6&page=1`, {
            headers: {
              'X-Api-Key': '72293b7bac104a43a1b886e742588fd6',
            },
          })
              .then(response => response.json())
              .then(data => rLatestNews(data, 4))
              .catch(err => {
                preload.remove();
                return showError(err);
              }),
        ])
            .then(data => {
              main.textContent = '';
              main.append(data[0]);
              main.append(data[1]);
              console.log('data[1]: ', data[1]);
            })
            .catch(err => showError(err));
      } catch (err) {
        showError(err);
      }
    } else {
      main.textContent = '';
      fetchRequestAlt('top-headlines?country=', search.country, rLatestNews, 9, 1);
    }
  });
};
