import 'element-closest-polyfill';
import 'core-js/features/dom-collections/for-each';
import 'core-js/features/promise';
import utils from './components/utils.js';
import promo from './components/promo.js';
import select from './components/select.js';
import services from './components/services.js';
import popupLogin from './components/popup-login.js';
import contacts from './components/contacts.js';
import mobMenu from './components/menu.js';
import scroll from './components/scroll.js';

window.onload = function () {
  utils();
  select();
  popupLogin();
  promo();
  services();
  contacts();
  mobMenu();
  scroll();
};
