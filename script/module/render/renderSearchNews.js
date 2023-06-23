import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';


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

  const searchNewsArr = data.articles.map((item) => createItem(item));

  newsList.append(...searchNewsArr);
  container.append(newsList);
  section.append(titleWrapper, container);
  return section;
};


