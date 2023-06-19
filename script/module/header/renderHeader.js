import {createHeader} from './createHeader.js';

export const renderHeader = (elem) => {
  const {header} = createHeader();
  elem.prepend(header);
};
