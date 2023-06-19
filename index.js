import {page} from './script/const.js';
import {renderHeader} from './script/module/header/renderHeader.js';
import {renderLatestNews} from './script/module/latestNews/renderLatestNews.js';

const array = [];

const init = () => {
  renderHeader(page);

  renderLatestNews(array);
};

init();
