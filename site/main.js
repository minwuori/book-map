

window.bookWorld = window.bookWorld || {};

bookWorld.map = { // непосредственно карта
  id: 'book-map',
  $: null,
  center: [ 41.9102411, 12.3955708 ],
  zoom: 5,// начальное увеличение
  type: "TERRAIN", // тип: физическая, политическая, гибрид
  manager: null,
  initCallbacks: [],
  inited: false,
  init: function() { // создать карту
    var options = {
      zoom: bookWorld.map.zoom, 
      center: bookWorld.map.center, 
      controls: []
    };

    bookWorld.map.$ = new ymaps.Map(document.getElementById(bookWorld.map.id), options);
    bookWorld.map.manager = new ymaps.ObjectManager();
    bookWorld.map.$.geoObjects.add(bookWorld.map.manager);

    

    bookWorld.map.initCallbacks.forEach(function(callback) {
      callback();
    });

    bookWorld.map.inited = true;
  },
  call: function(foo) {
    if (bookWorld.map.inited) foo();
    else bookWorld.map.initCallbacks.push(foo);
  },
  collections: {
    list: {},
    create: function(collectionName) { // создать коллекцию маркеров
      // получить данные коллекции и список подколлекций (писатели, кулинария)
      var collectionData = bookWorld.collections.list[collectionName];
      var color = collectionData.color || "#ff0000";
      var marks = collectionData.marks;
      if (!marks) return;

      var creating = function() {
        // создать коллекцию на карте
        // добавить в нее метки
        var marksCollection = new ymaps.GeoObjectCollection({}, {
          iconColor: color,
        });

        var markers = [];

        marks.forEach(function(mark) {
          var marker = bookWorld.map.collections.createMarker(mark, color);

          // создать маркер коллекции
          marksCollection.add(marker);

          // сохранить маркер
          markers.push({
            $: marker,
            id: mark.id
          });
        });

        // скрыть коллекцию и добавить на карту
        marksCollection.options.set('visible', false);
        bookWorld.map.$.geoObjects.add(marksCollection);
        

        bookWorld.map.collections.list[collectionName] = {
          marksCollection: marksCollection,
          markers: markers,
          active: false
        };
      };

      bookWorld.map.call(creating);
    },

    createMarker: function(mark, color) { // создать маркер
      
      var marker = new ymaps.Placemark(mark.coords);
      marker.events.add('click', function() {

        console.log('подборка', mark.name)

      });

      if (mark.geometry) {
        var border = bookWorld.map.collections.createBorder(mark.geometry, color)
        
        bookWorld.map.$.geoObjects.add(border);

        marker.events
          .add('mouseenter', function() {
            border.options.set('visible', true)
          })
          .add('mouseleave', function() {
            border.options.set('visible', false)
          });
      }
      return marker;
    },

    createBorder: function(geometry, color) {
      geometry = geometry.map(function(point) {
        return [point[1], point[0]];
      });

      var border = new ymaps.GeoObject(
          {
            geometry: {
              type: 'Polygon',
              coordinates: [geometry]
            }
          },{
            visible: false,
            strokeColor: color,
            fillColor: color,
            opacity: 0.4
          }
      );
      return border;
    },

    activate: function(collectionName) { // показать коллекцию маркеров
      var activating = function() {
        bookWorld.map.collections.list[collectionName].marksCollection.options.set('visible', true);
      };
      bookWorld.map.call(activating);
    },

    deactivate: function(collectionName) { // скрыть коллекцию маркеров
      bookWorld.map.collections.list[collectionName].marksCollection.options.set('visible', false);
    },

  }
};

bookWorld.view = { // плашка с карточками
  $: null,
  books: [],
  selectors: {
    $: '.book-world__collection',
    bookAttr: 'data-book'
  },
  inited: false,
  init: function() {
    bookWorld.view.$ = document.querySelector(bookWorld.view.selectors.$);
    for (var i = 0; i < 3; i++) {
      var book = bookWorld.view.$.querySelector("[" + bookWorld.view.selectors.bookAttr + "='" + (i + 1) + "']");
      bookWorld.view.books[i] = new ProductCard({element: book});
    }
    bookWorld.view.inited = true;
  },

  show: function(subcollection) {
    if (!bookWorld.view.inited) bookWorld.view.init();
    bookWorld.view.update(subcollection);
    bookWorld.view.$.removeAttribute('data-hidden');
  },

  hide: function() {
    bookWorld.view.$.setAttribute('data-hidden', '');
  },

  update: function(data) {
    var items = data.items;
    bookWorld.view.books.forEach(function(book, index) {
      var bookData = items[index];
      if (!bookData) return;

      book.setData({
        id: bookData.id,
        link: bookData.link,
        img: bookData.img,
        title: bookData.title,
        author: bookData.author,
        price: {
          current: bookData.price,
          old: bookData.oldPrice
        },
        status: bookData.status
      });

    })
  }
};

bookWorld.filters = { // непосредственно фильтры
  selectors: {
    parent: ".book-world__filters",
    collections: ".filters",
    collectionAttr: "data-collection",
    subcollections: ".options",
    subcollectionAttr: "data-subcollection",
    search: ".options__search"
  },
  $: {
    parent: null,
    collections: null,
    subcollections: null,
    search: null
  },
  init: function() {
    bookWorld.filters.$.parent = document.querySelector(bookWorld.filters.selectors.parent);
    bookWorld.filters.$.collections = document.querySelector(bookWorld.filters.selectors.collections);
    bookWorld.filters.$.subcollections = document.querySelector(bookWorld.filters.selectors.subcollections);
    bookWorld.filters.$.search = document.querySelector(bookWorld.filters.selectors.search);

    bookWorld.filters.inited = true;
  },
  inited: false,

  list: {},
  subcollections: {},
  
  create: function(collectionName) { // записать фильтр коллекции в список
     if (!bookWorld.filters.inited) bookWorld.filters.init();

     var collectionSelector = "[" + bookWorld.filters.selectors.collectionAttr + "=" + collectionName + "]";
     bookWorld.filters.list[collectionName] = bookWorld.filters.$.parent.querySelector(collectionSelector);

     bookWorld.filters.subcollections[collectionName] = [];

     var subcollections = bookWorld.collections.list[collectionName].marks;

     if (!subcollections || !subcollections.length) return;

     subcollections.forEach(function(subcollection) {
      var id = subcollection.id;
      var place = subcollection.place;
      var coords = subcollection.coords;
      var $ =  document.createElement('div');
      $.setAttribute(bookWorld.filters.selectors.subcollectionAttr, id);
      $.setAttribute(bookWorld.filters.selectors.collectionAttr, collectionName);
      $.innerHTML = place;
      $.onclick = function() {
        bookWorld.collections.showSubcollection(collectionName, id);
      }

      bookWorld.filters.subcollections[collectionName].push({
        id: subcollection.id,
        $: $
      });
     });
  },

  activate: function(collectionName) { // выделить фильтр, показать подколлекции 
    var collection = bookWorld.filters.list[collectionName];
    collection.style.color = "#26A9E0";
    $('.filters__checkbox', collection).removeClass('filters__not-checkbox');
    $('.filters__checkbox', collection).addClass('filters__yes-checkbox');

    var subcollections = bookWorld.filters.subcollections[collectionName];
	
	subcollections.forEach(function(subcollection) {
      bookWorld.filters.$.subcollections.appendChild(subcollection.$);
    })
  },
  deactivate: function(collectionName) { // убрать выделение, убрать подколлекции
    var collection = bookWorld.filters.list[collectionName];
    collection.style.color = "black";
    $('.filters__checkbox', collection).removeClass('filters__yes-checkbox');
    $('.filters__checkbox', collection).addClass('filters__not-checkbox');

    var subcollections = bookWorld.filters.subcollections[collectionName];

    subcollections.forEach(function(subcollection) {
      bookWorld.filters.$.subcollections.removeChild(subcollection.$);
    })
  },
  search: function(val) { // пользовательский поиск среди подколлекций

  }

};

bookWorld.collections = { // общий контроллер коллекций
  list: {},
  isActive: {},

  subcollections: {},

  setData: function(collectionsData) { // создать и отобразить все коллекции
    if (!collectionsData) {
      return;
    }

    for (var collectionName in collectionsData) {
      bookWorld.collections.create(collectionName, collectionsData[collectionName]);
    }

  },

  create: function(collectionName, collectionData) { // создать коллекцию
    // записать в список контроллера
    bookWorld.collections.list[collectionName] = collectionData;
    bookWorld.collections.isActive[collectionName] = false;

    bookWorld.collections.subcollections[collectionName] = {};

    collectionData.marks.map(function(mark) {
      bookWorld.collections.subcollections[collectionName][mark.id] = mark;
    });
    
    // создать фильтр
    bookWorld.filters.create(collectionName);

    // создать коллекцию маркеров на карте
    bookWorld.map.collections.create(collectionName);
  },

  toggle: function(collectionName) {
    if (!bookWorld.collections.list[collectionName]) return;

    if (bookWorld.collections.isActive[collectionName]) {
      bookWorld.collections.deactivate(collectionName);
    } else {
      bookWorld.collections.activate(collectionName);
    }

    bookWorld.collections.isActive[collectionName] = !bookWorld.collections.isActive[collectionName];
  },

  activate: function(collectionName) { // активировать коллекцию
    if (!bookWorld.collections.list[collectionName]) {
      
      return;
    }
    
    bookWorld.filters.activate(collectionName);
    bookWorld.map.collections.activate(collectionName);
  },

  deactivate: function(collectionName) { // деактивировать коллекцию
    if (!bookWorld.collections.list[collectionName]) return;
    
    bookWorld.filters.deactivate(collectionName);
    bookWorld.map.collections.deactivate(collectionName);
  },

  showSubcollection: function(collectionName, subcollectionId) { // показать подколлекцию
    var subcollection = bookWorld.collections.subcollections[collectionName][subcollectionId];
    
    bookWorld.view.show(subcollection);
  },
 
  setActive: function(collectionName) {
    var collection = bookWorld.collections.list[collectionName];
  },
  
};





ymaps.ready(bookWorld.map.init);







$('.collection__close').click( function(){
    $('.book-world__collection').hide();
});

