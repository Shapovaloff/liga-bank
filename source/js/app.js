import 'element-closest-polyfill';
import 'core-js/features/dom-collections/for-each';
import promo from './components/promo.js';
import select from './components/select.js';
import services from './components/services.js';
import popupLogin from './components/popup-login.js';

document.addEventListener("DOMContentLoaded", function () {
  select();
  popupLogin();
});

window.onload = function () {
  promo();
  services();
};
