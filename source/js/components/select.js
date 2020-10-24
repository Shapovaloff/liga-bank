import $ from 'jquery';
import 'select2';
import {CreditMortgage} from './credit-mortgage';
import {CreditCar} from './credit-car';
import {CreditConsumer} from './credit-consumer';
import {ResultCredit} from './result-credit';

var select = function () {
  var Selector = {
    CREDIT_RESULT: '.js-credit-result',
    CREDIT_FORM: '.credit__box--form',
    CREDIT_SUMMER: '.js-credit-summer',
    CREDIT_INFO: '.js-credit-info',
    SELECT_INPUT: '.js-select',
    ELEMENT_SLOT: '.element__slot',
    CONTAINER_CREDIT_SUMMER: '.js-credit-container',
    MAIN_CALC_CONTAINER: '.js-main-calc-container',
  };

  var Class = {
    MORTGAGE_SHOW: 'credit--mortgage',
    CAR_SHOW: 'credit--car',
    CONSUMER_SHOW: 'credit--consumer',
    FORM_SHOW: 'credit--formShow',
  };

  var NameCredit = {
    MORTGAGE: 'mortgage',
    CAR: 'car',
    CONSUMER: 'consumer',
  };

  var selectInput = document.querySelector(Selector.SELECT_INPUT);

  if (!window.credit) {
    return false;
  }

  var selectSlot = selectInput.closest(Selector.ELEMENT_SLOT);
  var Mortgage = new CreditMortgage();
  var Car = new CreditCar();
  var Consumer = new CreditConsumer();
  var Result = new ResultCredit();
  var initCreditName = false;

  var startCredit = function (name, calcParameters, result) {
    switch (name) {
      case NameCredit.MORTGAGE:
        Mortgage.setMainParameters(calcParameters, result);
        Mortgage.init();
        break;
      case NameCredit.CAR:
        Car.setMainParameters(calcParameters, result);
        Car.init();
        break;
      case NameCredit.CONSUMER:
        Consumer.setMainParameters(calcParameters, result);
        Consumer.init();
        break;
    }
  };

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme: 'bank',
    dropdownParent: $(selectSlot),
    placeholder: selectInput.getAttribute('name'),
  });

  $(selectInput).on('select2:select', function () {
    Result.getDestroyForm();
    Result.init();

    var target = selectInput.value;
    var checkedOption = document.querySelector('option[value=' + target + ']');
    var calcParameters = checkedOption.dataset;

    window.credit.classList.remove(Class.CAR_SHOW);
    window.credit.classList.remove(Class.MORTGAGE_SHOW);
    window.credit.classList.remove(Class.CONSUMER_SHOW);
    window.credit.classList.remove(window.Class.FORM_SHOW);
    window.credit.classList.add('credit--' + target);

    if (!initCreditName) {
      initCreditName = target;
      startCredit(target, calcParameters, Result);
    } else {
      switch (initCreditName) {
        case NameCredit.MORTGAGE:
          Mortgage.destroy();
          break;
        case NameCredit.CAR:
          Car.destroy();
          break;
        case NameCredit.CONSUMER:
          Consumer.destroy();
          break;
      }

      initCreditName = target;
      startCredit(initCreditName, calcParameters, Result);
    }
  });

  return selectInput;
};

export default select;
