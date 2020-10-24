import Swiper from 'swiper';

var promo = function () {
  var promoSlider = document.querySelector('.js-promo');
  if (!promoSlider) {
    return false;
  }
  var promoSwiper = new Swiper('.promo__swiper-container', {
    loop: true,
    centeredSlides: true,
    mousewheel: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.promo__swiper-pagination',
      clickable: true,
      bulletClass: 'promo__bullet',
      bulletActiveClass: 'promo__bullet--active',
    },
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
  });

  return promoSwiper;
};

export default promo;
