import {main, navigator} from '../function/const.js';
import {fetchRequestAlt} from '../function/fetch.js';
import {preload} from '../function/preload.js';
import {scrollController} from '../function/scrollControl.js';
import {showError} from '../function/showError.js';
import {rLatestNews} from './render/renderLatestNews.js';
import {rSearchNews} from './render/renderSearchNews.js';

export const getPromiseAll = (inputSearch, inputSelect) => {
  if (inputSearch) {
    try {
      Promise.all([
        fetch(`https://newsapi.org/v2/everything?q=${inputSearch ? inputSearch : ''}&pageSize=${navigator.pageSizeNewsSearch}&page=${navigator.pageNewsSearch}`, {
          headers: {
            'X-Api-Key': '72293b7bac104a43a1b886e742588fd6',
          },
        })
            .then(response => response.json())
            .then(data => rSearchNews(data))
            .catch(err => {
              scrollController.disabledScroll();
              return showError(err);
            }),

        fetch(`https://newsapi.org/v2/top-headlines?country=${inputSelect}&pageSize=${navigator.pageSizeNews}&page=${navigator.pageNews}`, {
          headers: {
            'X-Api-Key': '72293b7bac104a43a1b886e742588fd6',
          },
        })
            .then(response => response.json())
            .then(data => rLatestNews(data))
            .catch(err => {
              preload.remove();
              scrollController.disabledScroll();
              return showError(err);
            }),
      ])
          .then(data => {
            main.textContent = '';
            main.append(data[0]);
            main.append(data[1]);
          })
          .catch(err => {
            scrollController.disabledScroll();
            return showError(err);
          });
    } catch (err) {
      scrollController.disabledScroll();
      showError(err);
    }
  } else {
    main.textContent = '';
    fetchRequestAlt(
        'top-headlines?country=',
        inputSelect,
        rLatestNews,
        navigator.pageSizeNews,
        navigator.pageNews,
    );
  }
};
