import {startPagination} from '../../const.js';
import {createContainer} from '../../createContainer.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../news-item/createItem.js';

export const renderLatestNews = (err, data) => {
  if (err) {
    console.warn(err);
    return;
  }

  const sectionLatestNews = createElement('section', {
    className: 'latest-news',
  });

  const latestNewsTitleWrapper = createElement('div', {
    className: 'latest-news__title-wrapper title-wrapper',
  }, {
    append: createElement('div', {
      className: 'container',
    }, {
      append: createElement('h2', {
        className: 'latest-news__title title',
        textContent: 'Свежие новости',
      }),
    }),
  });
  const container = createContainer();

  const latestNewsList = createElement('ul', {
    className: 'latest-news__list list',
  });

  data.articles.slice(startPagination, (startPagination + 8)).map((item) => {
    const li = createItem(item);
    latestNewsList.append(li);
  });

  container.append(latestNewsList);
  sectionLatestNews.append(latestNewsTitleWrapper, container);

  return sectionLatestNews;
};
