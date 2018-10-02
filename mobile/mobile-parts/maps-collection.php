<!DOCTYPE html>
<html class="no-js" lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="/ii/css/style.css">
    <link rel="stylesheet" type="text/css" href="css0/maps-collection.css">
    <link rel="stylesheet" type="text/css" href="/ii/lib/foundation/foundation.min.css">

    <script src="https://api-maps.yandex.ru/2.1/?load=package.standard&lang=ru-RU" type="text/javascript"></script>
	
  </head>
<body> 

<div class="book-world">
	<div class="book-world__map">
		<div id="book-map"></div>
	</div>
	<div class="bg"></div>
	<div class="book-world__filters">
		<div class="filters__logo"><img src="/ii/img/maps/logo_blue.svg"></div>

		<div class="filters"> 
			<div class="filters__text">Показать:</div>
			
			<div class="filters__checkbox">
				<input type="checkbox" class="filters__item" id="writers" />
				<label for="writers">Писатели</label>
			</div>
			<div class="filters__checkbox">
				<input type="checkbox" class="filters__item" id="guide" />
				<label for="guide">Путеводители</label>
			</div>
			<div class="filters__checkbox">
				<input type="checkbox" class="filters__item" id="languages" />
				<label for="languages">Языки</label>
			</div>
			<div class="filters__checkbox">
				<input type="checkbox" class="filters__item" id="cookery" />
				<label for="cookery">Кулинария</label>
			</div>
			<div class="filters__checkbox">
				<input type="checkbox" class="filters__item" id="art" />
				<label for="art">Искусство</label>
			</div>
			<div class="filters__checkbox">
				<input type="checkbox" class="filters__item" id="special" />
				<label for="special">Особенные вещи</label>
			</div>
			<div class="filters__line"></div>			
		</div>
		<div class="filters__search">
			<img class="filters__img" src="/ii/img/maps/search.svg"> <input type="search" />
		</div>
		<div class="options">Россия</div>

		<div class="filters__closed"><img src="/ii/img/maps/close.svg"></div>

	</div>

	
	
	<div class="book-world__collection" >
		
		<div class="collection">

			<div class="collection__header">
				<img class="collection__img" src="/ii/img/maps/marker.svg">
				<div class="collection__name"> Путеводители России</div>
				<div class="collection__close" data-close=".book-world__collection"><img src="/ii/img/maps/close.svg"></div>
			</div>

			<!-- <div class="collection__books"> -->

				<?php 
					$sliders = $sliders = array(
						array(
						  array(
							'id' => '123',
							'title' => 'Ну, ты и натворил! Блокнот для каракулей, марашек и почеркушек',
							'image' => '/ii/img/books/1.jpg',
							'price' => '266',
							'category' => 'Категория',
							'brand' => 'Издательство'
						  ),
						  array(
							'id' => '123',
							'title' => 'Три богатыря и Принцесса Египта',
							'image' => '/ii/img/books/2.jpg',
							'new_price' => '413',
							'old_price' => '19 000',
							'category' => 'Категория',
							'brand' => 'Издательство'
						  ),
						  array(
							'id' => '123',
							'title' => 'Новый закон о садоводнических и огороднических хозяйствах. Федеральный закон № 217-ФЗ "О ведении гражданами садоводства и огородничества для собственных нужд и о внесении изменений в отдельные законодательные акты Российской Федерации"',
							'image' => '/ii/img/books/3.jpg',
							'new_price' => '1 300',
							'old_price' => '1 900',
							'category' => 'Категория',
							'brand' => 'Издательство'
						  )
						  ));
				    $title = '#';
				    $list_name = 'main_Новинки';
				    $slider_link = 'catalog.php';
				    $books = $sliders[0];
				    include 'parts/three-books.php'; 
				  ?>

			
    	<!-- </div> -->



		</div>
	</div>

	<div class="book-world__menu-burger" >
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d)">
			<circle cx="24" cy="24" r="21" fill="white"/>
			<path d="M13.8498 28.8808C13.227 28.8808 12.722 29.3857 12.722 30.0086C12.722 30.6314 13.227 31.1364 13.8498 31.1364H34.1498C34.7727 31.1364 35.2776 30.6314 35.2776 30.0086C35.2776 29.3857 34.7727 28.8808 34.1498 28.8808H13.8498ZM13.8498 23.2419C13.227 23.2419 12.722 23.7468 12.722 24.3697C12.722 24.9925 13.227 25.4975 13.8498 25.4975H34.1498C34.7727 25.4975 35.2776 24.9925 35.2776 24.3697C35.2776 23.7468 34.7727 23.2419 34.1498 23.2419H13.8498ZM13.8498 17.603C13.227 17.603 12.722 18.108 12.722 18.7308C12.722 19.3537 13.227 19.8586 13.8498 19.8586H34.1498C34.7727 19.8586 35.2776 19.3537 35.2776 18.7308C35.2776 18.108 34.7727 17.603 34.1498 17.603H13.8498Z" fill="#E5E5E5"/>
			</g>
			<defs>
			<filter id="filter0_d" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
			<feOffset/>
			<feGaussianBlur stdDeviation="1.5"/>
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
			</filter>
			</defs>
		</svg>
	</div>
	
</div>


<script src="/ii/lib/jquery.min.js?v=1536313226"></script>
<!-- <script src="/ii/lib/foundation/foundation.min.js"></script> -->

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
        latitude: 48.7481,
        longitude: 29.1952,
        hintContent: 'Хинт',
        baloonContent: 'Балун'
    },

	{
        latitude: 48.7481,
        longitude: 29.1952,
        hintContent: 'Хинт',
        baloonContent: 'Балун'
    },

    {
        latitude: 53.6039,
        longitude: 49.2342,
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
        zoom: 3
    });

   for (var i=0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            baloonContent: placemarks[i].baloonContent
        },

        {
            iconLayout: 'default#image',
            iconImageHref: '/ii/img/maps/marker.svg',
            iconImageSize: [28, 40],
            iconImageOffset: [-7, -20]
        });
        
    };

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: '/ii/img/maps/marker.svg',
                size: [28, 40],
                offset: [-7, -20]
            }
        ],
        // clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects)
}


$('.book-world__menu-burger').click(function(){
	$('.book-world__filters').toggleClass('filters__move-right');
	$('.filters__closed').show();
	$('.bg').show();
	$('.book-world__collection').removeClass('collection__move-up');
	$(this).hide();
});

$('.filters__closed').click(function(){
	$(this).hide();
	$('.book-world__filters').toggleClass('filters__move-right');
	$('.book-world__menu-burger').delay(500).fadeIn(1);
	$('.book-world__collection').removeClass('collection__move-up');
	$('.bg').hide();
});

$('.collection__close').click(function(){
	$(this).css('display', 'none');
	$('.book-world__collection').removeClass('collection__move-up');
	$('.book-world__menu-burger').show();
	$('.book-world__filters').removeClass('filters__move-right');
	$('.filters__closed').hide();
	$('.bg').hide();
});

$('.filters__checkbox').click(function(){
	$('.book-world__filters').removeClass('filters__move-right');
	$('.filters__closed').hide();
	$('.book-world__menu-burger').delay(500).fadeIn(1);
	$('.book-world__collection').addClass('collection__move-up');
	$('.collection__close').show();
	$('.bg').hide();
});


$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
     	$('.book-world__collection').removeClass('collection__move-up');
     	$('.book-world__filters').removeClass('filters__move-right');
     	$('.filters__closed').hide();
     	$('.book-world__menu-burger').delay(500).fadeIn(1);
     	$('.bg').hide();
    }
});
</script>

</body>