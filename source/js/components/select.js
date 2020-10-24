import $ from 'jquery';
import 'select2';

var select = function () {
  var selectInput = document.querySelector('.js-select');
  if (!selectInput) {
    return false;
  }

  $(selectInput).select2();

  return selectInput;
};

export default select;
