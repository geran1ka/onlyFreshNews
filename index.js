import {page} from './script/const.js';
import fetchRequest from './script/function/fetchRequest.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/footer/renderFooter.js';
import {headerController} from './script/module/header/headerController.js';
import {renderHeader} from './script/module/header/renderHeader.js';
import {renderLatestNews} from './script/module/latestNews/renderLatestNews.js';

const init = async () => {
  const {form, searchInput, searchSelect} = renderHeader(page);
  headerController(form, searchInput, searchSelect);
  console.log('searchSelect: ', searchSelect.value);

  const response = await fetchRequest(`top-headlines?country=${searchSelect.value}`, {
    headers: {
      'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
    },
    callback: renderLatestNews,
  });
  // preload.show();
  
  //const latestNews = renderLatestNews(null, data);
 
  renderFooter(page);
};

init();
