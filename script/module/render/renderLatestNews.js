import {navigator} from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';
import {fetchRequestAlt} from '../../function/fetch.js';
import {renderPagination} from './renderPagination.js';


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
  const inputSelect = document.querySelector('.form-search__select');
  console.log(navigator);
  const {
    pagination,
    btnBack,
    btnNext,
  } = renderPagination(data, navigator.pageNews, navigator.pageSizeNews);

  if (navigator.pageNews >= data.totalResults / navigator.pageSizeNews) {
    btnNext?.setAttribute('disabled', 'disabled');
  } else {
    btnNext?.removeAttribute('disabled');
  }
  btnNext.addEventListener('click', () => {
    navigator.pageNews += 1;
    console.log('navigator.pageNews: ', navigator.pageNews);
    section.remove();
    fetchRequestAlt('top-headlines?country=',
        inputSelect.value,
        rLatestNews,
        navigator.pageSizeNews,
        navigator.pageNews,
    );
  });

  if (navigator.pageNews <= 1) {
    btnBack?.setAttribute('disabled', 'disabled');
  } else {
    btnBack?.removeAttribute('disabled');
  }

  btnBack.addEventListener('click', () => {
    navigator.pageNews -= 1;
    section.remove();
    fetchRequestAlt('top-headlines?country=',
        inputSelect.value,
        rLatestNews,
        navigator.pageSizeNews,
        navigator.pageNews,
    );
  });
  titleWrapper.prepend(pagination);
  const newsArr = data.articles.map((item) => createItem(item));
  newsList.append(...newsArr);
  container.append(newsList);
  section.append(titleWrapper, container);

  return section;
};
