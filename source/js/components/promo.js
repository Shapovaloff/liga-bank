import Swiper from 'swiper';

var promo = function () {
  var Selector = {
    PROMO_SLIDER: '.js-promo',
    SWIPER_CONTAINER: '.promo__swiper-container',
    SWIPER_PAGINATION: '.promo__swiper-pagination',
  };

  var Class = {
    BULLET: 'bullet',
    BULLET_ACTIVE: 'bullet--active',
  };

  var promoSlider = document.querySelector(Selector.PROMO_SLIDER);

  if (!promoSlider) {
    return false;
  }

  var swiperContainer = document.querySelectorAll(Selector.SWIPER_CONTAINER);
  var swiperPagination = document.querySelectorAll(Selector.SWIPER_PAGINATION);

  var promoSwiper = new Swiper(swiperContainer, {
    loop: true,
    centeredSlides: true,
    mousewheel: true,
    simulateTouch: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: swiperPagination,
      clickable: true,
      bulletClass: Class.BULLET,
      bulletActiveClass: Class.BULLET_ACTIVE,
    },
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
  });

  return promoSwiper;
};

export default promo;
