import {navigator, page} from '../script/function/const.js';
import {preload} from '../script/function/preload.js';
import {renderFooter} from '../script/module/render/renderFooter.js';
import {headerController} from '../script/module/controll/headerController.js';
import {renderHeader} from '../script/module/render/renderHeader.js';
import {rLatestNews} from '../script/module/render/renderLatestNews.js';
import {fetchRequestAlt} from '../script/function/fetchVar2.js';

const init = () => {
  preload.show();
  const {header, form, searchSelect} = renderHeader();
  page.prepend(header);
  fetchRequestAlt('top-headlines?country=',
      searchSelect.value,
      rLatestNews,
      navigator.pageSizeNews,
      navigator.pageNews,
  );
  page.append(renderFooter());

  headerController(form, searchSelect);
};

init();
