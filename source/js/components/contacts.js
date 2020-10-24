import ymaps from 'ymaps';

var contacts = function () {
  var MEDIA_QUERY = '(max-width: 767px)';
  var ICON_LOCATION = 'img/map/location.svg';
  var ICON_DESKTOP_SIZE = [35, 40];
  var ICON_DESKTOP_OFFSET = [-17.5, -40];
  var ICON_MOBILE_SIZE = [29, 33];
  var ICON_MOBILE_OFFSET = [-14.5, -33];

  var Selector = {
    CONTACTS: '.js-contacts',
    MAP: '.contacts__map',
    INPUT: '.option__input',
  };

  var countryMap = {
    russia: [
      {
        id: 'moskow',
        coordinates: [55.774870, 37.621991],
      },
      {
        id: 'petersburg',
        coordinates: [59.939095, 30.315868],
      },
      {
        id: 'saratov',
        coordinates: [51.533103, 46.034158],
      },
      {
        id: 'kirovsk',
        coordinates: [67.612056, 33.668228],
      },
      {
        id: 'tyumen',
        coordinates: [57.153033, 65.534328],
      },
      {
        id: 'omsk',
        coordinates: [54.989342, 73.368212],
      },

    ],
    cis: [
      {
        id: 'baku',
        coordinates: [40.369539, 49.835011],
      },
      {
        id: 'tashkent',
        coordinates: [41.311151, 69.279737],
      },
      {
        id: 'minsk',
        coordinates: [53.902512, 27.561481],
      },
      {
        id: 'alma-Ata',
        coordinates: [43.238293, 76.945465],
      },
    ],
    europe: [
      {
        id: 'paris',
        coordinates: [48.856663, 2.351556],
      },
      {
        id: 'prague',
        coordinates: [50.080293, 14.428983],
      },
      {
        id: 'london',
        coordinates: [51.507351, -0.127660],
      },
      {
        id: 'rome',
        coordinates: [41.902689, 12.496176],
      },
    ],
  };

  var blocContacts = document.querySelector(Selector.CONTACTS);

  if (!blocContacts) {
    return;
  }

  var map = blocContacts.querySelector(Selector.MAP);
  var inputs = blocContacts.querySelectorAll(Selector.INPUT);
  var mediaQueryList = window.matchMedia(MEDIA_QUERY);

  var getObjectManager = function (mapPointList) {
    var objectManager = {
      type: 'FeatureCollection',
      features: [],
    };

    mapPointList.forEach(function (mapPointItem) {
      var city = {
        type: 'Feature',
        id: mapPointItem.id,
        geometry: {
          type: 'Point',
          coordinates: mapPointItem.coordinates,
        },
      };
      objectManager.features.push(city);
    });

    return objectManager;
  };

  ymaps
      .load('https://api-maps.yandex.ru/2.1/?apikey=cad0cd31-c5d4-49f9-899d-17e864dc86e4&lang=ru_RU')
      .then(function (maps) {
        var setIconPoint = function () {
          if (window.matchMedia(MEDIA_QUERY).matches) {
            objectManager.objects.options.set('iconImageSize', ICON_MOBILE_SIZE);
            objectManager.objects.options.set('iconImageOffset', ICON_MOBILE_OFFSET);
          } else {
            objectManager.objects.options.set('iconImageSize', ICON_DESKTOP_SIZE);
            objectManager.objects.options.set('iconImageOffset', ICON_DESKTOP_OFFSET);
          }
        };

        var myMap = new maps.Map(map, {
          center: [55.76, 37.64],
          zoom: 4,
        });

        var objectManager = new maps.ObjectManager();
        objectManager.objects.options.set('iconLayout', 'default#image');
        objectManager.objects.options.set('iconImageHref', ICON_LOCATION);
        setIconPoint();
        myMap.geoObjects.add(objectManager);

        var addEventLisstener = function (element) {
          element.addEventListener('change', onChangeInput);
        };

        var onChangeInput = function (evt) {
          var currentInput = evt.target;
          var currentCoutry = currentInput.value;

          if (currentInput.checked) {
            objectManager.add(getObjectManager(countryMap[currentCoutry]));
          } else {
            objectManager.remove(getObjectManager(countryMap[currentCoutry]));
          }
        };

        inputs.forEach(function (input) {
          addEventLisstener(input);
          if (input.checked) {
            objectManager.add(getObjectManager(countryMap[input.value]));
          }
        });


        var onWindowResize = function () {
          setIconPoint();
        };

        mediaQueryList.addListener(onWindowResize);
      });
};

export default contacts;
