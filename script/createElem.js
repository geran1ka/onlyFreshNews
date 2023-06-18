export const createElement = (tag, attr, {append, appends, parent, cb} = {}) => {
  const element = document.createElement(tag);
  // Проверка: передан ли атрибут
  if (attr) {
    Object.assign(element, attr);
  }
  // Проверка: есть ли у элемента родитель и является ли он HTML элементом
  if (append && append instanceof HTMLElement) {
    element.append(append);
  }

  if (appends && appends.every(item => item instanceof HTMLElement)) {
    element.append(...appends);
  }
  // Проверка: есть ли у элемента ... и является ли он HTML элементом
  if (parent && parent instanceof HTMLElement) {
    parent.append(element);
  }

  if (cb && typeof cb === 'function') {
    cb(element);
  }

  return element;
};
