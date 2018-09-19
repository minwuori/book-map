<?php
  include './data/map-data.php';
?>

<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
  	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Карта мира</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="https://api-maps.yandex.ru/2.1/?load=package.standard&lang=ru-RU" type="text/javascript"></script>
	
</head>
<body>
<div class="book-world">
	<div class="book-world__map">
		<div id="book-map"></div>
	</div>
	<div class="book-world__filters">
		<div class="filters__logo"><img src="img/logo_blue.svg"></div>
		<div class="filters"> 
			<div class="filters__text">Показать:</div>
			
			 <?php foreach($map_data as $name => $item) : ?>
				
					<div class="filters__item" data-collection="<?= $name; ?>" onclick="bookWorld.collections.toggle('<?= $name; ?>')">
						<div class="filters__checkbox filters__not-checkbox" ></div>
						<?= $item['title'] ?>
					</div>
			<?php endforeach; ?>
			<!-- 
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
			</div> -->
			<div class="filters__line"></div>			
		</div>
		<div class="filters__search">
			<img class="filters__img" src="img/search.svg"> <input type="search" />
		</div>
		<div class="options"></div>
	</div>
	
	<div class="book-world__collection" data-hidden >
		
		<div class="collection">

			<div class="collection__header">
				<img class="collection__img" src="img/marker.svg">
				
				
				<div class="collection__name"></div>
				

				<a href="" class="collection__link">Посмотреть всё</a>
				<div href="#" class="collection__close" data-close=".book-world__collection"><img src="img/close.svg"></div>
			</div>

			<div class="collection__books">

				<div class="product-card" data-book="1">
					<a class="product-card__img" href="">
						<img class="" src="">
					</a>
					<div class="product-card__info">
						<a class="product-card__link" href="">
							<div class="product-card__title"></div>
							<div class="product-card__author"></div>
						</a>
						<div class="product-card__footer">
							<div class="product-card__price"></div>
							<button class="button product-card__button" data-status=""></button>
						</div>
					</div>
				</div>

				<div class="product-card" data-book="2">
					<a class="product-card__img" href="">
						<img class="" src="">
					</a>
					<div class="product-card__info">
						<a class="product-card__link" href="">
							<div class="product-card__title"></div>
							<div class="product-card__author"></div>
						</a>
						<div class="product-card__footer">
							<div class="product-card__price"></div>
							<button class="button product-card__button" data-status=""></button>
						</div>
					</div>
				</div>

				<div class="product-card" data-book="3">
					<a class="product-card__img" href="">
						<img class="" src="">
					</a>
					<div class="product-card__info">
						<a class="product-card__link" href="">
							<div class="product-card__title"></div>
							<div class="product-card__author"></div>
						</a>
						<div class="product-card__footer">
							<div class="product-card__price"></div>
					        <button class="button product-card__button" data-status=""></button>
				        </div>
			        </div>
			    </div>

			</div>
    	</div>
	</div>

</div>

	<script src="https://new.chitai-gorod.ru/ii/js/api.js"></script>
	<script src="https://new.chitai-gorod.ru/ii/js/events.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="product-card-complect/script.js"></script>

	<script src="main.js" type="text/javascript"></script>

	<script>
    window.bookWorld = window.bookWorld || {};
    bookWorld.collections.setData(<?= json_encode($map_data); ?>);
    bookWorld.collections.toggle('writers');
  </script>
	

</body>
</html>