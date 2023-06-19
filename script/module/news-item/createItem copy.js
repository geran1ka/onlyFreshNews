import {createElement} from '../../function/createElem.js';
const obj = {
  'source': {'id': 'lenta', 'name': 'Lenta'},
  'author': 'Марина Совина',
  'title': 'Госдеп прокомментировал учения военных из США в Польше вблизи границы Украины - Lenta.ru',
  'description': 'В Госдепе прокомментировали учения военных из США в Польше вблизи границы Украины. В министерстве подчеркнули, что размещение сил НАТО всегда оборонительно и соразмерно. Также отмечается, что действия альянса не нацелены на провокацию конфликта, а наоборот — …',
  'url': 'https://lenta.ru/news/2022/02/21/ucheniya/',
  'urlToImage': 'https://icdn.lenta.ru/images/2022/02/21/02/20220221021728879/share_da3b05a43a8fa63955beeb210e7293b5.jpg',
  'publishedAt': '2022-02-20T23:24:01Z',
  'content': '. - .\r\n , . , , .\r\n, , , . , 18- 82- - . , , - , .'
};


export const createItem = (obj) => {
  const li = createElement('li', {
    className: 'item',
  });

  const itemContent = createElement('article', {
    className: 'item__content',
  });

  const itemNewsLink = createElement('a', {
    className: 'item__news-link',
  });

  const img = createElement('img', {
    className: 'item',
    src: obj.urlToImage ? obj.urlToImage : '..../img/no-photo.jpg',
    alt: obj.title,
  });

  const itemTitle = createElement('h3', {
    className: 'item__title',
    textContent: obj.title,
  });

  const itemNewsLinkWindow = createElement('a', {
    className: 'item__link',
    href: obj.url,
    innerHTML: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6H18V16M18 6L6 18L18 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
  });

  const itemDescription = createElement('p', {
    className: 'item__description',
    textContent: obj.description,
  });

  const itemInfo = createElement('div', {
    className: 'item__info',
  });

  const itemPublished = createElement('div', {
    className: 'item__published',
  });

  const itemPublishedDate = createElement('p', {
    className: 'item__published-date',
    textContent: new Date(obj.publishedAt).toLocaleDateString('ru'),
  });

  const itemPublishedTime = createElement('p', {
    className: 'item__published-time',
    textContent: new Date(obj.publishedAt).toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit',
      
    }),
  });

  const itemAuthor = createElement('p', {
    className: 'item__author',
    textContent: obj.author ? obj.author : '',
  });

  itemPublished.append(itemPublishedDate, itemPublishedTime);
  itemInfo.append(itemPublished, itemAuthor);
  itemNewsLink.append(img, itemTitle);
  itemContent.append(itemNewsLink, itemNewsLinkWindow, itemDescription, itemInfo);
  li.append(itemContent);

  return li;
};
/*
<li class="search-news__item item">
            <article class="item__content">
              <a href="#" class="item__news-link">
                <img class="item__image" src="img/test.jpg" alt="">
                <h3 class="item__title">В России начали выпускать суверенные печатные платы — в них только отечественное сырьё и материалы</h3>
              </a>

              <a href="#" class="item__link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H18V16M18 6L6 18L18 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </a>

              <p class="item__description">
                Холдинг «Российские космические системы», входящий в состав «Роскосмоса»...
              </p>

              <div class="item__info">
                <div class="item__published">
                  <p class="item__published-date">16/03/2022</p>
                  <p class="item__published-time">11:06</p>
                </div>
                <p class="item__author">Эрик Крипке</p>
              </div>
            </artic*/
