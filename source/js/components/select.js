// import 'element-closest';
import $ from 'jquery';
import 'select2';
// import 'select2/dist/js/select2.full';

var select = function () {
  var selectInput = document.querySelector('.js-select');
  var selectSlot = selectInput.closest('.element__slot');
  if (!selectInput) {
    return false;
  }

  // $.fn.select2.defaults.set("full");
  // $.fn.select2.defaults.set("selectionCssClass", "select__container");

  $(selectInput).select2({
    minimumResultsForSearch: Infinity,
    width: 'off',
    theme : "bank",
    dropdownParent: $(selectSlot),
  });


  return selectInput;
};

export default select;
