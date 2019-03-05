function ProductCard(data) {
  this.$ = data.element;

  this.$imgLink = this.$.querySelector('.product-card__img');
  this.$img = this.$imgLink.querySelector('img');

  this.$titleLink = this.$.querySelector('.product-card__link');
  this.$title = this.$.querySelector('.product-card__title');
  this.$author = this.$.querySelector('.product-card__author');

  this.$price = this.$.querySelector('.product-card__price');
  this.$priceOld = this.$price.querySelector('.old-price');
  this.$priceCurrent = this.$price.querySelector('.price');

  this.$button = this.$.querySelector('.product-card__button');

  this.id = this.$.dataset.product || this.$.dataset.id;
  this.link = this.$imgLink.href;
  this.img = this.$img.src;
  this.title = this.$title.innerHTML;
  this.author = this.$author.innerHTML;
  this.price = {
    old: this.$priceOld ? parseInt(this.$priceOld.innerHTML) : null,
    current: this.$priceCurrent ? parseInt(this.$priceCurrent.innerHTML) : 0
  };
  this.status = this.$button.dataset.status;
};

ProductCard.buttonEvents = {
  'buy': function() {
    events.basket.add(this, {book_id: this.id, cnt: 1})
  },
  'in-basket': function() {
    window.location.href = "/personal/basket/";
  },
  'where': function() {
    window.location.href ='/shops/available.php?elem_id=' + this.id;
  }
};

ProductCard.buttonText = {
  'buy': 'Купить',
  'in-basket': 'В корзине',
  'where': 'Где купить?',
  'not': 'Нет в наличии'
}

ProductCard.prototype.setData = function(data) {
  this.id = data.id;
  this.title = data.title;
  this.author = data.author || "";
  this.link = data.link;
  this.img = data.img;
  this.price = data.price;
  this.status = data.status;

  this.setId();
  this.setImg();
  this.setLink();
  this.setTitle();
  this.setAuthor();
  this.setPrice();
  this.setButton();
};

ProductCard.prototype.setId = function() {
  this.$.setAttribute('data-product', this.id);
  this.$.setAttribute('data-id', this.id);
};

ProductCard.prototype.setLink = function() {
  this.$imgLink.href = this.link;
  this.$titleLink.href = this.link;
};

ProductCard.prototype.setImg = function() {
  this.$img.src = this.img;
};

ProductCard.prototype.setTitle = function() {
  this.$title.innerHTML = this.title;
  this.$img.alt = this.title;
  this.$img.title = this.title;
};

ProductCard.prototype.setAuthor = function() {
  this.$author.innerHTML = this.author;
};

ProductCard.prototype.setPrice = function() {
  var html = '';
  if (this.price.old) {
    html += '<span class="old-price">' + this.price.old + '&#8381;</span> ';
  }
  html += '<span class="price">' + this.price.current + '&#8381;</span>';
  this.$price.innerHTML = html;
};

ProductCard.prototype.setButton = function() {
  var button;
  if (this.status == 'not') button = document.createElement('span');
  else button = document.createElement('button');

  

  button.setAttribute('data-status', this.status);
  button.classList.add('button', 'product-card__button');

  if (ProductCard.buttonEvents[this.status])
    button.onclick = ProductCard.buttonEvents[this.status].bind(this);
  
  button.innerHTML = ProductCard.buttonText[this.status];

  var prevButton = this.$button;
  var parent = this.$button.parentNode;

  this.$button.parentNode.replaceChild(button, this.$button);
  this.$button = button;
};