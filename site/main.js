window.bookWorld = window.bookWorld || {};

ymaps.ready(init);

//массив с метками
var placemarks = [
    {
        latitude: 63.7629,
        longitude: 35.0427,
        hintContent: 'Хинт',
        baloonContent: 'Балун'
    },

    {
        latitude: 65.7829,
        longitude: 45.2427,
        hintContent: 'Хинт',
        baloonContent: 'Балун'
    },

    {
        latitude: 65.8829,
        longitude: 45.3427,
        hintContent: 'Хинт',
        baloonContent: 'Балун'
    },

    {
        latitude: 23.8629,
        longitude: 55.5427,
        hintContent: 'Хинт',
        baloonContent: 'Балун'
    }
];



geoObjects = [];

//сама карта
function init() {
    var map = new ymaps.Map('book-map', {
        center: [46.5259, 46.3514],
        controls: [],
        zoom: 5
    });

   for (var i=0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            baloonContent: placemarks[i].baloonContent
        },

        {
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.svg',
            iconImageSize: [28, 40],
            iconImageOffset: [-7, -20]
        });
        
    };

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/marker.svg',
                size: [28, 40],
                offset: [-7, -20]
            }
        ],
        // clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);


    placemarks.events.add('click', function () {
        var obj = document.getElementByClass(book-world__collection);
            //Если css-свойство display не block, то:
            if (obj.style.display != "block") {
                obj.style.display = "block"; //Показываем элемент
            }else{
                obj.style.display = "none";
            } //Скрываем элемент
    });
}



$('.collection__close').click( function(){
    $('.book-world__collection').hide();
});

$('.filters__checkbox').click( function(){
    $('.book-world__collection').fadeIn();
    $('.book-world__collection').hide();
});

