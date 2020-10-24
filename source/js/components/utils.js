var utils = function () {
  window.Selector = {
    BODY: '.page',
    CREDIT: '.js-credit',
    BTN_MIN: '.calculate__btn[data-target="min"]',
    BTN_PLUS: '.calculate__btn[data-target="plus"]',
    RANGE: '.range__btn',
    RANGE_SCALE: '.range__scale',
    RANGE_INFO_LEFT: '.range__captionLeft',
    RANGE_INFO_RIGHT: '.range__captionRight',
    RANGE_BAR: '.range__bar',
    SUMMER_CALC: '.js-main-calc',
    PAYMENT_CALC: '.js-payment-calc',
    TERM_CALC: '.js-term-calc',
    INPUT: '.calculate__input',
    OPTION_INPUT: '.option__input',
    FORM_AREA: '.formArea',
    OVERLAY: '.js-overlay',
  };

  window.Class = {
    NO_SCROLL: 'page--no-scroll',
    FORM_SHOW: 'credit--formShow',
    POPUP_SHOW: 'popup--show',
    OVERLAY_SHOW: 'overlay--show',
    AREA_ERROR: 'formArea--error',
  };

  window.Keydown = {
    ENTER: 13,
    ESC: 27,
  };
  window.overlay = document.querySelector(window.Selector.OVERLAY);
  window.body = document.querySelector(window.Selector.BODY);
  window.credit = document.querySelector(window.Selector.CREDIT);
};

var getStringOfNumb = function (numb) {
  var stringOfNum = numb.toString();
  return stringOfNum.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};

var delClassError = function (element) {
  var formArea = element.closest(window.Selector.FORM_AREA);
  formArea.classList.remove(window.Class.AREA_ERROR);
};

var addEventListener = function (element, listener) {
  element.addEventListener('focus', listener);
  element.addEventListener('keydown', listener);
};

var removeEventListener = function (element, listener) {
  element.removeEventListener('focus', listener);
  element.removeEventListener('keydown', listener);
  delClassError(element);
};

var onFocusInput = function (evt) {
  var focusInput = evt.target;
  delClassError(focusInput);
};

export {getStringOfNumb, delClassError, addEventListener, removeEventListener, onFocusInput};
export default utils;
