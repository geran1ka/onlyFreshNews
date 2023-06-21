import {main, page} from './script/function/const.js';
import fetchRequest from './script/function/fetchRequest.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/render/renderFooter.js';
import {headerController} from './script/module/headerController.js';
import {renderHeader} from './script/module/render/renderHeader.js';
import {rLatestNews} from './script/module/render/renderLatestNews.js';


const init = () => {
  preload.show();
  const {header, form, searchInput, searchSelect, btnSearch} = renderHeader();
  page.prepend(header);


  const promise = fetch(`https://newsapi.org/v2/top-headlines?country=${searchSelect.value}`, {
    headers: {
      'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
    },
  });
  promise
      .then(response => response.json())
      .then(data => rLatestNews(data.articles))
      .then(section => {
        main.append(section);
        preload.remove();
      });

  page.append(renderFooter());

  headerController(form, searchInput);
  /*

  const promise = fetchRequest(`top-headlines?country=${searchSelect.value}`, {
    headers: {
      'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
    },
    callback: renderLatestNews,
  });

  promise.then(data => {
    main.textContent = '';
    main.append(data);
  });
*/


};

init();
