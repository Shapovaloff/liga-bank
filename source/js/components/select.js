import $ from 'jquery';
import 'select2';

var select = function () {
  var selectInput = document.querySelector('.js-select');
  var selectSlot = selectInput.closest('.element__slot');
  if (!selectInput) {
    return false;
  }

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme: 'bank',
    dropdownParent: $(selectSlot),
  });

  return selectInput;
};

export default select;
