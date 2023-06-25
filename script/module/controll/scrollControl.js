import {body} from '../../function/const.js';

export const scrollController = {
  disabledScroll() {
    0,
    body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - body.offsetWidth}px;
    `;
  },
  enabledScroll() {
    body.style.cssText = ``;
    window.scroll({top: scrollController.scrollPosition});
  },
};
