import {main, navigator, page} from './script/function/const.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/render/renderFooter.js';
import {renderHeader} from './script/module/render/renderHeader.js';
import {rLatestNews} from './script/module/render/renderLatestNews.js';
import {fetchRequestSearch} from './script/function/fetch.js';
import {showError} from './script/function/showError.js';
import {scrollController} from './script/module/controll/scrollControl.js';
import {headerController} from './script/module/controll/headerController.js';

const init = () => {
  preload.show();
  scrollController.disabledScroll();
  const {header, form, searchSelect} = renderHeader();
  page.prepend(header);
  fetchRequestSearch('top-headlines?country=',
      searchSelect.value,
      navigator.pageSizeNews,
      navigator.pageNews,
  )
      .then(response => response.json())
      .then(data => rLatestNews(data))
      .then(section => {
        preload.remove();
        scrollController.enabledScroll();
        main.append(section);
      })
      .catch(err => {
        preload.remove();
        scrollController.disabledScroll();
        return showError(err);
      });
  page.append(renderFooter());

  headerController(form, searchSelect);
};

init();
