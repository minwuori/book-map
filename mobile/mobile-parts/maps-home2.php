<!DOCTYPE html>
<html class="no-js" lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="/ii/css/style.css">
    <link rel="stylesheet" type="text/css" href="css0/maps-home.css">
    
    <script src="https://api-maps.yandex.ru/2.1/?load=package.standard&lang=ru-RU" type="text/javascript"></script>
  </head>

<body> 
         
<main class="map-container_vertical">

  <div class="book-world__map">
    <div id="book-map" class="map_vertical"></div>
  </div>

  <div class="bg_vertical"></div>
  <div class="overlap">
    <div class="info">
      <div class="info__logo"><img src="/ii/img/maps/logo.svg"></div>
      <div class="info__title">Книжная карта мира</div>
      <div class="info__subtitle">У каждой страны свои сокровища. Выбирайте страну и отправляйтесь в книжное путешествие</div>
    </div> 
    <div class="overlap__countries-block_vertical">
    <div class="countries-block_vertical">
      <a href="#">
        <div class="countries-block__image_vertical">
          <img src="" alt="">
        </div>
        <div class="countries-block__title_vertical">Испания</div>
      </a>
    </div>

    <div class="countries-block_vertical">
      <a href="#">
        <div class="countries-block__image_vertical">
          <img src="" alt="">
        </div>
        <div class="countries-block__title_vertical">Германия</div>
      </a>
    </div>

    <div class="countries-block_vertical">
      <a href="#">
        <div class="countries-block__image_vertical">
          <img src="/ii/img/maps/moscow.svg" alt="" >
        </div>
        <div class="countries-block__title_vertical">Москва</div>
      </a>
    </div>

    <div class="countries-block_vertical">
      <a href="#">
        <div class="countries-block__image_vertical">
          <img src="" alt="">
        </div>
        <div class="countries-block__title_vertical">Франция</div>
      </a>
    </div>

    <div class="countries-block_vertical">
      <a href="#">
        <div class="countries-block__image_vertical">
          <img src="/ii/img/maps/mm.jpg" alt="">
        </div>
        <div class="countries-block__title_vertical">Рим</div>
      </a>
    </div>
  </div>
     
  </div>
  <a href="#" class="button-map_vertical">Изучить карту</a> 
</main>
                 


<script src="/ii/lib/jquery.min.js?v=1536313226"></script>
<script type="text/javascript">

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
        center: [44.5727, 56.6021],
        controls: [],
        zoom: 2.5
    });

   for (var i=0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            baloonContent: placemarks[i].baloonContent
        },

        {
            iconLayout: 'default#image',
            iconImageHref: '/ii/img/maps/marker.svg',
            iconImageSize: [14, 20],
            iconImageOffset: [-7, -20]
        });
        
    };

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: '/ii/img/maps/marker.svg',
                size: [14, 20],
                offset: [-7, -20]
            }
        ],
        // clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects)
}

</script>

</body>