import {main, page} from './script/function/const.js';
import fetchRequest from './script/function/fetchRequest.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/render/renderFooter.js';
import {headerController} from './script/module/headerController.js';
import {renderHeader} from './script/module/render/renderHeader.js';
import {renderLatestNews} from './script/module/render/renderLatestNews.js';


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

  console.log(promise);
  promise.then(data => {
    console.log('data: ', data);
    main.textContent = '';
    main.append(data);
  });

  const footer = renderFooter();
  page.append(footer);
  headerController(form, searchInput);
};

init();
