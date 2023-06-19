import {createElement} from './function/createElem.js';

export const createContainer = () => {
  const container = createElement('div', {
    className: 'container',
  });

  return container;
};
