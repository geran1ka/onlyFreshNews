import {navigator} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';
import {getPromiseAll} from '../getPromisAll.js';
import {renderPagination} from './renderPagination.js';


export const rSearchNews = async (data) => {
  const inputSelect = document.querySelector('.form-search__select');
  const inputSearch = document.querySelector('.form-search__input');

  const {
    pagination,
    btnBack,
    btnNext,
  } = renderPagination(data, navigator.pageNewsSearch, navigator.pageSizeNewsSearch);

  if (navigator.pageNewsSearch >= data.totalResults / navigator.pageSizeNewsSearch) {
    btnNext?.setAttribute('disabled', 'disabled');
  } else {
    btnNext?.removeAttribute('disabled');
  }

  if (navigator.pageNewsSearch <= 1) {
    btnBack?.setAttribute('disabled', 'disabled');
  } else {
    btnBack?.removeAttribute('disabled');
  }

  if (!document.querySelector('.search-news')) {
    const section = createElement('section', {
      className: 'search-news',
    });

    const titleWrapper = createElement('div', {
      className: 'title-wrapper',
    }, {
      append: createElement('div', {
        className: 'container',
      }, {
        append: createElement('h2', {
          className: 'title',
          textContent: `
          По Вашему запросу 
          ${document.querySelector('.form-search__input')?.value} 
          найдено ${data.totalResults} результатов
          `,
        }),
      }),
    });
    const container = createElement('div', {
      className: 'container container__search-news',
    });

    const newsList = createElement('ul', {
      className: 'list',
    });


    btnNext.addEventListener('click', () => {
      navigator.pageNewsSearch += 1;
      console.log('navigator.pageNewsSearchs: ', navigator.pageNewsSearch);
      section.remove();
      getPromiseAll(inputSearch.value, inputSelect.value);
    });


    btnBack.addEventListener('click', () => {
      navigator.pageNewsSearch -= 1;
      section.remove();
      getPromiseAll(inputSearch.value, inputSelect.value);
    });


    const searchNewsArr = data.articles.map((item) => createItem(item));

    newsList.append(...searchNewsArr);
    container.append(newsList);
    section.append(titleWrapper, container);
    container.prepend(pagination);

    return section;
  } else {
    const section = document.querySelector('.search-news');
    const container = section.querySelector('.container__search-news');
    container.textContent = '';
    const newsList = createElement('ul', {
      className: 'list',
    });

    btnNext.addEventListener('click', () => {
      navigator.pageNewsSearch += 1;
      container.textContent = '';
      getPromiseAll(inputSearch.value, inputSelect.value);
    });

    const searchNewsArr = data.articles.map((item) => createItem(item));
    newsList.append(...searchNewsArr);

    btnBack.addEventListener('click', () => {
      navigator.pageNewsSearch -= 1;
      container.textContent = '';
      getPromiseAll(inputSearch.value, inputSelect.value);
    });

    container.append(pagination, newsList);

    return section;
  }
};


