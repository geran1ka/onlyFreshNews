import {createElement} from './createElem.js';

export const liLoad = (item) => new Promise(resolve => {
  const li = createElement('li', {
    className: 'item',
  });

  const itemContent = createElement('article', {
    className: 'item__content',
  });

  const itemWrapperContent = createElement('div', {
    className: 'item__wrapper-content',
  });

  const img = createElement('img', {
    className: 'item__image',
    src: item.urlToImage ? item.urlToImage : '/img/no-photo.jpg',
    alt: item.title,
  }, {
    cb(elem) {
      elem.addEventListener('load', () => {
        li.append(itemContent);
        resolve(li);
      });
    },
  });

  const itemTitleLink = createElement('a', {
    className: 'item__news-link',
    href: item.url ? item.url : '#',
    about: '_blanck',
  });

  const itemTitle = createElement('h3', {
    className: 'item__title',
    textContent: item.title,
  });

  const itemNewsLinkWindow = createElement('a', {
    className: 'item__link',
    href: item.url ? item.url : '#',
    innerHTML: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6H18V16M18 6L6 18L18 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  });

  const itemDescription = createElement('p', {
    className: 'item__description',
    textContent: item.description ? item.description : '...',
  });

  const itemInfo = createElement('div', {
    className: 'item__info',
  });

  const itemPublished = createElement('div', {
    className: 'item__published',
  });

  const itemPublishedDate = createElement('p', {
    className: 'item__published-date',
    textContent: new Date(item.publishedAt).toLocaleDateString('ru'),
  });

  const itemPublishedTime = createElement('p', {
    className: 'item__published-time',
    textContent: new Date(item.publishedAt).toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  const itemAuthor = createElement('p', {
    className: 'item__author',
    textContent: item.author ? item.author : 'Аноним',
  });

  itemPublished.append(itemPublishedDate, itemPublishedTime);
  itemInfo.append(itemPublished, itemAuthor);
  itemTitleLink.append(itemTitle);
  itemWrapperContent.append(itemTitleLink, itemNewsLinkWindow, itemDescription, itemInfo);
  itemContent.append(img, itemWrapperContent);

  return li;
});
