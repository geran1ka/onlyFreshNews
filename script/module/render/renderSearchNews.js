import {endPagination, startPagination} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {liLoad} from '../../function/createItem.js';


export const rSearchNews = (data, stop = 8) => {
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

  const searchNewsArr = data.slice(startPagination, endPagination)
      .map((item) => liLoad(item));
  return Promise.all([...searchNewsArr]).then(data => {
    newsList.append(...data);
    container.append(newsList);
    section.append(titleWrapper, container);
    return section;
  });
};


