import {main, page} from './script/const.js';
import fetchRequest from './script/function/fetchRequest.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/footer/renderFooter.js';
import {headerController} from './script/module/header/headerController.js';
import {renderHeader} from './script/module/header/renderHeader.js';
import {renderLatestNews} from './script/module/latestNews/renderLatestNews.js';

const init = () => {
  const {header, form, searchInput, searchSelect, btnSearch} = renderHeader();
  page.prepend(header);

  preload.show();
  const promise = fetchRequest(`top-headlines?country=${searchSelect.value}`, {
    headers: {
      'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
    },
    callback: renderLatestNews,
  });
  main.textContent = '';
  promise.then(data => {
    preload.remove();
    main.append(data);
  });
  const footer = renderFooter();
  page.append(footer);
  /*
  headerController(form)?.then(data => {
    preload.remove();
    main.append(data[0], data[1]);
  });
  */
};

init();
