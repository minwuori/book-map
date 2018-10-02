<?php 
$page = 'maps';
$title = 'Книжная карта мира';
$description = 'Интернет-магазин «Читай-город» - один из ведущих в России книжных магазинов. Здесь вы можете купить книги всех направлений и стилей по выгодным ценам с бесплатной доставкой!';
?>
         
<main class="map-container">
  
  <div id="book-map" class="map"></div>

  <!-- главное меню -->
  <?php include 'parts/index/main-menu.php'; ?>
  <!-- /главное меню -->
  
  <div class="overlap">
    <div class="info">
      <div class="info__logo"><img src="src/assets/img/logo.png"></div>
      <div class="info__title">Книжная карта мира</div>
      <div class="info__subtitle">У каждой страны свои сокровища. <br />
      Выбирайте страну и отправляйтесь в путешествие</div>
    </div>
  </div>


  <!-- слайдеры - три книжки -->
  

  <?php 
    $title = 'Новинки';
    $list_name = 'main_Новинки';
    $slider_link = 'catalog.php';
    $books = $sliders[0];
    include 'parts/three-books.php'; 
  ?>

  
  <!-- слайдеры - три книжки -->


  <!-- сео-блок -->
  <?php include 'parts/index/seo.php'; ?>
  <!-- /сео-блок -->
  
</main>
                 
<?php include 'parts/footer.php'; ?>



<style type="text/css">
  .map-container{
    width: 320px;
    height: 743px;
    padding-left: 1.25rem; 
    padding-right: 1.25rem; 
    max-width: 1200px; 
    margin-left: auto; 
    margin-right: auto;
  }
  
  #book-map {
  display: flex;
  left: 0;
  right: 0;
  width: 320px;
  height: 743px;
  margin: 0 auto;   
}

#book-map.map {
  position: absolute;
  left: 0;
  right: 0;
  width: 320px;
  height: 743px;
  margin: 0 auto; 
}

.bg {
  position: absolute;
  left: 0;
  right: 0;
  width: 320px;
  height: 743px; 
  z-index: 1;
  margin: auto; 
  background: #000;
  opacity: 0.5;
}

.overlap {
  display: flex; 
  justify-content: center;
}

.info {
  width: 245px;
  height: 300px; 
  z-index: 1;
  margin: 25px auto 0;
}

.info__logo {
  text-align: center;
}

.info__title {
  font-size: 36px;
  font-family: PT Sans;
  font-weight: bold;
  line-height: 38px;
  text-align: center;
  color: #ffffff;
  margin-top: 67px;
}

.info__subtitle {
  font-size: 16px;
  font-family: PT Sans;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  margin-top: 4px;
}
</style>

<script type="text/javascript">
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
            iconImageHref: 'img/marker.png',
            iconImageSize: [14, 20],
            iconImageOffset: [-7, -20]
        });
        
    };

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/marker.png',
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