import {createHeader} from './createHeader.js';

export const renderHeader = (elem) => {
  const {header, form, searchInput, searchSelect} = createHeader();
  elem.prepend(header);

  return {
    form,
    searchInput,
    searchSelect,
  };
};
