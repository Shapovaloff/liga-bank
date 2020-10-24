var utils = function () {
  var Selector = {
    BODY: '.page',
    CREDIT: '.js-credit'
  };

  window.body = document.querySelector(Selector.BODY);
  window.credit = document.querySelector(Selector.CREDIT);
};

export default utils;
