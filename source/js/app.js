import 'element-closest-polyfill';
import 'core-js/features/dom-collections/for-each';
import promo from './components/promo.js';
import select from './components/select.js';
import services from './components/services.js';
import popupLogin from './components/popup-login.js';
import contacts from './components/contacts.js';
import mobMenu from './components/menu.js';
import utils from './components/utils.js';

document.addEventListener('DOMContentLoaded', function () {
  utils();
  select();
  popupLogin();
});

window.onload = function () {
  promo();
  services();
  contacts();
  mobMenu();
};
