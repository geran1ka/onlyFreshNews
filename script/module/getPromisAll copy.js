import {main, navigator} from '../function/const.js';
import {fetchRequestAlt, fetchRequestSearch} from '../function/fetch.js';
import {preload} from '../function/preload.js';
import {scrollController} from '../function/scrollControl.js';
import {showError} from '../function/showError.js';
import {rLatestNews} from './render/renderLatestNews.js';
import {rSearchNews} from './render/renderSearchNews.js';

export const getPromiseAll = (inputSearch, inputSelect) => {
  if (inputSearch) {
    try {
      Promise.all([
        fetchRequestSearch(
            'everything?q=',
            inputSearch || '',
            rSearchNews,
            8,
            navigator.pageNewsSearch,
            true,
        ),
        fetchRequestSearch(
            'top-headlines?country=',
            inputSelect,
            rLatestNews,
            4,
            navigator.pageNews,
            true,
        ),
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
