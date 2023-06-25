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
            8,
            navigator.pageNewsSearch,
            true,
        ),
        fetchRequestSearch(
            'top-headlines?country=',
            inputSelect,
            4,
            navigator.pageNews,
            true,
        ),
      ])
          .then(responses => {
            console.log('responses: ', responses);
            return Promise.all(responses.map(response => response.json()));
          })
          .then(data => Promise.all([rSearchNews(data[0]), rLatestNews(data[1])]))
          .then(sections => {
            preload.remove();
            for (const section of sections) {
              section.querySelectorAll('.container')[1].style.height = 'auto';
              console.log(section.querySelectorAll('.container')[1]);
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
        8,
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
