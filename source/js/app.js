import promo from './components/promo.js';
import services from './components/services.js';
import select from './components/select.js';
import popupLogin from './components/popup-login.js';

document.addEventListener("DOMContentLoaded", function () {
  select();
  popupLogin();
});

window.onload = function () {
  promo();
  services();
};
