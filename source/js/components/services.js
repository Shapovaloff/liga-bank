import Swiper from 'swiper';

var services = function () {
  var MEDIA_QUERY = '(max-width: 1199px)';

  var Selector = {
    SWIPER_THUMBS: '.services__swiper-thumbs',
    SWIPER_MAIN: '.services__main-swiper-container',
    SWIPER_PAGINATION: '.services__swiper-pagination',
  };

  var Class = {
    BULLET: 'bullet',
    BULLET_ACTIVE: 'bullet--activeGray',
  };

  var swiperThumbs = document.querySelector(Selector.SWIPER_THUMBS);
  var swiperMain = document.querySelectorAll(Selector.SWIPER_MAIN);
  var swiperPagination = document.querySelectorAll(Selector.SWIPER_PAGINATION);

  var mediaQueryList = window.matchMedia(MEDIA_QUERY);

  var sliderSwiperMain = false;
  var sliderSwiperThumbs = false;
  var sliderSwiperMainDesktop = false;

  var getDestroySlider = function (slider) {
    slider.destroy();
  };

  var getSliderSwiperMain = function () {
    sliderSwiperMain = new Swiper(swiperMain, {
      pagination: {
        el: swiperPagination,
        clickable: false,
        bulletClass: Class.BULLET,
        bulletActiveClass: Class.BULLET_ACTIVE,
      },
      a11y: {
        paginationBulletMessage: 'Перейти к слайду {{index}}',
      },
    });
  };

  var getSliderSwiperThumbs = function () {
    sliderSwiperThumbs = new Swiper(swiperThumbs, {
      slidesPerView: 'auto',
      resistance: true,
      resistanceRatio: 0,
      freeModeMomentumBounce: false,
    });
  };

  var getSliderSwiperMainDesktop = function () {
    sliderSwiperMainDesktop = new Swiper(swiperMain, {
      simulateTouch: false,
      thumbs: {
        swiper: sliderSwiperThumbs
      },
      effect: 'fade',
    });
  };

  var getInitSlider = function () {
    if (window.matchMedia(MEDIA_QUERY).matches) {
      if (sliderSwiperThumbs) {
        getDestroySlider(sliderSwiperThumbs);
      }
      if (sliderSwiperMainDesktop) {
        getDestroySlider(sliderSwiperMainDesktop);
      }
      getSliderSwiperMain();
    } else {
      if (sliderSwiperMain) {
        sliderSwiperMain.destroy();
      }
      getSliderSwiperThumbs();
      getSliderSwiperMainDesktop();
    }
  };

  getInitSlider();

  function handleOrientationChange() {
    getInitSlider();
  }

  mediaQueryList.addListener(handleOrientationChange);
};

export default services;
