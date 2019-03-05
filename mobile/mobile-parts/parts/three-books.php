<div class="full pt6 bb">

	<h2 class="mb3">
		<a href="<?= $slider_link; ?>"><?= $title; ?></a>
	</h2>

	<!-- ////// three cards block //////-->
	<div class="card-block grid-x grid-margin-x"  data-equalizer>

		<?php foreach ($books as $index => $book): ?>
			<div class="cell small-4">
				<?php 
				$position = $index;
				include 'book-card.php'; ?>
			</div>
		<? endforeach; ?>

	</div>
	
	<a class="more" href="<?= $slider_link; ?>">Посмотреть все
		<svg class="icon">
			<use xlink:href="#arrow_right"></use>
		</svg>
	</a>
	<!-- ////// END: three cards block //////-->

</div>