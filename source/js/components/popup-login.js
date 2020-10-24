import {delClassError, addEventListener, removeEventListener, onFocusInput} from './utils';

var popupLogin = function () {
  var Selector = {
    BTN_OPEN_POPUP: '.js-login-open',
    POPUP: '.js-login-popup',
    BTN_CLOSE_POPUP: '.js-login-close',
    BTN_SHOW_PASSWORD: '.js-password-show',
    AREA_PASSWORD: '.js-area-password',
    AREA_LOGIN: '.js-area-login',
    BTN_SUBMIT: '.js-login-submit',
  };

  var popup = document.querySelector(Selector.POPUP);
  var btnOpenPopup = document.querySelector(Selector.BTN_OPEN_POPUP);

  if (!popup || !btnOpenPopup) {
    return;
  }

  var btnClosePopup = popup.querySelector(Selector.BTN_CLOSE_POPUP);
  var btnSubmitPopup = popup.querySelector(Selector.BTN_SUBMIT);
  var areaPassword = popup.querySelector(Selector.AREA_PASSWORD);
  var inputPassword = areaPassword.querySelector('input');
  var areaLogin = popup.querySelector(Selector.AREA_LOGIN);
  var inputLogin = areaLogin.querySelector('input');
  var btnShowPassword = popup.querySelector(Selector.BTN_SHOW_PASSWORD);
  var inputs = popup.querySelectorAll('input');
  var statusPassword = true;

  localStorage.setItem('name', '');
  localStorage.setItem('password', '');

  var setLocalstorage = function () {
    localStorage.setItem('name', inputLogin.value);
    localStorage.setItem('password', inputPassword.value);
  };

  var getFocusInput = function () {
    inputLogin.focus();
    if (localStorage.getItem('name')) {
      inputLogin.value = localStorage.getItem('name');
      inputPassword.focus();
    }
    if (localStorage.getItem('password')) {
      inputPassword.value = localStorage.getItem('password');
      inputLogin.focus();
    }
  };

  var switchShowPassword = function () {
    inputPassword.type = statusPassword ? 'password' : 'text';
  };

  var getClosePopup = function () {
    popup.classList.remove(window.Class.POPUP_SHOW);
    window.overlay.classList.remove(window.Class.OVERLAY_SHOW);
    window.body.classList.remove(window.Class.NO_SCROLL);
    statusPassword = true;
    switchShowPassword();
    btnShowPassword.removeEventListener('click', onClickBtnShowPassword);
    btnOpenPopup.addEventListener('click', onClickBtnShowPopup);
    btnClosePopup.removeEventListener('click', onClosePopup);
    inputs.forEach(function (currentValue) {
      removeEventListener(currentValue, onFocusInput);
    });
    setLocalstorage();
  };


  var onClickBtnShowPopup = function (env) {
    env.preventDefault();
    popup.classList.add(window.Class.POPUP_SHOW);
    window.overlay.classList.add(window.Class.OVERLAY_SHOW);
    window.body.classList.add(window.Class.NO_SCROLL);
    btnOpenPopup.removeEventListener('click', onClickBtnShowPopup);
    btnClosePopup.addEventListener('click', onClosePopup);
    btnShowPassword.addEventListener('click', onClickBtnShowPassword);
    window.overlay.addEventListener('click', onClosePopup);
    window.addEventListener('keydown', onWindowKeydown);
    btnSubmitPopup.addEventListener('click', onClickBtnSubmit);
    getFocusInput();
    inputs.forEach(function (currentValue) {
      addEventListener(currentValue, onFocusInput);
      delClassError(currentValue);
    });
  };

  var onClosePopup = function (env) {
    env.preventDefault();

    getClosePopup();
  };

  var onClickBtnShowPassword = function (env) {
    env.preventDefault();
    statusPassword = !statusPassword;
    switchShowPassword();
  };

  var onWindowKeydown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.Keydown.ESC) {
      getClosePopup();
    }
    window.removeEventListener('keydown', onWindowKeydown);
  };

  var onClickBtnSubmit = function (evt) {
    setLocalstorage();
    if (!inputPassword.value || !inputLogin.value) {
      evt.preventDefault();
      if (!inputPassword.value) {
        areaPassword.classList.add(window.Class.AREA_ERROR);
      }
      if (!inputLogin.value) {
        areaLogin.classList.add(window.Class.AREA_ERROR);
      }
    }
  };

  btnOpenPopup.addEventListener('click', onClickBtnShowPopup);
};

export default popupLogin;
