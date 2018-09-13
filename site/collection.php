<?php
  include './data/map-data.php';
?>

<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
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
				<div class="filters__checkbox">
					<input type="checkbox" class="filters__item" id="writers" data-collection="<?= $name; ?>" onclick="bookWorld.collections.toggle('<?= $name; ?>')"/>
					<label for="writers"><?= $item['title'] ?></label>
				</div>
			<?php endforeach; ?>
			
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
			<img class="filters__img" src="img/search.svg"> <input type="search" />
		</div>
		<div class="options">Россия</div>
	</div>
	
	<div class="book-world__collection" >
		
		<div class="collection">

			<div class="collection__header">
				<img class="collection__img" src="img/marker.svg">
				<div class="collection__name"> Путеводители России</div>
				<a href="" class="collection__link">Посмотреть всё</a>
				<a href="#" class="collection__close" data-close=".book-world__collection"><img src="img/close.svg"></a>
			</div>

			<div class="collection__books">

				<div class="product-card" data-book="1">
					<a class="product-card__img" href="">
						<img class="" src="https://img-gorod.ru/upload/iblock/d1c/140_224/d1ce06161bcd8c12087696359ccd2070.jpg">
					</a>
					<div class="product-card__info">
						<a class="product-card__link" href="">
							<div class="product-card__title">Семь навыков высокоэффективных людей</div>
							<div class="product-card__author">Троцкий Д.</div>
						</a>
						<div class="product-card__footer">
							<div class="product-card__price">2300 &#8381;</div>
							<button class="button product-card__button" data-status="buy">Купить</button>
						</div>
					</div>
				</div>

				<div class="product-card" data-book="2">
					<a class="product-card__img" href="">
						<img class="" src="https://img-gorod.ru/upload/iblock/9b7/140_224/9b7dee621f372c0d26f67d6286da92b3.jpg">
					</a>
					<div class="product-card__info">
						<a class="product-card__link" href="">
							<div class="product-card__title">Семь навыков высокоэффективных людей</div>
							<div class="product-card__author">Троцкий Д.</div>
						</a>
						<div class="product-card__footer">
							<div class="product-card__price">2300 &#8381;</div>
							<button class="button product-card__button" data-status="buy">Купить</button>
						</div>
					</div>
				</div>

				<div class="product-card" data-book="3">
					<a class="product-card__img" href="">
						<img class="" src="https://img-gorod.ru/upload/iblock/2fe/140_224/2feaa57d3991a2ad3fed5e2704c2f566.jpg">
					</a>
					<div class="product-card__info">
						<a class="product-card__link" href="">
							<div class="product-card__title">Семь навыков высокоэффективных людей</div>
							<div class="product-card__author">Троцкий Д.</div>
						</a>
						<div class="product-card__footer">
							<div class="product-card__price">2300 &#8381;</div>
					        <button class="button product-card__button" data-status="in-basket">В корзине</button>
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

	<script src="main.js" type="text/javascript"></script>

	<script>
    window.bookWorld = window.bookWorld || {};
    bookWorld.collections.setData(<?= json_encode($map_data); ?>);
    bookWorld.collections.toggle('writers');
  </script>
	

</body>
</html>