import { navigator } from '../../function/const.js';
import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';
import {fetchRequestAlt} from '../../function/fetch.js';
import {paginationController} from '../pageController.js';


export const rLatestNews = async (data) => {
  console.log('data: ', data);
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
  const {pagination, linkBack, linkNext} = paginationController(data);
  linkNext.addEventListener('click', () => {
    navigator.pageNews += 1;
    section.remove();
    fetchRequestAlt('top-headlines?country=',
        inputSelect.value,
        rLatestNews,
        navigator.pageSizeNews,
        navigator.pageNews,
    );
  });

  linkBack.addEventListener('click', () => {
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
