import $ from 'jquery';
import 'select2';

var select = function () {
  var Selector = {
    SELECT_INPUT: '.js-select',
    ELEMENT_SLOT: '.element__slot',
    NAME_CALC: '.js-name-calc',
    OPTION: '.js-option .option__label',
    NAME_RESULT: '.js-name-result',
    NAME_FORM: '.js-name-form',
    TARGET_FORM: '.js-target-form',
    NAME_INFO: '.js-name-info',
  };

  var Class = {
    CREDIT_OPEN: 'credit--open',
  };

  var selectInput = document.querySelector(Selector.SELECT_INPUT);

  if (!window.credit) {
    return false;
  }

  var nameCalc = window.credit.querySelector(Selector.NAME_CALC);
  var option = window.credit.querySelector(Selector.OPTION);
  var nameResult = window.credit.querySelector(Selector.NAME_RESULT);
  var nameForm = window.credit.querySelector(Selector.NAME_FORM);
  var targetForm = window.credit.querySelector(Selector.TARGET_FORM);
  var nameInfo = window.credit.querySelector(Selector.NAME_INFO);

  var selectSlot = selectInput.closest(Selector.ELEMENT_SLOT);

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme: 'bank',
    dropdownParent: $(selectSlot),
    placeholder: selectInput.getAttribute('name'),
  });

  $(selectInput).on('select2:select', function () {
    var checkedOption = document.querySelector('option[value=' + selectInput.value + ']');

    var calcParameters = {
      nameCalc: checkedOption.dataset.nameCalc,
      nameOption: checkedOption.dataset.nameOption,
      nameResult: checkedOption.dataset.nameResult,
      nameForm: checkedOption.dataset.nameForm,
      targetForm: checkedOption.dataset.targetForm,
      nameInfo: checkedOption.dataset.nameInfo,
    };

    window.credit.classList.add(Class.CREDIT_OPEN);
    window.credit.dataset.target = selectInput.value;

    nameCalc.innerHTML = calcParameters.nameCalc;
    option.innerHTML = calcParameters.nameOption;
    nameResult.innerHTML = calcParameters.nameResult;
    nameInfo.innerHTML = calcParameters.nameInfo;
    targetForm.innerHTML = calcParameters.targetForm;
    nameForm.value = calcParameters.nameForm;
  });

  return selectInput;
};

export default select;
