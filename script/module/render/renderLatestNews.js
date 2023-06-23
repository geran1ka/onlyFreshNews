import {createElement} from '../../function/createElem.js';
import {createItem, liLoad} from '../../function/createItem.js';
import {showError} from '../../function/showError.js';

export const rLatestNews = async (data) => {
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
    className: 'container',
  });

  const newsList = createElement('ul', {
    className: 'list',
  });

  const newsArr = data.articles.map((item) => createItem(item));
  newsList.append(...newsArr);
  container.append(newsList);
  section.append(titleWrapper, container);
 
  return section;
};
