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

      elem.addEventListener('error', () => {
        elem.setAttribute('src', '/img/no-photo.jpg');
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
  // resolve(li);
  return li;
});

export const createItem = (item) => {
  const li = createElement('li', {
    className: 'item',
  });

  const itemContent = createElement('article', {
    className: 'item__content',
  });

  const itemWrapperContent = createElement('div', {
    className: 'item__wrapper-content',
  });

  const imgWrapper = createElement('div', {
    className: 'item__img-wrapper',
  });

  const overlayImgLoad = createElement('div', {
    className: 'item__overlay-load',
    innerHTML: `
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M142.5 60L112.5 90H135C135 114.825 114.825 135 90 135C82.425 135 75.225 133.125 69 129.75L58.05 140.7C67.275 146.55 78.225 150 90 150C123.15 150 150 123.15 150 90H172.5L142.5 60ZM45 90C45 65.175 65.175 45 90 45C97.575 45 104.775 46.875 111 50.25L121.95 39.3C112.725 33.45 101.775 30 90 30C56.85 30 30 56.85 30 90H7.5L37.5 120L67.5 90H45Z" fill="black"/>
      </svg>
    `,
  }, {
    parent: imgWrapper,
  });

  const img = createElement('img', {
    className: 'item__image',
    src: item.urlToImage ? item.urlToImage : '',
    alt: item.title,
  }, {
    cb(elem) {
      elem.addEventListener('load', () => {
        overlayImgLoad.remove();
      });

      elem.addEventListener('error', () => {
        elem.setAttribute('src', '/img/no-photo.jpg');
        overlayImgLoad.remove();
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
  imgWrapper.append(img);
  itemContent.append(imgWrapper, itemWrapperContent);
  li.append(itemContent);
  // resolve(li);
  return li;
};
