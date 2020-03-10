let slideIndex = 1;
let timer = null;
showSlides(slideIndex);

function plusSlides(n) {
  clearTimeout(timer);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(timer);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n==undefined){n = ++slideIndex}
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  timer = setTimeout(showSlides, 5000);
}

// Get the modal
var modal = document.getElementById("myModal");
var modalJ1Btn = document.getElementById("j1Modal");
var modalJ3Btn = document.getElementById("j3Modal");
var modalJ13Btn = document.getElementById("j13Modal");
var lj7ffModal = document.getElementById("lj7ffModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var j1Btn = document.getElementById("j1Btn");
var j3Btn = document.getElementById("j3Btn");
var j13Btn = document.getElementById("j13Btn");
var lj7FFBtn = document.getElementById("lj7FFBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanJ1 = document.getElementsByClassName("closeJ1")[0];
var spanJ3 = document.getElementsByClassName("closeJ3")[0];
var spanJ13 = document.getElementsByClassName("closeJ13")[0];
var spanlj7ff = document.getElementsByClassName("closelj7ff")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

j1Btn.onclick = function() {
  modalJ1Btn.style.display = "block";
}

j3Btn.onclick = function() {
  modalJ3Btn.style.display = "block";
}

j13Btn.onclick = function() {
  modalJ13Btn.style.display = "block";
}

lj7FFBtn.onclick = function() {
  lj7ffModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

spanJ1.onclick = function() {
  modalJ1Btn.style.display = "none";
}

spanJ3.onclick = function() {
  modalJ3Btn.style.display = "none";
}

spanJ13.onclick = function() {
  modalJ13Btn.style.display = "none";
}

spanlj7ff.onclick = function() {
  lj7ffModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modalJ1Btn) {
    modalJ1Btn.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modalJ3Btn) {
    modalJ3Btn.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modalJ13Btn) {
    modalJ13Btn.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == lj7ffModal) {
    lj7ffModal.style.display = "none";
  }
}

let removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener('click', removeCartItem)
}

let quantityInputs = document.getElementsByClassName('cart-quantity-input');
for (var i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener('change', quantityChanged)
}

let addToCartBtns = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartBtns.length; i++) {
  let button = addToCartBtns[i];
  button.addEventListener('click', addToCartClicked)
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

document.getElementsByClassName('lj7AsBtn')[0].addEventListener('click', outOfStock);
document.getElementsByClassName('lj17Btn')[0].addEventListener('click', justSoldOut);

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  let imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart-row')
  let cartItems = document.getElementsByClassName('cart-items')[0];
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert(`This item ${title} is already added to the cart.`)
      return;
    }
  }
  let cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imgSrc}" alt="./images/logo.jpg">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    let price = parseFloat(priceElement.innerText.replace('PHP ', ''));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = 'PHP ' + total;
}

function purchaseClicked() {
  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  alert('Your order has been placed. Thank you!');
  while (cartItems.hasChildNodes()) {
  cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal();
}

function outOfStock() {
  alert('Sorry, item is in out of stock status.');
}


function justSoldOut() {
  alert('Sorry, this item just sold out.');
}
