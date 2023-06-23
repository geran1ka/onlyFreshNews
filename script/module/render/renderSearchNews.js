import {createElement} from '../../function/createElem.js';
import {createItem} from '../../function/createItem.js';
import { fetchRequestAlt } from '../../function/fetch.js';
import { paginationController } from '../pageController.js';


export const rSearchNews = async (data) => {
  console.log('data: ', data);
  const section = createElement('section', {
    className: 'search-news',
  });

  const titleWrapper = createElement('div', {
    className: 'title-wrapper',
  }, {
    append: createElement('div', {
      className: 'container',
    }, {
      append: createElement('h2', {
        className: 'title',
        textContent: `
        По Вашему запросу 
        ${document.querySelector('.form-search__input')?.value} 
        найдено ${data.totalResults} результатов
        `,
      }),
    }),
  });
  const container = createElement('div', {
    className: 'container',
  });

  const newsList = createElement('ul', {
    className: 'list', 
  });

  const {pagination, linkBack, linkNext} = paginationController(data);
  const inputSelect = document.querySelector('.form-search__select');
  const inputSearch = document.querySelector('.form-search__input');
  linkNext.addEventListener('click', () => {
    navigator.page += 1;
    section.remove();
    fetchRequestAlt('everything?q=',
        inputSearch.value,
        rSearchNews,
        navigator.pageSize,
        navigator.page,
    );
  });

  linkBack.addEventListener('click', () => {
    navigator.page -= 1;
    section.remove();
    fetchRequestAlt('everything?q=',
        inputSearch.value,
        rSearchNews,
        navigator.pageSize,
        navigator.page,
    );
  });
  titleWrapper.prepend(pagination);

  const searchNewsArr = data.articles.map((item) => createItem(item));

  newsList.append(...searchNewsArr);
  container.append(newsList);
  section.append(titleWrapper, container);


  return section;
};


