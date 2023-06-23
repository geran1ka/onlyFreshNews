import {main} from './const.js';
import {preload} from './preload.js';
import {showError} from './showError.js';
export const fetchRequestAlt = (postfix, value, cb, n = 18, flag = false) => {
  try {
    fetch(`https://newsapi.org/v2/${postfix}${value}`, {
      headers: {
        'X-Api-Key': '5aeb6f997b174e06b6b958e60d09fcca',
      },
    })
        .then(response => response.json())
        .then(data => cb(data, n))
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

