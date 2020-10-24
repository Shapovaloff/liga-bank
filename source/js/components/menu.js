var mobMenu = function () {
  var Selector = {
    HEADER_TOGGLE: '.js-header-toggle',
    HEADER: '.pageHeader',
    MAIN_NAV: '.mainNav--dropdown'
  };

  var Class = {
    HEADER_OPEN: 'pageHeader--open',
    NO_SCROLL: 'page--no-scroll-mobile',
  };

  var headerToggle = document.querySelector(Selector.HEADER_TOGGLE);
  var mainNav = document.querySelector(Selector.MAIN_NAV);

  if (!headerToggle) {
    return;
  }

  var header = document.querySelector(Selector.HEADER);

  var getToggleVisibleMenu = function () {
    header.classList.toggle(Class.HEADER_OPEN);
    window.body.classList.toggle(Class.NO_SCROLL);
  };

  var onClickMainNav = function () {
    getToggleVisibleMenu();
    mainNav.removeEventListener('click', onClickMainNav);
  };

  var onClickToggle = function (evt) {
    evt.preventDefault();
    getToggleVisibleMenu();
    mainNav.addEventListener('click', onClickMainNav);
  };

  headerToggle.addEventListener('click', onClickToggle);
};

export default mobMenu;
