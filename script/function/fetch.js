import {main} from './const.js';
import {preload} from './preload.js';
import {showError} from './showError.js';
export const fetchRequestAlt = (postfix, value, cb, pageSize, page, flag = false) => {
  try {
    fetch(`https://newsapi.org/v2/${postfix}${value}&pageSize=${pageSize}&page=${page}`, {
      headers: {
        'X-Api-Key': '72293b7bac104a43a1b886e742588fd6',
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
        })
        .catch(err => {
          preload.remove();
          return showError(err);
        });
  } catch (err) {
    preload.remove();
    return showError(err);
  }
};

