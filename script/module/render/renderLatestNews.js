import {createElement} from '../../function/createElem.js';
import {liLoad} from '../../function/createItem.js';

export const rLatestNews = (data, stop = 8) => {
  console.log('stop: ', stop);

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

  const newsArr = data.slice(0, stop).map((item) => liLoad(item));
  return Promise.all([...newsArr]).then(data => {
    newsList.append(...data);
    container.append(newsList);
    section.append(titleWrapper, container);
    return true;
  }).then(elem => section);
};
