import {main, page} from './script/function/const.js';
import {preload} from './script/function/preload.js';
import {renderFooter} from './script/module/render/renderFooter.js';
import {headerController} from './script/module/headerController.js';
import {renderHeader} from './script/module/render/renderHeader.js';
import {rLatestNews} from './script/module/render/renderLatestNews.js';
import {showError} from './script/function/showError.js';
import {paginationController} from './script/module/pageController.js';


const init = () => {
  preload.show();
  const {header, form, searchInput, searchSelect} = renderHeader();
  page.prepend(header);
  try {
    fetch(`https://newsapi.org/v2/top-headlines?country=${searchSelect.value}`, {
      headers: {
        'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
      },
    })
        .then(response => response.json())
        .then(data => rLatestNews(data))
        .then(section => {
          main.append(section);
          preload.remove();
        })
        .catch(err => {
          preload.remove();
          return showError(err);
        });
  } catch (err) {
    preload.remove();
    showError(err);
  }


  page.append(renderFooter());

  headerController(form, searchInput);
  paginationController();
};

init();
