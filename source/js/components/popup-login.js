var popupLogin = function () {
  var Selector = {
    BTN_OPEN_POPUP: '.js-login-open',
    POPUP: '.js-login-popup',
    BTN_CLOSE_POPUP: '.js-login-close',
    BTN_SHOW_PASSWORD: '.js-password-show',
    AREA_PASSWORD: '.js-area-password',
    AREA_LOGIN: '.js-area-login',
    OVERLAY: '.js-overlay',
    BTN_SUBMIT: '.js-login-submit',
    FORM_AREA: '.formArea'
  };

  var Class = {
    POPUP_SHOW: 'popup--show',
    OVERLAY_SHOW: 'overlay--show',
    AREA_ERROR: 'formArea--error',
    NO_SCROLL: 'page--no-scroll',
  };

  var Keydown = {
    ENTER: 13,
    ESC: 27,
  };

  var popup = document.querySelector(Selector.POPUP);
  var btnOpenPopup = document.querySelector(Selector.BTN_OPEN_POPUP);

  if (!popup || !btnOpenPopup) {
    return;
  }

  var btnClosePopup = popup.querySelector(Selector.BTN_CLOSE_POPUP);
  var btnSubmitPopup = popup.querySelector(Selector.BTN_SUBMIT);
  var overlay = document.querySelector(Selector.OVERLAY);
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


  var delClassError = function (element) {
    var formArea = element.closest(Selector.FORM_AREA);
    formArea.classList.remove(Class.AREA_ERROR);
  };

  var addEventListener = function (element) {
    element.addEventListener('focus', onFocusInput);
    element.addEventListener('keydown', onFocusInput);
  };

  var removeEventListener = function (element) {
    element.removeEventListener('focus', onFocusInput);
    element.removeEventListener('keydown', onFocusInput);
    delClassError(element);
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
    popup.classList.remove(Class.POPUP_SHOW);
    overlay.classList.remove(Class.OVERLAY_SHOW);
    window.body.classList.remove(Class.NO_SCROLL);
    statusPassword = true;
    switchShowPassword();
    btnShowPassword.removeEventListener('click', onClickBtnShowPassword);
    btnOpenPopup.addEventListener('click', onClickBtnShowPopup);
    btnClosePopup.removeEventListener('click', onClosePopup);
    inputs.forEach(function (currentValue) {
      removeEventListener(currentValue);
    });
    setLocalstorage();
  };

  var onFocusInput = function (evt) {
    var focusInput = evt.target;
    delClassError(focusInput);
  };

  var onClickBtnShowPopup = function (env) {
    env.preventDefault();
    popup.classList.add(Class.POPUP_SHOW);
    overlay.classList.add(Class.OVERLAY_SHOW);
    window.body.classList.add(Class.NO_SCROLL);
    btnOpenPopup.removeEventListener('click', onClickBtnShowPopup);
    btnClosePopup.addEventListener('click', onClosePopup);
    btnShowPassword.addEventListener('click', onClickBtnShowPassword);
    overlay.addEventListener('click', onClosePopup);
    window.addEventListener('keydown', onWindowKeydown);
    btnSubmitPopup.addEventListener('click', onClickBtnSubmit);
    getFocusInput();
    inputs.forEach(function (currentValue) {
      addEventListener(currentValue);
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
    if (evt.keyCode === Keydown.ESC) {
      getClosePopup();
    }
    window.removeEventListener('keydown', onWindowKeydown);
  };

  var onClickBtnSubmit = function (evt) {
    setLocalstorage();
    if (!inputPassword.value || !inputLogin.value) {
      evt.preventDefault();
      if (!inputPassword.value) {
        areaPassword.classList.add(Class.AREA_ERROR);
      }
      if (!inputLogin.value) {
        areaLogin.classList.add(Class.AREA_ERROR);
      }
    }
  };

  btnOpenPopup.addEventListener('click', onClickBtnShowPopup);
};

export default popupLogin;
