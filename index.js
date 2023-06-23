import {main, page} from './script/function/const.js';
import fetchRequest from './script/deletefunction/fetchRequest.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/render/renderFooter.js';
import {headerController} from './script/module/headerController.js';
import {renderHeader} from './script/module/render/renderHeader.js';
import {rLatestNews} from './script/module/render/renderLatestNews.js';
import {fetchRequestAlt} from './script/function/fetch.js';


const init = () => {
  preload.show();
  const {header, form, searchInput, searchSelect} = renderHeader();
  page.prepend(header);
  fetchRequestAlt('top-headlines?country=', searchSelect.value, rLatestNews, 9, 2);
  page.append(renderFooter());

  headerController(form, searchInput);
};

init();
