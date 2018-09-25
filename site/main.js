

window.bookWorld = window.bookWorld || {};

bookWorld.map = { // непосредственно карта
  id: 'book-map',
  subfilters: null,
  center: [ 4.8928,4.3565],
  zoom: 3, // начальное увеличение  
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

    bookWorld.map.subfilters = new ymaps.Map(document.getElementById(bookWorld.map.id), options, {minZoom: 2});
    bookWorld.map.manager = new ymaps.ObjectManager();
    bookWorld.map.subfilters.geoObjects.add(bookWorld.map.manager);

   

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
            subfilters: marker,
            id: mark.id
          });
        });

        // скрыть коллекцию и добавить на карту
        marksCollection.options.set('visible', false);
        bookWorld.map.subfilters.geoObjects.add(marksCollection);
       

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

        if (!bookWorld.view.inited) bookWorld.view.init();
        bookWorld.view.update(mark);
        bookWorld.view.subfilters.removeAttribute('data-hidden');

        var colName = document.getElementsByClassName('collection__name')[0];
        colName.innerHTML = mark.name;

        var subfilters, i;

        for (i = 0; subfilters = document.getElementsByClassName('subfilters')[i]; i++) {
          
          var dataID = subfilters.getAttribute('data-subcollection');

          if (mark.id == dataID) {
            subfilters.classList.add("subfilters_blue");
          } else {
            subfilters.classList.remove("subfilters_blue");
          };
        };

        // var massiv = [];
        // subfilters = document.getElementsByClassName('subfilters');
        
        //     for (i = 0; i < subfilters.length; i++) {
        //       massiv[i] = subfilters[i].innerHTML;
              
        //     };
        //     console.log(massiv);
     
      });

      if (mark.geometry) {
        var border = bookWorld.map.collections.createBorder(mark.geometry, color);
        bookWorld.map.subfilters.geoObjects.add(border);

        // marker.events
        //   .add('mouseenter', function() {
        //     border.options.set('visible', true)
        //   })
        //   .add('mouseleave', function() {
        //     border.options.set('visible', false)
        //   });
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
 subfilters: null,
  books: [],
  selectors: {
    subfilters: '.book-world__collection',
    bookAttr: 'data-book',
    buttonAttr: 'data-status'

  },
  inited: false,
  init: function() {
   
    bookWorld.view.subfilters = document.querySelector(bookWorld.view.selectors.subfilters);
    for (var i = 0; i < 3; i++) {
      var book = bookWorld.view.subfilters.querySelector("[" + bookWorld.view.selectors.bookAttr + "='" + (i + 1) + "']");
      bookWorld.view.books[i] = new ProductCard({element: book});
    }
    bookWorld.view.inited = true;

  },

  show: function(subcollection) {
    if (!bookWorld.view.inited) bookWorld.view.init();
    bookWorld.view.update(subcollection);
    bookWorld.view.subfilters.removeAttribute('data-hidden');

    var book = document.getElementsByClassName('product-card');
    
    for (var i = 0; i < book.length; i++) { 
      var button = book[i].querySelector("[" + bookWorld.view.selectors.buttonAttr + "]");
      var buttAttr = button.getAttribute('data-status');
      
      button.onclick = function() {
      
        if (buttAttr == 'buy') {
          this.style.backgroundColor = "#8BC53F";
          this.innerHTML = 'В корзине';
          this.setAttribute('data-status', 'in-basket');
        };
      };
    };
    
  },

  hide: function() {
    bookWorld.view.subfilters.setAttribute('data-hidden', '');
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
    search: "#input-search"
  },
  subfilters: {
    parent: null,
    collections: null,
    subcollections: null,
    search: null
  },
  init: function() {
    bookWorld.filters.subfilters.parent = document.querySelector(bookWorld.filters.selectors.parent);
    bookWorld.filters.subfilters.collections = document.querySelector(bookWorld.filters.selectors.collections);
    bookWorld.filters.subfilters.subcollections = document.querySelector(bookWorld.filters.selectors.subcollections);
    bookWorld.filters.subfilters.search = document.querySelector(bookWorld.filters.selectors.search);
 
    bookWorld.filters.subfilters.search.oninput = function() {
      bookWorld.filters.search();
    };

    bookWorld.filters.inited = true;
  },
  inited: false,

  list: {},
  subcollections: {},
 
  create: function(collectionName) { // записать фильтр коллекции в список
     if (!bookWorld.filters.inited) bookWorld.filters.init();

     var collectionSelector = "[" + bookWorld.filters.selectors.collectionAttr + "=" + collectionName + "]";
     bookWorld.filters.list[collectionName] = bookWorld.filters.subfilters.parent.querySelector(collectionSelector);

     bookWorld.filters.subcollections[collectionName] = [];

     var subcollections = bookWorld.collections.list[collectionName].marks;

     if (!subcollections || !subcollections.length) return;

     subcollections.forEach(function(subcollection) {
      var id = subcollection.id;
      var place = subcollection.place;
      var coords = subcollection.coords;
      var subfilters =  document.createElement('div');
      subfilters.className = 'subfilters';
      subfilters.setAttribute(bookWorld.filters.selectors.subcollectionAttr, id);
      subfilters.setAttribute(bookWorld.filters.selectors.collectionAttr, collectionName);
      subfilters.innerHTML = place;
     

      subfilters.onclick = function() {
       
        var elements = document.getElementsByClassName('subfilters');
        for (var i = 0; i < elements.length; i++) {
	        elements[i].classList.remove("subfilters_blue");  
	      };

        this.classList.add("subfilters_blue");
        bookWorld.collections.showSubcollection(collectionName, id);

       	var colName = document.getElementsByClassName('collection__name')[0];
        colName.innerHTML = subcollection.name;
      };


      bookWorld.filters.subcollections[collectionName].push({
        id: subcollection.id,
        subfilters: subfilters
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
      bookWorld.filters.subfilters.subcollections.appendChild(subcollection.subfilters);

    })
  },
  deactivate: function(collectionName) { // убрать выделение, убрать подколлекции
    var collection = bookWorld.filters.list[collectionName];
    collection.style.color = "black";
    $('.filters__checkbox', collection).removeClass('filters__yes-checkbox');
    $('.filters__checkbox', collection).addClass('filters__not-checkbox');

    var subcollections = bookWorld.filters.subcollections[collectionName];

    subcollections.forEach(function(subcollection) {
      var elements = document.getElementsByClassName('subfilters');
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove("subfilters_blue");
        };
      bookWorld.filters.subfilters.subcollections.removeChild(subcollection.subfilters);
    });

    if (!bookWorld.view.subfilters) {
      return;
    }else{
      bookWorld.view.subfilters.setAttribute('data-hidden', '');
    };
  },

  search: function(val) { // пользовательский поиск среди подколлекций
    var subfilters = document.getElementsByClassName('subfilters');

      for (var i = 0; i < subfilters.length; i++) {

        if (subfilters[i].childNodes.length == 1 && subfilters[i].innerHTML.toLowerCase().indexOf(bookWorld.filters.subfilters.search.value.toLowerCase()) == -1 && bookWorld.filters.subfilters.search.value != '') {
          subfilters[i].style.display = 'none';
        } else if (subfilters[i].style.display != 'block') {
          subfilters[i].style.display = 'block';
        };
      };    
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

$(document).keyup(function(esc) {
    if (esc.keyCode == 27) {
    	bookWorld.view.subfilters.setAttribute('data-hidden', '');
    	$('.subfilters').removeClass('subfilters_blue');
    }
});

$('.collection__close').click(function(){
	bookWorld.view.subfilters.setAttribute('data-hidden', '');
    $('.subfilters').removeClass('subfilters_blue');
});


ymaps.ready(bookWorld.map.init);