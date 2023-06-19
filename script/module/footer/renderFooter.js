import {createFooter} from '../footer/createFooter.js';

export const renderFooter = (elem) => {
  const footer = createFooter();
  elem.append(footer);
};
