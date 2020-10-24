import Swiper from 'swiper';

var promo = function () {
  var promoSlider = document.querySelector('.js-promo');
  if (!promoSlider) {
    return false;
  }
  var promoSwiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
    },
  });

  return promoSwiper;
};

export default promo;
