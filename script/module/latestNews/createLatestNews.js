import {createContainer} from '../../createContainer.js';
import {createElement} from '../../function/createElem.js';

export const createLatestNews = () => {
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

  container.append(latestNewsList);
  sectionLatestNews.append(latestNewsTitleWrapper, container);

  return {
    sectionLatestNews,
    latestNewsList,
  };
};


/*
<section class="latest-news">
      <div class="latest-news__title-wrapper title-wrapper">
        <div class="container">
          <h2 class="latest-news__title title">Свежие новости</h2>
        </div>
      </div>
      <div class="container">
        <ul class="latest-news__list list">
          <li class="latest-news__item item">
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
            </article>
          </li>
          */
