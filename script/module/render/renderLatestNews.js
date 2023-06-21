import {createElement} from '../../function/createElem.js';
import {liLoad} from '../../function/createItem.js';
import {showError} from '../../function/showError.js';

export const rLatestNews = async (data, stop = 8) => {
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

  const newsArr = data.articles.slice(0, stop).map(async (item) => await liLoad(item));
  return Promise.all([...newsArr])
      .then(data => {
        newsList.append(...data);
        container.append(newsList);
        section.append(titleWrapper, container);
        return section;
      })
      .catch(err => showError());
};
