import {main} from './const.js';
import {preload} from './preload.js';
import {scrollController} from './scrollControl.js';
import {showError} from './showError.js';
export const fetchRequestAlt = (postfix, value, cb, pageSizeNews, pageNews, flag = false) => {
  try {
    fetch(`https://newsapi.org/v2/${postfix}${value}&pageSize=${pageSizeNews}&page=${pageNews}`, {
      headers: {
        'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
      },
    })
        .then(response => response.json())
        .then(data => cb(data))
        .then(section => {
          preload.remove();
          scrollController.enabledScroll();
          if (!flag) {
            main.append(section);
          } else {
            return section;
          }
        })
        .catch(err => {
          preload.remove();
          scrollController.disabledScroll();
          return showError(err);
        });
  } catch (err) {
    preload.remove();
    scrollController.disabledScroll();
    return showError(err);
  }
};

export const fetchRequestSearch = (postfix, value, cb, pageSizeNews, pageNews, flag = false) => {
  try {
    fetch(`https://newsapi.org/v2/${postfix}${value}&pageSize=${pageSizeNews}&page=${pageNews}`, {
      headers: {
        'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
      },
    })
        .then(response => response.json())
        .then(data => cb(data))
        .then(section => {
          preload.remove();
          if (!flag) {
            main.append(section);
          } else {
            return section;
          }
          scrollController.enabledScroll();
        })
        .catch(err => {
          preload.remove();
          scrollController.disabledScroll();
          return showError(err);
        });
  } catch (err) {
    preload.remove();
    scrollController.disabledScroll();
    return showError(err);
  }
};

