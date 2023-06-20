import {endPagination, startPagination} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {liLoad} from '../../function/createItem.js';
import {preload} from '../../function/preload.js';

export const renderLatestNews = async (err, data) => {
  if (err) {
    console.warn(err);
    return;
  }

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

  const newsArr = data.articles.slice(startPagination, endPagination).map(async (item) => await liLoad(item));
  return Promise.all([...newsArr]).then(data => {
    newsList.append(...data);
    container.append(newsList);
    section.append(titleWrapper, container);
    return true;
  }).then(elem => {
    preload.remove();
    return section;
  });
};
