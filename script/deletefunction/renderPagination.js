import {createElement} from '../function/createElem.js';

  const renderPagination = (data) => {
  const pagination = createElement('div', {
    className: 'pagination',
  });

  const linkBack = createElement('a', {
    className: 'pagination__link',
    href: '#',
    innerHTML: `
      <svg width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.375 7.95833H6.52958L12.0487 2.42375L9.875 0.25L0.625 9.5L9.875 18.75L12.0487 16.5763L6.52958 11.0417H28.375V7.95833Z"/>
      </svg>            
    `,
  });

  const linkNext = createElement('a', {
    className: 'pagination__link',
    href: '#',
    innerHTML: `
      <svg width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.625 7.95833H22.4704L16.9513 2.42375L19.125 0.25L28.375 9.5L19.125 18.75L16.9513 16.5763L22.4704 11.0417H0.625V7.95833Z"/>
      </svg>           
    `,
  });


  return {pagination, linkBack, linkNext};
};
