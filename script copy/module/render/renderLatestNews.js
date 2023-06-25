import {main, navigator} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';
import {fetchRequestSearch} from '../../function/fetch.js';
import {preload} from '../../function/preload.js';
import {scrollController} from '../../function/scrollControl.js';
import {showError} from '../../function/showError.js';
import {renderPagination} from './renderPagination.js';


export const rLatestNews = async (data) => {
  const inputSelect = document.querySelector('.form-search__select');
  const {
    pagination,
    btnBack,
    btnNext,
  } = renderPagination(data, navigator.pageNews, navigator.pageSizeNews);

  if (navigator.pageNews >= data.totalResults / navigator.pageSizeNews) {
    btnNext?.setAttribute('disabled', 'disabled');
  } else {
    btnNext?.removeAttribute('disabled');
  }

  if (navigator.pageNews <= 1) {
    btnBack?.setAttribute('disabled', 'disabled');
  } else {
    btnBack?.removeAttribute('disabled');
  }

  if (!document.querySelector('.latest-news')) {
    console.log('1');
    const section = createElement('section', {
      className: 'latest-news',
    });

    const titleWrapper = createElement('div', {
      className: 'title-wrapper',
    }, {
      append: createElement('div', {
        className: 'container',
      }, {
        append: createElement('h2', {
          className: 'title',
          textContent: 'Свежие новости',
        }),
      }),
    });
    const container = createElement('div', {
      className: 'container container__latest-news',
    });

    const newsList = createElement('ul', {
      className: 'list',
    });
    const newsArr = data.articles.map((item) => createItem(item));
    newsList.append(...newsArr);
    btnNext.addEventListener('click', () => {
      navigator.pageNews += 1;
      preload.show();
      container.style.height = container.clientHeight + 'px';
      console.log('container.clientHeight: ', container.clientHeight);
      container.textContent = '';
      fetchRequestSearch('top-headlines?country=',
          inputSelect.value,
          navigator.pageSizeNews,
          navigator.pageNews,
      )
          .then(response => response.json())
          .then(data => rLatestNews(data))
          .then(section => {
            preload.remove();
            scrollController.enabledScroll();
            container.style.height = 'auto';
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
      preload.show();
      container.style.height = container.clientHeight + 'px';
      container.textContent = '';
      fetchRequestSearch('top-headlines?country=',
          inputSelect.value,
          navigator.pageSizeNews,
          navigator.pageNews,
      ).then(response => response.json())
          .then(data => rLatestNews(data))
          .then(section => {
            preload.remove();
            scrollController.enabledScroll();
            container.style.height = 'auto';
            main.append(section);
          })
          .catch(err => {
            preload.remove();
            scrollController.disabledScroll();
            return showError(err);
          });
    });
    container.append(newsList);
    section.append(titleWrapper, container);
    container.prepend(pagination);

    return section;
  } else {
    const section = document.querySelector('.latest-news ');
    const container = section.querySelector('.container__latest-news ');
    container.textContent = '';
    const newsList = createElement('ul', {
      className: 'list',
    });
    const newsArr = data.articles.map((item) => createItem(item));
    newsList.append(...newsArr);
    btnNext.addEventListener('click', () => {
      navigator.pageNews += 1;
      preload.show();
      container.style.height = container.clientHeight + 'px';
      container.textContent = '';
      fetchRequestSearch('top-headlines?country=',
          inputSelect.value,
          navigator.pageSizeNews,
          navigator.pageNews,
      ).then(response => response.json())
          .then(data => rLatestNews(data))
          .then(section => {
            preload.remove();
            scrollController.enabledScroll();
            container.style.height = 'auto';
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
      preload.show();
      container.style.height = container.clientHeight + 'px';
      container.textContent = '';
      fetchRequestSearch('top-headlines?country=',
          inputSelect.value,
          navigator.pageSizeNews,
          navigator.pageNews,
      ).then(response => response.json())
          .then(data => rLatestNews(data))
          .then(section => {
            preload.remove();
            scrollController.enabledScroll();
            container.style.height = 'auto';
            main.append(section);
          })
          .catch(err => {
            preload.remove();
            scrollController.disabledScroll();
            return showError(err);
          });
    });
    container.append(pagination, newsList);

    return section;
  }
};
