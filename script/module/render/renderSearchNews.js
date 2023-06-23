import {endPagination, startPagination} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {liLoad} from '../../function/createItem.js';
import {showError} from '../../function/showError.js';


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

  const searchNewsArr = data.articles.map(async (item) => await liLoad(item));
  return Promise.all([...searchNewsArr])
      .then(data => {
        newsList.append(...data);
        container.append(newsList);
        section.append(titleWrapper, container);
        return section;
      })
      .catch(err => showError(err));
};


