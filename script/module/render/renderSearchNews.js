import {navigator} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';
import {getPromiseAll} from '../getPromisAll.js';
import {renderPagination} from './renderPagination.js';


export const rSearchNews = async (data) => {
  console.log('data: ', data);
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
    className: 'container',
  });

  const newsList = createElement('ul', {
    className: 'list',
  });
  const inputSearch = document.querySelector('.form-search__input');
  const inputSelect = document.querySelector('.form-search__select');

  const {
    pagination,
    btnBack,
    btnNext,
  } = renderPagination(data, navigator.pageNewsSearch, navigator.pageSizeNewsSearch);

  console.log('navigator.pageNewsSearch: ', navigator.pageNewsSearch);
  console.log('data.totalResults: ', data.totalResults);
  console.log('data.articles.length: ', data.articles.length);

  if (navigator.pageNewsSearch >= data.totalResults / navigator.pageSizeNewsSearch) {
    btnNext?.setAttribute('disabled', 'disabled');
  } else {
    btnNext?.removeAttribute('disabled');
  }
  btnNext.addEventListener('click', () => {
    navigator.pageNewsSearch += 1;
    console.log('navigator.pageNewsSearchs: ', navigator.pageNewsSearch);
    section.remove();
    getPromiseAll(inputSearch.value, inputSelect.value);
  });

  if (navigator.pageNewsSearch <= 1) {
    btnBack?.setAttribute('disabled', 'disabled');
  } else {
    btnBack?.removeAttribute('disabled');
  }

  btnBack.addEventListener('click', () => {
    navigator.pageNewsSearch -= 1;
    section.remove();
    getPromiseAll(inputSearch.value, inputSelect.value);
  });
  titleWrapper.prepend(pagination);

  const searchNewsArr = data.articles.map((item) => createItem(item));

  newsList.append(...searchNewsArr);
  container.append(newsList);
  section.append(titleWrapper, container);


  return section;
};


