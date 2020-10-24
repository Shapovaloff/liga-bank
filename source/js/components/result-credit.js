import Inputmask from 'inputmask';
import {delClassError, addEventListener, removeEventListener, onFocusInput, getStringOfNumb} from './utils';

var NUMBER_CASE = 10;
var LENGHT_NUMBER_CASE = 4;

var Prefix = {
  CURRENCY: ' рублей',
  PERCENT: '%',
};

var Selector = {
  RESULT: '.js-result',
  RESULT_MAIN: '.js-result-main',
  RESULT_INFO: '.js-result-info',
  RESULT_SUMMER_NAME: '.js-result-main .grayBox__caption',
  RESULT_SUMMER_VALUE: '.js-result-main .grayBox__value',
  RESULT_RATE_VALUE: '.js-result-rate .grayBox__value',
  RESULT_PAYMENT_VALUE: '.js-result-payment .grayBox__value',
  RESULT_INCOME_VALUE: '.js-result-income .grayBox__value',
  RESULT_INFO_NAME: '.js-result-info-name',
  RESULT_INFO_TRESHOLD: '.js-result-treshold',
  RESULT_BTN: '.js-result-btn',
  FORM_CONTAINER: '.js-result-form',
  FORM_NUMBER: '.js-result-form-number .formArea__input',
  FORM_TARGET: '.js-result-form-target .formArea__input',
  FORM_SUMMER_NAME: '.js-result-form-summer .formArea__label',
  FORM_SUMMER_VALUE: '.js-result-form-summer .formArea__input',
  FORM_PAYMENT_VALUE: '.js-result-form-payment .formArea__input',
  FORM_TERM_VALUE: '.js-result-form-term .formArea__input',
  FORM_AREA_CLIENT: '.js-result-form-client',
  FORM_AREA_PHONE: '.js-result-form-phone',
  FORM_AREA_EMAIL: '.js-result-form-email',
  FORM_CLIENT: '.js-result-form-client input',
  FORM_PHONE: '.js-result-form-phone input',
  FORM_EMAIL: '.js-result-form-email input',
  FORM_BTN: '.js-result-form-submit',
  FORM_VALIDATION: '.js-result-form-validation input',
  RESULT_POPUP: '.js-result-popup',
  RESULT_POPUP_CLOSE: '.js-result-popup-close',
  FORM_LIST_ITEM: '.form__listItem',
  FORM_SLOT: '.js-result-form-payment .formArea__slot',
};

var Class = {
  ERROR_FORM: 'grayBox--error',
  DISPLAY_NONE: 'd-none'
};

class ResultCredit {
  constructor() {
    this.removedFlag = false;
    this.removedStartPayment = false;
    this.initFormFlag = false;
    this.result = document.querySelector(Selector.RESULT);
    this.resultPopup = document.querySelector(Selector.RESULT_POPUP);
    this.resulPopupClose = document.querySelector(Selector.RESULT_POPUP_CLOSE);
    this.inputsValidation = document.querySelectorAll(Selector.FORM_VALIDATION);
    this.slotStartPayment = document.querySelector(Selector.FORM_SLOT);
    this.parentStartPayment = this.slotStartPayment.closest(Selector.FORM_LIST_ITEM);
    this.blocks = {
      form: {
        container: document.querySelector(Selector.FORM_CONTAINER),
        number: document.querySelector(Selector.FORM_NUMBER),
        target: document.querySelector(Selector.FORM_TARGET),
        summerName: document.querySelector(Selector.FORM_SUMMER_NAME),
        summerValue: document.querySelector(Selector.FORM_SUMMER_VALUE),
        paymentValue: document.querySelector(Selector.FORM_PAYMENT_VALUE),
        termValue: document.querySelector(Selector.FORM_TERM_VALUE),

        areaClient: document.querySelector(Selector.FORM_AREA_CLIENT),
        areaPhone: document.querySelector(Selector.FORM_AREA_PHONE),
        areaEmail: document.querySelector(Selector.FORM_AREA_EMAIL),

        client: document.querySelector(Selector.FORM_CLIENT),
        phone: document.querySelector(Selector.FORM_PHONE),
        email: document.querySelector(Selector.FORM_EMAIL),
        btn: document.querySelector(Selector.FORM_BTN),
      },
      main: {
        container: this.result.querySelector(Selector.RESULT_MAIN),
        summerName: this.result.querySelector(Selector.RESULT_SUMMER_NAME),
        summerValue: this.result.querySelector(Selector.RESULT_SUMMER_VALUE),
        rateValue: this.result.querySelector(Selector.RESULT_RATE_VALUE),
        paymentValue: this.result.querySelector(Selector.RESULT_PAYMENT_VALUE),
        incomeValue: this.result.querySelector(Selector.RESULT_INCOME_VALUE),
        btn: this.result.querySelector(Selector.RESULT_BTN),
      },
      info: {
        container: this.result.querySelector(Selector.RESULT_INFO),
        name: this.result.querySelector(Selector.RESULT_INFO_NAME),
        treshold: this.result.querySelector(Selector.RESULT_INFO_TRESHOLD),
      },
    };

    this.onClickBtnResult = function () {
      this.getValueForm();
      window.credit.classList.add(window.Class.FORM_SHOW);
      this.blocks.form.client.focus();
      if (localStorage.getItem('name2')) {
        this.blocks.form.client.value = localStorage.getItem('name2');
      }
      if (localStorage.getItem('phone')) {
        this.blocks.form.phone.value = localStorage.getItem('phone');
      }
      if (localStorage.getItem('email')) {
        this.blocks.form.email.value = localStorage.getItem('email');
      }
      this.inputsValidation.forEach(function (currentValue) {
        addEventListener(currentValue, onFocusInput);
        delClassError(currentValue);
      });
      this.blocks.form.btn.addEventListener('click', this.onClickBtnSubmit);
      this.initFormFlag = true;
    }.bind(this);

    this.onClickBtnSubmit = function (evt) {
      evt.preventDefault();
      this.setLocalstorage();

      if (!this.getValidation()) {
        this.blocks.form.container.classList.remove(Class.ERROR_FORM);
        this.animationFlag = this.blocks.form.container.offsetWidth;
        this.blocks.form.container.classList.add(Class.ERROR_FORM);
        return;
      }

      NUMBER_CASE++;
      window.credit.classList.remove(window.Class.FORM_SHOW);
      this.getDestroyForm();
      this.getShowPopup();
    }.bind(this);

    this.onWindowKeydown = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.Keydown.ESC) {
        this.getClosePopup();
      }
      window.removeEventListener('keydown', this.onWindowKeydown);
    }.bind(this);

    this.onClosePopup = function (env) {
      env.preventDefault();
      this.getClosePopup();
    }.bind(this);
  }

  getShowPopup() {
    this.resultPopup.classList.add(window.Class.POPUP_SHOW);
    window.overlay.classList.add(window.Class.OVERLAY_SHOW);
    window.body.classList.add(window.Class.NO_SCROLL);
    window.overlay.addEventListener('click', this.onClosePopup);
    window.addEventListener('keydown', this.onWindowKeydown);
    this.resulPopupClose.addEventListener('click', this.onClosePopup);
  }

  getClosePopup() {
    this.resultPopup.classList.remove(window.Class.POPUP_SHOW);
    window.overlay.classList.remove(window.Class.OVERLAY_SHOW);
    window.body.classList.remove(window.Class.NO_SCROLL);
    this.resulPopupClose.removeEventListener('click', this.onClosePopup);
  }

  getDestroyForm() {
    if (this.initFormFlag) {
      this.initFormFlag = false;
      this.blocks.form.container.classList.remove(Class.ERROR_FORM);
      this.blocks.form.btn.removeEventListener('click', this.onClickBtnSubmit);
      this.inputsValidation.forEach(function (currentValue) {
        removeEventListener(currentValue, onFocusInput);
      });
    }
  }

  getValidation() {
    if (!this.blocks.form.client.value || !this.blocks.form.phone.value || !this.blocks.form.email.value) {
      if (!this.blocks.form.client.value) {
        this.blocks.form.areaClient.classList.add(window.Class.AREA_ERROR);
      }
      if (!this.blocks.form.phone.value) {
        this.blocks.form.areaPhone.classList.add(window.Class.AREA_ERROR);
      }
      if (!this.blocks.form.email.value) {
        this.blocks.form.areaEmail.classList.add(window.Class.AREA_ERROR);
      }
      this.blocks.form.container.classList.add(Class.ERROR_FORM);
      return false;
    } else {
      if (!this.getValidateEmail(this.blocks.form.email.value)) {
        this.blocks.form.areaEmail.classList.add(window.Class.AREA_ERROR);
        this.blocks.form.container.classList.add(Class.ERROR_FORM);
        return false;
      }
      return true;
    }
  }

  getValidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  setLocalstorage() {
    localStorage.setItem('nameAndFamily', this.blocks.form.client.value);
    localStorage.setItem('phone', this.blocks.form.phone.value);
    localStorage.setItem('email', this.blocks.form.email.value);
  }

  set(parameters) {
    this.parameters = {
      income: parameters.income,
      monthPayment: parameters.monthPayment,
      rate: parameters.rate,
      summer: parameters.summer,
      paymentThreshold: parameters.paymentThreshold,
      term: parameters.term,
      summerString: parameters.summerString,
    };
    this.parameters.startPayment = parameters.startPayment ? parameters.startPayment : false;
  }

  getHtmlResult() {
    this.blocks.main.summerValue.innerHTML = getStringOfNumb(this.parameters.summer) + Prefix.CURRENCY;
    this.blocks.main.rateValue.innerHTML = getStringOfNumb(this.parameters.rate) + Prefix.PERCENT;
    this.blocks.main.paymentValue.innerHTML = getStringOfNumb(this.parameters.monthPayment) + Prefix.CURRENCY;
    this.blocks.main.incomeValue.innerHTML = getStringOfNumb(this.parameters.income) + Prefix.CURRENCY;
  }

  getNumberCase() {
    var stringOfNum = NUMBER_CASE.toString();
    do {
      stringOfNum = '0' + stringOfNum;
    } while (stringOfNum.length < LENGHT_NUMBER_CASE);
    return '№ ' + stringOfNum;
  }

  getValueForm() {
    this.blocks.form.summerValue.setAttribute('value', this.parameters.summerString);
    this.blocks.form.paymentValue.setAttribute('value', this.parameters.startPayment);
    this.blocks.form.termValue.setAttribute('value', this.parameters.term);
    this.blocks.form.number.setAttribute('value', this.getNumberCase());
    this.blocks.form.summerValue.value = this.parameters.summerString;

    this.blocks.form.termValue.value = this.parameters.term;
    this.blocks.form.number.value = this.getNumberCase();

    if (!this.parameters.startPayment) {
      this.parentStartPayment.classList.add(Class.DISPLAY_NONE);
      if (!this.removedStartPayment) {
        this.removedStartPayment = this.slotStartPayment.removeChild(this.blocks.form.paymentValue);
      }
    } else {
      if (this.removedStartPayment) {
        this.parentStartPayment.classList.remove(Class.DISPLAY_NONE);
        this.slotStartPayment.insertAdjacentElement('beforeend', this.removedStartPayment);
        this.removedStartPayment = false;
      }
      this.blocks.form.paymentValue.value = this.parameters.startPayment;
    }
  }

  renderResult(parameters) {
    this.set(parameters);
    if (this.parameters.summer > this.parameters.paymentThreshold) {
      if (!this.removedFlag) {
        this.removedFlag = true;
        this.removedBlock = this.result.removeChild(this.blocks.info.container);
        this.getHtmlResult();
      } else {
        if (this.removedBlock === this.blocks.main.container) {
          this.result.insertAdjacentElement('beforeend', this.removedBlock);
          this.removedBlock = this.result.removeChild(this.blocks.info.container);
          this.removedFlag = true;
          this.getHtmlResult();
        } else {
          this.getHtmlResult();
        }
      }
    } else {
      if (!this.removedFlag) {
        this.removedFlag = !this.removedFlag;
        this.removedBlock = this.result.removeChild(this.blocks.main.container);
      } else {
        if (this.removedBlock === this.blocks.info.container) {
          this.result.insertAdjacentElement('beforeend', this.removedBlock);
          this.removedBlock = this.result.removeChild(this.blocks.main.container);
          this.removedFlag = true;
        }
      }
    }
  }

  setText(parameters) {
    this.textParemeters = {
      nameInfo: parameters.nameInfo,
      nameResult: parameters.nameResult,
      formTarget: parameters.formTarget,
      formSummerName: parameters.formSummerName,
      tresholdInfo: parameters.tresholdInfo,
    };
    if (this.textParemeters.nameInfo && this.textParemeters.tresholdInfo) {
      this.blocks.info.name.innerHTML = this.textParemeters.nameInfo;
      this.blocks.info.treshold.innerHTML = this.textParemeters.tresholdInfo;
    }
    this.blocks.info.name.innerHTML = this.textParemeters.nameInfo;
    this.blocks.info.treshold.innerHTML = this.textParemeters.tresholdInfo;
    this.blocks.main.summerName.innerHTML = this.textParemeters.nameResult;
    this.blocks.form.target.value = this.textParemeters.formTarget;
    this.blocks.form.target.setAttribute('value', this.textParemeters.formTarget);
    this.blocks.form.summerName.innerHTML = this.textParemeters.formSummerName;
  }

  init() {
    this.isStorageSupport = true;
    try {
      localStorage.setItem('nameAndFamily', '');
      localStorage.setItem('phone', '');
      localStorage.setItem('email', '');
    } catch (err) {
      this.isStorageSupport = false;
    }

    this.Phone = new Inputmask('+7 (999) 999-9999');
    this.Phone.mask(Selector.FORM_PHONE);
    this.blocks.main.btn.addEventListener('click', this.onClickBtnResult);
  }
}

export {ResultCredit};
