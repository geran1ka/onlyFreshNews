import {main, navigator} from '../function/const.js';
import {fetchRequestSearch} from '../function/fetch.js';
import {preload} from '../function/preload.js';
import {showError} from '../function/showError.js';
import {scrollController} from './controll/scrollControl.js';
import {rLatestNews} from './render/renderLatestNews.js';
import {rSearchNews} from './render/renderSearchNews.js';

export const getPromiseAll = (inputSearch, inputSelect) => {
  if (inputSearch) {
    try {
      Promise.all([
        fetchRequestSearch(
            'everything?q=',
            inputSearch || '',
            navigator.pageSizeNewsSearch,
            navigator.pageNewsSearch,
        ),
        fetchRequestSearch(
            'top-headlines?country=',
            inputSelect,
            navigator.pageSizeNews,
            navigator.pageNews,
        ),
      ])
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(data => Promise.all([rSearchNews(data[0]), rLatestNews(data[1])]))
          .then(sections => {
            preload.remove();
            for (const section of sections) {
              section.querySelectorAll('.container')[1].style.height = 'auto';
              main.append(section);
            }
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
    fetchRequestSearch(
        'top-headlines?country=',
        inputSelect,
        navigator.pageSizeNews,
        navigator.pageNews,
    )
        .then(response => response.json())
        .then(data => rLatestNews(data))
        .then(section => {
          section.querySelectorAll('.container')[1].style.heigth = 'auto';
          return main.append(section);
        })
        .catch(err => {
          scrollController.disabledScroll();
          return showError(err);
        });
  }
};
