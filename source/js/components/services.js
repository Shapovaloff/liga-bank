import Swiper from 'swiper';

var services = function () {
  var swiperThumbs = new Swiper('.services__swiper-thumbs', {
    slidesPerView: 'auto',
    resistance: true,
    resistanceRatio: 0,
    freeModeMomentumBounce: false,
  });

  var galleryTop = new Swiper('.services__main-swiper-container', {
    effect: 'fade',
    thumbs: {
      swiper: swiperThumbs
    }
  });

  return [swiperThumbs, galleryTop];
};

export default services;
