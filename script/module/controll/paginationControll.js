import {main} from '../../function/const.js';
import {fetchRequestSearch} from '../../function/fetch.js';
import {preload} from '../../function/preload.js';
import {showError} from '../../function/showError.js';
import {rLatestNews} from '../render/renderLatestNews.js';
import {scrollController} from './scrollControl.js';

export const paginationControll = (btnNext, btnBack, container, inputSelect) => {
  btnNext.addEventListener('click', () => {
    navigator.pageNews += 1;
    container.textContent = '';
    return fetchRequestSearch('top-headlines?country=',
        inputSelect.value,
        navigator.pageSizeNews,
        navigator.pageNews,
    )
        .then(response => response.json())
        .then(data => rLatestNews(data))
        .then(section => {
          preload.remove();
          scrollController.enabledScroll();
          main.append(section);
        })
        .catch(err => {
          preload.remove();
          scrollController.disabledScroll();
          return showError(err);
        });
  });


  btnBack.addEventListener('click', () => {
    navigator.pageNews -= 1;
    container.textContent = '';
    return fetchRequestSearch('top-headlines?country=',
        inputSelect.value,
        navigator.pageSizeNews,
        navigator.pageNews,
    ).then(response => response.json())
        .then(data => rLatestNews(data))
        .then(section => {
          preload.remove();
          scrollController.enabledScroll();
          main.append(section);
        })
        .catch(err => {
          preload.remove();
          scrollController.disabledScroll();
          return showError(err);
        });
  });
};
