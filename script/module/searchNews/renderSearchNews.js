import {startPagination} from '../../const.js';
import {createContainer} from '../../createContainer.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../news-item/createItem.js';

export const renderSearchNews = (err, data) => {
  if (err) {
    console.warn(err);
    return;
  }

  const sectionSearchNews = createElement('section', {
    className: 'search-news',
  });

  const searchNewsTitleWrapper = createElement('div', {
    className: 'search-news__title-wrapper title-wrapper',
  }, {
    append: createElement('div', {
      className: 'container',
    }, {
      append: createElement('h2', {
        className: 'search-news__title title',
        textContent: `По Вашему запросу  найдено результатов`,
      }),
    }),
  });
  const container = createContainer();

  const searchNewsList = createElement('ul', {
    className: 'search-news__list list',
  });

  data.articles.slice(startPagination, startPagination + 8).map((item) => {
    const li = createItem(item);
    searchNewsList.append(li);
  });

  container.append(searchNewsList);
  sectionSearchNews.append(searchNewsTitleWrapper, container);

  return sectionSearchNews;
};

